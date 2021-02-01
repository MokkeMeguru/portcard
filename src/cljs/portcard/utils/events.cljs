(ns portcard.utils.events)

(defn drop-index [col idx]
  (vec (filter identity (map-indexed #(if (not= %1 idx) %2) col))))
