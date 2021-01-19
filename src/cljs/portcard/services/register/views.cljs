(ns portcard.services.register.views
  (:require [clojure.spec.alpha :as s]
            [reagent.core :as r]
            [reagent.dom :as dom]
            [portcard.domains.users :as users-domain]
            [portcard.services.register.subs :as register-subs]
            [portcard.services.register.events :as register-events]
            [portcard.domains.firebase :refer [providers]]
            [portcard.domains.routes :as routes-domain]
            [portcard.infrastructure.storage.events]

            [re-frame.core :as re-frame]
            [portcard.services.main.subs :as subs]
            [portcard.services.main.events :as events]
            [reitit.frontend.easy :as rfe]))

(defonce firebaseUiDeletion (.resolve js/Promise))

(def ui-config-callbacks
  {:signInSuccessWithAuthResult
   (fn [e o]
     (re-frame/dispatch [::register-events/store-firebase-auth-status "wait-server-response"])
     (re-frame/dispatch [::events/initialize-firebaseui])
     ;; this is stub ...
     (.onAuthStateChanged
      (.. js/firebase auth)
      (fn [user]
        (if user
          (.then (.getIdToken (.. js/firebase auth -currentUser) true)
                 (fn [id-token]
                   nil
                   ;; (re-frame/dispatch [::register-events/signup id-token])
                   ))
          ;; TODO: fine
          ;; (print "unknown error")
          ))))})

(defn StyledFirebaseAuth [config]
  (let [ui-config (:ui-config config)
        firebaseUiWidget (re-frame/subscribe [::subs/ui])]
    (r/create-class
     {:display-name "Firebase Authorization"
      :constructor
      (fn [this]
        (re-frame/dispatch-sync [::events/initialize-firebaseui]))
      :component-did-mount
      (fn [this]
        (do (re-frame/dispatch [::register-events/store-firebase-auth-status "progress"])
            (.start @firebaseUiWidget "#firebaseui-container" ui-config))
        ;; (.then
        ;;  firebaseUiDeletion
        ;;  (do (re-frame/dispatch [::register-events/store-firebase-auth-status "progress"])
        ;;      (.start @firebaseUiWidget "#firebaseui-container" ui-config)))
        )
      :component-will-unmount
      (fn [this]
        (.reset @firebaseUiWidget)
        ;; (set!
        ;;  firebaseUiDeletion
        ;;  (.delete @firebaseUiWidget)
        ;;  )
        )

      :reagent-render
      (fn [config]
        [:div#firebaseui-container])})))

(defn userid-field [userid userid-error]
  [:div.field
   [:label "ユーザID"]
   [:div.control.has-icons-left.has-icons-right
    [:input.input {:type "text" :placeholder "ユーザID"
                   :class (if @userid-error "is-danger" "is-success")
                   :on-change (fn [e]
                                (reset! userid (.. e -target -value)))}]
    [:span.icon.is-small.is-left [:i.fas.fa-user]]
    (when @userid-error
      [:p.help.is-danger "ユーザ ID は 英数字 で " users-domain/userid-min-length " ~ " users-domain/userid-max-length "文字を指定できます"])]])

(defn freezed-userid-field []
  (let [checked-uname (re-frame/subscribe [::register-subs/checked-uname])]
    (fn []
      [:div.field
       [:label "ユーザID"]
       [:div.field.has-addons
        [:div.control.has-icons-left.has-icons-right
         [:input.input {:type "text" :disabled true :value @checked-uname}]
         [:span.icon.is-small.is-left [:i.fas.fa-user]]]
        [:div.control
         [:a.button.is-info
          {:on-click #(do
                        (re-frame/dispatch [::register-events/reset-register-status])
                        (re-frame/dispatch [::register-events/store-firebase-auth-status "reset"]))}
          "reset"]]]])))

(defn submit-field [userid userid-error]
  (let [userid-check-pending? (re-frame/subscribe [::register-subs/userid-check-pending?])]
    (fn []
      [:div.field
       [:div.control.form
        (if
         @userid-check-pending? [:button.button.is-primary.is-loading "チェック中 ..."]
         [:button.button.is-primary
          {:on-click
           (fn [e]
             (.preventDefault e)
             (reset! userid-error (not (s/valid? ::users-domain/userid @userid)))
             (when-not @userid-error
               (re-frame/dispatch [::register-events/register-failed])
               (re-frame/dispatch [::register-events/userid-check @userid])))}
          "ユーザ ID の チェック"])]])))

(defn register-failure []
  (let
   [error-message (re-frame/subscribe [::register-subs/error-message])]
    (fn []
      [:div.notification.is-danger
       [:button.delete {:on-click #(re-frame/dispatch [::register-events/reset-register-status])}]
       [:p @error-message]])))

(defn register-body [ui-config-callbacks]
  (let [;; temporary input variable
        userid (r/atom "")
        userid-error (r/atom nil)

        ;; resource
        ui-config (re-frame/subscribe [::subs/ui-config])

        ;; predicate
        userid-check-success? (re-frame/subscribe [::register-subs/userid-check-success?])
        register-success? (re-frame/subscribe [::register-subs/register-success?])
        firebase-auth-state-progress? (re-frame/subscribe [::register-subs/firebase-auth-state-progress?])
        firebase-auth-state-wait-server-response? (re-frame/subscribe [::register-subs/firebase-auth-state-wait-server-response?])]
    (fn []
      (if @firebase-auth-state-wait-server-response?
        [:div.container
         [:p "サインアップ処理中です。しばらくお待ちください..."]
         [:div.my-loader>div.my-loaderBar]]
        [:div.container
         (when-not @register-success?
           [register-failure])
         (if (or @userid-check-success?
                 @firebase-auth-state-progress?)
           [:<>
            [freezed-userid-field]
            [:div>p "Google アカウントを選択してください。"]
            [StyledFirebaseAuth {:ui-config (clj->js (->
                                                      @ui-config
                                                      (assoc
                                                       :callbacks ui-config-callbacks)
                                                      (assoc
                                                       :signInSuccessUrl "/signup")))}]]
           [:<>
            [userid-field userid userid-error]
            [submit-field userid userid-error]])]))))

(def register-content
  {:title "サインアップ"
   :subtitle "ユーザID と Google アカウントを用いてユーザ登録をします。"
   :body register-body})

(def register
  [:div.container.pt-5
   [:div.titles.py-5
    [:p.title (:title register-content)]
    [:p.subtitle.is-6 (:subtitle register-content)]]
   [(:body register-content) ui-config-callbacks]])
