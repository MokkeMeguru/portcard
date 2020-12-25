(ns portcard.utils.specs
  (:require [clojure.string :as string]))

(defn check-trim [s]
  (= (count s) (count (string/trim s))))

;; (true? (check-trim "hello"))
;; (false? (check-trim "hello "))
;; (false? (check-trim " hello"))
;; (true? (check-trim "hell o"))
