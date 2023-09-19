import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [language, setLanguage] = useState(' '); 
  const [pointsValue,setPoints]=useState("")

  const updateUserDetails = (userData) => {
    setUserDetails(userData);
  };
 const UserPoints=(points)=>{
  setPoints(points)
 }
  const updateSelectedProduct = (productData) => {
    setSelectedProduct(productData);
  };

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <AppContext.Provider
      value={{
        selectedProduct,
        updateSelectedProduct,
        userDetails,
        updateUserDetails,
        language,
        changeLanguage,
        UserPoints,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
