(ns portcard.routers
  (:require
   ;; reitit
   [reitit.coercion :as coercion]
   [reitit.coercion.spec]
   [reitit.frontend.easy :as rfe]
   [reitit.frontend :as rf]

   ;; others
   [clojure.spec.alpha :as s]
   [reagent.core :as r]
   [schema.core :as schema]
   [re-frame.core :as re-frame]

   ;; domain
   [portcard.domains.routes :as routes-domain]

   ;; services
   [portcard.services.main.events :as events]
   [portcard.services.auth.events :as auth-events]
   [portcard.services.auth.views :as auth-views]
   [portcard.services.home.views :as home-views]
   [portcard.services.register.views :as register-views]
   [portcard.services.register.events :as register-events]
   [portcard.services.register.subs :as register-subs]
   [portcard.services.card.events :as card-events]
   [portcard.services.card.views :as card-views]
   [portcard.services.topics.views :as topics-views]
   [portcard.services.contact.views :as contact-views]
   [portcard.services.account-settings.events :as account-settings-events]
   [portcard.services.account-settings.views :as account-settings-views]
   [portcard.services.icon-settings.views :as icon-settings-views]))

;; controllers
(def home-controllers
  [{:parameters {:query [:message]}
    :start (fn [{:keys [query]}]
             (when-let [message (:message query)]
               (println query "is querys")))
    :stop (fn []
            (re-frame/dispatch [::events/drop-server-code]))}])

(def user-page-controllers
  [{:parameters {:path [:user-id]}
    :start (fn [{:keys [path]}]
             (re-frame/dispatch [::card-events/load-profile (:user-id path)])
             (println "entering user " (:user-id path) " page"))}])

(def signup-controllers
  [{:start
    (fn [_]
      (re-frame/dispatch [::register-events/restore-checked-uname])
      (re-frame/dispatch [::register-events/restore-firebase-auth-status])
      (when (= "passed"  (.getItem js/sessionStorage :firebase-auth))
        (re-frame/dispatch [::register-events/store-firebase-auth-status "not-passed"])
        (rfe/push-state ::routes-domain/home)
        (rfe/replace-state ::routes-domain/home))
      (when (= "wait-server-response" (.getItem js/sessionStorage :firebase-auth))
        (.onAuthStateChanged
         (.. js/firebase auth)
         (fn [user]
           (if user
             (.then
              (.getIdToken (.. js/firebase auth -currentUser) true)
              (fn [id-token]
                (re-frame/dispatch [::register-events/signup id-token]))))))))}])

(def signin-controllers
  [{:start
    (fn [_]
      (re-frame/dispatch [::auth-events/restore-firebase-auth-status])
      (when (= "passed"  (.getItem js/sessionStorage :firebase-auth))
        (re-frame/dispatch [::auth-events/store-firebase-auth-status "not-passed"])
        (rfe/push-state ::routes-domain/home)
        (rfe/replace-state ::routes-domain/home))
      (when (= "wait-server-response" (.getItem js/sessionStorage :firebase-auth))
        (.onAuthStateChanged
         (.. js/firebase auth)
         (fn [user]
           (if user
             (.then (.getIdToken (.. js/firebase auth -currentUser) true)
                    (fn [id-token]
                      (re-frame/dispatch [::auth-events/signin {:message? true
                                                                :id-token id-token}]))))))))}])

(def settings-controllers
  [{:start (fn [_]
             (re-frame/dispatch [::account-settings-events/load-profile])
             (println "entering settings page"))
    :stop (fn [_]
            (println "leaving settings page")
            (re-frame/dispatch [::events/drop-message]))}])

(def routes
  ["/"
   [""
    {:name ::routes-domain/home
     :view  home-views/home-page
     :link-text "app-home"
     :controllers home-controllers}]
   ["users"
    {:link-text "users"}
    ["/:user-id"
     {:name ::routes-domain/user-page
      :link-text "user page"
      :coercion reitit.coercion.spec/coercion
      :view card-views/card
      :parameters {:path {:user-id string?}}
      :controllers user-page-controllers}]

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
    {:name ::routes-domain/signup
     :controllers signup-controllers
     :view register-views/register
     :link-text "signup"}]
   ["signin"
    {:name ::routes-domain/signin
     :view auth-views/signin
     :link-text "signin"
     :controllers signin-controllers}]
   ["settings"
    {:name ::routes-domain/settings
     :link-text "settings"
     :controllers settings-controllers}
    ["/account"
     {:name ::routes-domain/account-settings
      :link-text "account settings"
      :view account-settings-views/account-settings}]
    ["/icon"
     {:name ::routes-domain/icon-settings
      :link-text "icon settings"
      :view icon-settings-views/icon-settings}]]
   ;; ["new-topic"
   ;;  {:name ::new-topic
   ;;   :view [:div "post new topic"]
   ;;   :link-text "post new topic"}]
   ;; ["features"
   ;;  {:name ::features
   ;;   :coercion reitit.coercion.spec/coercion
   ;;   :link-test "featrues page"
   ;;   :parameters {:query {:category string?}}}]
   ])

(def router (rf/router routes))

(defn on-navigate [new-match]
  (when new-match
    (re-frame/dispatch [::events/navigated new-match])))

(defn init-routes! []
  (rfe/start!
   router
   on-navigate
   {:use-fragment false}))


;; playground
;;
;; (rf/match-by-path router "/settings/account")
;; (rf/match-by-path router "/")
;; (r/match-by-path router "/")
;; (rf/match-by-path router "/users/Meguru")
;; (r/match-by-path router "/users/hello/topics")
;; (r/match-by-path router "/users/hello/contact")
;; (r/match-by-path router "/users/hello/topics/topics-1")
;; (r/match-by-path router "/new-topic")
;; (r/match-by-path router "/features")
;; (r/match-by-path router "/settings/account")


;; (r/match-by-path router "/signin")

;; (r/match-by-name router ::user-topics {:id "Hello"})
;; (r/match-by-name router ::user-topics {:id "Hello"
;;                                        :category "hey"})
;; (r/match-by-name router ::user-topic {:id "Hello"
;;                                       :topic-id "topics-1"})
;; (r/match-by-name router ::features {:category "illust"})
