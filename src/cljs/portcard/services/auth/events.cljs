(ns portcard.services.auth.events
  (:require
   [re-frame.core :as re-frame]
   [day8.re-frame.http-fx]
   [portcard.services.auth.db :as auth-db]
   [portcard.interfaces.storage.events]
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
 ::signout
 (fn [db [_]]
   (.. js/firebase auth signOut)
   (-> db
       (assoc-in [:auth :signin-state] :signout)
       (assoc :message nil))))

(re-frame/reg-event-fx
 ::signin-success
 (fn [cofx [_ message? response]]
   (let [db (-> cofx :db)
         uname (-> response  :uname)
         new-db  (-> db
                     (assoc :uname uname)
                     (assoc-in [:auth :signin-state] :signin))
         new-db (if message?
                  (assoc new-db :message "signin-success") new-db)]
     (when message?
       (rfe/push-state ::routes-domain/home)
       (rfe/replace-state ::routes-domain/home))
     {:db new-db
      :storage/set {:storage-type "session" :name :firebase-auth :value "success"}})))

(re-frame/reg-event-fx
 ::signin-failure
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
 ::signin
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
         :on-success [::signin-success message?]
         :on-failure [::signin-failure]}}))))

;; (defn signout [db]
;;   (-> db
;;       (assoc :signin? false)
;;       (assoc :signin-info {})))

;; (re-frame/reg-event-db
;;  ::signout
;;  (fn [db [_]]
;;    (signout db)))

;; (re-frame/reg-event-fx
;;  ::signin
;;  (fn [{:keys [db]}]
;;    nil))

;; (re-frame/reg-event-db
;;  ::reset-signin-status
;;  (fn [db [_]]
;;    (assoc db :signin-status :yet)))

;; (re-frame/reg-event-db
;;  ::signin-failed
;;  (fn [db [_]]
;;    (assoc db :signin-status :fail)))
