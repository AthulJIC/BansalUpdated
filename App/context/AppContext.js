import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  const updateUserDetails = (userData) => {
    setUserDetails(userData);
  };

  const updateSelectedProduct = (productData) => {
    setSelectedProduct(productData);
  };

  return (
    <AppContext.Provider
      value={{
        selectedProduct,
        updateSelectedProduct,
        userDetails,
        updateUserDetails,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
