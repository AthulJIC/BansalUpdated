import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const RejectedIcon = () => {
  return (
    <View style={styles.container}>
      <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <Path
          d="M25.3332 6.66673L6.66666 25.3333M6.66658 6.66666L25.3332 25.3332"
          stroke="#EB1C1C"
          stroke-width="2"
          stroke-linecap="round"
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

export default RejectedIcon;