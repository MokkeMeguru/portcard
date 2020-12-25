(ns portcard.services.common.views
  (:require [re-frame.core :as re-frame]))

(defn email-field [email email-error]
  [:div.field
   [:label "メールアドレス"]
   [:div.control.has-icons-left
    [:input.input {:type "email" :placeholder "メールアドレス"
                   :class (if @email-error "is-danger" "is-success")
                   :on-change (fn [e]
                                (reset! email (.. e -target -value)))}]
    [:span.icon.is-samll.is-left [:i.fas.fa-envelope]]]])

(defn password-field [password password-error]
  [:div.field
   [:label "パスワード"]
   [:div.control.has-icons-left.has-icons-right
    [:input.input {:type "password" :placeholder "パスワード"
                   :class (if @password-error "is-danger" "is-success")
                   :on-change (fn [e]
                                (reset! password (.. e -target -value)))}]
    [:span.icon.is-samll.is-left [:i.fas.fa-lock]]]])

(defn username-field [username username-error]
  [:div.field
   [:label "ユーザ名"]
   [:div.control.has-icons-left.has-icons-right
    [:input.input {:type "text" :placeholder "ユーザ名"
                   :class (if @username-error "is-danger" "is-success")
                   :on-change (fn [e]
                                (reset! username (.. e -target -value)))}]
    [:span.icon.is-samll.is-left [:i.fas.fa-user]]]])

(defn userid-field [userid userid-error]
  [:div.field
   [:label "ユーザID"]
   [:div.control.has-icons-left.has-icons-right
    [:input.input {:type "text" :placeholder "ユーザID"
                   :class (if @userid-error "is-danger" "is-success")
                   :on-change (fn [e]
                                (reset! userid (.. e -target -value)))}]
    [:span.icon.is-samll.is-left [:i.fas.fa-user]]]])

(defn name-field [name name-error]
  [:div.field.is-horizontal
   [:div.field-label.is-normal
    [:label.label "名前"]]
   [:div.field-body>div.field
    [:p.control
     [:input.input {:type "text"}]]]])

;;; app dependency

(defn aside-menu []
  (fn []
    [:aside.fixed-aside
     [:div.is-left>ul.rows
      [:li [:div [:a {:href "/#/"} [:img {:src "/img/home-icon.svg"}]]]]
      [:li [:div [:img {:src "/img/user-icon.svg" :title "View User"}]]]
      [:li [:div [:img {:src "/img/topics-icon.svg" :title "View Topics"}]]]
      [:li [:div [:img {:src "/img/contact-icon.svg" :title "Contact"}]]]]]))
