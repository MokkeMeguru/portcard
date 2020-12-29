(ns portcard.services.icon-settings.subs
  (:require [re-frame.core :as re-frame]))

(re-frame/reg-sub
 ::icon
 (fn [db]
   (-> db :icon :file)))

(re-frame/reg-sub
 ::icon-url
 :<- [::icon]
 (fn [icon _]
   (when-not (nil? icon)
     (-> js/window .-URL (.createObjectURL icon)))))

(re-frame/reg-sub
 ::icon-data
 :<- [::icon]
 (fn [icon _]
   (doto
    (js/FormData.)
     (.append "file" icon))))

;; (re-frame/subscribe [::icon-data])
