(ns portcard.services.icon-settings.events
  (:require [re-frame.core :as re-frame]
            [goog.string :as gstring]
            [ajax.core :as ajax]
            [portcard.config :as config]))

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
       :uri (gstring/format "%s/api/user-profile/%s/icon" config/api-host uname)
       :headers {:Authorization id-token}
       :body icon
       :response-format (ajax/json-response-format {:keywords? true})
       :timeout 10000
       :on-success [::update-icon-success]
       :on-failure [::update-icon-failure]}})))

;; (re-frame/reg-event-fx
;;  ::ping-success
;;  (fn [cofx [_ response]]
;;    (println response)
;;    {}))

;; (re-frame/reg-event-fx
;;  ::ping-failure
;;  (fn [cofx [_ response]]
;;    (println response)
;;    {}))

;; (re-frame/reg-event-fx
;;  ::ping
;;  (fn [cofx [_ {:keys [id-token]}]]
;;    {:http-xhrio
;;     {:method :post
;;      :uri (gstring/format "%s/api/samples/%s" config/api-host "math/plus")
;;      :response-format (ajax/json-response-format {:keywords? true})
;;      :format (ajax/json-request-format)
;;      :timeout 1000
;;      :params {:x 1 :y 2}
;;      :on-success [::ping-success]
;;      :on-failure [::ping-failure]}}))

;; (re-frame/dispatch [::ping])
