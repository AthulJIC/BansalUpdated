import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const RolesButton = ({ label, navigation }) => {
  const handleButtonPress = () => {
    // Navigate to the specified route when the button is pressed
    navigation.navigate('Home screen',{ role: label });
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#B1292C', // Customize button style as needed
    padding: 10,
    height:180,
    width:'87%',
    paddingRight:20,
    paddingTop:20,
    paddingLeft:24,
    paddingBottom:20,
    borderRadius: 5,
    margin: 10,
    justifyContent:'center',
    borderRadius:10
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily:'Poppins-SemiBold',
    fontSize:22,
    lineHeight:32
  },
});

export default RolesButton;
