import 'intl-pluralrules';
import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import fr from "../localization/fr.json"
import en from "../localization/en.json"
import pt from "../localization/pt.json"

export const languageResources = {
  fr: {
    translation: fr, // Make sure to specify the namespace "translation"
  },
  en: {
    translation: en,
  },
  pt: {
    translation: pt,
  },
}

i18n.use(initReactI18next)
    .init({
        compatibilityJSON:"v4",
        lng: "en",
        fallbackLng: "en",
        defaultNS: "translation",
        interpolation: {
            // We disable this because it's not required, given that react already scapes the text
            escapeValue: false
        },
        // Here you can add all your supported languages
        resources: languageResources
    })

export default i18n