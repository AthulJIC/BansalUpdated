import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const BackArrowIcon = ({ width, height, color }) => {
  return (
    <View>
      <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
        <Path
          d="M20 12H4M4 12L10 6M4 12L10 18"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

export default BackArrowIcon;