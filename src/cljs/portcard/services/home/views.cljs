(ns portcard.services.home.views
  (:require [reagent.core :as r]
            [portcard.domains.messages :as messages-domain]))

(defn about []
  (fn []
    [:<>
     [:p.subtitle "Port card とは"]
     [:p "Port card とは、自分の関わるWebサイト/サービスを一覧し、より多くの人に自分のことを知ってもらうためのサービスです。"]
     [:p "また、contact を通じてプロフィール先の人と連絡を取ることもできます。"]
     [:div.container.pt-5 {:style {:text-align "center"}}
      [:img  {:src "/img/icon.png"}]]]))

(defn how-to-use []
  (fn []
    [:div.content
     [:p.title "使い方"]
     [:ol
      [:li [:div.container.pt-5
            [:p.subtitle "ユーザ登録をします。"]
            [:p "ユーザ登録には Google アカウントが必要になります。"]
            [:div.container.pt-5 {:style {:text-align "center"}}
             [:img {:src "/img/signup.png"}]]]]

      [:li [:div.container.pt-5
            [:p.subtitle "プロフィールを設定します。"]
            [:p "メールアドレスなどのプロフィール情報を入力して下さい。"]
            [:p "メールアドレスはお問い合わせを受ける際に必要となります。"]
            [:div.container.pt-5 {:style {:text-align "center"}}
             [:img {:src "/img/profile-settings.png"}]]]]

      [:li [:div.container.pt-5
            [:p.subtitle "トピックを投稿します。"]
            [:p "お気に入りのアウトプットを見てもらうために、それらのアウトプットをキャプチャして、トピックとして投稿します。"]]]

      [:li [:div.container.pt-5
            [:p.subtitle "自分のプロフィールのリンクを共有しましょう。"]
            [:p "Port card のプロフィールリンクを共有することで、他の多くの自分が関わるサイトへの" "道標" "として利用しましょう。"]]]]]))

(defn home-content []
  (let [system-message (r/atom "create-user")]
    (fn []
      [:<>
       [about]
       [:hr]
       [how-to-use]])))

(def home-page
  [:div.container.pt-5 {:style {:max-width "640px"}}
   [:div.titles
    [:p.title "Welcome to Port card"]
    [home-content]]])
