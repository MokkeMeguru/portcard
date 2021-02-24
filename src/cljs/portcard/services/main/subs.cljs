(ns portcard.services.main.subs
  (:require
   [re-frame.core :as re-frame]
   [goog.string :as gstring]
   [portcard.config :as config]))

(re-frame/reg-sub
 ::name
 (fn [db]
   (:name db)))

(re-frame/reg-sub
 ::uname
 (fn [db]
   (:uname db)))

(re-frame/reg-sub
 ::user-icon-blob
 (fn [db]
   (if-let [blob (:icon-blob db)]
     blob
     (gstring/format "%s-icon.png" (:uname db)))))

(re-frame/reg-sub
 ::user-icon
 :<- [::uname]
 :<- [::user-icon-blob]
 (fn [[uname user-icon-blob] db]
   (gstring/format  "%s/api/user-profile/%s/icon/%s" config/api-host uname user-icon-blob)))

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
