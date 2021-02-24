(ns portcard.domains.storage
  (:require [clojure.spec.alpha :as s]))

(def storage-type (set ["session" "local"]))

(defn storage-area [storage-type]
  (aget js/window
        (condp = storage-type
          "session" "sessionStorage"
          "local" "localStorage"
          :else "sessionStorage")))

(s/def ::storage-type (partial contains? storage-type))
