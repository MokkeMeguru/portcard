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
