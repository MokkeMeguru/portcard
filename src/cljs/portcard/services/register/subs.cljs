(ns portcard.services.register.subs
  (:require [re-frame.core :as re-frame]))

(re-frame/reg-sub
 ::register-success?
 (fn [db]
   (not= :failure
         (-> db :register :userid-check))))

(re-frame/reg-sub
 ::userid-check
 (fn [{:keys [register]}]
   (:userid-check register)))

(re-frame/reg-sub
 ::error-message
 (fn [{:keys [register]}]
   (:error-message register)))

(re-frame/reg-sub
 ::checked-uname
 (fn [{:keys [register]}]
   (:checked-uname register)))

(re-frame/reg-sub
 ::firebase-auth-state
 (fn [{:keys [register]}]
   (:firebase-auth-state register)))


;; layer 3


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
 ::userid-check-pending?
 :<- [::userid-check]
 (fn [user-id-check _]
   (= :pending user-id-check)))

(re-frame/reg-sub
 ::userid-check-success?
 :<- [::userid-check]
 (fn [user-id-check _]
   (= :success user-id-check)))
