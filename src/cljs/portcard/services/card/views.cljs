(ns portcard.services.card.views
  (:require
   [reagent.core :as reagent]
   [portcard.utils.views :refer [toggle-class]]
   [portcard.services.common.views :refer [aside-menu]]
   [portcard.services.topics.views :refer [topic]]
   [reagent.core :as r]
   [re-frame.core :as re-frame]
   [reitit.frontend.easy :as rfe]
   [portcard.domains.routes :as routes-domain]
   [portcard.services.card.events :as card-events]
   [portcard.services.card.subs :as card-subs]
   [portcard.domains.roles :as roles-domain]
   [portcard.services.topics.subs :as topics-subs]))

(defn contact-target [icon-src target-display target-link]
  [:li
   [:img.icon-twitter {:src icon-src}]
   [:a.is-light {:href target-link
                 :data "hello"} target-display]])

(defn card-content-top []
  (let [name (re-frame/subscribe [::card-subs/display-name])

        email (re-frame/subscribe [::card-subs/email])
        email-link (re-frame/subscribe [::card-subs/email-link])

        twitter (re-frame/subscribe [::card-subs/twitter])
        twitter-link (re-frame/subscribe [::card-subs/twitter-link])

        facebook (re-frame/subscribe [::card-subs/facebook])
        facebook-link (re-frame/subscribe [::card-subs/facebook-link])
        icon (re-frame/subscribe [::card-subs/profile-icon])]
    (fn []
      [:div.columns.mx-3
       [:div.column.is-4

        [:img.card-icon {:src @icon}]]
       [:div.column.is-8
        [:div.container.has-text-left
         [:h1 {:style {:font-family "Roboto"
                       :font-weight "500"
                       :line-hegiht "64px"}} @name]
         [:ul.px-5.contact-list
          (when @email
            (contact-target "/img/email-icon.svg" @email @email-link))
          (when @twitter
            (contact-target "/img/twitter-icon.svg" @twitter @twitter-link))
          (when @facebook
            (contact-target "/img/facebook-icon.svg" @facebook @facebook-link))]]]])))

(defn card-modal-toggle [_]
  (toggle-class "card-modal" "is-active"))

(defn role-links [links]
  [:div [:ul (doall (map (fn [link] [:li {:key (:link-category-name link)}
                                     [:p [:span (:link-category-name link)]
                                      [:a.px-3 {:style {:text-decoration "underline"}
                                                :href (:link-url link)} (:link-url link)]]])
                         links))]])

(defn role-categories []
  (let [roles (re-frame/subscribe [::card-subs/roles])
        active-role-index (re-frame/subscribe [::card-subs/active-role-index])]
    (fn []
      [:div.columns.hobby-attribute
       (doall
        (map (fn [role]
               [:div.column {:key (:role-category role)
                             :on-click (fn [e] (re-frame/dispatch [::card-events/active-role-index (:primary-rank role)]))}
                [:div {:style {:margin "auto"
                               :background-color (if (= (:primary-rank role) @active-role-index)
                                                   "#D58B50" "#AB593C")
                               :border-radius "50%" :width "72px" :height "72px"}}
                 [:img {:src (roles-domain/imagine-role-categories (:role-category role))
                        :style {:padding-top "12.5px"}}]]])

             @roles))])))

(defn card-content-bottom []
  (let [active-role-links (re-frame/subscribe [::card-subs/active-role-links])]
    (fn []
      [:<>
       [:div.columns {:style {:justify-content "flex-end"}}
        [:div.column.is-8>div.container
         ;; todo
         [role-categories]]]
       [:div.container
        [:div.columns {:style {:justify-content "flex-end"
                               :margin "1.5rem 0"}}
         [:div.column.is-8>div.cotnainer
          [:div.columns {:style {:right "20px" :justify-content "center"}}
           (role-links @active-role-links)]]]]])))

(defn card-body [modal-button?]
  [:div#card-body.column>div#child
   (if modal-button?
     [:div.has-text-right>button.button.is-ghost
      {:on-click card-modal-toggle} [:i.fa.fa-expand]]
     [:span {:style {:height "40px"}} [:p "\u00A0"]])
   [card-content-top]
   [card-content-bottom]])

(defn card-contact []
  (let [my-profile? (re-frame/subscribe [::card-subs/my-profile?])
        user-name (re-frame/subscribe [::card-subs/current-profile-uname])]
    (fn []
      [:div#card-contact.column
       [:div.container
        [:div.columns.has-text-right {:style {:justify-content "flex-end"}}
         (if @my-profile?
           [:<>
            [:div.column {:style {:flex-grow 0}}
             [:button.button.card-button
              {:on-click (fn [e]
                           (rfe/push-state ::routes-domain/account-settings)
                           (rfe/replace-state ::routes-domain/account-settings))} [:i.fas.fa-wrench] [:span "プロフィール設定"]]]
            [:div.column {:style {:flex-grow 0}}
             [:button.button.card-button
              {:on-click (fn [e]
                           (rfe/push-state ::routes-domain/new-topic)
                           (rfe/replace-state ::routes-domain/new-topic))} [:i.fas.fa-arrow-right] [:span "トピックの投稿"]]]]
           [:<>
            [:div.column.is-1 [:button.card-button.button {:disabled true} [:img {:src "/img/user-add-icon.svg" :title "follow"}]]]
            [:div.column.is-2
             [:a.button.card-button
              {:href (rfe/href ::routes-domain/user-contact {:user-id @user-name})}
              [:i.fas.fa-arrow-right] [:span "contact"]]]])]]
       [:hr {:style {:height "0.2em"
                     :background-color "rgba(58, 47, 51, 0.20)"}}]])))
;; (defn focused-topic []
;;   (let [focused-topic (reagent/atom {:id 1
;;                                      :title "hello"
;;                                      :date "2020/02/01"
;;                                      :screenshot "/img/sample-user-icon.png"
;;                                      :description "sample description"
;;                                      :link "https://www.google.com/"
;;                                      :category :illust
;;                                      :category-icon "/img/painting-icon.svg"})]
;;     (fn []
;;       [topic @focused-topic])))

(defn recent-topics []
  (let [recent-topics (re-frame/subscribe [::topics-subs/recent-topics])]
    (fn []
      [:<>
       (map  (fn [item] ^{:key (:uid item)} [topic item]) @recent-topics)])))

(defn card-main []
  (let [profile-exist? (re-frame/subscribe [::card-subs/profile-exist?])
        user-name (re-frame/subscribe [::card-subs/current-profile-uname])
        recent-topics-exist? (re-frame/subscribe [::topics-subs/recent-topics-exist?])]
    (fn []
      (if-not @profile-exist?
        [:<>
         [:div.container.pt-5 "ユーザが見つかりませんでした。削除されたユーザか、存在しないユーザです。"]]
        [:<>
         [aside-menu]
         [:div#card-modal.modal
          [:div.modal-background]
          [:div.modal-content
           [card-body false]]
          [:button.modal-close.is-large
           {:aria-label "close"
            :on-click card-modal-toggle}]]
         [:div.card-main
          [:div#card-bg
           [:div#card.container
            [:div.columns.is-centered {:style {:margin "0 2rem"}}
             [card-body true]]]]]
         [card-contact]
         (when @recent-topics-exist?
           [:<>
            [:div.focused-topic-title
             [:h1.title "Recent Topic"]]
            [recent-topics]
            [:div.focused-topic-title {:style {:text-align "right"}}
             [:h1.title [:a.button.card-button
                         {:href (rfe/href ::routes-domain/user-topics {:user-id @user-name})}
                         "Other Topics →"]]]])]))))

(def card
  [card-main])
