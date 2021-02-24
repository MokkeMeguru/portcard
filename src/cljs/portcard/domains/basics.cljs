(ns portcard.domains.basics
  (:require [clojure.spec.alpha :as s]))

(s/def ::map map?)
(s/def ::string string?)
(s/def ::keyword keyword?)
