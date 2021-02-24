(ns portcard.services.account-settings.subs
  (:require [re-frame.core :as re-frame]))

(re-frame/reg-sub
 ::own-profile
 (fn [db]
   (:own-profile db)))

(re-frame/reg-sub
 ::edit-profile
 (fn [db]
   (:edit-profile db)))

(re-frame/reg-sub
 ::display-name
 :<- [::edit-profile]
 (fn [edit-profile _]
   (:display-name edit-profile)))

(re-frame/reg-sub
 ::contact
 :<- [::edit-profile]
 (fn [edit-profile _]
   (:contact edit-profile)))

(re-frame/reg-sub
 ::email
 :<- [::contact]
 (fn [contact _]
   (:email contact)))

(re-frame/reg-sub
 ::twitter
 :<- [::contact]
 (fn [contact _]
   (:twitter contact)))

(re-frame/reg-sub
 ::facebook
 :<- [::contact]
 (fn [contact _]
   (:facebook contact)))

(re-frame/reg-sub
 ::roles
 :<- [::edit-profile]
 (fn [edit-profile]
   (:roles edit-profile)))

(re-frame/reg-sub
 ::role
 :<- [::edit-profile]
 (fn [edit-profile index]
   (let [roles (:roles edit-profile)]
     (-> (filter #(=  index (:primary-rank %)) roles)
         first))))

(re-frame/reg-sub
 ::role-links
 (fn [_ index]
   (re-frame/subscribe [::role index]))
 (fn [role _]
   (:role-links role)))

(re-frame/reg-sub
 ::own-profile-loaded?
 :<- [::own-profile]
 (fn [own-profile _]
   (not (empty? own-profile))))

;; payload
(re-frame/reg-sub
 ::payload-display-name
 :<- [::display-name]
 (fn [display-name _]
   (when (-> display-name empty? not)
     display-name)))

(defn payload-contact [contact]
  (let [contact (into {} (filter #(-> % second empty? not) contact))]
    (when (-> contact empty? not)
      contact)))

(re-frame/reg-sub
 ::payload-contact
 :<- [::contact]
 (fn [contact _]
   (payload-contact contact)))

(defn payload-form [display-name contact]
  (into {} (filter #(-> % second empty? not) {:display-name display-name :contact contact})))

(re-frame/reg-sub
 ::payload-form
 :<- [::payload-display-name]
 :<- [::payload-contact]
 (fn [[display-name contact] _]
   (payload-form display-name contact)))

;; (payload-contact {:email "" :twitter "" :facebook "helo"})
;; (payload-form "hello"  {:facebook "hello"})
;; (payload-form nil  {:facebook "hello"})

;; (.log js/console @(re-frame/subscribe [::edit-profile]))


;; (re-frame/subscribe [::role-links 0])
;; (re-frame/subscribe [::role 0])
