(ns portcard.services.new-topic.events
  (:require [re-frame.core :as re-frame]
            [ajax.core :as ajax]
            [portcard.services.new-topic.db :as new-topic-db]
            [goog.string :as gstring]
            [portcard.config :as config]
            [portcard.services.main.events :as events]))

(re-frame/reg-event-db
 ::initialize-new-topic
 (fn [db _]
   (assoc db :new-topic new-topic-db/default-new-topic)))

(re-frame/reg-event-db
 ::title
 (fn [db [_ title]]
   (assoc-in db [:new-topic :title] title)))

(re-frame/reg-event-db
 ::link
 (fn [db [_ link]]
   (assoc-in db [:new-topic :link] link)))

(re-frame/reg-event-db
 ::category
 (fn [db [_ category]]
   (assoc-in db [:new-topic :category] category)))

(re-frame/reg-event-db
 ::description
 (fn [db [_ description]]
   (assoc-in db [:new-topic :description] description)))

(re-frame/reg-event-db
 ::file
 (fn [db [_ file]]
   (assoc-in db [:new-topic :file] file)))

(defn ->topic-form-data [topic-payload]
  (let [{:keys [file title category link description]} topic-payload]
    (doto
     (js/FormData.)
      (.append "file" file)
      (.append "title" title)
      (.append "category" (name category))
      (.append "link" link)
      (cond-> (not (empty? description))
        (.append "description" description)))))

(re-frame/reg-event-fx
 ::post-topic-success
 (fn [cofx [_ response]]
   (let [db (:db cofx)]
     (print response)
     (.scrollTo js/window 0 0)
     {:db (-> db
              (assoc :message "posted-new-topic")
              (assoc :talking-to-server false)
              (assoc :new-topic new-topic-db/default-new-topic))})))

(re-frame/reg-event-fx
 ::post-topic-failure
 (fn [cofx [_ response]]
   (let [db (:db cofx)]
     (print response)
     {:db (assoc db :talking-to-server false)})))

(re-frame/reg-event-fx
 ::post-topic
 (fn [cofx [_ {:keys [id-token]}]]
   (let [topic-payload (-> cofx :db :new-topic)
         topic-form-data (->topic-form-data topic-payload)]
     {:http-xhrio
      {:method :post
       :uri (gstring/format "%s/api/user-topics" config/api-host)
       :headers {:Authorization id-token}
       :body topic-form-data
       :response-format (ajax/raw-response-format)
       :timeout 10000
       :on-request [::events/talking-to-server true]
       :on-success [::post-topic-success]
       :on-failure [::post-topic-failure]}})))
