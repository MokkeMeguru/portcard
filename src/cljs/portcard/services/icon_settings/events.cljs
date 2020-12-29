(ns portcard.services.icon-settings.events
  (:require [re-frame.core :as re-frame]
            [goog.string :as gstring]
            [ajax.core :as ajax]))

(re-frame/reg-event-db
 ::set-icon
 (fn [db [_ file]]
   (assoc-in db [:icon :file] file)))

(re-frame/reg-event-fx
 ::update-icon-success
 (fn [cofx [_ response]]
   (let [db (:db cofx)]
     {:db (-> db
              (assoc :icon-blob (:file-id response))
              (assoc :message "account-settings-updated"))})))

(re-frame/reg-event-fx
 ::update-icon-failure
 (fn [cofx [_ response]]
   (print response)
   {}))

(re-frame/reg-event-fx
 ::update-icon
 (fn [cofx [_ {:keys [id-token]}]]
   (let [icon (doto
               (js/FormData.)
                (.append "file" (-> cofx :db :icon :file)))
         uname (-> cofx :db :uname)]
     {:http-xhrio
      {:method :post
       :uri (gstring/format "http://localhost:3000/api/user-profile/%s/icon" uname)
       :headers {:Authorization id-token}
       :body icon
       :response-format (ajax/json-response-format {:keywords? true})
       :timeout 1000
       :on-success [::update-icon-success]
       :on-failure [::update-icon-failure]}})))
