(ns portcard.services.topics.views
  (:require [reagent.core :as reagent]
            [portcard.services.common.views :refer [aside-menu]]
            ["react-google-recaptcha" :default ReCAPTCHA]
            [re-frame.core :as re-frame]
            [portcard.services.topics.subs :as topics-subs]
            [reagent.core :as r]
            [portcard.services.topics.events :as topics-events]))

(defn topic
  [{:keys [uid title date screenshot description link category] :as topic}]
  (let [category-icon "/img/painting-icon.svg"
        topic-deletable? (re-frame/subscribe [::topics-subs/topic-deletable?])
        modal-open? (r/atom false)]
    (fn []
      [:div.topic-container
       [:div
        {:class (if @modal-open?  "modal is-active" "modal")}
        [:div.modal-background]
        [:div.modal-content
         {:style {:max-width "640px"}}
         [:div.box
          [:article.media
           [:div.container
            [:p {:style {:color "gray"}} "Notification"]
            [:hr {:style {:margin-top "0"}}]
            [:br]
            [:div.columns.is-centered
             [:p.subtitle [:strong title] "を削除しますか？"]]
            [:br]
            [:div.columns
             [:div.column.is-6 {:style {:text-align "center"}}
              [:button.button.is-info.is-light
               {:on-click  (fn [e]
                             (.preventDefault e)
                             (.then
                              (.getIdToken (.. js/firebase auth -currentUser) true)
                              (fn [id-token]
                                (re-frame/dispatch [::topics-events/delete-topic
                                                    {:id-token id-token
                                                     :uid uid}])))
                             (reset! modal-open? false))}

               "Yes"]]
             [:div.column.is-6 {:style {:text-align "center"}}
              [:button.button.is-danger.is-light
               {:on-click  #(reset! modal-open? false)}
               "No"]]]]]]]
        [:button.modal-close.is-large {:aria-label "close"
                                       :on-click #(reset! modal-open? false)}]]
       [:div.card.topic
        [:div.card-content
         [:div.columns
          [:div.topic-title.column.is-9
           [:p.title {:style {:display "flex"}}
            [:span title]
            (when @topic-deletable? [:button {:style {:margin-left "auto"}
                                              :on-click #(reset! modal-open? true)} [:span.icon [:i.fa.fa-trash]]])]
           [:hr]]
          [:div.column.date.is-3
           [:p date]]]
         [:div.columns
          [:div.column.is-8
           [:img  {:src screenshot}]]
          [:div.column.category.is-4
           [:div.topic-description description]
           [:div.topic-links
            [:p [:a {:target "_blank" :rel "noopener noreferrer" :href link} [:i.fas.fa-link] [:span "More (外部サイト) →"]]]
            [:p "category: " category [:span.category-icon-wrapper [:img.category-icon {:src category-icon}]]]]]]]]])))

(defn topics-content []
  (let [topics (re-frame/subscribe [::topics-subs/current-topics])]
    (fn []
      [:<>
       (map (fn [topic-item] ^{:key (:uid topic-item)} [:div.topics-topic [topic topic-item]]) @topics)])))

(defn topics-title []
  (let [topic-filter (reagent/atom nil)]
    (fn []
      [:div.topics-title
       [:h1.title "Topics of " [:a {:style {:text-decoration "underline"}} "MeguruMokke"]
        (when-not (empty? @topic-filter) [:span " with category:" @topic-filter])]
       [:p "投稿されたトピックのタイルです。"
        [:br] "More リンク よりそれぞれの詳細ページへ遷移します。"]])))

(defn topics-nav []
  (let [latest-topics? (re-frame/subscribe [::topics-subs/latest-topics?])
        next-topics-exist? (re-frame/subscribe [::topics-subs/next-topics-exist?])
        next-topics-url (re-frame/subscribe [::topics-subs/next-topics-url])
        previous-topics-url (re-frame/subscribe [::topics-subs/previous-topics-url])
        reset-topics-url (re-frame/subscribe [::topics-subs/reset-topics-url])
        topics-from-selected? (re-frame/subscribe [::topics-subs/topics-from-selected?])]
    (fn []
      [:div.topics-title
       [:nav.pagination {:role "navigation" :aria-label "pagination"}
        (cond
          @latest-topics? [:a.pagination-previous.card-button {:href @reset-topics-url} "< Update"]
          @topics-from-selected? [:a.pagination-previous.card-button {:href @previous-topics-url} "< Previous"]
          :else [:a.pagination-previous.card-button {:disabled true} "< Previous"])
        [:a.pagination-next.card-button
         (if @next-topics-exist? {:href @next-topics-url} {:disabled true})
         "Next >"]]])))

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
   [topics-nav]
   ;; [topics-selector]
   [topics-content]])
