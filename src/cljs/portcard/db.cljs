(ns portcard.db
  (:require [portcard.services.register.db :as register-db]
            [portcard.domains.firebase :refer [providers]]))

(def default-db
  (merge
   {:name "re-frame"
    :ui-config
    {:signInFlow "redirect"
     :signInSuccessUrl "#/"
     :signInOptions [((:google providers))]}}

   register-db/default-db))
