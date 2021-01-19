(ns portcard.services.main.db
  (:require [portcard.services.register.db :as register-db]
            [portcard.services.account-settings.db :as account-settings-db]
            [portcard.domains.firebase :refer [providers]]))

(def default-db
  (merge
   {:name "re-frame"
    :ui-config
    {:signInFlow "redirect"
     ;; :signInSuccessUrl "/?message=create-user"
     :signInOptions [((:google providers))]}}

   register-db/default-db
   account-settings-db/default-db))
