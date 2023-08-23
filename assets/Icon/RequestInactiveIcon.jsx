import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const RequestInactiveIcon = ({ width, height, color }) => {
  return (
    <View>
      <Svg width={width} height={height} viewBox="0 0 37 36" fill="none">
        <Path
          d="M3.66669 18C3.66669 10.9289 3.66669 7.3934 5.86339 5.1967C8.06009 3 11.5956 3 18.6667 3C25.7378 3 29.2733 3 31.47 5.1967C33.6667 7.3934 33.6667 10.9289 33.6667 18C33.6667 25.0711 33.6667 28.6066 31.47 30.8033C29.2733 33 25.7378 33 18.6667 33C11.5956 33 8.06009 33 5.86339 30.8033C3.66669 28.6066 3.66669 25.0711 3.66669 18Z"
          stroke={color}
          strokeWidth="2"
        />
        <Path
          d="M9.66669 23.7L11.381 25.5L15.6667 21"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M9.66669 13.2L11.381 15L15.6667 10.5"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M20.1667 13.5L27.6667 13.5"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <Path
          d="M20.1667 24H27.6667"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
};

export default RequestInactiveIcon;