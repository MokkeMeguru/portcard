(ns portcard.domains.roles)

(def role-cetegories
  ["---"
   "programming"
   "illust"
   "movie"
   "novel"
   "others"])

(defn decode-role-categories [category]
  (condp = category
    "---" "---"
    "programming" "プログラミング"
    "illust" "イラスト"
    "movie" "映像制作"
    "novel" "小説"
    "その他"))

(defn imagine-role-categories [category]
  (condp = category
    "programming" "/img/program-icon.svg"
    "illust" "/img/painting-icon.svg"
    "/img/painting-icon.svg"))

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
