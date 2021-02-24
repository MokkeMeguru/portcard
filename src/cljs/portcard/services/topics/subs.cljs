(ns portcard.services.topics.subs
  (:require [re-frame.core :as re-frame]
            [portcard.services.main.subs :as subs]
            [reitit.frontend.easy :as rfe]
            [portcard.domains.routes :as routes-domain]))

(re-frame/reg-sub
 ::topics
 (fn [db]
   (:topics db)))

(re-frame/reg-sub
 ::recent-topics
 :<- [::topics]
 (fn [topics]
   (:recent-topics topics)))

(re-frame/reg-sub
 ::recent-topics-exist?
 :<- [::recent-topics]
 (fn [recent-topics]
   (not (empty? recent-topics))))

(re-frame/reg-sub
 ::current-topics
 :<- [::topics]
 (fn [topics]
   (sort-by :idx > (:current-topics topics))))

(re-frame/reg-sub
 ::topic-deletable?
 :<- [::subs/uname]
 :<- [::subs/current-route]
 (fn [[uname current-route]]
   (let [user-id (-> current-route :path-params :user-id)]
     (= uname user-id))))

(re-frame/reg-sub
 ::latest-topics?
 :<- [::current-topics]
 :<- [::recent-topics]
 (fn [[current-topics recent-topics]]
   (let [recent-topic-idx (-> (sort-by :idx > recent-topics) first :idx)]
     (-> (filter #(= (:idx %) recent-topic-idx) current-topics) count zero? not))))

(re-frame/reg-sub
 ::topics-query
 :<- [::topics]
 (fn [topics]
   (:query topics)))

(re-frame/reg-sub
 ::topics-query-take
 :<- [::topics-query]
 (fn [topics-query]
   (:take topics-query)))

(re-frame/reg-sub
 ::next-topics-exist?
 :<- [::current-topics]
 :<- [::topics-query-take]
 (fn [[current-topics topics-take]]
   (= (count current-topics) topics-take)))

(re-frame/reg-sub
 ::current-profile-uname
 (fn [db]
   (:user-id (:path-params (:current-route db)))))

(re-frame/reg-sub
 ::next-topics-url
 :<- [::topics-query]
 :<- [::current-topics]
 :<- [::current-profile-uname]
 (fn [[topics-query current-topics current-profile-uname]]
   (let [idx  (-> current-topics last :idx)]
     (rfe/href ::routes-domain/user-topics
               {:user-id current-profile-uname}
               (-> topics-query
                   (assoc  :from (if idx (dec idx) nil))
                   (assoc :order "desc"))))))

(re-frame/reg-sub
 ::previous-topics-url
 :<- [::topics-query]
 :<- [::current-topics]
 :<- [::current-profile-uname]
 (fn [[topics-query current-topics current-profile-uname]]
   (let [idx (-> current-topics first :idx)]
     (rfe/href ::routes-domain/user-topics
               {:user-id current-profile-uname}
               (-> topics-query
                   (assoc  :from (if idx (inc idx) nil))
                   (assoc :order "asc"))))))
