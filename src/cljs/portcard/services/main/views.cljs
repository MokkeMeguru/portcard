(ns portcard.services.main.views
  (:require
   [re-frame.core :as re-frame]
   [reagent.core :as r]
   [portcard.services.main.subs :as subs]
   [portcard.services.header.views :as header-views]
   [portcard.services.footer.views :as footer-views]
   [portcard.domains.messages :as messages-domain]
   [portcard.domains.errors :as errors-domain]))

(defn system-message []
  (let [system-message (re-frame/subscribe [::subs/message])
        server-code (re-frame/subscribe [::subs/server-code])]
    (fn []
      (print "server-code is " @server-code)
      (cond
        (-> @server-code nil? not) [:div {:style {:padding-top "4.5rem"}} (errors-domain/decode-server-error @server-code)]
        (-> @system-message nil? not) [:div {:style {:padding-top "5rem"}} (messages-domain/decode-message @system-message)]
        :else
        [:div {:style {:padding-top "5rem"}}]))))

(defn main-panel []
  (let [name (re-frame/subscribe [::subs/name])
        current-route (re-frame/subscribe [::subs/current-route])]
    [:div
     [header-views/header]
     [system-message]
     [:main.bd-main
      [:div
       [:div.is-centered
        (when @current-route (-> @current-route :data :view))]]]
     [footer-views/footer]]))
