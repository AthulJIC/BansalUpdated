import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const DownArrowIcon = () => {
  return (
    <View style={styles.container}>
      <Svg width={17} height={8} viewBox="0 0 16 8" fill="none">
        <Path
          d="M15 1L8 7L1 1"
          stroke="#393939"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DownArrowIcon;