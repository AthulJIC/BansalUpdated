import React from 'react';
import { View, StyleSheet } from 'react-native';
import RolesButton from './RolesButton';

const RolesScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Use the CustomButton component with different props */}
      <RolesButton label="Contractor" navigation={navigation} />
      <RolesButton label="Distributor" navigation={navigation} />
      <RolesButton label="Engineer/Architect" navigation={navigation} />
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
export default RolesScreen;
