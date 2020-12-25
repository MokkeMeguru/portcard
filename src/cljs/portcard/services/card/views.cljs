(ns portcard.services.card.views
  (:require
   [reagent.core :as reagent]
   [portcard.utils.views :refer [toggle-class]]
   [portcard.services.common.views :refer [aside-menu]]
   [portcard.services.topics.views :refer [topic]]))

(defn contact-target [icon-src target-link]
  [:li
   [:img.icon-twitter {:src icon-src}]
   [:a.is-light target-link]])

(defn card-content-top []
  (let [name (reagent/atom "Meguru Mokke")
        email (reagent/atom "meguru.mokke@gmail.com")
        facebook (reagent/atom nil)
        twitter (reagent/atom "@MeguruMokke")
        icon (reagent/atom "/img/sample-user-icon.png")]
    (fn []
      [:div.columns.mx-3
       [:div.column.is-4
        [:img.card-icon {:src @icon}]]
       [:div.column.is-8
        [:div.container.has-text-left
         [:h1 {:style {:font-family "Roboto"
                       :font-weight "500"
                       :line-hegiht "64px"}} @name]
         [:ul.px-5
          (when @twitter
            (contact-target "/img/twitter-icon.svg" @twitter))
          (when @facebook
            (contact-target "/img/facebook-icon.svg" @facebook))
          (when @email
            (contact-target "/img/email-icon.svg" @email))]]]])))

(defn card-modal-toggle [_]
  (toggle-class "card-modal" "is-active"))

(defn hobby-attribute [active-attribute]
  (fn [attribute]
    [:div.column {:key (:type attribute)}
     [:div {:style {:margin "auto"
                    :background-color (if (= (:type attribute) active-attribute) "#AB593C" "#D58B50")
                    :border-radius "50%" :width "72px" :height "72px"}}
      [:img {:src (:icon attribute)
             :style {:padding-top "12.5px"}}]]]))

(defn attribute-links [active-links]
  [:div
   [:ul
    (map
     (fn [link]
       [:li {:key (:host link)}
        [:p [:span (:host link)]
         [:a.px-3 {:style {:text-decoration "underline"}} (:link link)]]])
     active-links)]])

(defn card-content-bottom []
  (let [attributes (reagent/atom [{:type :illust
                                   :icon "/img/painting-icon.svg"
                                   :links [{:host :pixiv
                                            :link "https://www.pixiv.net/users/8679932"}]}
                                  {:type :program
                                   :icon "/img/program-icon.svg"
                                   :links [{:host :github
                                            :link "https://github.com/mokkemeguru"}]}])
        active-attribute (reagent/atom :illust)
        active-links (reagent/atom
                      [{:host :pixiv
                        :link "https://www.pixiv.net/users/8679932"}
                       {:host :pixiv2
                        :link "https://www.pixiv.net/users/8679932"}
                       {:host :pixiv3
                        :link "https://www.pixiv.net/users/8679932"}])]

    (fn []
      [:<>
       [:div.columns {:style {:justify-content "flex-end"}}
        [:div.column.is-8>div.container>div.columns.hobby-attribute

         (map
          (hobby-attribute @active-attribute)
          @attributes)]]
       [:div.container
        [:div.columns {:style {:justify-content "flex-end"
                               :margin "1.5rem 0"}}
         [:div.column.is-8>div.container
          [:div.columns>p (name @active-attribute)]
          [:div.columns {:style {:right "20px" :justify-content "center"}}
           [attribute-links @active-links]]]]]])))

(defn card-body [modal-button?]
  [:div#card-body.column>div#child
   (if modal-button?
     [:div.has-text-right>button.button.is-ghost
      {:on-click card-modal-toggle} [:i.fa.fa-expand]]
     [:span {:style {:height "40px"}} [:p "\u00A0"]])
   [card-content-top]
   [card-content-bottom]])

(defn card-contact []
  (fn []
    [:div#card-contact.column
     [:div.container
      [:div.columns.has-text-right
       [:div.column.is-9]
       [:div.column.is-1 [:button.card-button.button [:img {:src "/img/user-add-icon.svg" :title "follow"}]]]
       [:div.column.is-2 [:button.button.card-button [:i.fas.fa-arrow-right] [:span "contact"]]]]]
     [:hr {:style {:height "0.2em"
                   :background-color "rgba(58, 47, 51, 0.20)"}}]]))

(defn focused-topic []
  (let [focused-topic (reagent/atom {:id 1
                                     :title "hello"
                                     :date "2020/02/01"
                                     :screenshot "/img/sample-user-icon.png"
                                     :description "sample description"
                                     :link "https://www.google.com/"
                                     :category :illust
                                     :category-icon "/img/painting-icon.svg"})]
    (fn []
      [topic @focused-topic])))

(def card
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
   [:div.focused-topic-title
    [:h1.title "Focused Topic"]]
   [focused-topic]
   [:div.focused-topic-title {:style {:text-align "right"}}
    [:h1.title [:button.button.card-button  "Other Topics →"]]]])
