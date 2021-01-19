(ns portcard.services.main.events
  (:require
   [re-frame.core :as re-frame]
   [portcard.services.main.db :as db]
   [reitit.frontend.easy :as rfe]
   [reitit.frontend.controllers :as rfc]
   [day8.re-frame.tracing :refer-macros [fn-traced]]
   [portcard.infrastructure.firebase.firebaseui :refer [firebaseui-init]]))

(re-frame/reg-event-db
 ::initialize-db
 (fn-traced [_ _]
            db/default-db))

(re-frame/reg-event-db
 ::initialize-firebaseui
 (fn [db _]
   (let [ui (firebaseui-init)]
     (print "initialize-firebase-ui" ui)
     (assoc db :ui ui))))

(re-frame/reg-event-db
 ::drop-server-code
 (fn [db _]
   (dissoc db :server-code)))

(re-frame/reg-event-db
 ::drop-message
 (fn [db _]
   (dissoc db :message)))


;; navigation


(re-frame/reg-fx
 ::navigate!
 (fn [route]
   (apply rfe/push-state route)))

(re-frame/reg-event-fx
 ::navigate
 (fn [_cofx [_ & route]]
   {::navigate! route}))

(re-frame/reg-event-db
 ::navigated
 (fn [db [_ new-match]]
   (let [old-match (:current-route db)
         controllers (rfc/apply-controllers (:controllers old-match) new-match)]
     (when-not (= new-match old-match) (.scrollTo js/window 0 0))
     (assoc db :current-route (assoc new-match :controllers controllers)))))
