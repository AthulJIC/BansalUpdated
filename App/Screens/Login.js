import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet,ImageBackground,ScrollView,TouchableOpacity} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
const LoginPage = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSelected, setSelection] = useState(false);
  const [rememberSelect,setrememberSelect]=useState(false)
  const handleLogin = () => {
    navigation.navigate('Roles');
    console.log('pressed')
  };

  const handleForgotPassword = () => {
    // Implement your forgot password logic here
  };

  return (
    <ScrollView style={styles.container}>
        <ImageBackground
        source={require('../Assets/Images/Login.gif')} // Replace with your actual GIF path
        style={styles.backgroundImage}
      >
     <View style={styles.inputContainer}>
     <Text style={styles.LoginText}>Log In</Text>
      <TextInput
       placeholder="Unique ID/Login ID"
       placeholderTextColor="white" 
       value={username}
       onChangeText={setUsername}
       style={styles.input}
      />
     <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="white" 
        secureTextEntry
        style={styles.input}
      />
       <View style={styles.checkboxContainer}>
        <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
          boxType='square'
          tintColors={{ true: '#FFFFFF', false: '#848484' }}
        />
        <Text style={styles.label}>I agree to the <Text style={{textDecorationLine: 'underline'}}>Terms And Condition</Text></Text>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={rememberSelect}
          onValueChange={setrememberSelect}
          style={[styles.checkbox]}
          boxType='square'
          tintColors={{ true: '#FFFFFF', false: '#848484' }}
        />
        <Text style={styles.label}>Remember me</Text>
        </View>
        <View style={{marginTop:12,flexDirection:'column', justifyContent:'center'}}>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
      <Text  style={styles.buttonText}>Login</Text>
       </TouchableOpacity>
      
       <TouchableOpacity style={{ alignItems:'center'}}>
       <Text style={styles.forgotPassword}>Forgot Password</Text>
       </TouchableOpacity>
       </View>
      </View>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Adjust the resizeMode as needed
    justifyContent: 'center',
    alignItems: 'center',
    height:'100%'
  },
  LoginText:{
    color:'white',
    fontWeight:'500',
    fontFamily:'Poppins',
    padding:5,
    fontSize:19.2,
    lineHeight:28,
    height:38,
    marginBottom:10,
    width:328,
 },
  inputContainer:{
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width:'100%',
    height:'50%',
    marginTop:450,
    borderTopStartRadius:20,
    borderTopEndRadius:20,
    paddingLeft:16,
    paddingTop:32,
    paddingRight:16,
    paddingBottom:16
 },
  input: {
    width: '100%',
    marginBottom: 10,
    borderColor: '#848484',
    borderBottomWidth:2,
    // padding:10,
    color:'white',
    fontWeight:'400',
    alignItems:'flex-start',
    fontSize:16,
    lineHeight:24
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems:'center',
 },
  checkbox: {
    width:24,
    height:24,
    alignSelf: 'center',
    borderColor: 'green', 
  },
  label: {
    fontFamily:'Poppins',
    margin: 8,
    color:'white',
  },
  button: {
    backgroundColor: '#B1292C',
    borderRadius: 0,
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:4
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight:'500',
    fontFamily:'Poppins',
    lineHeight:24
   
  },
  forgotPassword:{
    fontFamily:'Poppins',
    fontWeight:'500',
    color:'#2B59C3',
    fontSize:16,
    lineHeight:24,
    height:24,
    marginTop:8,
    textDecorationLine: 'underline'
  }
});

export default LoginPage;
