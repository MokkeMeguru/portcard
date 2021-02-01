(ns portcard.services.account-settings.valids
  (:require [clojure.spec.alpha :as s]
            [portcard.domains.users :as users-domain]
            [goog.string :as gstring]
            [goog.string.format]))

(defn display-name-is-valid? [display-name]
  (when-not (empty? display-name)
    (when-let [problems (s/explain-data ::users-domain/display-name display-name)]
      (let [via (-> problems :cljs.spec.alpha/problems first :via reverse first)]
        (condp = via
          (gstring/format "ユーザ名は ひらがな / 漢字 / 英数字で%d ~ %d 文字を指定できます。" users-domain/username-min-length users-domain/username-max-length))))))

(defn email-is-valid? [email]
  (when-not (empty? email)
    (when-let [problems (s/explain-data ::users-domain/email email)]
      (let [via (-> problems :cljs.spec.alpha/problems first :via reverse first)]
        (condp = via
          ::users-domain/email "不正なメールアドレスです。"
          "不明なエラーです。別のアドレスを入力してください。")))))

(defn twitter-is-valid? [twitter]
  (when-not (empty? twitter)
    (when-let [problems (s/explain-data ::users-domain/twitter twitter)]
      (let [via (-> problems :cljs.spec.alpha/problems first :via reverse first)]
        (condp = via
          "アカウント名は @ で始まる 5 ~ 15 文字のものです。")))))

(defn facebook-is-valid? [facebook]
  (when-not (empty? facebook)
    (when-let [problems (s/explain-data ::users-domain/facebook facebook)]
      (let [via (-> problems :cljs.spec.alpha/problems first :via reverse first)]
        (condp = via
          "アカウント名は 5 ~ 50文字のものです。")))))

(defn form-is-submittable? [form]
  (when-let [problems (s/explain-data ::users-domain/user-profile-update-payload  form)]
    "入力に問題があります。"))

;; (email-is-valid? "meguru.mokke@gmail.com")
;; (email-is-valid? "meguru.mokke_gmail.com")
;; (display-name-is-valid? "test name")
;; (display-name-is-valid? "xxx")
;; (twitter-is-valid? "@MeguruMokke")
;; (twitter-is-valid? "MeguruMokke")
;; (facebook-is-valid? "something.com")
;; (facebook-is-valid? "---")
;; (form-is-submittable? {:display-name "MeguruMokke"
;;                        :contact {:email "hoge"}})
