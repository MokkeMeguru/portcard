(ns portcard.services.auth.events
  (:require
   [re-frame.core :as re-frame]
   [portcard.services.auth.db :as auth-db]))

(defn logout [db]
  (-> db
      (assoc :login? false)
      (assoc :login-info {})))

(re-frame/reg-event-db
 ::logout
 (fn [db [_]]
   (logout db)))

(re-frame/reg-event-fx
 ::login
 (fn [{:keys [db]}]
   nil))

(re-frame/reg-event-db
 ::reset-login-status
 (fn [db [_]]
   (assoc db :login-status :yet)))

(re-frame/reg-event-db
 ::login-failed
 (fn [db [_]]
   (assoc db :login-status :fail)))
