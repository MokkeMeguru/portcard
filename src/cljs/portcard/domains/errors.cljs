(ns portcard.domains.errors)

(defn decode-server-error [code]
  (condp = code
    1104 [:div.notification.is-danger
          "すでにアカウントが存在しています。ログインしてください。"]
    1401 [:div.notification.is-danger
          "アカウントが存在していません。サインアップしてください。"]
    [:div.notification.is-danger
     "申し訳ございません。サーバエラーにより操作ができなくなっています。"]))
