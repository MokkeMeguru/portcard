(ns portcard.css
  (:require [garden.def :refer [defstyles]]
            [garden.stylesheet :refer [at-media]]
            [garden.units :as u]
            [garden.selectors :as s]))

(def base-light-orange "#F5E6DE")
(def base-dark "#3A2F33")
(def base-bg "#E5E5E5")
(def base-select-icon-color "#d58b50")

(defstyles screen
  [:body {:margin 0
          :background-color base-bg}]
  [:#header
   {:background base-dark
    :padding "0 2rem"
    :justify-content "center"}]
  [:#navbar-menu :.navbar-item
   {:background base-dark
    :color (str base-light-orange " !important")}]

  [:nav
   [:.nav-user-icon
    {:max-height "4rem"
     :border-radius "50%"}]
   [:#nav-search-box
    {:border-radius "100px"
     :background-color base-light-orange}]
   [:.navbar-item:hover
    {:background-color "#292929"
     :color base-light-orange}]
   [:.fa {:color base-light-orange}]]
  [:.bd-main
   {;; :padding-top "4rem"
    :min-height "100vh"
    :justify-content "center"
    :display "flex"}]

  [:.fixed-aside
   {:text-align "left" :z-index 30
    :position "fixed" :margin-top "2rem"
    :left "1rem"}
   [:.rows
    {:margin-top "1.5rem"}
    [:li {:margin "1rem 0"}]]]

  [:.card-content {:padding "1rem"}]
  [:.card-main
   {:padding "0"}]
  [:#card
   {:margin "0 auto"
    :padding "4rem 0"}]
  [:#card-bg
   {:background "#DCDCDC" :text-align "center" :width "100vw"}]
  ;; (at-media {:screen true
  ;;            :max-width (u/px 420)}
  ;;           [:.card-main  :#card-bg
  ;;            {:width "72%"}])
  [:#card-body
   {:border "solid 0.2rem #52474F"
    :max-width "960px" :background "white"
    :margin "auto"
    :position "relative"}
   ["[class^=\"icon\"]"
    {:position "relative"
     :top "0.75rem"
     :max-width "2.5rem"
     :padding-right "0.1rem"
     :right "0.2rem"}]
   [:.card-icon
    {:max-width "256px" :min-width "128px"
     :border-radius "50%"
     :border "solid 0.15rem #52474F"}]]
  [:#card-body
   [:h1 {:font-size "1.5rem"}]
   [:a {:word-break "break-all"}]]
  [:.hobby-attribute
   {:justify-content "center" :border-bottom "solid 0.3rem gray"
    :display "flex" :flex-direction "row"}]
  [:.modal-content
   [:.hobby-attribute
    [:img {:padding-left "12.5px"}]]]

  (at-media {:screen true :max-width (u/px 480)}
            [:.container {:margin "0 0.5rem"}])
  (at-media {:screen true :min-width (u/px 481)}
            [:.container {:margin "0 2rem"}])
  (at-media {:screen true :min-width (u/px 770)}
            [:#card-body
             {:position "relative"
              :width "100%"}]
            [:#card-body
             [(s/& s/before)
              {:content "\"\""
               :display "block"
               :padding-top (str (/ 100 1.654) "%")}]]
            [:#child
             {:position "absolute"
              :top 0
              :left 0
              :bottom 0
              :right 0}])
  [:.field-label
   {:text-align "left"}]
  [:.hobby-attribute
   [:.column
    {:padding "0.25rem"}]]
  [:.card-button
   {:border-radius "10px"
    :background-color "#D58B50"
    :color "#F5E6DE"}
   [:img
    {:max-width "2rem"}]
   [:span
    {:padding-left "1rem"}]
   [:&:hover
    {:color "#F5E6DE"
     :background-color "#d7aa87"}]
   [:&:focus
    {:color "#f5e6de"
     :border-color "#d58b50"}]]
  [:.topics-topic
   {:margin-top "5rem"}]
  (at-media {:screen true :min-width (u/px 780)}
            [:.topics-topic
             {:width "960px"}])
  [:.topic
   [:.date {:text-align "center"}]
   [:.category {:display "flex"}]
   [:hr
    {:height "0.2rem"
     :margin "0.5rem 0"
     :background-color base-dark}]
   [:.topic-links
    {:margin-top "auto"
     :text-align "right"}
    [:a
     {:text-decoration "underline"}]]]
  [:.topic-container
   {:margin "auto"
    :max-width "960px"}
   [:.card
    {:border-radius "10px"
     :margin "1rem"}]]
  [:.category
   {:display "flex" :flex-direction "column"}
   [:span {:padding-left "0.5rem"}]]
  [:.category-icon
   {:vertical-align "-0.1rem"
    :max-width "1rem"
    :border "solid"
    :border-radius "50%"
    :border-color base-select-icon-color
    :background-color base-select-icon-color}]
  [:.focused-topic-title
   {:margin "auto"
    :padding-bottom "2rem"}]
  [:.topics-title
   {:margin-top "2rem"}]
  [:.topics-selector
   {:margin "2rem"}
   [:.sub-title
    {:font-size "1.25rem"}]]
  [:.category-icon-wrapper
   {:padding-left "0.5rem"}]
  [".tabs:not(:last-child)"
   {:margin-bottom "0.5rem"}]
  (at-media {:max-width (u/px 980)}
            [:.card-body :.topic-container
             {:max-width (u/px 720)}])
  (at-media {:max-width (u/px 980)}
            [:.fixed-aside
             {:visibility "hidden"}])
  (at-media {:screen true :min-width (u/px 769)}
            [:.modal-content :.modal-card
             {:width (u/px 980)}])
  (at-media {:screen true :min-width (u/px 769)}
            [:#card-body
             {:font-size "1.5rem"}
             [:h1 {:font-size "2rem"}]])
  (at-media {:screen true :max-width (u/px 1200)}
            [:#card-body
             {:font-size "1rem"}
             [:.card-icon {:max-width "158px"}]]
            [:#card-body :.card :.topic-container
             {:max-width (u/px 720)}])
  (at-media {:screen true :min-width (u/px 1408)}
            [".focused-topic-title:not(.is-max-desktop):not(.is-max-widescreen)" :topics-title
             {:max-width (u/px 1000)}])
  (at-media {:screen true :max-width (u/px 1407) :min-width (u/px 980)}
            [".focused-topic-title:not(.is-max-desktop):not(.is-max-widescreen)" :.topics-title
             {:margin-left "8rem"
              :margin-right "8rem"}])
  (at-media {:screen true :max-width (u/px 979)}
            [".focused-topic-title:not(.is-max-desktop):not(.is-max-widescreen)" :.topics-title
             {:margin-left "5rem"
              :margin-right "5rem"}]))
