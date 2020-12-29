(ns portcard.services.icon-settings.views
  (:require [re-frame.core :as re-frame]
            [portcard.services.icon-settings.events :as icon-settings-events]
            [portcard.services.icon-settings.subs :as icon-settings-subs]))

(defn preview-field []
  (let [icon-url (re-frame/subscribe [::icon-settings-subs/icon-url])]
    [:div.container.pt-3
     [:p.subtitle "preview"]
     [:img {:src @icon-url :style {:width "512px" :height "512px"
                                   :object-fit "cover"}}]]))

(defn submit-field []
  (fn []
    [:div.container.pb-5>div.field
     [:div.control.form
      [:button.button.is-primary
       {:on-click
        (fn [e]
          (.preventDefault e)
          (.then
           (.getIdToken (.. js/firebase auth -currentUser) true)
           (fn [id-token]
             (re-frame/dispatch [::icon-settings-events/update-icon {:id-token id-token}]))))}
       "更新"]]]))

(defn icon-field []
  (let []
    [:div.container.py-5>div.file
     [:label.file-label
      [:input.file-input {:type "file" :accept "image/*" :name "resume"
                          :on-change (fn [e]
                                       (if (not= "" (.. e -target -value))
                                         (let [^js/File file (aget (.. e -target -files) 0)]
                                           (re-frame/dispatch [::icon-settings-events/set-icon file])))

                                       (print (.. e -target -value)))}]
      [:span.file-cta
       [:span.file-icon
        [:i.fas.fa-upload]]
       [:span.file-label
        "choose a file ..."]]]]))

(defn icon-settings-body []
  [:div.container
   [preview-field]
   [icon-field]
   [submit-field]])

(def icon-settings-views
  {:title "アイコンの設定"
   :subtitle "アイコンの設定をします。アイコン画像は中央で切り抜きされるので、ご注意ください。"
   :body icon-settings-body})

(def icon-settings
  [:div.container.pt-5
   [:div.titles
    [:p.title (:title icon-settings-views)]
    [:p.subtitle (:subtitle icon-settings-views)]
    [(:body icon-settings-views)]]])
