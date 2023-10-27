import React, {  useCallback, useEffect, useState } from 'react';
import { View, TextInput, Text, StyleSheet,ImageBackground,TouchableOpacity, Pressable, Keyboard, BackHandler,Alert} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useTranslation } from 'react-i18next';
import {LoginApi}  from '../../service/login/loginservice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ErrorIcon from '../../../assets/Icon/ErrorIcon';
import LoadingIndicator from '../../Components/LoadingIndicator';
import Icon from 'react-native-vector-icons/FontAwesome';
import NetInfo from '@react-native-community/netinfo';
import { useFocusEffect } from '@react-navigation/native';

const LoginPage = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const [rememberSelect,setrememberSelect]=useState(false);
  const [checkboxError, setCheckBoxError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();
  console.log('checkbox', rememberSelect)
  useFocusEffect(
    React.useCallback(() => {
      const addInputValues = async () => {
        const savedIsSelected = await AsyncStorage.getItem('isSelected');
        console.log('savedIsSelected', savedIsSelected)
        if (savedIsSelected === 'true') {
          setSelection(true);
        }
        else{
          setSelection(false);
        }
        const savedRememberMe = await AsyncStorage.getItem('RememberMe');
        const savedloginId = await AsyncStorage.getItem('loginId');
        console.log('savedRememberMe====', savedRememberMe)
        if(savedRememberMe === 'true'){
          setrememberSelect(true);
          setUsername(savedloginId);
        }
        else{
          setrememberSelect(false);
          setUsername('');
          setPassword('');
        }
      }
      addInputValues();
    }, [])
  );
  useEffect(() => {
    const backAction = async() => {
     // await AsyncStorage.setItem('LastScreen', 'Login');
      await AsyncStorage.setItem('isSelected', 'false');
      
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        // Show an alert if there is no internet connectivity
        Alert.alert(
          'No Internet Connection',
          'Please check your internet connection and try again.',
          [{ text: 'OK' }]
        );
      }
    });

    return () => {
      unsubscribe(); // Unsubscribe from the NetInfo event listener when the component unmounts
    };
  }, []);
  const LoginAPI=()=>{
    Keyboard.dismiss();
    let isValid= true;
    if(!username){
      setNameError(true)
      isValid = false
    }
    if(!password){
      setPasswordError(true);
      isValid = false
    }
    if(!isSelected){
      setCheckBoxError(true);
      isValid = false;
    }
    if(isValid){
      getUserHandler();
      
    }
    
  }
  async function getUserHandler() {
    if (rememberSelect) {
      await AsyncStorage.setItem('loginId', username);
      await AsyncStorage.setItem('RememberMe', "true")
    }
    else{
      await AsyncStorage.setItem('loginId', '');
      await AsyncStorage.setItem('RememberMe', "false")
    }
    loginHandler() 
}
async function loginHandler(){
  
  setIsLoading(true)
  NetInfo.fetch().then(state => {
    if (state.isConnected) {
      const data ={
        email: username,
        password: password
      }
      console.log('data', data)
      LoginApi.userLogin(data).then(async(res) => {
       console.log('res', res.data);
        if(res.status === 200){
          await AsyncStorage.setItem('access_token', res.data.access);
          await AsyncStorage.setItem('refresh_token', res.data.refresh);
          await AsyncStorage.setItem('mobile_no', res.data.mobile);
          await AsyncStorage.setItem('role', res.data.role);
          await AsyncStorage.setItem('username', res.data.username);
          await AsyncStorage.setItem('email', res.data.email)
          await AsyncStorage.setItem('isLoggedIn', "true");
          await AsyncStorage.setItem('isSelected', isSelected.toString());
          setIsLoading(false)
          await navigation.navigate('Homescreen');
          setNameError(false);
          setPasswordError(false);
          setCheckBoxError(false)
          
        }
         
       
      }).catch((err) => {
          setIsLoading(false)
      })
    } else {
      setIsLoading(false)
      Alert.alert(
        'No Internet Connection',
        'Please check your internet connection and try again.',
        [{ text: 'OK' }]
      );
    }
  });
 
 
}

