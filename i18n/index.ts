import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { I18NextProps } from "./type";
import { i18nextResource } from "./locale";

i18next.use(initReactI18next).init<I18NextProps>({
  lng: "en",
  fallbackLng: "en",
  debug: true,
  resources: i18nextResource,
});
