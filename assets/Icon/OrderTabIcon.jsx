import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const OrderTabIcon = ({ width, height, color }) => {
  return (
    <View style={{ width, height }}>
      <Svg width={width} height={height} viewBox="0 0 36 36" fill="none">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18 33C10.9289 33 7.3934 33 5.1967 30.8033C3 28.6066 3 25.0711 3 18C3 10.9289 3 7.3934 5.1967 5.1967C7.3934 3 10.9289 3 18 3C25.0711 3 28.6066 3 30.8033 5.1967C33 7.3934 33 10.9289 33 18C33 25.0711 33 28.6066 30.8033 30.8033C28.6066 33 25.0711 33 18 33ZM18 12.375C18.6213 12.375 19.125 12.8787 19.125 13.5V16.875H22.5C23.1213 16.875 23.625 17.3787 23.625 18C23.625 18.6214 23.1213 19.125 22.5 19.125H19.125L19.125 22.5C19.125 23.1213 18.6213 23.625 18 23.625C17.3787 23.625 16.875 23.1213 16.875 22.5V19.125H13.5C12.8787 19.125 12.375 18.6214 12.375 18C12.375 17.3787 12.8787 16.875 13.5 16.875H16.875L16.875 13.5C16.875 12.8787 17.3787 12.375 18 12.375Z"
          fill={color}
        />
      </Svg>
    </View>
  );
};

export default OrderTabIcon;