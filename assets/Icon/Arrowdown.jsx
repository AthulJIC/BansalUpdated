import React from 'react';
import { Svg, Path } from 'react-native-svg';

const ArrowDown = ({ width, height, color }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 32 32" fill="none">
      <Path
        d="M24 8L8 24M8 24L8 12M8 24L20 24"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ArrowDown;