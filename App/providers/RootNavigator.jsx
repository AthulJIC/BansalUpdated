import React from 'react';

export const navigationRef = React.createRef(null);

export const navigate = (name, params) => {
  console.log('name', name);
  if (navigationRef.current) {
    navigationRef.current.navigate(name, params);
  }
};