(ns portcard.domains.messages
  (:require [re-frame.core :as re-frame]
            [portcard.services.main.events :as events]))

(defn decode-message [key]
  (condp = key
    "create-user" [:div.notification
                   "はじめまして。早速ユーザ設定をしましょう。>>>"
                   [:a {:href "/settings/account"} "ユーザ設定"]]
    "login-success" [:div.notification
                     [:button.delete {:on-click #(re-frame/dispatch [::events/drop-message])}]
                     "ログインに成功しました。"]
    "account-settings-updated" [:div.notification
                                [:button.delete {:on-click #(re-frame/dispatch [::events/drop-message])}]
                                "更新に成功しました。"]
    nil))
