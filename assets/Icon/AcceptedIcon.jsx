import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const AcceptedIcon = () => {
  return (
    <View style={styles.container}>
      <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <Path
          d="M5.33334 17.1999L9.52382 21.9999L20 9.99994"
          stroke="#18B758"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M26.6669 10.0833L15.238 22.0833L14.6669 21.3333"
          stroke="#18B758"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AcceptedIcon;
