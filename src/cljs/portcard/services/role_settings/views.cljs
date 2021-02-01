(ns portcard.services.role-settings.views
  (:require [portcard.domains.roles :as roles-domain]
            [re-frame.core :as re-frame]
            [portcard.services.account-settings.subs :as account-settings-subs]
            [portcard.domains.routes :as routes-domain]
            [reitit.frontend.easy :as rfe]
            [portcard.services.account-settings.events :as account-settings-events]
            [portcard.services.role-settings.subs :as role-settings-subs]
            [portcard.services.role-settings.events :as role-settings-events]
            [portcard.services.role-settings.valids :as role-settings-valids]
            [reagent.core :as r]
            [goog.string :as gstring]
            [clojure.spec.alpha :as s]))

(defn role-category [category-key category-value]
  [:option {:key category-key :value category-key} category-value])

(defn role-selector [idx]
  (let [category (re-frame/subscribe [::role-settings-subs/role-category idx])
        roles (re-frame/subscribe [::role-settings-subs/roles])]
    (fn []
      [:div.field
       [:label "カテゴリ"]
       [:div.control
        [:span.select
         [:select
          {:on-change #(re-frame/dispatch [::role-settings-events/role-category idx  (keyword (-> % .-target .-value))])
           :value (if @category (name @category) "---")}
          [:option {:value "---"} "---"]
          [:<>
           (doall
            (map (fn [[category-key category-value]]
                   ^{:key category-key}
                   [role-category category-key category-value])
                 roles-domain/role-categories))]]]
        (when-let [error-message (role-settings-valids/role-category-is-valid? @category)]
          [:p.help.is-danger error-message])
        (when-let [error-message (role-settings-valids/roles-are-unique? @roles)]
          [:p.help.is-danger error-message])]])))

(defn role-link [idx link-idx]
  (let [role-link-name (re-frame/subscribe [::role-settings-subs/role-link-name idx link-idx])
        role-link-url (re-frame/subscribe [::role-settings-subs/role-link-url idx link-idx])]
    (fn []
      [:div.field
       [:div.field.is-grounded.is-horizontal
        [:div.field-body
         [:div.field
          {:style {:flex-basis "40%"}}
          [:p.control.is-narrow
           [:input
            {:type "text" :placeholder "リンク先 (e.g. Github)"
             :value @role-link-name
             :on-change #(re-frame/dispatch [::role-settings-events/role-link-name idx link-idx (-> % .-target .-value)])
             :class (if false "input is-danger" "input")}]]
          (when-let [error-message (role-settings-valids/link-category-name-is-valid? @role-link-name)]
            [:p.help.is-danger error-message])]
         [:div.field
          {:style {:flex-basis "60%"}}
          [:p.control.is-expanded
           [:input.input
            {:type "text" :placeholder "https://somelink.com"
             :value @role-link-url
             :on-change #(re-frame/dispatch [::role-settings-events/role-link-url idx link-idx (-> % .-target .-value)])
             :class (if false "input is-danger" "input")}]]
          (when-let [error-message (role-settings-valids/link-url-is-valid? @role-link-url)]
            [:p.help.is-danger error-message])]]

        [:p.control
         [:a.button.card-button
          {:on-click #(re-frame/dispatch [::role-settings-events/remove-role-link idx link-idx])}
          [:i.fa.fa-trash]]]]])))

(defn role-links [idx]
  (let [role-links-count (re-frame/subscribe [::role-settings-subs/role-links-count idx])]
    (fn []
      [:div.control
       [:label "リンクリスト"]
       (->> (range (max 1 @role-links-count))
            (map (fn [i]
                   ^{:key (gstring/format "%d-%d" idx i)}
                   [role-link idx i])))
       (if (< @role-links-count 3)
         [:a.button.is-info
          {:on-click #(re-frame/dispatch [::role-settings-events/role-link idx @role-links-count {}])}
          "リンクを追加"])])))

(defn role-field [idx]
  [:div.field
   [:div>p.subtitle.pb-3 "趣味 / 職業: " idx
    [:a.button.is-info
     {:style {:float "right"}
      :on-click #(re-frame/dispatch [::role-settings-events/remove-role idx])}
     [:i.fa.fa-trash]]]
   [role-selector idx]
   [role-links idx]
   [:hr]])

(defn roles-field []
  (let [roles-count (re-frame/subscribe [::role-settings-subs/roles-count])]
    (fn []
      [:<>
       [:div.field
        (->> (range (max 1 @roles-count))
             (map (fn [idx]
                    ^{:key (gstring/format "%d" idx)}
                    [role-field idx])))]

       [:button.button.card-button
        {:on-click #(re-frame/dispatch [::role-settings-events/role @roles-count {:role-links []}])}
        "趣味 / 職業を追加"]])))

(defn submit-field []
  (let [payload-roles (re-frame/subscribe [::role-settings-subs/payload-roles])
        display-name (re-frame/subscribe [::role-settings-subs/display-name])]
    (fn []
      [:div.field>div.control.form
       [:button.button.card-button
        {:disabled (-> (role-settings-valids/form-is-submittable? @payload-roles) empty? not)
         :on-click
         (fn [e]
           (.preventDefault e)
           (.then
            (.getIdToken (.. js/firebase auth -currentUser) true)
            (fn [id-token]
              (re-frame/dispatch [::role-settings-events/update-profile {:id-token id-token :payload @payload-roles :display-name @display-name}]))))}

        "更新"]
       (when-let [error-message (role-settings-valids/form-is-submittable? @payload-roles)]
         [:p.help.is-danger error-message])])))

(def reload-account-settings-body
  [:div.container
   [:p.subtitle "アカウント情報を読み込み中です。しばらくお待ちください。"]
   [:button.button.card-button
    {:on-click #(re-frame/dispatch-sync [::account-settings-events/load-profile])}
    "再読込み"]])

(defn role-settings-body []
  (let [own-profile-loaded? (re-frame/subscribe [::account-settings-subs/own-profile-loaded?])
        roles (re-frame/subscribe [::role-settings-subs/roles])
        roles-count  (re-frame/subscribe [::role-settings-subs/roles-count])]
    (fn []
      (if-not @own-profile-loaded?
        reload-account-settings-body
        [:div.container
         [:button.button.card-button
          {:on-click #(re-frame/dispatch-sync [::account-settings-events/restore-own-profile])}
          "以前の設定の読み込み"]
         [:hr]
         [roles-field]
         [:hr]
         [submit-field]]))))

(def role-settings-content
  {:title "趣味 / 職業の設定"
   :subtitle "趣味 / 職業を示す, Pixiv, Github などのリンクを結びつける設定をします。"
   :body role-settings-body})

(def role-settings
  [:div.container.pt-5
   [:div.titles
    [:p.title (:title role-settings-content)]
    [:p.subtitle (:subtitle role-settings-content)]
    [(:body role-settings-content)]]])
