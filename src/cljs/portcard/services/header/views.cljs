(ns portcard.services.header.views
  (:require [portcard.utils.views :refer [toggle-class]]
            [reitit.frontend.easy :as rfe]
            [portcard.domains.routes :as routes-domain]
            [portcard.services.auth.subs :as auth-subs]
            [portcard.services.auth.events :as auth-events]
            [reagent.core :as r]
            [re-frame.core :as re-frame]
            [portcard.services.main.subs :as subs]))

(defn navbar-toggle [e]
  (.preventDefault e)
  (toggle-class "navbar-burger" "is-active")
  (toggle-class "navbar-menu" "is-active"))

(def navbar-brand
  [:div.navbar-brand
   [:a.navbar-item {:href "/"}
    [:img {:src "/img/title.svg"}]]
   [:a#navbar-burger.navbar-burger.burger
    {:role "button" :aria-label "menu" :aria-expanded "false"
     :on-click
     navbar-toggle}
    [:span {:aria-hidden "true"}]
    [:span {:aria-hidden "true"}]
    [:span {:aria-hidden "true"}]]])

(def search-box
  [:div.navbar-item
   [:div.field.has-addons
    {:style {:margin-bottom 0 :justify-content "center"}}
    [:div.control.has-icons-left
     [:input#nav-search-box.input {:placeholder "検索" :type "text"}]
     [:span.icon.is-left>i.fas.fa-search]]]])

(defn logined-nav []
  (let [user-name (re-frame/subscribe [::subs/uname])
        user-icon (re-frame/subscribe [::subs/user-icon])]
    (fn []
      [:<>
       [:a.navbar-item {:href (str "/users/" @user-name)}
        [:div.container>div.columns {:style {:text-align "center"}}
         [:img.nav-user-icon {:src @user-icon}]]]
       [:a.navbar-item {:href "/"
                        :on-click #(re-frame/dispatch [::auth-events/logout])}
        [:div.rows {:style {:text-align "center"}}
         [:img {:src "/img/logout.svg"}]
         [:p "logout"]]]])))

(defn anonymous-nav []
  [:<>
   [:a.navbar-item {:href "/signup"}
    [:div.rows {:style {:text-align "center"}}
     [:span.icon [:i.fa.fas.fa-angle-up.fa-2x]]
     [:p "sign up"]]]
   [:a.navbar-item {:href "/login"}
    [:div.rows {:style {:text-align "center"}}
     [:img {:src "/img/login.svg"}]
     [:p "login"]]]])

(defn header []
  (let [login? (re-frame/subscribe [::auth-subs/login?])]
    (fn []
      [:nav#header.navbar.is-fixed-top.is-dark>div.container
       {:role "navigation" :aria-label "main navigation"}
       navbar-brand
       [:div#navbar-menu.navbar-menu.is-dark
        [:div.navbar-end
         search-box
         (if @login?
           [logined-nav]
           [anonymous-nav])]]])))
