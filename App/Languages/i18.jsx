// Initialize i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { useAppContext } from '../context/AppContext';
import enTranslation from './en.json';
import hiTranslation from './hi.json';
const {language}=useAppContext
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      hi: { translation: hiTranslation },
    },
    lng: language,
    fallbackLng: 'en',
  });

export default i18n;
