(ns portcard.infrastructure.storage.events
  (:require [re-frame.core :as re-frame]
            [clojure.spec.alpha :as s]))

(s/def ::map map?)
(s/def ::keyword keyword?)
(s/def ::storage-type #(contains? (set ["session" "local"]) %))
(s/def ::string string?)

(defn storage-area [storage-type]
  (aget js/window
        (condp = storage-type
          "session" "sessionStorage"
          "local" "localStorage"
          :else "sessionStorage")))

(defn storage-get [cofx {:keys [storage-type name]}]
  {:pre [(s/valid? ::storage-type storage-type) (s/valid? ::keyword name)]}
  (assoc cofx :storage/get
         (.getItem  (storage-area storage-type) name)))

(defn storage-set [{:keys [storage-type name value]}]
  {:pre [(s/valid? ::storage-type storage-type) (s/valid? ::keyword name) (s/valid? ::string value)]}
  (.setItem (storage-area storage-type) name value))

(defn storage-remove [{:keys [storage-type name]}]
  {:pre [(s/valid? ::storage-type storage-type) (s/valid? ::keyword name)]}
  (.removeItem (storage-area storage-type) name))

(re-frame/reg-cofx
 :storage/get
 #(storage-get %1 %2))

(re-frame/reg-fx
 :storage/set
 #(storage-set %))

(re-frame/reg-fx
 :storage/remove
 #(storage-remove %))
