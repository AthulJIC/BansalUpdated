import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Ellipse, Path } from 'react-native-svg';

const LeadAcceptedIcon = () => {
  return (
    <View>
      <Svg width={32} height={32} viewBox="0 0 32 32" fill="none">
        <Ellipse
          cx="16.0003"
          cy="7.99984"
          rx="5.33333"
          ry="5.33333"
          stroke="#18B758"
          strokeWidth="2"
        />
        <Path
          d="M19.9997 17.7696C18.7644 17.4884 17.4142 17.3335 15.9997 17.3335C10.1086 17.3335 5.33301 20.0198 5.33301 23.3335C5.33301 26.6472 5.33301 29.3335 15.9997 29.3335C23.5829 29.3335 25.775 27.9758 26.4087 26.0002"
          stroke="#18B758"
          strokeWidth="2"
        />
        <Ellipse
          cx="24.0003"
          cy="21.3333"
          rx="5.33333"
          ry="5.33333"
          stroke="#18B758"
          strokeWidth="2"
        />
        <Path
          d="M24 19.5557V23.1112"
          stroke="#18B758"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M22.2217 21.3335L25.7772 21.3335"
          stroke="#18B758"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};


export default LeadAcceptedIcon;