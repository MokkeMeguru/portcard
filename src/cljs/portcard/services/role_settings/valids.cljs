(ns portcard.services.role-settings.valids
  (:require [clojure.spec.alpha :as s]
            [portcard.domains.roles :as roles-domain]
            [goog.string :as gstring]))

(defn role-category-is-valid? [role-category]
  (when-not (nil? role-category)
    (when-let [problems (s/explain-data ::roles-domain/role-category role-category)]
      (let [via (-> problems :cljs.spec.alpha/problems first :via reverse first)]
        (condp = via
          "カテゴリを選択してください。")))))

(defn roles-are-unique? [roles]
  (when-not (empty? roles)
    (when-let [problems (s/explain-data ::roles-domain/unique-role roles)]
      (let [via (-> problems :cljs.spec.alpha/problems first :via reverse first)]
        (condp = via
          "カテゴリは重複できません。")))))

(defn link-category-name-is-valid? [category-name]
  (when-not (nil? category-name)
    (when-let [problems (s/explain-data ::roles-domain/link-category-name category-name)]
      (let [via (-> problems :cljs.spec.alpha/problems first :via reverse first)]
        (condp = via
          ::roles-domain/link-category-name-length
          (gstring/format "リンク名は %d ~ %d 文字の文字列が利用できます。"
                          roles-domain/link-category-name-min-length
                          roles-domain/link-category-name-max-length)
          "リンク名が不正です。")))))

(defn link-url-is-valid? [link-url]
  (when-not (nil? link-url)
    (when-let [problems (s/explain-data ::roles-domain/link-url link-url)]
      (let [via (-> problems :cljs.spec.alpha/problems first :via reverse first)]
        (condp = via
          "リンクは http [s] から始まるものを使用できます。")))))

(defn form-is-submittable? [form]
  (when-let [problems (s/explain-data ::roles-domain/roles-update-payload form)]
    (print problems)
    "入力に問題があります。"))
