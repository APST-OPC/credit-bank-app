import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { I18NextProps } from "./type";
import { i18nextResource } from "./locale";
import LanguageDetector from "i18next-browser-languagedetector";
import { Platform } from "react-native";

const sysLng = typeof navigator !== "undefined" ? navigator.language : "en";

const i18 = Platform.OS === "web" ? i18next.use(LanguageDetector) : i18next;

i18.use(initReactI18next).init<I18NextProps>({
  lng: sysLng,
  fallbackLng: "en",
  debug: true,
  resources: i18nextResource,
});
