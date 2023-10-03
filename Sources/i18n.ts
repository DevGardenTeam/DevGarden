import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import fr from "./localization/fr.json"
import en from "./localization/en.json"
import pt from "./localization/pt.json"
import * as Localization from "expo-localization";

const getLangCode = () => {
  const code = Localization.getLocales().shift();
  if (!code) return "en";
  return code.languageCode;
};

i18n.use(initReactI18next)
    .init({
        compatibilityJSON:"v4",
        lng: getLangCode(),
        fallbackLng: "en",
        defaultNS: "translation",
        interpolation: {
            // We disable this because it's not required, given that react already scapes the text
            escapeValue: false
        },
        // Here you can add all your supported languages
        resources: {
            fr: {
              translation: fr, // Make sure to specify the namespace "translation"
            },
            en: {
              translation: en,
            },
            pt: {
              translation: pt,
            },
          },
    })

export default i18n