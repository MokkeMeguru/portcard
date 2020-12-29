(ns portcard.services.account-settings.views
  (:require [reagent.core :as r]
            [portcard.domains.users :as users-domain]
            [goog.string :as gstring]
            [re-frame.core :as re-frame]
            [portcard.domains.roles :as roles-domain]
            [portcard.services.account-settings.events :as account-settings-events]
            [portcard.services.account-settings.subs :as account-settings-subs]
            [clojure.spec.alpha :as s]
            [reitit.frontend.easy :as rfe]
            [portcard.domains.routes :as routes-domain]))

(defn email-field []
  (let [email-error (r/atom nil)
        email (re-frame/subscribe [::account-settings-subs/email])]
    [:div.field
     [:label "メールアドレス (任意)"]
     [:div.control.has-icons-left
      [:input.input {:type "email" :placeholder "address@xxx.xxx"
                     :class (if @email-error "is-danger" "is-success")
                     :value @email
                     :on-change (fn [e]
                                  (let [new-email (.. e -target -value)]
                                    (re-frame/dispatch-sync [::account-settings-events/email new-email])
                                    (reset! email-error (not (s/valid? ::users-domain/email new-email)))))}]
      [:span.icon.is-left
       [:i.fas.fa-envelope.fa-xs]]]]))

(defn twitter-field []
  (let [twitter-error (r/atom nil)
        twitter (re-frame/subscribe [::account-settings-subs/twitter])]
    [:div.field
     [:label "Twitter (任意)"]

     [:div.control.has-icons-left
      [:input.input {:type "text" :placeholder "xxx"
                     :value @twitter
                     :class (if @twitter-error "is-danger" "is-success")
                     :on-change (fn [e]
                                  (let [new-twitter (.. e -target -value)]
                                    (re-frame/dispatch-sync [::account-settings-events/twitter new-twitter])
                                    (reset! twitter-error (not (s/valid? ::users-domain/twitter new-twitter)))))}]
      [:span.icon.is-left
       [:i.fab.fa-twitter]]]]))

(defn facebook-field []
  (let [facebook-error (r/atom nil)
        facebook (re-frame/subscribe [::account-settings-subs/facebook])]
    [:div.field
     [:label "facebook (任意)"]

     [:div.control.has-icons-left
      [:input.input {:type "text" :placeholder "xxx"
                     :value @facebook
                     :class (if @facebook-error "is-danger" "is-success")
                     :on-change (fn [e]
                                  (let [new-facebook (.. e -target -value)]
                                    (re-frame/dispatch-sync [::account-settings-events/facebook new-facebook])
                                    (reset! facebook-error (not (s/valid? ::users-domain/facebook new-facebook)))))}]
      [:span.icon.is-left
       [:i.fab.fa-facebook]]]]))

(defn display-name-field []
  (let [display-name-error (r/atom nil)
        display-name (re-frame/subscribe [::account-settings-subs/display-name])]
    (fn []
      [:div.field
       [:label "ユーザ名 (表示名)"]
       [:div.control.has-icons-left
        [:input.input {:type "text" :placeholder "ユーザ名 (ひらがな/漢字可)"
                       :class (if @display-name-error "is-danger" "is-success")
                       :on-change (fn [e]
                                    (let [new-display-name (.. e -target -value)]
                                      (re-frame/dispatch-sync [::account-settings-events/display-name new-display-name])
                                      (reset! display-name-error (not (s/valid? ::users-domain/username new-display-name)))))
                       :value @display-name}]
        [:span.icon.is-small.is-left [:i.fas.fa-user]]
        (when @display-name-error
          [:p.help.is-danger "ユーザ名 は ひらがな / 漢字 / 英数字 で" users-domain/username-min-length " ~ " users-domain/username-max-length "文字を指定できます。"])]])))

(defn link-field []
  (let []
    (fn []
      [:div.form
       [:div.control
        [:input.input {:type "text" :placeholder "リンク先 (Github)"
                       :class "is-success"}]]
       [:div.control.has-icons-left
        [:input.input {:type "text" :placeholder "https://xxx.xxx (任意)"
                       :class "is-success"}]
        [:span.icon.is-small.is-left [:i.fas.fa-link]]]])))

(defn links-field []
  [:div.control
   [link-field]])

(defn category-field [index]
  [:div.control
   [:div.select {:class "is-danger"}
    [:select
     (map (fn [category] [:option (roles-domain/decode-role-categories category)]) roles-domain/role-cetegories)]]])

(defn display-name-settings []
  (fn []
    [display-name-field]))

(defn contact-settings [contact]
  (let [email (r/atom "")
        email-error (r/atom nil)
        twitter (r/atom "")
        twitter-error (r/atom nil)
        facebook (r/atom "")
        facebook-error (r/atom nil)]
    (fn []
      [:<>
       [:div>p.subtitle.pb-3 "連絡先"]
       [email-field]
       [twitter-field]
       [facebook-field]])))

(defn role [[index x]]
  (fn []
    [:<>
     [:div.level.is-mobile
      [:div.level-left [:span.pr-5 "所属カテゴリ " (gstring/format "(%d)"  (inc index))]]
      (when-not (zero? index)
        [:div.lebel-right
         [:span.icon.is-small
          {:on-click (fn [e]
                       (re-frame/dispatch [::account-settings-events/remove-role]))}
          [:i.fas.fa-fw.fa-trash]]])]
     [:div.field
      [:label "カテゴリ"]
      [category-field index]]
     [:div.field
      [:label "リンク"]
      [links-field]]]))

(defn roles-settings [roles]
  (fn []
    [:<>
     [:div [:p.subtitle.pb-3 "カテゴリ"]]
     [:div (map (fn [role-item] [role role-item]) (map-indexed vector (if (zero? (count @roles)) [{}] @roles)))]
    ;; (when (< (count @roles) 3)
    ;;   [:div.pt-5
    ;;    [:button.card-button.button
    ;;     {:on-click #(re-frame/dispatch [::account-settings-events/append-role])} "カテゴリを追加"]])
     ]))

(defn submit-field []
  (fn []
    [:div.field
     [:div.control.form
      [:button.button.is-primary
       {:on-click
        (fn [e]
          (.preventDefault e)
          (.then
           (.getIdToken (.. js/firebase auth -currentUser) true)
           (fn [id-token]
             (re-frame/dispatch [::account-settings-events/update-profile {:id-token id-token}]))))}
       "更新"]]]))

(defn account-settings-body []
  (let [roles (re-frame/subscribe [::account-settings-subs/roles])
        contact (r/atom {:email nil :twitter nil :facebook nil})
        display-name (re-frame/subscribe [::account-settings-subs/display-name])
        own-profile-loaded? (re-frame/subscribe [::account-settings-subs/own-profile-loaded?])]
    (fn []
      (if @own-profile-loaded?
        [:div.container
         [:p.subtitle "アカウント情報を読み込み中です。しばらくお待ちください。"]
         [:button.button.card-button
          {:on-click #(re-frame/dispatch-sync [::account-settings-events/load-profile])}
          "再読込み"]]
        [:<>
         [:<>
          [:button.button.card-button
           {:on-click #(re-frame/dispatch-sync [::account-settings-events/restore-own-profile])} "以前の設定の読み込み"]
          [:button.button.card-button
           {:on-click #(do (rfe/push-state ::routes-domain/icon-settings)
                           (rfe/replace-state ::routes-domain/icon-settings))}
           "アイコンの設定"]]
         [:hr]
         [display-name-settings display-name]
         [:hr]
         [contact-settings contact]
         [:hr]
         ;; [roles-settings roles]
         [submit-field]]))))

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
