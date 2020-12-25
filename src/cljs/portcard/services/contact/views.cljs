(ns portcard.services.contact.views
  (:require
   [portcard.services.common.views :refer [aside-menu name-field]]
   ["react-google-recaptcha" :default ReCAPTCHA]
   [reagent.core :as reagent]))

(defn recaptcha-field []
  (let [captured (reagent/atom nil)]
    [:div.field.is-horizontal
     [:div.field-label.is-normal
      [:label.label "verfication"]]
     [:div.control.form
      [:> ReCAPTCHA {:sitekey "6LeiG9sZAAAAAA9hS-VeHc6XyXvkzmJ_MO3Wwr6f"
                     :on-change #(reset! captured %)}]]]))

(defn category-selector [category category-error]
  (fn []
    [:div.field.is-horizontal
     [:div.field-label.is-normal
      [:label.label "カテゴリ"]]
     [:div.field-body>div.field
      [:div.control
       [:div.select {:style {:width "100%"}}
        [:select {:style {:width "100%"}}
         [:option "--------"]
         [:option "ご依頼"]
         [:option "勧誘"]
         [:option "その他のお問い合わせ"]]]]]]))

(defn contact-field [contact contact-error title]
  [:div.field.is-horizontal
   [:div.field-label.is-normal
    [:label.label title]]
   [:div.field-body>div.field
    [:p.control
     [:input.input {:type "text"}]]]])

(defn detail-form [detail detail-error]
  [:div.field
   [:div.field-label.is-normal
    [:label.label "内容"]]
   [:div.field-body>div.field
    [:div.control
     [:textarea.textarea {:placeholder "詳細の内容を記述ください (1024字以内)"}]]]])

(defn contact-form []
  (fn []
    [:div.topics-topic>div.form.topics-title
     [category-selector nil nil]
     [name-field nil nil]
     [contact-field nil nil "連絡先1"]
     [contact-field nil nil "連絡先2 (optional)"]
     [detail-form nil nil]
     [recaptcha-field]]))

(defn contact-title []
  [:div.topics-title
   [:h1.title "Contact for " [:a {:style {:text-decoration "underline"}} "MeguruMokke"]]])

(def contact
  [:<>
   [aside-menu]
   [contact-title]
   [contact-form]
   [:div.topics-topic]])
