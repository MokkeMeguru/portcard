(ns portcard.infrastructure.firebase.firebaseui)

(defn firebaseui-init []
  (if-let [ui (.. js/firebaseui -auth -AuthUI getInstance)]
    ui
    (let [AuthUI (.. js/firebaseui -auth -AuthUI)]
      (AuthUI. (.. js/firebase auth)))))
