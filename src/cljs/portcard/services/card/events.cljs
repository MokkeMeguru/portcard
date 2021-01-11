(ns portcard.services.card.events
  (:require [re-frame.core :as re-frame]
            [day8.re-frame.http-fx]
            [ajax.core :as ajax]
            [goog.string :as gstring]
            [portcard.config :as config]))

;; load profile
(re-frame/reg-event-fx
 ::load-profile-success
 (fn [cofx [_ response]]
   (let [db (:db cofx)]
     {:db (-> db
              (assoc
               :profile response))})))

(re-frame/reg-event-fx
 ::load-profile-failure
 (fn [cofx [_ response]]
   {}))

(re-frame/reg-event-fx
 ::load-profile
 (fn [cofx [_ uname]]
   (let [{:keys [db]} cofx]
     (if (nil? uname)
       {}
       {:db (assoc db :current-profile-uname uname)
        :http-xhrio
        {:method :get
         :uri (gstring/format "%s/api/user-profile/" config/api-host uname)
         :timeout 8000
         :format (ajax/json-request-format)
         :response-format (ajax/json-response-format {:keywords? true})
         :on-success [::load-profile-success]
         :on-failure [::load-profile-failure]}}))))
