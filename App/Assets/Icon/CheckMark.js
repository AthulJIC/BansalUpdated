import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const CheckmarkIcon = () => {
  return (
    <View>
      <Svg width={32} height={32} viewBox="0 0 32 32" fill="none">
        <Path
          d="M24 8L8 24M8 24L8 12M8 24L20 24"
          stroke="#18B758"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

export default CheckmarkIcon;
