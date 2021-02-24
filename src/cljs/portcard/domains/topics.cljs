(ns portcard.domains.topics
  (:require [clojure.spec.alpha :as s]
            [portcard.domains.roles :as roles-domain]))

(def title-min-length 1)
(def title-max-length 128)
(s/def ::title (s/and string? #(<= title-min-length (count %) title-max-length)))

(def description-min-length 0)
(def description-max-length 512)
(s/def ::description (s/and string? #(<= description-min-length (count %) description-max-length)))

;; (s/valid? ::title 0)
;; (s/valid? ::title "")
;; (s/valid? ::title "hello")

(s/def ::category (fn [category] (some (partial = category) (keys roles-domain/role-categories))))

;; (s/valid? ::category :programming)
;; (s/valid? ::category :illust)
;; (s/valid? ::category :movie)
;; (s/valid? ::category :novel)
;; (s/valid? ::category :others)
;; (s/valid? ::category :unknown)

(s/def ::link-url
  (s/and string?
         (partial re-matches #"^https?://[\w!\?/\+\-_~=;\.,\*&@#\$%\(\)'\[\]\u3000-\u30FE\u4E00-\u9FAF\uF900-\uFA2F\uFF01-\uFFEE]+")
         #(<= 0 (count %) 512)))

(s/def ::link ::link-url)

(s/def ::file #(= (type %) js/File))

(s/def ::topic-create-payload
  (s/keys :req-un [::title ::category ::link ::file] :opt-un [::description]))

;; (s/valid? ::topic-create-payload
;;           {:title "sample"
;;            :category :programming
;;            :link "https://pixiv.com/users/xxxx/post/00000"})

;; (s/valid? ::topic-create-payload
;;           {:title "sample"
;;            :category :programming
;;            :description "-------"
;;            :link "https://pixiv.com/users/xxxx/post/00000"})
