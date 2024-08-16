import i18next from "i18next";
import Backend from "i18next-fs-backend";

i18next.use(Backend).init({
  fallbackLng: "en",
  lng: "en",
  backend: {
    loadPath: "./locales/{{lng}}/translation.json",
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
