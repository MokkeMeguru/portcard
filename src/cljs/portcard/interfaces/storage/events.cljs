(ns portcard.interfaces.storage.events
  (:require [re-frame.core :as re-frame]
            [clojure.spec.alpha :as s]
            [portcard.domains.basics :as basic-domain]
            [portcard.domains.storage :as storage-domain]))

(defn storage-get [cofx {:keys [storage-type name]}]
  {:pre [(s/valid? ::storage-domain/storage-type storage-type)
         (s/valid? ::basic-domain/keyword name)]}
  (assoc cofx :storage/get
         (.getItem  (storage-domain/storage-area storage-type) name)))

(defn storage-set [{:keys [storage-type name value]}]
  {:pre [(s/valid? ::storage-domain/storage-type storage-type)
         (s/valid? ::basic-domain/keyword name)
         (s/valid? ::basic-domain/string value)]}
  (.setItem (storage-domain/storage-area storage-type) name value))

(defn storage-remove [{:keys [storage-type name]}]
  {:pre [(s/valid? ::storage-domain/storage-type storage-type)
         (s/valid? ::basic-domain/keyword name)]}
  (.removeItem (storage-domain/storage-area storage-type) name))

(re-frame/reg-cofx
 :storage/get
 #(storage-get %1 %2))

(re-frame/reg-fx
 :storage/set
 #(storage-set %))

(re-frame/reg-fx
 :storage/remove
 #(storage-remove %))
