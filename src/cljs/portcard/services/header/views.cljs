(ns portcard.services.header.views
  (:require [portcard.utils.views :refer [toggle-class]]))

(defn navbar-toggle [e]
  (.preventDefault e)
  (toggle-class "navbar-burger" "is-active")
  (toggle-class "navbar-menu" "is-active"))

(def navbar-brand
  [:div.navbar-brand
   [:a.navbar-item {:href "/#"}
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
  (let [user-name "sample-user"
        user-icon "/img/sample-user-icon.png"]
    [:<>
     [:a.navbar-item {:href (str "/#/users/" user-name)}
      [:div.container>div.columns {:style {:text-align "center"}}
       [:img.nav-user-icon {:src user-icon}]]]
     [:a.navbar-item {:href "/#"}
      [:div.rows {:style {:text-align "center"}}
       [:img {:src "/img/logout.svg"}]
       [:p "logout"]]]]))

(def anonymous-nav
  [:<>
   [:a.navbar-item {:href "/#/signup"}
    [:div.rows {:style {:text-align "center"}}
     [:span.icon [:i.fa.fas.fa-angle-up.fa-2x]]
     [:p "sign up"]]]
   [:a.navbar-item {:href "/#/login"}
    [:div.rows {:style {:text-align "center"}}
     [:img {:src "/img/login.svg"}]
     [:p "login"]]]])

(defn header [login?]
  [:nav#header.navbar.is-fixed-top.is-dark>div.container
   {:role "navigation" :aria-label "main navigation"}
   navbar-brand
   [:div#navbar-menu.navbar-menu.is-dark
    [:div.navbar-end
     search-box
     (if login?
       [logined-nav]
       anonymous-nav)]]])
