(ns portcard.core
  (:require
   [reagent.dom :as rdom]
   [re-frame.core :as re-frame]
   [portcard.events :as events]
   [portcard.views :as views]
   [portcard.config :as config]
   [portcard.routers :as routers]))

(defn dev-setup []
  (when config/debug?
    (println "dev mode")))

(defn ^:dev/after-load mount-root []
  (re-frame/clear-subscription-cache!)

  (routers/init-routes!)
  (let [root-el (.getElementById js/document "app")]
    (rdom/unmount-component-at-node root-el)
    (rdom/render [views/main-panel] root-el)))

(defn init []
  (re-frame/dispatch-sync [::events/initialize-db])
  (re-frame/dispatch-sync [::events/initialize-firebaseui])
  (dev-setup)
  (mount-root))
