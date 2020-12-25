(ns portcard.utils.views)

(defn toggle-class [id toggle-class]
  (->
   (.getElementById js/document id)
   .-classList
   (.toggle toggle-class)))
