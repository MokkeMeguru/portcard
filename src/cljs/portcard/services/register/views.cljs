(ns portcard.services.register.views
  (:require [clojure.spec.alpha :as s]
            [reagent.core :as r]
            [reagent.dom :as dom]
            [portcard.domains.users :as users-domain]
            ;; [portcard.services.common.views :as common-views
            ;;  :refer [email-field password-field username-field userid-field]]
            [portcard.services.register.subs :as register-subs]
            [portcard.services.register.events :as register-events]
            [portcard.domains.firebase :refer [providers]]

            [reagent.core :as reagent]
            [re-frame.core :as re-frame]
            [portcard.subs :as subs]
            [portcard.events :as events]))

(defn submit-field [userid userid-error
                    userid-check]
  [:div.field
   [:div.control.form
    (cond
      (= :pending @userid-check) [:button.button.is-primary.is-loading "チェック中 ..."]
      :else
      [:button.button.is-primary
       {:on-click
        (fn [e]
          (.preventDefault e)
          (reset! userid-error (not (s/valid? ::users-domain/userid @userid)))
          (when (and
                 (not @userid-error))
            (re-frame/dispatch [::register-events/register-failed])
            (re-frame/dispatch [::register-events/userid-check @userid])))}
       "ユーザ ID の チェック"])]])

(defn register-failure []
  (let
   [error-message (re-frame/subscribe [::register-subs/error-message])]
    [:div.notification.is-danger
     [:button.delete {:on-click #(re-frame/dispatch [::register-events/reset-register-status])}]
     [:p @error-message]]))

;; duplicate user
(def ui-config-callback
  {:callbacks
   {:signInSuccessWithAuthResult
    (fn [e]
      (print "Success!" e)
      (.log js/console (.. js/firebase auth -currentUser -displayName))
      (-> (.getIdToken (.. js/firebase auth -currentUser) true)
          (.then (fn [id-token]
                   (.log js/console id-token)))
          (.catch (fn [err] (.log js/console err))))

      (print "success!")
      (set! (.. js/document -cookie) "firebase-auth=pass"))}})

(defn StyledFirebaseAuth [config]
  (let [ui-config (:ui-config config)
        _ (print ui-config)
        firebaseUiWidget (re-frame/subscribe [::subs/ui])]
    (r/create-class
     {:display-name "Register with Firebase Config"
      :component-did-mount
      (fn [this]
        (.start @firebaseUiWidget "#firebaseui-container" ui-config))
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
    [:span.icon.is-samll.is-left [:i.fas.fa-user]]]])

(defn register-body []
  (let [userid (reagent/atom "")
        userid-error (reagent/atom nil)
        userid-check (re-frame/subscribe [::register-subs/userid-check])
        submitted (reagent/atom nil)
        register-success? (re-frame/subscribe [::register-subs/register-success?])
        checked-uname (re-frame/subscribe [::register-subs/checked-uname])
        ui-config (re-frame/subscribe [::subs/ui-config])]
    (fn []
      [:div.container
       (when-not @register-success?
         [register-failure])
       ;; [username-field username username-error]
       (if (= :success @userid-check)

         [:div.field
          [:label "ユーザ名"]
          [:div.field.has-addons
           [:div.control.has-icons-left.has-icons-right
            [:input.input {:type "text" :disabled true :value @checked-uname}]
            [:span.icon.is-samll.is-left [:i.fas.fa-user]]]
           [:div.control
            [:a.button.is-info
             {:on-click #(re-frame/dispatch [::register-events/reset-register-status])}
             "reset"]]]]
         [:<>
          [userid-field userid userid-error]
          ;; [email-field email email-error]
          ;; [password-field password password-error]

          [submit-field
           userid userid-error
           userid-check]])

       (if (= @userid-check :success)
         [:<> [:div [:p "Google アカウントを選択してください。"]]
          [StyledFirebaseAuth {:ui-config (clj->js (merge @ui-config ui-config-callback))}]])])))

(def register-content
  {:title "サインアップ"
   :subtitle "ユーザID と Google アカウントを用いてユーザ登録をします。"
   :body register-body})

(def register
  [:div.container.pt-5
   [:div.titles
    [:p.title (:title register-content)]
    [:p.subtitle.is-6 (:subtitle register-content)]
    [(:body register-content)]]])
