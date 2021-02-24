(ns portcard.services.new-topic.subs
  (:require [re-frame.core :as re-frame]))

(re-frame/reg-sub
 ::new-topic
 (fn [db]
   (:new-topic db)))

(re-frame/reg-sub
 ::title
 :<- [::new-topic]
 (fn [new-topic]
   (:title new-topic)))

(re-frame/reg-sub
 ::link
 :<- [::new-topic]
 (fn [new-topic]
   (:link new-topic)))

(re-frame/reg-sub
 ::category
 :<- [::new-topic]
 (fn [new-topic]
   (:category new-topic)))

(re-frame/reg-sub
 ::description
 :<- [::new-topic]
 (fn [new-topic]
   (:description new-topic)))

(re-frame/reg-sub
 ::file
 :<- [::new-topic]
 (fn [new-topic]
   (:file new-topic)))

(re-frame/reg-sub
 ::file-url
 :<- [::file]
 (fn [file]
   (when file
     (-> js/window .-URL (.createObjectURL file)))))

(re-frame/reg-sub
 ::payload-form
 :<- [::title]
 :<- [::category]
 :<- [::description]
 :<- [::link]
 :<- [::file]
 (fn [[title category description link file]]
   (let [payload {:title title
                  :category category
                  :link link
                  :file file}
         payload (if (and (string? description) (not (empty? description)))
                   (assoc payload :description description) payload)]
     payload)))
