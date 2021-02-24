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
   [portcard.services.icon-settings.views :as icon-settings-views]
   [portcard.services.role-settings.views :as role-settings-views]
   [portcard.services.new-topic.views :as new-topic-views]
   [portcard.services.new-topic.events :as new-topic-events]

   [portcard.services.topics.events :as topics-events]
   [portcard.services.contact.events :as contact-events]
   [portcard.domains.topics :as topics-domain]))

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
             (re-frame/dispatch [::topics-events/load-recent-topic {:uname (:user-id path) :take 1}])
             (println "entering user " (:user-id path) " page"))
    :stop (fn []
            (re-frame/dispatch [::events/drop-server-code]))}])

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

(def new-topic-controllers
  [{:start (fn [_]
             (re-frame/dispatch [::new-topic-events/initialize-new-topic]))}])

(def topics-controllers
  [{:parameters {:path [:user-id]
                 :query [:category :from :take :order]}
    :start (fn [{:keys [path query]}]
             (let [uname (:user-id path)
                   {:keys [from take order category]} query
                   take (if (some? take) take 2)]
               (re-frame/dispatch [::topics-events/load-recent-topic {:uname (:user-id path) :take 1}])
               (re-frame/dispatch [::topics-events/load-topics {:uname uname :from from :take take :order order :category category}])))}])

(def contact-controllers
  [{:parameters {:path [:user-id]}
    :start (fn [{:keys [path]}]
             (let [uname (:user-id path)]
               (re-frame/dispatch [::contact-events/initialize-contact uname])))}])

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

    ["/:user-id/topics"
     {:name ::routes-domain/user-topics
      :link-text "user topics page"
      :view topics-views/topics
      :parameters {:path {:user-id string?}
                   :query {:category string?
                           :from int?
                           :take int?
                           :order string?}}
      :controllers topics-controllers}]
    ;; ["/:id/topics/:topic-id"
    ;;  {:name ::user-topic
    ;;   :view [:div "the topic"]
    ;;   :coercion reitit.coercion.spec/coercion
    ;;   :link-text "user topic page"
    ;;   :parameters {:path {:id string?
    ;;                       :topic-id string?}}}]
    ["/:user-id/contact"
     {:name ::routes-domain/user-contact
      :link-text "user contact page"
      :view contact-views/contact
      :parameters {:path {:user-id string?}}
      :controllers contact-controllers}]]
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
      :view icon-settings-views/icon-settings}]
    ["/role"
     {:name ::routes-domain/role-settings
      :link-text "role settings"
      :view role-settings-views/role-settings}]]
   ["new-topic"
    {:name ::routes-domain/new-topic
     :link-text "post new topic"
     :view new-topic-views/new-topic
     :controllers new-topic-controllers}]
   ;; ["features"
   ;;  {:name ::features
   ;;   :coercion reitit.coercion.spec/coercion
   ;;   :link-test "featrues page"
   ;;   :parameters {:query {:category string?}}}]
   ])

(def router (rf/router routes))

;; (:path-params (rf/match-by-name router  ::routes-domain/user-topics {:user-id "Meguru" :category "programming"}))
;; (:query-params (rf/match-by-path router "/users/Meguru/topics?category=programming"))

(defn on-navigate [new-match]
  (when new-match
    (re-frame/dispatch [::events/talking-to-server false])
    (re-frame/dispatch [::events/navigated new-match])))

(defn init-routes! []
  (rfe/start!
   router
   on-navigate
   {:use-fragment false}))

;; (rf/match-by-path router "/new-topic")
;; (rf/match-by-path router "/users/Meguru")

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

;; (r/match-by-name router ::user-topics {:id "Hello"
;;                                        :category "hey"})
;; (r/match-by-name router ::user-topic {:id "Hello"
;;                                       :topic-id "topics-1"})
;; (r/match-by-name router ::features {:category "illust"})
