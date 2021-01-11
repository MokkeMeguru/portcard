(ns portcard.services.auth.events
  (:require
   [re-frame.core :as re-frame]
   [day8.re-frame.http-fx]
   [portcard.services.auth.db :as auth-db]
   [portcard.infrastructure.storage.events]
   [ajax.core :as ajax]
   [reitit.frontend.easy :as rfe]
   [portcard.domains.routes :as routes-domain]
   [goog.string :as gstring]
   [portcard.config :as config]))

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
     {:db (assoc-in db [:auth :firebase-auth-state] firebase-auth-state)})))

(re-frame/reg-event-db
 ::logout
 (fn [db [_]]
   (.. js/firebase auth signOut)
   (-> db
       (assoc-in [:auth :login-state] :logout)
       (assoc :message nil))))

(re-frame/reg-event-fx
 ::login-success
 (fn [cofx [_ message? response]]
   (let [db (-> cofx :db)
         uname (-> response  :uname)
         new-db  (-> db
                     (assoc :uname uname)
                     (assoc-in [:auth :login-state] :login))
         new-db (if message?
                  (assoc new-db :message "login-success") new-db)]
     (when message?
       (rfe/push-state ::routes-domain/home)
       (rfe/replace-state ::routes-domain/home))
     {:db new-db
      :storage/set {:storage-type "session" :name :firebase-auth :value "success"}})))

(re-frame/reg-event-fx
 ::login-failure
 (fn [cofx [_ response]]
   (let [db (-> cofx :db)
         code (-> response :response :code)
         new-db
         (-> db
             (assoc :server-code code))]
     (try (.. js/firebase auth signOut))
     (rfe/push-state ::routes-domain/home)
     {:db new-db
      :storage/set {:storage-type "session" :name :firebase-auth :value "failed"}})))

(re-frame/reg-event-fx
 ::login
 [(re-frame/inject-cofx :storage/get {:storage-type "session" :name :firebase-auth})]
 (fn [cofx [_ {:keys [message? id-token]}]]
   (let [{:keys [db]} cofx
         auth-status (:storage/get cofx)]
     (cond
       (= auth-status "wait-server-response") {}
       :else
       {:http-xhrio
        {:method :post
         :uri (gstring/format "%s/api/registration/signin" config/api-host)
         :timeout 8000
         :headers {:Authorization id-token}
         :format (ajax/json-request-format)
         :response-format (ajax/json-response-format {:keywords? true})
         :on-success [::login-success message?]
         :on-failure [::login-failure]}}))))

;; (defn logout [db]
;;   (-> db
;;       (assoc :login? false)
;;       (assoc :login-info {})))

;; (re-frame/reg-event-db
;;  ::logout
;;  (fn [db [_]]
;;    (logout db)))

;; (re-frame/reg-event-fx
;;  ::login
;;  (fn [{:keys [db]}]
;;    nil))

;; (re-frame/reg-event-db
;;  ::reset-login-status
;;  (fn [db [_]]
;;    (assoc db :login-status :yet)))

;; (re-frame/reg-event-db
;;  ::login-failed
;;  (fn [db [_]]
;;    (assoc db :login-status :fail)))
