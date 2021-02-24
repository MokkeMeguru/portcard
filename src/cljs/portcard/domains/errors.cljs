(ns portcard.domains.errors)

;; messages
(def user-name-is-already-exist
  [:div.notification.is-danger
   "アカウント名が重複しています。"])

(def account-is-already-exist
  [:div.notification.is-danger
   "すでにアカウントが存在しています。ログインしてください。"])

(def account-is-not-found
  [:div.notification.is-danger
   "アカウントが存在していません。サインアップしてください。"])

(def unknown-error-was-thrown
  [:div.notification.is-danger
   "申し訳ございません。サーバエラーにより操作ができなくなっています。"])

(def invalid-contact-period
  [:div.notification.is-danger
   "お問い合わせ頻度が高すぎます。数時間おいて再度ご利用下さい。"])

;; root
(defn decode-server-error [code]
  (condp = code
    1103 user-name-is-already-exist
    1104 account-is-already-exist
    1401 account-is-not-found
    2301 invalid-contact-period
    unknown-error-was-thrown))
