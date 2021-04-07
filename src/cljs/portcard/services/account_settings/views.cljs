(ns portcard.services.account-settings.views
  (:require [reagent.core :as r]
            [portcard.domains.users :as users-domain]
            [goog.string :as gstring]
            [re-frame.core :as re-frame]
            [portcard.domains.roles :as roles-domain]
            [portcard.services.account-settings.events :as account-settings-events]
            [portcard.services.account-settings.subs :as account-settings-subs]
            [portcard.services.account-settings.valids :as account-settings-valids]
            [clojure.spec.alpha :as s]
            [reitit.frontend.easy :as rfe]
            [portcard.domains.routes :as routes-domain]))

(defn display-name-field []
  (let [display-name (re-frame/subscribe [::account-settings-subs/display-name])]
    (fn []
      [:div.field
       [:label "ユーザ名 (表示名)"]
       [:div.control.has-icons-left
        [:input
         {:type "text" :placeholder "ユーザ名 (ひらがな / 漢字 可)"
          :class (if (account-settings-valids/display-name-is-valid? @display-name) "input is-danger" "input")
          :value @display-name
          :on-change #(re-frame/dispatch-sync [::account-settings-events/display-name (-> % .-target .-value)])}]
        [:span.icon.is-small.is-left [:i.fas.fa-user]]
        (when-let [error-message (account-settings-valids/display-name-is-valid? @display-name)]
          [:p.help.is-danger error-message])]])))

(defn display-name-settings []
  (fn []
    [:<>
     [display-name-field]]))

(defn email-field []
  (let [email (re-frame/subscribe [::account-settings-subs/email])]
    (fn []
      [:div.field
       [:label "メールアドレス (任意)"]
       [:div.control.has-icons-left
        [:input
         {:type "text" :placeholder "address@xxx.com"
          :class (if (account-settings-valids/email-is-valid? @email) "input is-danger" "input")
          :value @email
          :on-change #(re-frame/dispatch-sync [::account-settings-events/email (-> % .-target .-value)])}]
        [:span.icon.is-left [:i.fas.fa-envelope.fa-xs]]
        (when-let [error-message (account-settings-valids/email-is-valid? @email)]
          [:p.help.is-danger error-message])]])))

(defn twitter-field []
  (let [twitter (re-frame/subscribe [::account-settings-subs/twitter])]
    (fn []
      [:div.field
       [:label "Twitter (任意)"]
       [:div.control.has-icons-left
        [:input
         {:type "text" :placeholder "@xxxxx"
          :class (if (account-settings-valids/twitter-is-valid? @twitter) "input is-danger" "input")
          :value @twitter
          :on-change #(re-frame/dispatch-sync [::account-settings-events/twitter (-> % .-target .-value)])}]

        [:span.icon.is-left [:i.fab.fa-twitter]]
        (when-let [error-message (account-settings-valids/twitter-is-valid? @twitter)]
          [:p.help.is-danger error-message])]])))

(defn facebook-field []
  (let [facebook (re-frame/subscribe [::account-settings-subs/facebook])]
    (fn []
      [:div.field
       [:label "facebook (任意)"]
       [:div.control.has-icons-left
        [:input
         {:type "text" :placeholder "xxxxx"
          :class (if (account-settings-valids/facebook-is-valid? @facebook) "input is-danger" "input")
          :value @facebook
          :on-change #(re-frame/dispatch-sync [::account-settings-events/facebook (-> % .-target .-value)])}]
        [:span.icon.is-left [:i.fab.fa-facebook]]
        (when-let [error-message (account-settings-valids/facebook-is-valid? @facebook)]
          [:p.help.is-danger error-message])]])))

(defn contact-settings []
  (fn []
    [:<>
     [:div>p.subtitle.pb-3 "連絡先"]
     [email-field]
     [twitter-field]
     [facebook-field]]))

(defn submit-field []
  (let [payload-form (re-frame/subscribe [::account-settings-subs/payload-form])]
    (fn []
      [:div.field>div.control.form
       [:button.button.card-button
        {:disabled (-> (account-settings-valids/form-is-submittable? @payload-form) empty? not)
         :on-click
         (fn [e]
           (.preventDefault e)
           (.then
            (.getIdToken (.. js/firebase auth -currentUser) true)
            (fn [id-token]
              (re-frame/dispatch [::account-settings-events/update-profile {:id-token id-token :payload @payload-form}]))))}
        "更新"]
       (when-let [error-message (account-settings-valids/form-is-submittable? @payload-form)]
         [:p.help.is-danger error-message])])))

(def reload-account-settings-body
  [:div.container
   [:p.subtitle "アカウント情報を読み込み中です。しばらくお待ちください。"]
   [:button.button.card-button
    {:on-click #(re-frame/dispatch-sync [::account-settings-events/load-profile])}
    "再読込み"]])

(def main-account-settings-body
  [:<>
   [:<>
    [:button.button.card-button
     {:on-click #(re-frame/dispatch-sync [::account-settings-events/restore-own-profile])}
     "以前の設定の読み込み"]
    [:button.button.card-button
     {:on-click #(do (rfe/push-state ::routes-domain/icon-settings)
                     (rfe/replace-state ::routes-domain/icon-settings))}
     "アイコンの設定"]
    [:button.button.card-button
     {:on-click #(do (rfe/push-state ::routes-domain/role-settings)
                     (rfe/replace-state ::routes-domain/role-settings))}

     "趣味 / 職業の設定"]]
   [:hr]
   [display-name-settings]
   [:hr]
   [contact-settings]
   [:hr]
   [submit-field]])

(defn account-settings-body []
  (let [own-profile-loaded? (re-frame/subscribe [::account-settings-subs/own-profile-loaded?])]
    (fn []
      (if-not @own-profile-loaded?
        reload-account-settings-body
        main-account-settings-body))))

(def account-settings-content
  {:title "アカウントの設定"
   :subtitle "連絡先などのアカウントの設定をします。"
   :body account-settings-body})

(def account-settings
  [:div.container.pt-5
   [:div.titles
    [:p.title (:title account-settings-content)]
    [:p.subtitle.is-6 (:subtitle account-settings-content)]
    [(:body account-settings-content)]]])
