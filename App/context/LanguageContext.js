import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguageContext = () => {
  return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('English'); // Default language is English

  const changeNewLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, changeNewLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};