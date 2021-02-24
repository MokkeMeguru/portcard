(ns portcard.services.topics.events
  (:require [re-frame.core :as re-frame]
            [goog.string :as gstring]
            [ajax.core :as ajax]
            [portcard.config :as config]
            [portcard.services.main.events :as events]))

;; TODO: move into domain
(defn ->topic [uname {:keys [uid idx title created_at image-blob description link category] :as m}]
  {:uid uid
   :idx idx
   :title title
   :date (-> (js/Date. created_at) .toLocaleDateString)
   :screenshot (gstring/format "%s/api/user-topics/%s/topic/%s/capture/%s"
                               config/api-host
                               uname
                               uid
                               image-blob)
   :description description
   :link link
   :category (keyword category)})

;; (->topic {:title "hello" :created_at 1613521947031})

;; load recent topic
(re-frame/reg-event-fx
 ::load-recent-topic-success
 (fn [cofx [_ uname response]]
   (let [db (:db cofx)
         topics (mapv (partial ->topic uname) response)]
     {:db (-> db
              (assoc-in [:topics :recent-topics] topics)
              (assoc :talking-to-server false))})))

(re-frame/reg-event-fx
 ::load-recent-topic-failure
 (fn [cofx [_ response]]
   (let [db (:db cofx)]
     (print response)
     {:db (-> db
              (assoc :talking-to-server false))})))

(re-frame/reg-event-fx
 ::load-recent-topic
 (fn [cofx [_ {:keys [uname take]}]]
   (let [params (cond-> {}
                  (pos-int? take) (assoc :take take))]
     {:http-xhrio
      {:method :get
       :uri (gstring/format "%s/api/user-topics/%s/latest" config/api-host uname)
       :request-format (ajax/json-request-format)
       :response-format (ajax/json-response-format {:keywords? true})
       :params params
       :timeout 5000
       :on-request [::events/talking-to-server true]
       :on-success [::load-recent-topic-success uname]
       :on-failure [::load-recent-topic-failure]}})))

;; load topics
(defn ->topics-query [params]
  (let [{:keys [from category take order]} params]
    (cond-> {}
      from (assoc :from (int from))
      category (assoc :category category)
      take (assoc :take (int take))
      order (assoc :order order))))

(re-frame/reg-event-fx
 ::load-topics-success
 (fn [cofx [_ uname params response]]
   (let [db (:db cofx)
         topics (mapv (partial ->topic uname) response)]
     {:db (-> db
              (assoc-in [:topics :current-topics] topics)
              (assoc :talking-to-server false)
              (assoc-in [:topics :query] (->topics-query params)))})))

(re-frame/reg-event-fx
 ::load-topics-failure
 (fn [cofx [_ response]]
   (let [db (:db cofx)]
     {:db (-> db
              (assoc :talking-to-server false))})))

(re-frame/reg-event-fx
 ::load-topics
 (fn [cofx [_ {:keys [uname from take order category]}]]
   (let [params (cond-> {:order "desc"}
                  (= order "asc") (assoc :order "asc")
                  (some? take) (assoc :take take)
                  (some? from) (assoc :from from)
                  (some? category) (assoc :category (name category)))]
     {:http-xhrio
      {:method :get
       :uri (gstring/format "%s/api/user-topics/%s" config/api-host uname)
       :params params
       :request-format (ajax/json-request-format)
       :response-format (ajax/json-response-format {:keywords? true})
       :timeout 5000
       :on-request [::events/talking-to-server true]
       :on-success [::load-topics-success uname params]
       :on-failure [::load-topics-failure]}})))

(re-frame/reg-event-fx
 ::delete-topic-success
 (fn [cofx  [_ response]]
   (let [uname  (-> cofx :db :current-route :path-params :user-id)
         params (-> cofx :db :current-route :query-params)]
     {:http-xhrio
      {:method :get
       :uri (gstring/format "%s/api/user-topics/%s" config/api-host uname)
       :params params
       :request-format (ajax/json-request-format)
       :response-format (ajax/json-response-format {:keywords? true})
       :timeout 5000
       :on-request [::events/talking-to-server true]
       :on-success [::load-topics-success uname]
       :on-failure [::load-topics-failure]}})))

(re-frame/reg-event-fx
 ::delete-topic-failure
 (fn [cofx [_ response]]
   (println "failure" response)
   (let [db (:db cofx)]
     {:db (-> db
              (assoc :talking-to-server false))})))

(re-frame/reg-event-fx
 ::delete-topic
 (fn [cofx [_ {:keys [id-token uid]}]]
   (let [uname (-> cofx :db :uname)
         talking-to-server (-> cofx :db :talking-to-server)]
     (if talking-to-server
       {}
       {:http-xhrio
        {:method :delete
         :headers {:Authorization id-token}
         :uri (gstring/format "%s/api/user-topics/%s/topic/%s" config/api-host uname uid)
         :body {}
         :request-format :raw
         :response-format (ajax/raw-response-format)
         :timeout 4000
         :on-request [::events/talking-to-server true]
         :on-success [::delete-topic-success]
         :on-failure [::delete-topic-failure]}}))))
