(ns portcard.services.topics.views
  (:require [reagent.core :as reagent]
            [portcard.services.common.views :refer [aside-menu]]
            ["react-google-recaptcha" :default ReCAPTCHA]))

(defn topic [{:keys [title date screenshot description link category category-icon] :as topic}]
  (fn []
    [:div.topic-container
     [:div.card.topic
      [:div.card-content
       [:div.columns
        [:div.topic-title.column.is-9
         [:p.title title]
         [:hr]]
        [:div.column.date.is-3
         [:p date]]]
       [:div.columns
        [:div.column.is-8
         [:img  {:src screenshot :style {:max-width "720px"}}]]
        [:div.column.category.is-4
         [:div.topic-description description]
         [:div.topic-links
          [:p [:a {:href link} [:i.fas.fa-link] [:span "More (外部サイト) →"]]]
          [:p "category: " category [:span.category-icon-wrapper [:img.category-icon {:src category-icon}]]]]]]]]]))

(defn topics-content []
  (let [topics
        (reagent/atom [{:id 1
                        :title "hello"
                        :date "2020/02/01"
                        :screenshot "/img/sample-user-icon.png"
                        :description "sample description"
                        :link "https://www.google.com/"
                        :category :illust
                        :category-icon "/img/painting-icon.svg"}
                       {:id 2
                        :title "hello"
                        :date "2020/02/01"
                        :screenshot "/img/sample-user-icon.png"
                        :description "sample description"
                        :link "https://www.google.com/"
                        :category :illust
                        :category-icon "/img/painting-icon.svg"}])]

    (fn []
      [:<>
       (map (fn [topic-item]  [:div.topics-topic [topic topic-item]]) @topics)])))

(defn topics-title []
  (let [topic-filter (reagent/atom nil)]
    (fn []
      [:div.topics-title
       [:h1.title "Topics of " [:a {:style {:text-decoration "underline"}} "MeguruMokke"]
        (when-not (empty? @topic-filter) [:span " with category:" @topic-filter])]])))

(defn filter-item [category category-name active-filter]
  [:li {:key category} [:a {:on-click (fn []
                                        (if (= category @active-filter)
                                          (reset! active-filter nil)
                                          (reset! active-filter category)))} category-name]])

(defn category-filter [current-location]
  [:div.container
   [:ul {:style {:margin "0 4rem" :font-size "1.25rem"}}
    [:li
     [:a {:key :illust :href (str  "/#" current-location "?category=illust")} "illust" [:span.category-icon-wrapper [:img.category-icon {:src "/img/painting-icon.svg"}]]]]
    [:li
     [:a {:key :reset :href (str  "/#" current-location)} "reset"]]]])

(defn filter-detail [active-filter]
  (let [current-location (-> (.. js/window -location -href) (.split "?") first (.split "#") last)]
    (cond
      (= active-filter :category) [category-filter current-location])))

(defn topics-selector []
  (let [active-filter (reagent/atom nil)
        current-location (-> (.. js/window -location -href) (.split "?") first (.split "#") last)]
    (fn []
      [:div.topics-title
       [:div.columns.topics-selector
        [:div.column
         [:h1.sub-title "フィルター"]
         [:div.tabs
          [:ul
           [filter-item :category "カテゴリ" active-filter]
           ;; [filter-item :date "更新日時" active-filter]
           ]]
         (when-not (nil? @active-filter)
           [filter-detail @active-filter])]]])))

(def topics
  [:<>
   [aside-menu]
   [topics-title]
   [topics-selector]
   [topics-content]])
