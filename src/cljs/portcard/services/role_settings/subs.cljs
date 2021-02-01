(ns portcard.services.role-settings.subs
  (:require [re-frame.core :as re-frame]))

(re-frame/reg-sub
 ::edit-profile
 (fn [db]
   (:edit-profile db)))

(re-frame/reg-sub
 ::roles
 :<- [::edit-profile]
 (fn [edit-profile]
   (:roles edit-profile)))

(re-frame/reg-sub
 ::roles-count
 :<- [::roles]
 (fn [roles]
   (count roles)))

(re-frame/reg-sub
 ::role
 :<- [::roles]
 (fn [roles [_ idx]]
   (if (> (count roles) idx)
     (nth roles idx)
     {})))

(re-frame/reg-sub
 ::role-category
 :<- [::roles]
 (fn [roles [_ idx]]
   (when (> (count roles) idx)
     (:role-category (nth roles idx)))))

(re-frame/reg-sub
 ::role-links-count
 :<- [::roles]
 (fn [roles [_ idx]]
   (when (> (count roles) idx)
     (count (:role-links (nth roles idx))))))

(re-frame/reg-sub
 ::role-link-name
 :<- [::roles]
 (fn [roles [_ idx link-idx]]
   (when (and
          (> (count roles) idx)
          (-> (nth roles idx)
              :role-links
              count
              (> link-idx)))
     (-> (nth roles idx)
         :role-links
         (nth link-idx)
         :link-category-name))))

(re-frame/reg-sub
 ::role-link-url
 :<- [::roles]
 (fn [roles [_ idx link-idx]]
   (when (and
          (> (count roles) idx)
          (-> (nth roles idx)
              :role-links
              count
              (> link-idx)))
     (-> (nth roles idx)
         :role-links
         (nth link-idx)
         :link-url))))

(defn payload-role [idx role]
  (assoc role :primary-rank idx))

(re-frame/reg-sub
 ::payload-roles
 :<- [::roles]
 (fn [roles]
   (map-indexed  payload-role roles)))

(re-frame/reg-sub
 ::display-name
 :<- [::edit-profile]
 (fn [profile]
   (:display-name profile)))
