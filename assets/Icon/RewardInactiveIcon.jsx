import React from 'react';
import { Svg, Path } from 'react-native-svg';

const RewardInactiveIcon = ({ width, height, color }) => (
  <Svg width={width} height={height} viewBox="0 0 36 36" fill="none">
    <Path d="M33 18H3" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M18 3V33" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M19.5 18C19.5 21.3137 22.1863 24 25.5 24" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M16.5 18C16.5 21.3137 13.8137 24 10.5 24" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M18 15.0525C18 12.8177 19.521 10.8696 21.6891 10.3276C24.0947 9.72622 26.2737 11.9052 25.6723 14.3108C25.1302 16.4789 23.1822 17.9999 20.9474 17.9999H18V15.0525Z" stroke={color} strokeWidth="2" />
    <Path d="M17.9999 15.0525C17.9999 12.8177 16.4789 10.8696 14.3108 10.3276C11.9052 9.72622 9.72622 11.9052 10.3276 14.3108C10.8696 16.4789 12.8177 17.9999 15.0525 17.9999H17.9999V15.0525Z" stroke={color} strokeWidth="2" />
    <Path d="M3 18C3 10.9289 3 7.3934 5.1967 5.1967C7.3934 3 10.9289 3 18 3C25.0711 3 28.6066 3 30.8033 5.1967C33 7.3934 33 10.9289 33 18C33 25.0711 33 28.6066 30.8033 30.8033C28.6066 33 25.0711 33 18 33C10.9289 33 7.3934 33 5.1967 30.8033C3 28.6066 3 25.0711 3 18Z" stroke={color} strokeWidth="2" />
  </Svg>
);

export default RewardInactiveIcon;