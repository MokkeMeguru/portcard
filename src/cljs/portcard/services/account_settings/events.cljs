(ns portcard.services.account-settings.events
  (:require [re-frame.core :as re-frame]
            [ajax.core :as ajax]
            [goog.string :as gstring]
            [portcard.config :as config]))

(re-frame/reg-event-db
 ::restore-own-profile
 (fn [db _]
   (let [own-profile (:own-profile db)]
     (assoc db :edit-profile own-profile))))

(re-frame/reg-event-db
 ::display-name
 (fn [db [_ display-name]]
   (assoc-in db [:edit-profile :display-name] display-name)))

(re-frame/reg-event-db
 ::email
 (fn [db [_ email]]
   (assoc-in db [:edit-profile :contact :email] email)))

(re-frame/reg-event-db
 ::twitter
 (fn [db [_ twitter]]
   (assoc-in db [:edit-profile :contact :twitter] twitter)))

(re-frame/reg-event-db
 ::facebook
 (fn [db [_ facebook]]
   (assoc-in db [:edit-profile :contact :facebook] facebook)))

;; load profile
(defn ->roles [roles]
  (mapv
   (fn [role]
     (assoc role :role-category (-> role :role-category keyword)))
   (sort-by :primary-rank roles)))

(defn ->profile [response]
  (let [display-name (:display-name response)
        contact (:contact response)
        roles (:roles response)]
    {:display-name display-name
     :contact contact
     :roles (->roles roles)}))

(re-frame/reg-event-fx
 ::load-profile-success
 (fn [cofx [_ response]]
   (let [db (:db cofx)
         profile (->profile response)]
     {:db (-> db
              (assoc
               :own-profile profile)
              (assoc
               :edit-profile profile))})))

(re-frame/reg-event-fx
 ::load-profile-failure
 (fn [cofx [_ response]]
   {}))

(re-frame/reg-event-fx
 ::load-profile
 (fn [cofx _]
   (let [{:keys [db]} cofx
         uname (:uname db)]
     (if (nil? uname)
       {}
       {:http-xhrio
        {:method :get
         :uri (gstring/format "%s/api/user-profile/%s" config/api-host uname)
         :timeout 8000
         :format (ajax/json-request-format)
         :response-format (ajax/json-response-format {:keywords? true})
         :on-success [::load-profile-success]
         :on-failure [::load-profile-failure]}}))))

;; update profile
(re-frame/reg-event-fx
 ::update-profile-success
 (fn [cofx [_ response]]
   (print "updated!")
   (let [db (:db cofx)]
     {:db (-> db
              (assoc :message "account-settings-updated"))})))

(re-frame/reg-event-fx
 ::update-profile-failure
 (fn [cofx [_ response]]
   (print "update failed")
   (print "response" response)
   (let [db (-> cofx :db)
         code (-> response :response :code)
         new-db (-> db
                    (assoc :server-code code))]
     {:db new-db})))

(re-frame/reg-event-fx
 ::update-profile
 (fn [cofx [_ {:keys [id-token payload]}]]
   (let [{:keys [db]} cofx
         new-profile payload]
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
