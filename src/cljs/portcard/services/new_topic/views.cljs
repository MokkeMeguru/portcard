(ns portcard.services.new-topic.views
  (:require [reagent.core :as r]
            [portcard.domains.roles :as roles-domain]
            [re-frame.core :as re-frame]
            [portcard.services.new-topic.events :as new-topic-events]
            [portcard.services.new-topic.subs :as new-topic-subs]
            [portcard.services.new-topic.valids :as new-topic-valids]))

(defn title-field []
  (let [title (re-frame/subscribe [::new-topic-subs/title])]
    (fn []
      [:div.field
       [:label.label "Topic タイトル"]
       [:div.control
        [:input
         {:type "text"
          :placeholder "タイトル"
          :class (if (new-topic-valids/title-is-valid? @title) "input is-danger" "input")
          :value @title
          :on-change #(re-frame/dispatch-sync [::new-topic-events/title (-> % .-target .-value)])}]
        (when-let [error-message (new-topic-valids/title-is-valid? @title)]
          [:p.help.is-danger error-message])]])))

(defn category-element [category-key category-value]
  [:option {:value category-key} category-value])

(defn category-field []
  (let [category (re-frame/subscribe [::new-topic-subs/category])]
    (fn []
      [:div.field
       [:label.label "カテゴリ"
        [:div.control
         [:span
          {:class (if (new-topic-valids/category-is-valid? @category) "select is-danger" "select")}
          [:select
           {:value (if @category (name @category) "---")
            :on-change #(re-frame/dispatch-sync [::new-topic-events/category (keyword (-> % .-target .-value))])}
           [:option {:value "---"} "---"]
           [:<>
            (doall
             (map (fn [[category-key category-value]]
                    ^{:key category-key}
                    [category-element category-key category-value])
                  roles-domain/role-categories))]]]
         (when-let [error-message (new-topic-valids/category-is-valid? @category)]
           [:p.help.is-danger error-message])]]])))

(defn description-field []
  (let [description (re-frame/subscribe [::new-topic-subs/description])]
    (fn []
      [:div.field
       [:label.label "詳細コメント (任意)"]
       [:div.control
        [:textarea
         {:type "textarea"
          :placeholder "詳細コメント"
          :class (if (new-topic-valids/description-is-valid? @description) "textarea is-danger" "textarea")
          :value @description
          :on-change #(re-frame/dispatch-sync [::new-topic-events/description (-> % .-target .-value)])}]
        (when-let [error-message (new-topic-valids/description-is-valid? @description)]
          [:p.help.is-danger error-message])]])))

(defn link-field []
  (let [link (re-frame/subscribe [::new-topic-subs/link])]
    (fn []
      [:div.field
       [:label.label "外部サイトへのリンク ex) Twitter, Github"]
       [:div.control
        [:input
         {:type "text"
          :class (if (new-topic-valids/link-is-valid? @link) "input is-danger" "input")
          :placeholder "https://---"
          :on-change #(re-frame/dispatch-sync [::new-topic-events/link (-> % .-target .-value)])
          :value @link}]
        (when-let [error-message (new-topic-valids/link-is-valid? @link)]
          [:p.help.is-danger error-message])]])))

(defn capture-image-field []
  (let [img (re-frame/subscribe [::new-topic-subs/file])
        img-url (re-frame/subscribe [::new-topic-subs/file-url])]
    (fn []
      [:div.field
       [:label.label "外部サイトのキャプチャ画像 (など)"]
       [:div.control
        [:input
         {:type "file"
          :class "input"
          :accept "image/*"
          :on-change #(re-frame/dispatch [::new-topic-events/file (-> % .-target .-files first)])}]
        [:<>
         (if @img [:div "preview"])
         ;; [:div (str (.-size @img))]
         ;; TODO: file size api: https://developer.mozilla.org/ja/docs/Web/API/Blob/size
         [:img#capture-image
          {:style {:max-width "512px"}
           :src @img-url}]]]])))

(defn submit-field []
  (let [payload (re-frame/subscribe [::new-topic-subs/payload-form])]
    (fn []
      [:div.field>div.control.form
       ;; [:div.container [:code {:style {:white-space "pre"}}
       ;;                  (with-out-str (cljs.pprint/pprint @payload))]]
       [:button.button.card-button
        {:disabled (-> (new-topic-valids/form-is-submittable? @payload) empty? not)
         :on-click
         (fn [e]
           (.preventDefault e)
           (.then
            (.getIdToken (.. js/firebase auth -currentUser) true)
            (fn [id-token]
              (re-frame/dispatch [::new-topic-events/post-topic {:id-token id-token}]))))}
        "投稿"]
       (when-let [error-message (new-topic-valids/form-is-submittable? @payload)]
         [:p.help.is-danger error-message])])))

(def new-topic-body
  [:div.container.pt-5
   [title-field]
   [category-field]
   [description-field]
   [link-field]
   [capture-image-field]
   [submit-field]])

(def new-topic-content
  {:title "新規 topic の投稿"
   :subtitle "外部へ投稿した topic をキャプチャで共有しましょう。"
   :body new-topic-body})

(def new-topic
  [:div.container.pt-5
   [:div.titles
    [:p.title (:title new-topic-content)]
    [:p.subtitlte (:subtitle new-topic-content)]
    (:body new-topic-content)]])
