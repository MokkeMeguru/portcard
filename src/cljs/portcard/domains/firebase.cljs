(ns portcard.domains.firebase)

(defn- google-provider []
  (.. js/firebase -auth -GoogleAuthProvider -PROVIDER_ID))

(defn- facebook-provider []
  (.. js/firebase -auth -FaceBookAuthProvider -PROVIDER_ID))

(defn- twitter-provider []
  (.. js/firebase -auth -TwitterAuthProvider -PROVIDER_ID))

(defn- github-provider []
  (.. js/firebase -auth -GithubAuthProvider -PROVIDER_ID))

(defn- email-provider []
  (.. js/firebase -auth -EmailAuthProvider -PROVIDER_ID))

(defn- phone-provider []
  (.. js/firebase -auth -PhoneAuthProvider -PROVIDER_ID))

(defn- anonymous-provider []
  (.. js/firebase -auth -AnonymousAuthProvider -PROVIDER_ID))

(def providers
  {:google google-provider
   :facebook facebook-provider
   :twitter twitter-provider
   :github github-provider
   :email email-provider
   :phone phone-provider
   :anonymous anonymous-provider})
