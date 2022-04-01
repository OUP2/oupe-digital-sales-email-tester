import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import packageJSON from "../../package.json";

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(Backend)
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: process.env.NODE_ENV === "production" ? false : true,
    fallbackLng: "en",
    backend: {
      loadPath:
        process.env.NODE_ENV === "production" && packageJSON.homepage
          ? `${packageJSON.homepage}/locales/{{lng}}/{{ns}}.json`
          : "/locales/{{lng}}/{{ns}}.json",
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
