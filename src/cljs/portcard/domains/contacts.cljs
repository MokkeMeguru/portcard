(ns portcard.domains.contacts
  (:require [clojure.spec.alpha :as s]
            [portcard.domains.users :as users-domain]))

(def contacts-categories
  {:request "ご依頼"
   :invitation "勧誘"
   :others "その他のお問い合わせ"})

(def title-min-length 1)
(def title-max-length 128)
(s/def ::title (s/and string? #(<= title-min-length (count %) title-max-length)))

(s/def ::from ::users-domain/email)
(s/def ::from-name ::users-domain/username)
(s/def ::category (fn [category] (some (partial = category) (keys contacts-categories))))

(def body-text-min-length 1)
(def body-text-max-length 1024)
(s/def ::body-text (s/and string? #(<= body-text-min-length (count %) body-text-max-length)))

(s/def ::recaptcha (s/and string? #(<= 1 (count %))))
;; (s/valid? ::category :request)
;; (s/valid? ::name "そめ　ほげ")
;; (s/valid? ::contact-address "meguru.mokke@gmail.com")
;; (s/explain-data ::contact-address "megu")

;;TODO  add category
(s/def ::contact-create-payload
  (s/keys  :req-un [::from ::from-name ::to ::title ::body-text ::recaptcha]))

;; (defn ->contact-body-text [body-text category]
;;   (str body-text \newline "カテゴリ: " category))
