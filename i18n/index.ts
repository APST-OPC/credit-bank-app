// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";
// // import Backend from "i18next-http-backend";
// import LanguageDetector from "i18next-browser-languagedetector";

// import translation from "./locales";

// const systemLanguage = navigator.language.replace("-", "");
// console.log("System Language", systemLanguage);

// const i18nConfig = {
//   resources: translation,
//   fallbackLng: "en",
//   lng: systemLanguage,
//   interpolation: {
//     escapeValue: false,
//   },
// };

// i18n.use(LanguageDetector).use(initReactI18next).init(i18nConfig);

// export default i18n;
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { I18NextProps } from "./type";
import { i18nextResource } from "./locale";
import LanguageDetector from "i18next-browser-languagedetector";

const systemLanguage =
  typeof navigator !== "undefined" ? navigator.language : "en";
i18next.use(LanguageDetector).use(initReactI18next).init<I18NextProps>({
  lng: systemLanguage,
  fallbackLng: "en",
  debug: true,
  resources: i18nextResource,
});
