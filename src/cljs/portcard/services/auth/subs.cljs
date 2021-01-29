(ns portcard.services.auth.subs
  (:require
   [re-frame.core :as re-frame]
   [portcard.services.auth.db :as auth-db]))

(re-frame/reg-sub
 ::firebase-auth-state
 (fn [{:keys [auth]}]
   (:firebase-auth-state auth)))

(re-frame/reg-sub
 ::firebase-auth-state-progress?
 :<- [::firebase-auth-state]
 (fn [firebase-auth-state _]
   (= "progress" firebase-auth-state)))

(re-frame/reg-sub
 ::firebase-auth-state-wait-server-response?
 :<- [::firebase-auth-state]
 (fn [firebase-auth-state _]
   (= "wait-server-response" firebase-auth-state)))

(re-frame/reg-sub
 ::signin-state
 (fn [{:keys [auth]}]
   (:signin-state auth)))

(re-frame/reg-sub
 ::signin?
 :<- [::signin-state]
 (fn [signin-state _]
   (= signin-state :signin)))
