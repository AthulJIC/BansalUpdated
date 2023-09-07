import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet,ImageBackground,ScrollView,TouchableOpacity, Pressable} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useTranslation } from 'react-i18next';
import Config from '../../Config/config';
import axios from 'axios';
const apiUrl = `${Config.API_BASE_URL}`
console.log("apiUrl",apiUrl)
const LoginPage = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSelected, setSelection] = useState(false);
  const [rememberSelect,setrememberSelect]=useState(false)
  const { t } = useTranslation();
  
  const LoginAPI=()=>{
    axios.post(apiUrl + "/api/token/",
    {
      email: "john@example.com",
      password: "john",
    },
    {
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers if required
        Authorization:`Bearer`
      },
    }
    )
    .then(response => {
      // Handle successful response here
      console.log('Response Data:', response.data);
    })
    .catch(error => {
      // Handle error here
      console.error('Error:', error);
    });
  }
  const handleLogin = () => {
    navigation.navigate('Roles');
    console.log('pressed')
  };

  const handleForgotPassword = () => {
    // Implement your forgot password logic here
  };

  return (
        <ImageBackground
        source={require('../../../assets/Images/Login.gif')} // Replace with your actual GIF path
        style={styles.backgroundImage}>
     <View style={styles.inputContainer}>
     <Text style={styles.LoginText}>{t('login')}</Text>
      <TextInput
       placeholder={t('unique') + " / " + t('login')}
       placeholderTextColor="white" 
       value={username}
       onChangeText={setUsername}
       style={styles.input}
      />
     <TextInput
        placeholder={t('password')}
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
          tintColors={{ true: 'rgba(43, 89, 195, 1)', false: 'gray' }}
        />
        <Text style={styles.label}>{t('agree')} <Text style={{textDecorationLine: 'underline',fontFamily:'Poppins-Regular'}}>{t('terms')}</Text></Text>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={rememberSelect}
          onValueChange={setrememberSelect}
          style={[styles.checkbox]}
          boxType='square'
          tintColors={{ true: 'rgba(43, 89, 195, 1)', false: 'gray' }}
        />
        <Text style={styles.label}>{t('remember')}</Text>
        </View>
        <View style={{marginTop:12,flexDirection:'column', justifyContent:'center'}}>
      <Pressable style={styles.button} onPress={()=>{handleLogin();LoginAPI()}}>
      <Text  style={styles.buttonText}>{t('loginButton')}</Text>
       </Pressable>
      
       <Pressable style={{ alignItems:'center'}} onPress={() => navigation.navigate('ForgetPassword')}>
       <Text style={styles.forgotPassword}>{t('forgot')}</Text>
       </Pressable>
       </View>
      </View>
      </ImageBackground>
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
    fontFamily:'Poppins-Regular',
    padding:5,
    fontSize:20,
    marginLeft:10,
    marginTop:9
 },
 inputContainer: {
  width: '100%',
  borderTopStartRadius:20,
  borderTopEndRadius:20,
  position: 'absolute',
  bottom: 0,
  alignSelf:'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
  input: {
    width: '93%',
    height:50,
    marginBottom: 7,
    borderColor: '#848484',
    borderBottomWidth:2,
    color:'white',
    alignItems:'flex-start',
    fontSize:15,
    fontFamily: 'Poppins-Regular',
    alignSelf:'center'
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems:'center',
    marginLeft:6
 },
  checkbox: {
     height:20,
     width: 20, 
     transform: [{ scaleX: 1 }, { scaleY: 1 }],
     marginTop:5
  },
  label: {
    fontFamily:'Poppins-Regular',
    marginLeft:10,
    color:'white',
    fontSize:13,
    marginTop:9
  },
  button: {
    backgroundColor: '#B1292C',
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:4,
    height:45,
    width: '95%',
    alignSelf:'center'
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight:'500',
    fontFamily:'Poppins-Regular',
   fontSize:15
  },
  forgotPassword:{
    fontFamily:'Poppins-Regular',
    color:'#2B59C3',
    fontSize:15,
    marginTop:8,
    textDecorationLine: 'underline'
  }
});

export default LoginPage;

