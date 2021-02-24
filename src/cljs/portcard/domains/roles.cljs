(ns portcard.domains.roles
  (:require [clojure.spec.alpha :as s]
            [clojure.set :as clset]))

(def role-categories
  {:programming "プログラミング"
   :illust "イラスト"
   :movie "映像制作"
   :novel "小説"
   :others "その他"})

(defn imagine-role-categories [category]
  (condp = (keyword category)
    :programming "/img/program-icon.svg"
    :illust "/img/painting-icon.svg"
    "/img/painting-icon.svg"))

(s/def ::role-category (fn [category] (some (partial = category) (keys role-categories))))

(defn unique-role [roles]
  (apply distinct? (map #(:role-category %) roles)))

(s/def ::unique-role unique-role)

(def link-category-name-min-length 2)
(def link-category-name-max-length 32)

(s/def ::link-category-name-length
  #(<= link-category-name-min-length
       (count %)
       link-category-name-max-length))

(s/def ::link-category-name
  (s/and
   ::link-category-name-length
   string?))

(s/def ::link-url
  (s/and string? (partial re-matches #"^https?://[\w!\?/\+\-_~=;\.,\*&@#\$%\(\)'\[\]\u3000-\u30FE\u4E00-\u9FAF\uF900-\uFA2F\uFF01-\uFFEE]+")))

(s/def ::role-link (s/keys :req-un [::link-category-name ::link-url]))

(s/def ::role-links (s/coll-of ::role-link :distinct true))

(s/def ::role (s/keys :req-un [::role-category ::role-links]))

(s/def ::roles (s/and (s/coll-of ::role :distinct true) ::unique-role))

(s/def ::primary-rank (s/and number? #(<= 0 %)))

(s/def ::role-payload (s/keys :req-un [::role-category ::role-links ::primary-rank]))

(s/def ::roles-update-payload (s/and (s/coll-of ::role-payload) ::unique-role))

;; (s/explain ::role-link
;;            {:link-category-name "Github"
;;             :link-url "https://github.com/MeguruMokke"})

;; (s/explain ::role
;;            {:role-category :programming
;;             :role-links
;;             [{:link-category-name "Github"
;;               :link-url "https://github.com/MeguruMokke"}]})

;; (s/explain ::role
;;            {:role-category :illust
;;             :role-links
;;             [{:link-category-name "Pixiv"
;;               :link-url "https://pixiv.com/MeguruMokke"}]})

;; (s/explain ::role
;;            {:role-category :others
;;             :role-links
;;             [{:link-category-name "niconico"
;;               :link-url "https://niconico.seiga.com/MeguruMokke"}]})


;; (s/explain ::roles
;;            [{:role-category :illust
;;              :role-links
;;              [{:link-category-name "Pixiv"
;;                :link-url "https://pixiv.com/MeguruMokke"}]}])

;; (s/explain ::roles
;;            [{:role-category :programming
;;              :role-links
;;              [{:link-category-name "Github"
;;                :link-url "https://github.com/MeguruMokke"}]}
;;             {:role-category :illust
;;              :role-links
;;              [{:link-category-name "Pixiv"
;;                :link-url "https://pixiv.com/MeguruMokke"}]}])

;; (s/explain ::roles
;;            [{:role-category :illust
;;              :role-links
;;              [{:link-category-name "Pixiv"
;;                :link-url "https://pixiv.com/MeguruMokke"}]}
;;             {:role-category :illust
;;              :role-links
;;              [{:link-category-name "Pixiv"
;;                :link-url "https://pixiv.com/MeguruMokke"}]}])


;; (s/explain ::unique-role [{:role-category :programming} {:role-category :illust}])
;; (s/explain ::unique-role [{:role-category :programming} {:role-category :programming}])

;; (s/explain ::role-category :programming)
;; (s/explain ::role-category :some)


;; (def role-cetegories
;;   ["---"
;;    "programming"
;;    "illust"
;;    "movie"
;;    "novel"
;;    "others"])

;; (defn decode-role-categories [category]
;;   (condp = category
;;     "---" "---"
;;     "programming" "プログラミング"
;;     "illust" "イラスト"
;;     "movie" "映像制作"
;;     "novel" "小説"
;;     "その他"))



;; "roles": [
;;   {
;;     "role-category": "string",
;;     "primary-rank": 0,
;;     "role-links": [
;;       {
;;         "link-category-name": "string",
;;         "link-url": "string"
;;       }
;;     ]
;;   }
;; ]

;; (def link-categories
;;   ["---"
;;    "github"
;;    "pixiv"
;;    "niconico_seiga"
;;    "niconico_douga"
;;    "others"])

;; (defn decode-link-categories [category]
;;   (condp = category
;;     "---" "---"
;;     "github" "Github"
;;     "pixiv" "Pixiv"
;;     "niconico_seiga" "ニコニコ静画"
;;     "niconico_douga" "ニコニコ動画"
;;     "others"))
