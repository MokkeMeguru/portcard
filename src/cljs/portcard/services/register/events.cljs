(ns portcard.services.register.events
  (:require [re-frame.core :as re-frame]
            [day8.re-frame.http-fx]
            [ajax.core :as ajax]
            [portcard.infrastructure.storage.events]

            [reitit.frontend.easy :as rfe]
            [portcard.events :as events]
            [portcard.domains.routes :as routes-domain]
            [reitit.frontend :as rf]
            [goog.string :as gstring]
            [portcard.config :as config]))

(re-frame/reg-event-db
 ::reset-register-status
 (fn [db [_]]
   (assoc-in db [:register :userid-check] :no-status)))

(re-frame/reg-event-db
 ::register-failed
 (fn [db [_]]
   (assoc db :register-status :fail)))

(re-frame/reg-event-fx
 ::store-firebase-auth-status
 (fn [cofx [_ status]]
   {:storage/set {:storage-type "session" :name :firebase-auth :value status}}))

(re-frame/reg-event-fx
 ::restore-firebase-auth-status
 [(re-frame/inject-cofx :storage/get {:storage-type "session" :name :firebase-auth})]
 (fn [cofx _]
   (let [db (:db cofx)
         firebase-auth-state (:storage/get cofx)]
     {:db (assoc-in db [:register :firebase-auth-state] firebase-auth-state)})))

(re-frame/reg-event-fx
 ::restore-checked-uname
 [(re-frame/inject-cofx :storage/get {:storage-type "session" :name :checked-uname})]
 (fn [cofx [_ id-token]]
   (let [checked-uname (:storage/get cofx)
         db (:db cofx)]
     {:db (assoc-in db [:register :checked-uname] checked-uname)})))


;; userid-check


(re-frame/reg-event-fx
 ::userid-check-success
 (fn [{:keys [db]} [_ uname body]]
   (if (-> body :exist not)
     {:db (-> db  (assoc-in [:register :userid-check] :success)
              (assoc-in [:register :error-message] nil)
              (assoc-in [:register :checked-uname] uname))
      :storage/set {:storage-type "session" :name :checked-uname :value uname}}
     {:db   (-> db
                (assoc-in [:register :userid-check] :failure)
                (assoc-in [:register :error-message] "ユーザID が重複していました。別の ID を用いてください。"))})))

(re-frame/reg-event-fx
 ::userid-check-failure
 (fn [{:keys [db]} [_ body]]
   (let [new-db (-> db
                    (assoc-in [:register :userid-check] :failure)
                    (assoc-in [:register :error-message] "申し訳ございません。サーバエラーにより、ユーザ作成ができなくなっています。"))]
     {:db new-db})))

(re-frame/reg-event-fx
 ::userid-check
 (fn [cofx [_ userid]]
   (let [{:keys [db]} cofx]
     {:db (assoc-in db [:register :userid-check] :pending)
      :http-xhrio
      {:method :get
       :uri (gstring/format "%s/api/registration/check-account-name" config/api-host)
       :timeout 8000
       :params {:uname userid}
       :format (ajax/json-request-format)
       :response-format (ajax/json-response-format {:keywords? true})
       :on-success [::userid-check-success userid]
       :on-failure [::userid-check-failure]}})))


;; signup


(re-frame/reg-event-fx
 ::signup-success
 (fn [cofx [_ response]]
   (let [db (-> cofx :db)
         uname (-> response :uname)
         new-db (-> db
                    (assoc :uname uname)
                    (assoc :message "create-user")
                    (assoc-in [:auth :login-state] :login))]
     (rfe/push-state ::routes-domain/home)
     {:db new-db
      :storage/set {:storage-type "session" :name :firebase-auth :value "success"}})))

(re-frame/reg-event-fx
 ::signup-failure
 (fn [cofx [_ response]]
   (let [db (-> cofx :db)
         code (-> response :response :code)
         new-db (-> db
                    (assoc :server-code code)
                    (dissoc :uname)
                    (dissoc :auth))]
     (try (.. js/firebase auth signOut))
     (rfe/push-state  ::routes-domain/home)
     {:db new-db
      :storage/set {:storage-type "session" :name :firebase-auth :value "failed"}})))

(re-frame/reg-event-fx
 ::signup
 [(re-frame/inject-cofx :storage/get {:storage-type "session" :name :checked-uname})]
 (fn [cofx [_ id-token]]
   (let [{:keys [db]} cofx
         checked-uname (:storage/get cofx)]
     {:http-xhrio
      {:method :post
       :uri (gstring/format "%s/api/registration/signup" config/api-host)
       :timeout 8000
       :params {:uname (-> db :register :checked-uname)}
       :headers {:Authorization id-token}
       :format (ajax/json-request-format)
       :response-format (ajax/json-response-format {:keywords? true})
       :on-success [::signup-success]
       :on-failure [::signup-failure]}})))
