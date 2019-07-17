import i18n from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";
import common_fr from "./locales/fr.json"
import common_de from "./locales/de.json"
import common_en from "./locales/en.json"

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  fr: {
    common:  common_fr
  },
  de: {
    common:  common_de
  },
  en: {
    common:  common_en
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    resources,
    //lng: "fr",

    keySeparator: ".", // we do not use keys in form messages.welcome

    fallbackLng: 'fr',

    interpolation: {
      escapeValue: false // react already safes from xss
    },

    ns: ['common'],

    defaultNS: 'common',
  
    react: {
      wait: false,
      bindI18n: 'languageChanged loaded',
      bindStore: 'added removed',
      nsMode: 'default'
    }

  });

  export default i18n;