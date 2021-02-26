(ns portcard.services.footer.views)

(defn footer []
  (fn []
    [:footer#footer.footer.mt-5 {:style {:padding-bottom "4rem" :background-color "#3A2F33" :color "#f5e6de"}}
     [:div.content.has-text-centered
      [:p
       [:strong "Portcard"] " by " [:a {:href "https://twitter.com/MeguruMokke"} "@MeguruMokke"]]
      [:p "Portcard に関するお問い合わせは " [:a {:href "mailto:meguru.mokke@gmail.com"} "email"] " か " [:a  {:href "https://twitter.com/MeguruMokke"} "Twitter"] " よりご連絡下さい。"]]]))
