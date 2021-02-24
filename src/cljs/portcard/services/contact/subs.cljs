(ns portcard.services.contact.subs
  (:require [re-frame.core :as re-frame]))

(re-frame/reg-sub
 ::contact
 (fn [db]
   (:contact db)))

(re-frame/reg-sub
 ::title
 :<- [::contact]
 (fn [contact]
   (:title contact)))

(re-frame/reg-sub
 ::from-name
 :<- [::contact]
 (fn [contact]
   (:from-name contact)))

(re-frame/reg-sub
 ::from
 :<- [::contact]
 (fn [contact]
   (:from contact)))

(re-frame/reg-sub
 ::to
 :<- [::contact]
 (fn [contact]
   (:to contact)))

(re-frame/reg-sub
 ::body-text
 :<- [::contact]
 (fn [contact]
   (:body-text contact)))

(re-frame/reg-sub
 ::recaptcha
 :<- [::contact]
 (fn [contact]
   (:recaptcha contact)))
