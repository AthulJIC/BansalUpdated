import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [language, setLanguage] = useState(' '); 
  const [pointsValue,setPoints]=useState("")
  const [orderData, setOrderData] = useState([]); 
  const [isBookmarkDeleted, setIsBookmarkDeleted] = useState(false)
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
  const updateOrderData = (newData) => {
    setOrderData(newData);
  };
  const markBookmarkDeleted = (deleted) => {
    setIsBookmarkDeleted(deleted);
  }
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
        orderData,
        updateOrderData, 
        isBookmarkDeleted, 
        markBookmarkDeleted,
        // UpdateUserIdDetails,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
