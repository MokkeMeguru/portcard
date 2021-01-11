(ns portcard.services.card.subs
  (:require [re-frame.core :as re-frame]
            [goog.string :as gstring]
            [portcard.config :as config]))

(re-frame/reg-sub
 ::card
 (fn [db]
   (:card db)))

(re-frame/reg-sub
 ::profile
 (fn [db]
   (:profile db)))

(re-frame/reg-sub
 ::current-profile-uname
 (fn [db]
   (:current-profile-uname db)))

(re-frame/reg-sub
 ::profile-exist?
 :<- [::profile]
 (fn [profile _]
   (not (empty? profile))))

(re-frame/reg-sub
 ::my-profile?
 (fn [db]
   (= (:current-profile-uname db)
      (:uname db))))

(re-frame/reg-sub
 ::display-name
 :<- [::profile]
 (fn [profile _]
   (:display-name profile)))

;; contact
(re-frame/reg-sub
 ::contact
 :<- [::profile]
 (fn [profile _]
   (:contact profile)))

(re-frame/reg-sub
 ::email
 :<- [::contact]
 (fn [contact _]
   (:email contact)))

(re-frame/reg-sub
 ::email-link
 :<- [::email]
 (fn [email _]
   (if-not (nil? email)
     (gstring/format "mailto:%s" email))))

(re-frame/reg-sub
 ::twitter
 :<- [::contact]
 (fn [contact _]
   (:twitter contact)))

(re-frame/reg-sub
 ::twitter-link
 :<- [::twitter]
 (fn [twitter _]
   (if-not (nil? twitter)
     (gstring/format "https://twitter.com/%s" (.slice twitter 1)))))

(re-frame/reg-sub
 ::facebook
 :<- [::contact]
 (fn [contact _]
   (:facebook contact)))

(re-frame/reg-sub
 ::facebook-link
 :<- [::facebook]
 (fn [facebook _]
   (if-not (nil? facebook)
     (gstring/format "https://www.facebook.com/%s" facebook))))

;; roles
(re-frame/reg-sub
 ::roles
 :<- [::profile]
 (fn [profile _]
   (:roles profile)))

(re-frame/reg-sub
 ::active-role-index
 :<- [::card]
 (fn [card _]
   (if-let [active-role-index (:active-role-index card)]
     active-role-index
     0)))

(re-frame/reg-sub
 ::active-role
 :<- [::roles]
 :<- [::active-role-index]
 (fn [[roles active-role-index] _]
   (if-let [active-role (first (filter #(= (:primary-link %) active-role-index) roles))]
     active-role
     (first roles))))

(re-frame/reg-sub
 ::active-role-links
 :<- [::active-role]
 (fn [active-role _]
   (:role-links active-role)))

(re-frame/reg-sub
 ::profile-icon
 :<- [::current-profile-uname]
 :<- [::profile]
 (fn [[current-profile-uname profile]]
   (let [icon-blob (:icon-blob profile)]
     (gstring/format "%s/api/user-profile/%s/icon/%s" config/api-host current-profile-uname icon-blob))))
