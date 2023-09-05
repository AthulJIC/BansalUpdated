import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [language, setLanguage] = useState(' '); // Default language is English

  const updateUserDetails = (userData) => {
    setUserDetails(userData);
  };

  const updateSelectedProduct = (productData) => {
    setSelectedProduct(productData);
  };

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };
 console.log('i18',language)
  return (
    <AppContext.Provider
      value={{
        selectedProduct,
        updateSelectedProduct,
        userDetails,
        updateUserDetails,
        language,
        changeLanguage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
