(ns portcard.services.role-settings.events
  (:require [re-frame.core :as re-frame]
            [portcard.utils.events :as event-utils]
            [goog.string :as gstring]
            [goog.string.format]
            [portcard.config :as config]
            [ajax.core :as ajax]))

(re-frame/reg-event-db
 ::role
 (fn [db [_ idx role]]
   (assoc-in db [:edit-profile :roles idx] role)))

(re-frame/reg-event-db
 ::remove-role
 (fn [db [_ idx]]
   (update-in db [:edit-profile :roles] event-utils/drop-index idx)))

(re-frame/reg-event-db
 ::role-category
 (fn [db [_ idx category]]
   (assoc-in db [:edit-profile :roles idx :role-category] category)))

(re-frame/reg-event-db
 ::role-link
 (fn [db [_ idx link-idx role-link]]
   (assoc-in db [:edit-profile :roles idx :role-links link-idx] role-link)))

(re-frame/reg-event-db
 ::role-link-name
 (fn [db [_ idx link-idx link-name]]
   (let [db (cond
              (or (empty? (-> db :edit-profile :roles))
                  (nil? (-> db :edit-profile :roles (nth idx))))
              (assoc-in db [:edit-profile :roles idx] {:role-links []})
              (nil? (-> db :edit-profile :roles (nth idx) :role-links))
              (assoc-in db [:edit-profile :roles idx :role-links] [])
              :else db)]
     (assoc-in db [:edit-profile :roles idx :role-links link-idx :link-category-name] link-name))))

(re-frame/reg-event-db
 ::role-link-url
 (fn [db [_ idx link-idx link-url]]
   (let [db (cond
              (or (empty? (-> db :edit-profile :roles))
                  (nil? (-> db :edit-profile :roles (nth idx))))
              (assoc-in db [:edit-profile :roles idx] {:role-links []})
              (nil? (-> db :edit-profile :roles (nth idx) :role-links))
              (assoc-in db [:edit-profile :roles idx :role-links] [])
              :else db)]
     (assoc-in db [:edit-profile :roles idx :role-links link-idx :link-url] link-url))))

(re-frame/reg-event-db
 ::remove-role-link
 (fn [db [_ idx link-idx]]
   (update-in db [:edit-profile :roles idx :role-links] event-utils/drop-index link-idx)))

(re-frame/reg-event-fx
 ::update-profile-success
 (fn [cofx [_ response]]
   (let [db (-> cofx :db)]
     {:db (-> db
              (assoc :message "account-settings-updated"))})))

(re-frame/reg-event-fx
 ::update-profile-failure
 (fn [cofx [_ response]]
   (print response)
   (let [db (-> cofx :db)
         code (-> response :response :code)
         new-db (-> db
                    (assoc :server-code code))]
     {:db new-db})))

(re-frame/reg-event-fx
 ::update-profile
 (fn [cofx [_ {:keys [id-token payload display-name]}]]
   (let [{:keys [db]} cofx
         new-profile {:roles payload :display-name display-name}]
     {:http-xhrio
      {:method :post
       :headers {:Authorization id-token}
       :uri (gstring/format "%s/api/user-profile" config/api-host)
       :timeout 8000
       :format (ajax/json-request-format)
       :params new-profile
       :response-format (ajax/raw-response-format)
       :on-success [::update-profile-success]
       :on-failure [::update-profile-failure]}})))
