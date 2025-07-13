import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          home: "Home",
          dashboard: "Dashboard",
          lang: "Language",
          login: "Login",
          logout: "Logout",
          welcome: "Welcome to MyApp",
          getStarted: "Get Started",
          myApp: "My App",
        },
      },
      ar: {
        translation: {
          home: "الرئيسية",
          dashboard: "لوحة التحكم",
          lang: "اللغة",
          login: "تسجيل الدخول",
          logout: "تسجيل الخروج",
          welcome: "مرحباً بكم في تطبيقي",
          getStarted: "ابدأ",
          myApp: "تطبيقي",
        },
      },
    },
  });

export default i18n;
