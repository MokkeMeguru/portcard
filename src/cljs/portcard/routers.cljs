(ns portcard.routers
  (:require [clojure.spec.alpha :as s]
            [reitit.coercion :as coercion]
            [reitit.coercion.spec]
            [reitit.frontend.easy :as rfe]
            [schema.core :as schema]
            [reitit.core :as r]
            [portcard.events :as events]
            [re-frame.core :as re-frame]
            [portcard.services.auth.views :as auth-views]
            [portcard.services.register.views :as register-views]
            [portcard.services.card.views :as card-views]
            [portcard.services.topics.views :as topics-views]
            [portcard.services.contact.views :as contact-views]))

(def routes
  ["/"
   [""
    {:name ::home
     :view [:div "app-home"]
     :link-text "app-home"
     :controllers
     [{:start (fn [] (println "entering home page"))
       :stop (fn [] (println "leaving home page"))}]}]
   ["users"
    {:link-text "users"
     :controllers
     [{:start (fn [] (println "entering user page"))
       :stop (fn [] (println "leaving user page"))}]}
    ["/:id"
     {:name ::user-page
      :link-text "user page"
      :coercion reitit.coercion.spec/coercion
      :view
      card-views/card
      :parameters {:path {:user-id string?}}
      :controllers
      [{:parameters {:path [:id]}
        :start (fn [{:keys [path]}]
                 (println "entering user " (:id path) " page"))}]}]
    ;; ["/:id/topics"
    ;;  {:name ::user-topics
    ;;   :link-text "user topics page"
    ;;   :view topics-views/topics
    ;;   :parameters {:path {:id string?}
    ;;                :query {:category string?}}
    ;;   :controllers
    ;;   [{:parameters {:path [:id]
    ;;                  :query [:category]}
    ;;     :start (fn [{:keys [path query]}]
    ;;              (println path query))}]}]
    ;; ["/:id/topics/:topic-id"
    ;;  {:name ::user-topic
    ;;   :view [:div "the topic"]
    ;;   :coercion reitit.coercion.spec/coercion
    ;;   :link-text "user topic page"
    ;;   :parameters {:path {:id string?
    ;;                       :topic-id string?}}}]
    ;; ["/:id/contact"
    ;;  {:name ::user-contact
    ;;   :link-text "user contact page"
    ;;   :view contact-views/contact
    ;;   :parameters {:path {:id string?}}}]
    ]
   ["signup"
    {:name ::signup
     :view register-views/register
     :link-text "signup"}]
   ["login"
    {:name ::logina
     :view auth-views/login
     :link-text "login"}]
   ;; ["new-topic"
   ;;  {:name ::new-topic
   ;;   :view [:div "post new topic"]
   ;;   :link-text "post new topic"}]
   ;; ["features"
   ;;  {:name ::features
   ;;   :coercion reitit.coercion.spec/coercion
   ;;   :link-test "featrues page"
   ;;   :parameters {:query {:category string?}}}]
   ["settings"
    {:name ::settings
     :link-text "settings"
     :controllers
     [{:start (println "entering settings page")
       :stop (println "leaving settings page")}]}
    ["/account"
     {:name ::account-settings
      :link-text "account settings"
      :view [:div "account setttings"]}]]])

(def router (r/router routes))

(defn on-navigate [new-match]
  (when new-match
    (re-frame/dispatch [::events/navigated new-match])))

(defn init-routes! []
  (rfe/start!
   router
   on-navigate
   {:use-fragment true}))


;; (r/match-by-path router "/")
;; (r/match-by-path router "/users/hello")
;; (r/match-by-path router "/users/hello/topics")


;; (r/match-by-path router "/users/hello/contact")


;; (r/match-by-path router "/users/hello/topics/topics-1")
;; (r/match-by-path router "/new-topic")
;; (r/match-by-path router "/features")
;; (r/match-by-path router "/settings/account")


;; (r/match-by-path router "/login")

;; (r/match-by-name router ::user-topics {:id "Hello"})
;; (r/match-by-name router ::user-topics {:id "Hello"
;;                                        :category "hey"})
;; (r/match-by-name router ::user-topic {:id "Hello"
;;                                       :topic-id "topics-1"})
;; (r/match-by-name router ::features {:category "illust"})
