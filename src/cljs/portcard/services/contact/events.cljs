(ns portcard.services.contact.events
  (:require [re-frame.core :as re-frame]
            [portcard.services.contact.db :as contact-db]
            [goog.string :as gstring]
            [portcard.config :as config]
            [ajax.core :as ajax]
            [portcard.services.main.events :as events]
            [reitit.frontend.easy :as rfe]
            [portcard.domains.routes :as routes-domain]))

(re-frame/reg-event-db
 ::initialize-contact
 (fn [db [_ to]]
   (assoc db :contact
          (assoc contact-db/default-contact :to to))))

(re-frame/reg-event-db
 ::title
 (fn [db [_ title]]
   (assoc-in db [:contact :title] title)))

(re-frame/reg-event-db
 ::from-name
 (fn [db [_ from-name]]
   (assoc-in db [:contact :from-name] from-name)))

(re-frame/reg-event-db
 ::from
 (fn [db [_ from]]
   (assoc-in db [:contact :from] from)))

(re-frame/reg-event-db
 ::to
 (fn [db [_ to]]
   (assoc-in db [:contact :to] to)))

(re-frame/reg-event-db
 ::body-text
 (fn [db [_ body-text]]
   (assoc-in db [:contact :body-text] body-text)))

(re-frame/reg-event-db
 ::recaptcha
 (fn [db [_ recaptcha]]
   (assoc-in db [:contact :recaptcha] recaptcha)))

(defn ->contact-body [contact-payload]
  (let [{:keys [from from-name to title body-text]} contact-payload]
    {:from from
     :from-name from-name
     :to to
     :title title
     :body-text body-text}))

(re-frame/reg-event-fx
 ::post-contact-success
 (fn [cofx [_ response]]
   (let [db (-> cofx :db)
         contact-to (-> db :contact :to)
         new-db (-> db
                    (assoc :message "post-contact")
                    (assoc :contact (assoc contact-db/default-contact :to contact-to)))]
     (rfe/push-state ::routes-domain/user-page {:user-id contact-to})
     {:db new-db})))

(re-frame/reg-event-fx
 ::post-contact-failure
 (fn [cofx [_ response]]
   (println response "failure")
   (let [db (-> cofx :db)
         code (-> response :response :code)
         contact-to (-> db :contact :to)
         new-db (-> db
                    (assoc :server-code code))]
     (rfe/push-state ::routes-domain/user-page {:user-id contact-to})
     {:db new-db})))

(re-frame/reg-event-fx
 ::post-contact
 (fn [cofx _]
   (let [contact-payload (-> cofx :db :contact)
         contact-body (->contact-body contact-payload)]
     {:http-xhrio
      {:method :post
       :uri (gstring/format "%s/api/contact" config/api-host)
       :params contact-body
       :response-format (ajax/json-response-format {:keywords? true})
       :format (ajax/json-request-format)
       :timeout 8000
       :on-request [::events/talking-to-server true]
       :on-success [::post-contact-success]
       :on-failure [::post-contact-failure]}})))
