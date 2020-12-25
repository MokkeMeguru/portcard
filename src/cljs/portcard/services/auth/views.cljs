(ns portcard.services.auth.views
  (:require [reagent.core :as reagent]
            [clojure.spec.alpha :as s]
            [re-frame.core :as re-frame]
            [portcard.services.common.views :refer [email-field password-field]]
            [portcard.domains.users :as users-domain]
            [portcard.services.auth.subs :as auth-subs]
            [portcard.services.auth.events :as auth-events]))

(defn submit-field [email email-error
                    password password-error
                    submitted]
  [:div.field
   [:div.control.form
    (if true
      [:button.button.is-primary
       {:on-click
        (fn [e]
          (.preventDefault e)
          (reset! email-error (not (s/valid? ::users-domain/email @email)))
          (reset! password-error (not (s/valid? ::users-domain/password @password)))
          (when (and (not @email-error)
                     (not @password-error))
            (print "logined")
            (re-frame/dispatch [::auth-events/login-failed])
            (reset! submitted true)))}
       "submit"]
      [:button.button.is-primary.is-loading "submitting..."])]])

(def login-failure
  [:div.notification.is-danger
   [:button.delete {:on-click #(re-frame/dispatch [::auth-events/reset-login-status])}]
   [:p "ログイン に失敗しました。メールアドレスかパスワードが異なっています。"]])

(defn login-body []
  (let [email (reagent/atom "")
        password (reagent/atom "")
        email-error (reagent/atom nil)
        password-error (reagent/atom nil)
        submitted (reagent/atom nil)
        login-success? (re-frame/subscribe [::auth-subs/login-success?])]
    (fn []
      [:div.container
       (when-not @login-success?
         login-failure)
       [email-field email email-error]
       [password-field password password-error]
       [submit-field
        email email-error
        password password-error
        submitted]])))

(def login-content
  {:title "ログイン"
   :subtitle "Google アカウントを用いてログインします。"
   :body login-body})

(def login
  [:div.container.pt-5
   [:div.titles
    [:p.title (:title login-content)]
    [:p.subtitle.is-6 (:subtitle login-content)]
    [(:body login-content)]]])
