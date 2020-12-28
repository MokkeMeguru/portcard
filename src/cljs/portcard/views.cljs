(ns portcard.views
  (:require
   [re-frame.core :as re-frame]
   [portcard.subs :as subs]
   [reagent.core :as r]
   [portcard.services.header.views :as header-views]
   [portcard.domains.messages :as messages-domain]
   [portcard.domains.errors :as errors-domain]))

(defn system-message []
  (let [system-message (re-frame/subscribe [::subs/message])
        server-code (re-frame/subscribe [::subs/server-code])]
    (fn []
      (print "server-code is " @server-code)
      (cond
        (-> @server-code nil? not) [:div {:style {:padding-top "5rem"}} (errors-domain/decode-server-error @server-code)]
        (-> @system-message nil? not) [:div {:style {:padding-top "5rem"}} (messages-domain/decode-message @system-message)]
        :else
        [:div]))))

(defn main-panel []
  (let [name (re-frame/subscribe [::subs/name])
        current-route (re-frame/subscribe [::subs/current-route])
        login? false]
    [:div
     [header-views/header login?]
     [system-message]
     [:main.bd-main>div.is-centered.pt-3
      (when @current-route (-> @current-route :data :view))]]))
