import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const HomeInactiveIcon = () => (
  <View style={styles.container}>
    <Svg
      width="27"
      height="27"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M3 18.3059C3 14.8732 3 13.1569 3.7788 11.7341C4.5576 10.3113 5.98042 9.42827 8.82605 7.66219L11.826 5.80031C14.8341 3.93344 16.3381 3 18 3C19.6619 3 21.1659 3.93343 24.1739 5.8003L27.1739 7.66219C30.0196 9.42827 31.4424 10.3113 32.2212 11.7341C33 13.1569 33 14.8732 33 18.3059V20.5874C33 26.4388 33 29.3644 31.2426 31.1822C29.4853 33 26.6569 33 21 33H15C9.34315 33 6.51472 33 4.75736 31.1822C3 29.3644 3 26.4388 3 20.5874V18.3059Z"
        stroke="white"
        strokeWidth="2"
      />
      <Path
        d="M22.5 27H13.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeInactiveIcon;
