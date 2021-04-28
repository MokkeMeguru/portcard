(ns portcard.config)

(def debug?
  ^boolean goog.DEBUG)

(def api-host
  (if debug?
    "http://localhost:3000"
    "https://portcard-api-dist.megurumokke.org"
    ;; "https://portcard-api.megurumokke.org"
    ))

;; (def api-host
;;   "https://portcard-api.megurumokke.org")
