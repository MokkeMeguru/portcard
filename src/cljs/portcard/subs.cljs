(ns portcard.subs
  (:require
   [re-frame.core :as re-frame]
   [goog.string :as gstring]))

(re-frame/reg-sub
 ::name
 (fn [db]
   (:name db)))

(re-frame/reg-sub
 ::uname
 (fn [db]
   (:uname db)))

(re-frame/reg-sub
 ::user-icon
 :<- [::uname]
 (fn [uname db]
   (gstring/format  "http://localhost:3000/api/user-profile/%s/icon/%s-icon.png" uname uname)))

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
