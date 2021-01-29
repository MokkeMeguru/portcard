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

;; root
(defn decode-message [key]
  (condp = key
    "create-user" create-user
    "signin-success" signin-success
    "account-settings-updated" account-settings-updated
    nil))
