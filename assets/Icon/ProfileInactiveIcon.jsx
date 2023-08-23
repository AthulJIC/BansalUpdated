import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

const ProfileInactiveIcon = ({ width, height, color }) => {
  return (
    <View>
      <Svg width={width} height={height} viewBox="0 0 36 36" fill="none">
        <Circle cx="18" cy="9" r="6" stroke={color} strokeWidth={2} />
        <Path
          d="M30 26.25C30 29.9779 30 33 18 33C6 33 6 29.9779 6 26.25C6 22.5221 11.3726 19.5 18 19.5C24.6274 19.5 30 22.5221 30 26.25Z"
          stroke={color}
          strokeWidth={2}
        />
      </Svg>
    </View>
  );
};

export default ProfileInactiveIcon;