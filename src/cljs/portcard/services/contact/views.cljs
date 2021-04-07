(ns portcard.services.contact.views
  (:require
   [portcard.services.common.views :refer [aside-menu]]
   ["react-google-recaptcha" :default ReCAPTCHA]
   [reagent.core :as reagent]
   [re-frame.core :as re-frame]
   [portcard.services.contact.subs :as contact-subs]
   [portcard.services.contact.events :as contact-events]
   [portcard.services.contact.valids :as contact-valids]
   [portcard.services.main.subs :as subs]))

(defn recaptcha-field []
  (let [recaptcha (re-frame/subscribe [::contact-subs/recaptcha])]
    (fn []
      [:div.field.is-horizontal
       [:div.field-label.is-normal
        [:label.label "verfication"]]
       [:div.control.form
        [:> ReCAPTCHA {:sitekey "6Lf1imgaAAAAAIxmO9Co8YcUIK20YxOIlh5brD9d"
                       :on-change #(re-frame/dispatch [::contact-events/recaptcha %])}]]])))

;; (defn category-selector []
;;   (fn []
;;     [:div.field.is-horizontal
;;      [:div.field-label.is-normal
;;       [:label.label "カテゴリ"]]
;;      [:div.field-body>div.field
;;       [:div.control
;;        [:div.select {:style {:width "100%"}}
;;         [:select {:style {:width "100%"}}
;;          [:option "--------"]
;;          [:option "ご依頼"]
;;          [:option "勧誘"]
;;          [:option "その他のお問い合わせ"]]]]]]))

(defn title-field []
  (let [title (re-frame/subscribe [::contact-subs/title])]
    (fn []
      [:div.field.is-horizontal
       [:div.field-label.is-normal
        [:label.label "件名"]]
       [:div.field-body>div.field
        [:p.control
         [:input.input
          {:type "text"
           :placeholder "件名"
           :value @title
           :on-change #(re-frame/dispatch-sync [::contact-events/title (-> % .-target .-value)])}]]
        (when-let [error-message (contact-valids/title-is-valid?   @title)]
          [:p.help.is-danger error-message])]])))

(defn contact-field [title]
  (let [from (re-frame/subscribe [::contact-subs/from])]
    (fn []
      [:div.field.is-horizontal
       [:div.field-label.is-normal
        [:label.label title]]
       [:div.field-body>div.field
        [:p.control
         [:input.input
          {:type "text"
           :placeholder "somename@somehost.com"
           :value @from
           :on-change #(re-frame/dispatch-sync [::contact-events/from (-> % .-target .-value)])}]]
        (when-let [error-message (contact-valids/from-is-valid? @from)]
          [:p.help.is-danger error-message])]])))

(defn detail-form []
  (let [body-text (re-frame/subscribe [::contact-subs/body-text])]
    (fn []
      [:div.field
       [:div.field-label.is-normal
        [:label.label "内容"]]
       [:div.field-body>div.field
        [:div.control
         [:textarea.textarea
          {:type "textarea"
           :placeholder "詳細の内容を記述ください (1024字以内)"
           :value @body-text
           :on-change #(re-frame/dispatch-sync [::contact-events/body-text (-> % .-target .-value)])}]
         (when-let [error-message (contact-valids/body-text-is-valid? @body-text)]
           [:p.help.is-danger error-message])]]])))

(defn name-field []
  (let [from-name (re-frame/subscribe [::contact-subs/from-name])]
    (fn []
      [:div.field.is-horizontal
       [:div.field-label.is-normal
        [:label.label "名前"]]
       [:div.field-body>div.field
        [:p.control
         [:input.input
          {:type "text"
           :placeholder "名前"
           :value @from-name
           :on-change #(re-frame/dispatch-sync [::contact-events/from-name (-> % .-target .-value)])}]]
        (when-let [error-message (contact-valids/from-name-is-valid? @from-name)]
          [:p.help.is-danger error-message])]])))

(defn submit-form []
  (let [payload (re-frame/subscribe [::contact-subs/contact])]
    [:div.field
     ;; [:code (pr-str @payload)]
     [:div.control.form
      [:button.button.card-button
       {:disabled (-> (contact-valids/form-is-submittable? @payload) empty? not)
        :on-click #(re-frame/dispatch [::contact-events/post-contact])}
       "送信"]]]))

(defn contact-form []
  (fn []
    [:div.form.topics-title
     ;; [category-selector]
     [title-field]
     [name-field]
     [contact-field "連絡先 (メールアドレス)"]
     [detail-form]
     [recaptcha-field]
     [submit-form]]))

(defn contact-title []
  (let [current-route (re-frame/subscribe [::subs/current-route])]
    (fn []
      [:span "Contact for " [:a {:style {:text-decoration "underline"}} (-> @current-route :path-params :user-id)]])))

(def contact-content
  {:title contact-title
   :subtitle [:span
              "ユーザへのお問い合わせ口です。メッセージはお互いのメールへ送信されます。"
              [:br]
              " なお、連続したお問い合わせはできない点をご了承ください。"]})

(def contact
  [:div.container.pt-5 {:style {:width "720px"}}
   ;; [aside-menu]
   [:div.titles
    [:p.title   [(:title contact-content)]]
    [:p.subtitle.is-6 (:subtitle contact-content)]
    [contact-form]]])
