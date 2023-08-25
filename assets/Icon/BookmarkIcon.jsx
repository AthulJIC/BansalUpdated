import React from 'react';
import { View } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';

const BookmarkIcon = ({ width, height, color }) => {
  return (
    <View style={{ width, height }}>
      <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
        <Path
          d="M14 10.7274V7.39851C14 4.53943 14 3.1099 13.1213 2.2217C12.2426 1.3335 10.8284 1.3335 8 1.3335C5.17157 1.3335 3.75736 1.3335 2.87868 2.2217C2 3.1099 2 4.53943 2 7.39851V10.7274C2 12.7918 2 13.824 2.4894 14.275C2.72281 14.4901 3.01743 14.6253 3.33128 14.6612C3.98935 14.7365 4.75782 14.0568 6.29477 12.6974C6.97415 12.0965 7.31383 11.796 7.70685 11.7169C7.90038 11.6779 8.09962 11.6779 8.29315 11.7169C8.68617 11.796 9.02585 12.0965 9.70523 12.6974C11.2422 14.0568 12.0107 14.7365 12.6687 14.6612C12.9826 14.6253 13.2772 14.4901 13.5106 14.275C14 13.824 14 12.7918 14 10.7274Z"
          stroke={color}
          strokeWidth="1.5"
        />
        <Path
          d="M10 4H6"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
};

export default BookmarkIcon;