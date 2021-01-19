(ns portcard.core
  (:require
   [reagent.dom :as rdom]
   [re-frame.core :as re-frame]
   [portcard.services.main.events :as events]
   [portcard.services.main.views :as views]
   [portcard.config :as config]
   [portcard.routers :as routers]
   [portcard.services.auth.events :as auth-events]))

(defn dev-setup []
  (when config/debug?
    (println "dev mode")))

(defn ^:dev/after-load mount-root []
  (re-frame/clear-subscription-cache!)

  (routers/init-routes!)
  (let [root-el (.getElementById js/document "app")]
    (rdom/unmount-component-at-node root-el)
    (rdom/render [views/main-panel] root-el)))

(defn init-firebase []
  (.onAuthStateChanged
   (.. js/firebase auth)
   (fn [user]

     (.then (.getIdToken (.. js/firebase auth -currentUser) true)
            (fn [id-token]
              (re-frame/dispatch [::auth-events/login {:message? false
                                                       :id-token id-token}]))))))

(defn init []
  (re-frame/dispatch-sync [::events/initialize-db])
  (re-frame/dispatch-sync [::events/initialize-firebaseui])
  (init-firebase)
  (dev-setup)
  (mount-root))
