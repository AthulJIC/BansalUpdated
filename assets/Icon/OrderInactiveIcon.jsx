import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const OrderInactiveIcon = ({ width, height }) => {
  return (
    <View>
      <Svg width={width} height={height} viewBox="0 0 36 36" fill="none">
        <Path
          d="M3 18C3 10.9289 3 7.3934 5.1967 5.1967C7.3934 3 10.9289 3 18 3C25.0711 3 28.6066 3 30.8033 5.1967C33 7.3934 33 10.9289 33 18C33 25.0711 33 28.6066 30.8033 30.8033C28.6066 33 25.0711 33 18 33C10.9289 33 7.3934 33 5.1967 30.8033C3 28.6066 3 25.0711 3 18Z"
          stroke="white"
          strokeWidth="2"
        />
        <Path
          d="M22.5 18L18 18M18 18L13.5 18M18 18L18 13.5M18 18L18 22.5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
};

export default OrderInactiveIcon;