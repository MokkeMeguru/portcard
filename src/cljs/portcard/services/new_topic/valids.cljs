(ns portcard.services.new-topic.valids
  (:require [clojure.spec.alpha :as s]
            [portcard.domains.topics :as topics-domain]
            [goog.string :as gstring]
            [goog.string.format]))

(defn title-is-valid? [title]
  (when-not (nil? title)
    (when-let [problems (s/explain-data ::topics-domain/title title)]
      (let [via (-> problems :cljs.spec.alpha/problems first :via reverse first)]
        (condp = via
          (gstring/format "タイトルは %d ~ %d 文字の文字列が利用できます。"
                          topics-domain/title-min-length
                          topics-domain/title-max-length))))))

(defn category-is-valid? [category]
  (when-not (nil? category)
    (when-let [problems (s/explain-data ::topics-domain/category category)]
      (let [via (-> problems :cljs.spec.alpha/problems first :via reverse first)]
        (condp = via
          "カテゴリを選択してください。")))))

(defn description-is-valid? [description]
  (when-not (nil? description)
    (when-let [problems (s/explain-data ::topics-domain/description description)]
      (let [via (-> problems :cljs.spec.alpha/problems first :via reverse first)]
        (condp = via
          (gstring/format "コメントは %d 文字以下の文字列が利用できます。"
                          topics-domain/description-max-length))))))

(defn link-is-valid? [link]
  (when-not (nil? link)
    (when-let [problems (s/explain-data ::topics-domain/link link)]
      (let [via (-> problems :cljs.spec.alpha/problems first :via reverse first)]
        (condp = via
          "リンクは http [s] から始まるものを使用できます。")))))

(defn form-is-submittable? [form]
  (when-let [problems (s/explain-data ::topics-domain/topic-create-payload form)]
    "入力に問題があります。"))
