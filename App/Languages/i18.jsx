// Initialize i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { useAppContext } from '../context/AppContext';
import enTranslation from './en.json';
import hiTranslation from './hi.json';
import { useContext } from 'react';
const {language}=useAppContext
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      hi: { translation: hiTranslation },
    },
    lng: language,
    fallbackLng: 'en', // Fallback language
  });

export default i18n;
