(ns portcard.services.register.events
  (:require [re-frame.core :as re-frame]
            [day8.re-frame.http-fx]
            [ajax.core :as ajax]))

(re-frame/reg-event-db
 ::reset-register-status
 (fn [db [_]]
   (assoc-in db [:register :userid-check] :no-status)))

(re-frame/reg-event-db
 ::register-failed
 (fn [db [_]]
   (assoc db :register-status :fail)))

(re-frame/reg-event-fx
 ::userid-check-success
 (fn [{:keys [db]} [_ uname body]]
   (let [new-db
         (if (not (-> body :exist))
           (-> db
               (assoc-in [:register :userid-check] :success)
               (assoc-in [:register :error-message] nil)
               (assoc-in [:register :checked-uname] uname))
           (-> db
               (assoc-in [:register :userid-check] :failure)
               (assoc-in [:register :error-message] "ユーザID が重複していました。別の ID を用いてください。")))]
     {:db new-db})))

(re-frame/reg-event-fx
 ::userid-check-failure
 (fn [{:keys [db]} [_ body]]
   (let [new-db (-> db
                    (assoc-in [:register :userid-check] :failure)
                    (assoc-in [:register :error-message] "申し訳ございません。サーバエラーにより、ユーザ作成ができなくなっています。"))]
     {:db new-db})))

(re-frame/reg-event-fx
 ::userid-check
 (fn [cofx [_ userid]]
   (let [{:keys [db]} cofx]
     {:db (assoc-in db [:register :userid-check] :pending)
      :http-xhrio
      {:method :get
       :uri "http://localhost:3000/api/registration/check-account-name"
       :timeout 8000
       :params {:uname userid}
       :format (ajax/json-request-format)
       :response-format (ajax/json-response-format {:keywords? true})
       :handler (fn [response] (.log js/console (str response)))
       :on-success [::userid-check-success userid]
       :on-failure [::userid-check-failure]}})))

(re-frame/reg-event-fx
 ::register
 (fn [cofx [_ userid]]
   (let []
     nil)))
