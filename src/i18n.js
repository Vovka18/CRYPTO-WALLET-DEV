import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpApi) // Подключаем загрузку переводов
  .use(LanguageDetector) // Подключаем автоопределение языка
  .use(initReactI18next) // Инициализация react-i18next
  .init({
    fallbackLng: 'ua', // Язык по умолчанию
    debug: true,
    interpolation: {
      escapeValue: false, // React уже выполняет экранирование
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Путь к файлам переводов
    },
  });

export default i18n;
