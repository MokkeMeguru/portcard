(ns portcard.services.auth.views
  (:require [reagent.core :as reagent]
            [clojure.spec.alpha :as s]
            [re-frame.core :as re-frame]
            [portcard.services.common.views :refer [email-field password-field]]
            [portcard.domains.users :as users-domain]
            [portcard.services.auth.subs :as auth-subs]
            [portcard.services.auth.events :as auth-events]
            [portcard.services.main.subs :as subs]
            [portcard.services.main.events :as events]
            [reagent.core :as r]))

;; (defn submit-field [email email-error
;;                     password password-error
;;                     submitted]
;;   [:div.field
;;    [:div.control.form
;;     (if true
;;       [:button.button.is-primary
;;        {:on-click
;;         (fn [e]
;;           (.preventDefault e)
;;           (reset! email-error (not (s/valid? ::users-domain/email @email)))
;;           (reset! password-error (not (s/valid? ::users-domain/password @password)))
;;           (when (and (not @email-error)
;;                      (not @password-error))
;;             (print "signined")
;;             (re-frame/dispatch [::auth-events/signin-failed])
;;             (reset! submitted true)))}
;;        "submit"]
;;       [:button.button.is-primary.is-loading "submitting..."])]])

;; (def signin-failure
;;   [:div.notification.is-danger
;;    [:button.delete {:on-click #(re-frame/dispatch [::auth-events/reset-signin-status])}]
;;    [:p "ログイン に失敗しました。メールアドレスかパスワードが異なっています。"]])

;; (defn signin-body []
;;   (let [email (reagent/atom "")
;;         password (reagent/atom "")
;;         email-error (reagent/atom nil)
;;         password-error (reagent/atom nil)
;;         submitted (reagent/atom nil)
;;         signin-success? (re-frame/subscribe [::auth-subs/signin-success?])]
;;     (fn []
;;       [:div.container
;;        (when-not @signin-success?
;;          signin-failure)
;;        [email-field email email-error]
;;        [password-field password password-error]
;;        [submit-field
;;         email email-error
;;         password password-error
;;         submitted]])))
(defonce firebaseUiDeletion (.resolve js/Promise))

(def ui-config-callbacks
  {:signInSuccessWithAuthResult
   (fn [e o]
     (re-frame/dispatch [::auth-events/store-firebase-auth-status "wait-server-response"])
     (re-frame/dispatch [::events/initialize-firebaseui])
     (.onAuthStateChanged
      (.. js/firebase auth)
      (fn [user]
        (if user
          (.then (.getIdToken (.. js/firebase auth -currentUser) true)
                 (fn [id-token]
                   nil))))))})

(defn StyledFirebaseAuth [config]
  (let [ui-config (:ui-config config)
        firebaseUiWidget (re-frame/subscribe [::subs/ui])]
    (r/create-class
     {:display-name "Firebase Authorization"
      :constructor
      (fn [this]
        (println "Called constructor")
        (re-frame/dispatch-sync [::events/initialize-firebaseui]))
      :component-did-mount
      (fn [this]
        (do (re-frame/dispatch [::auth-events/store-firebase-auth-status "auth-progress"])
            (.start @firebaseUiWidget "#firebaseui-container" ui-config))
        ;; (.then
        ;;  firebaseUiDeletion
        ;;  (do (re-frame/dispatch [::auth-events/store-firebase-auth-status "progress"])
        ;;      (.start @firebaseUiWidget "#firebaseui-container" ui-config))
        ;;  )
        )
      :component-will-unmount
      (fn [this]
        (.reset @firebaseUiWidget)
        ;; (set!
        ;;  firebaseUiDeletion
        ;;  (.delete @firebaseUiWidget))
        )
      :reagent-render
      (fn [config]
        [:div#firebaseui-container])})))

(defn signin-body [ui-config-callback]
  (let [ui-config (re-frame/subscribe [::subs/ui-config])
        firebase-auth-state-progress? (re-frame/subscribe [::auth-subs/firebase-auth-state-progress?])
        firebase-auth-state-wait-server-response? (re-frame/subscribe [::auth-subs/firebase-auth-state-wait-server-response?])]
    (fn []
      (if @firebase-auth-state-wait-server-response?
        [:div.container
         [:p "サインイン処理中です。しばらくお待ちください..."]
         [:div.my-loader>div.my-loaderBar]]
        [:<>
         [StyledFirebaseAuth {:ui-config (clj->js
                                          (-> @ui-config
                                              (assoc
                                               :callbacks ui-config-callbacks)
                                              (assoc
                                               :signInSuccessUrl "/signin")))}]]))))

(def signin-content
  {:title "サインイン"
   :subtitle "Google アカウントを用いてサインインします。"
   :body signin-body
   ;;(fn [] [:div.container "body"])
   })

(def signin
  [:div.container.pt-5
   [:div.titles
    [:p.title (:title signin-content)]
    [:p.subtitle.is-6 (:subtitle signin-content)]
    [(:body signin-content) ui-config-callbacks]]])
