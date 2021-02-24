(ns portcard.domains.messages
  (:require [re-frame.core :as re-frame]
            [portcard.services.main.events :as events]))

;; messages
(def create-user
  [:div.notification
   "はじめまして。早速ユーザ設定をしましょう。>>>"
   [:a {:href "/settings/account"} "ユーザ設定"]])

(def signin-success
  [:div.notification
   [:button.delete {:on-click #(re-frame/dispatch [::events/drop-message])}]
   "ログインに成功しました。"])

(def account-settings-updated
  [:div.notification
   [:button.delete {:on-click #(re-frame/dispatch [::events/drop-message])}]
   "更新に成功しました。"])

(def posted-new-topic
  [:div.notification
   [:button.delete {:on-click #(re-frame/dispatch [::events/drop-message])}]
   "トピックを投稿しました。"])

(def post-contact
  [:div.notification
   [:button.delete {:on-click #(re-frame/dispatch [::events/drop-message])}]
   "メッセージを送信しました。メールボックスをご確認ください。"])

;; root
(defn decode-message [key]
  (condp = key
    "create-user" create-user
    "signin-success" signin-success
    "account-settings-updated" account-settings-updated
    "posted-new-topic" posted-new-topic
    "post-contact" post-contact
    nil))
