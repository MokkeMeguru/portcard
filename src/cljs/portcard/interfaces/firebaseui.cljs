(ns portcard.interfaces.firebaseui)

(defn firebaseui-init []
  (let [auth (.auth js/firebase)
        _ (set! (.-languageCode auth) "ja")
        ui  (try (new (.AuthUI (.-auth js/firebaseui)) auth)
                 (catch js/Error e
                   (.log js/console  e)))]
    (.. js/firebaseui -auth -AuthUI getInstance)))
