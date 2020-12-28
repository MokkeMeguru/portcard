(ns portcard.domains.messages)

(defn decode-message [key]
  (condp = key
    "create-user" [:div.notification
                   "はじめまして。早速ユーザ設定をしましょう。>>>"
                   [:a {:href "/settings/account"} "ユーザ設定"]]
    nil))
