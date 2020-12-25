(ns portcard.views
  (:require
   [re-frame.core :as re-frame]
   [portcard.subs :as subs]
   [portcard.services.header.views :as header-views]))

(defn main-panel []
  (let [name (re-frame/subscribe [::subs/name])
        current-route (re-frame/subscribe [::subs/current-route])
        login? false]
    [:div
     [header-views/header login?]
     [:main.bd-main>div.is-centered.pt-3
      (when @current-route (-> @current-route :data :view))]]))
