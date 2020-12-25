(ns portcard.services.auth.subs
  (:require
   [re-frame.core :as re-frame]
   [portcard.services.auth.db :as auth-db]))

(re-frame/reg-sub
 ::login?
 (fn [db]
   (:login? db)))

(re-frame/reg-sub
 ::login-success?
 (fn [db]
   (not= :fail
         (:login-status db))))
