(ns portcard.services.contact.valids
  (:require [portcard.domains.contacts :as contact-domain]
            [clojure.spec.alpha :as s]
            [goog.string :as gstring]
            [portcard.domains.users :as users-domain]))

(defn title-is-valid? [title]
  (when-not (nil? title)
    (when-let [problems (s/explain-data ::contact-domain/title title)]
      (let [via (-> problems :cljs.spec.alpha/problems first :via reverse first)]
        (condp = via
          (gstring/format "件名は %d ~ %d 文字の文字列が利用できます。"
                          contact-domain/title-min-length
                          contact-domain/title-max-length))))))

(defn from-is-valid? [from]
  (when-not (nil? from)
    (when-let [problems (s/explain-data ::contact-domain/from from)]
      (let [via (-> problems :cljs.spec.alpha/problems first :via reverse first)]
        (condp = via
          ::contact-domain/from "不正なメールアドレスです。"
          "不明なエラーです。別のアドレスを入力してください。")))))

(defn from-name-is-valid? [from-name]
  (when-not (nil? from-name)
    (when-let [problems (s/explain-data ::contact-domain/from-name from-name)]
      (let [via (-> problems :cljs.spec.alpha/problems first :via reverse first)]
        (condp = via
          (gstring/format "名前は ひらがな / 漢字 / 英数字で%d ~ %d 文字を指定できます。"
                          users-domain/username-min-length
                          users-domain/username-max-length))))))

(defn body-text-is-valid? [body-text]
  (when-not (nil? body-text)
    (when-let [problems (s/explain-data ::contact-domain/body-text body-text)]
      (let [via (-> problems :cljs.spec.alpha/problems first :via reverse first)]
        (condp = via
          (gstring/format "本文は %d ~ %d 文字の文字列が利用できます。"
                          contact-domain/body-text-min-length
                          contact-domain/body-text-max-length))))))

(defn form-is-submittable? [contact-create-payload]
  (when-not (nil? contact-create-payload)
    (when-let [problems (s/explain-data ::contact-domain/contact-create-payload contact-create-payload)]
      "入力に問題があります。")))
