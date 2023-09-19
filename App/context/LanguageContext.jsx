import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import i18n from '../Languages/i18';
import { useAppContext } from './AppContext';

const LanguageContext = createContext();

export const useLanguageContext = () => {
  return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('');
  const { changeLanguage } = useAppContext();

  const changeNewLanguage = async(newLanguage) => {
    setLanguage(newLanguage);
    await AsyncStorage.setItem('Language', newLanguage);
  };
  useEffect(() => {
    const fetchLanguageFromStorage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem('Language');
        if (storedLanguage) {
          setLanguage(storedLanguage);
          i18n.changeLanguage(storedLanguage === 'English' ? 'en' : 'hi')
          changeLanguage(i18n.language === 'en' ? 'en' : 'hi')
        } else {
          setLanguage('English'); // You can set any default language you prefer
        }
      } catch (error) {
        console.error('Error fetching language from AsyncStorage:', error);
      }
    };

    fetchLanguageFromStorage();
  }, []);
  return (
    <LanguageContext.Provider value={{ language, changeNewLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};