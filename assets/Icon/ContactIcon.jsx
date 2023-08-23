import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const ContactIcon = () => {
  return (
    <View style={styles.iconContainer}>
      <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
        <Path
          d="M15.5562 14.4062L15.1007 14.859C15.1007 14.859 14.0181 15.9355 11.0631 12.9972C8.10812 10.059 9.1907 8.98257 9.1907 8.98257L9.47752 8.69738C10.1841 7.99484 10.2507 6.86691 9.63424 6.04348L8.37326 4.35908C7.61028 3.33992 6.13596 3.20529 5.26145 4.07483L3.69185 5.63552C3.25823 6.06668 2.96765 6.62559 3.00289 7.24561C3.09304 8.83182 3.81071 12.2447 7.81536 16.2266C12.0621 20.4492 16.0468 20.617 17.6763 20.4651C18.1917 20.4171 18.6399 20.1546 19.0011 19.7954L20.4217 18.383C21.3806 17.4295 21.1102 15.7949 19.8833 15.128L17.9728 14.0894C17.1672 13.6515 16.1858 13.7801 15.5562 14.4062Z"
          fill="#B1292C"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    // Add any necessary styling for the icon container
  },
});

export default ContactIcon;