const togglePasswordVisibility = () => {
  setShowPassword(!showPassword);
};
async function toggleCheckbox () {
  setSelection(!isSelected);
  await AsyncStorage.setItem('isSelected', (!isSelected).toString());
};
async function rememberCheckbox(){
   setrememberSelect(!rememberSelect);
   await AsyncStorage.setItem('RememberMe', (!rememberSelect).toString());
   const savedRememberMe = await AsyncStorage.getItem('RememberMe');
   console.log('savedRemember', savedRememberMe)
}
async function handlePassword(text){
   setPassword(text);
}
async function handleUsername(text){
  setUsername(text);
}
  return (
        <ImageBackground
        source={require('../../../assets/Images/Login.gif')}
        style={styles.backgroundImage}>
     <View style={styles.inputContainer}>
     <Text style={styles.LoginText}>{t('login')}</Text>
      <TextInput
       placeholder={t('unique') + " / " + t('loginId')}
       placeholderTextColor="white" 
       value={username}
       onChangeText={text => {handleUsername(text)}}
       style={styles.input}
       onPressIn={() => setNameError(false)}
      />
      {
        nameError && (
          <View style={{flexDirection:'row',marginLeft:15}}>
            <ErrorIcon/>
            <Text style={{color:'red',marginLeft:5}}>This field is required</Text>
          </View>
        )
      }
      <View>
      <TextInput
        placeholder={t('password')}
        value={password}
        onChangeText={text => {handlePassword(text)}}
        placeholderTextColor="white"
        secureTextEntry={!showPassword}
        style={styles.input}
        onPressIn={() => setPasswordError(false)}
      />
      <TouchableOpacity
        onPress={togglePasswordVisibility}
        style={{ position: 'absolute', right: 25, top: 15 }}
      >
        <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} color="gray" />
      </TouchableOpacity>
    </View>
      {
        passwordError && (
          <View style={{flexDirection:'row',marginLeft:15}}>
            <ErrorIcon/>
            <Text style={{color:'red',marginLeft:5}}>This field is required</Text>
          </View>
        )
      }
       <View style={styles.checkboxContainer}>
        <CheckBox
          value={isSelected}
          onValueChange={toggleCheckbox}
          style={styles.checkbox}
          boxType='square'
          tintColors={{ true: 'rgba(43, 89, 195, 1)', false: !checkboxError ? 'gray' :  'red'}}
        />
        <Text style={styles.label}>{t('agree')} <Text style={{textDecorationLine: 'underline',fontFamily:'Poppins-Regular'}}>{t('terms')}</Text></Text>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={rememberSelect}
          onValueChange={rememberCheckbox}
          style={[styles.checkbox]}
          boxType='square'
          tintColors={{ true: 'rgba(43, 89, 195, 1)', false: 'gray' }}
        />
        <Text style={styles.label}>{t('remember')}</Text>
        </View>
        <View style={{marginTop:12,flexDirection:'column', justifyContent:'center'}}>
      <Pressable style={styles.button} onPress={LoginAPI}>
      <Text  style={styles.buttonText}>{t('loginButton')}</Text>
       </Pressable>
      
       <Pressable style={{ alignItems:'center'}} onPress={() => navigation.navigate('ForgetPassword',{text : 'Reset Password'})}>
       <Text style={styles.forgotPassword}>{t('forgot')}</Text>
       </Pressable>
       </View>
      </View>
      <LoadingIndicator visible={isLoading} text="Loading..."/>
      </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
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
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
},
  input: {
    width: '90%',
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
    marginLeft:7,
    width:'90%'
 },
  checkbox: {
     height:20,
     width: 20, 
     transform: [{ scaleX: 1 }, { scaleY: 1 }],
     marginTop:5,
     marginHorizontal: 7
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
    width: '90%',
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

