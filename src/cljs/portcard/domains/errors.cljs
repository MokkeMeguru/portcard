(ns portcard.domains.errors)

;; messages
(def account-is-already-exist
  [:div.notification.is-danger
   "すでにアカウントが存在しています。ログインしてください。"])

(def account-is-not-found
  [:div.notification.is-danger
   "アカウントが存在していません。サインアップしてください。"])

(def unknown-error-was-thrown
  [:div.notification.is-danger
   "申し訳ございません。サーバエラーにより操作ができなくなっています。"])

;; root
(defn decode-server-error [code]
  (condp = code
    1104 account-is-already-exist
    1401 account-is-not-found
    unknown-error-was-thrown))
