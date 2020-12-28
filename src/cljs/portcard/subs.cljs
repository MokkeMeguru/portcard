(ns portcard.subs
  (:require
   [re-frame.core :as re-frame]))

(re-frame/reg-sub
 ::name
 (fn [db]
   (:name db)))

(re-frame/reg-sub
 ::current-route
 (fn [db]
   (:current-route db)))

(re-frame/reg-sub
 ::ui
 (fn [db]
   (:ui db)))

(re-frame/reg-sub
 ::ui-config
 (fn [db]
   (:ui-config db)))

(re-frame/reg-sub
 ::message
 (fn [db]
   (:message db)))

(re-frame/reg-sub
 ::server-code
 (fn [db]
   (:server-code db)))
