(ns portcard.services.home.views
  (:require [reagent.core :as r]
            [portcard.domains.messages :as messages-domain]))

(defn home-content []
  (let [system-message (r/atom "create-user")]
    (fn []
      [:<>
       [:p.subtitle "Port card とは"]])))

(def home-page
  [:div.container.pt-5
   [:div.titles
    [:p.title "Welcome to Port card"]
    [home-content]]])
