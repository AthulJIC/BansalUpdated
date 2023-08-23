import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const EditIcon = ({ width, height, color }) => {
  return (
    <View>
      <Svg width={width} height={height} viewBox="0 0 74 17" fill="none">
        <Path
          d="M2.66675 14.6666H13.3334"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* ...other path elements */}
      </Svg>
    </View>
  );
};

export default EditIcon;


