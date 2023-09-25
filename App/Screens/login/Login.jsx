import React, { useCallback, useEffect, useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet,ImageBackground,ScrollView,TouchableOpacity, Pressable, Keyboard, BackHandler} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useTranslation } from 'react-i18next';
import {LoginApi}  from '../../service/login/loginservice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ErrorIcon from '../../../assets/Icon/ErrorIcon';
import { useNavigationState } from '@react-navigation/native';
import LoadingIndicator from '../../Components/LoadingIndicator';

const LoginPage = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const [rememberSelect,setrememberSelect]=useState(false);
  const [checkboxError, setCheckBoxError] = useState(false);
  const navIndex = useNavigationState(state => state.index);
  const [backPressCount, setBackPressCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  // useEffect (() => {
    
  //   AddInputValues();
  // },[])
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
      await AsyncStorage.setItem('password', password);
    }
    else{
      await AsyncStorage.setItem('loginId', '');
      await AsyncStorage.setItem('password', '');
    }
    loginHandler() 
}
function loginHandler(){
  setIsLoading(true)
  const data ={
    email: username,
    password: password
  }
  AddInputValues()
  LoginApi.userLogin(data).then(async(res) => {
    // console.log('resss', res.data)
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
      navigation.navigate('Home screen')
    }

  })
}

const handleBackPress = useCallback(() => {
  if (backPressCount === 0) {
    setBackPressCount(prevCount => prevCount + 1);
    // setTimeout(() => setBackPressCount(0), 2000);
    // ToastAndroid.show(AlertMsg.AppExitToast, ToastAndroid.SHORT);
  } else if (backPressCount === 1) {
    BackHandler.exitApp();
  }
  return true;
}, [backPressCount]);

useEffect(() => {
  if (Platform.OS === 'android' && navIndex === 1) {
    const backListener = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );
    return () => backListener.remove();
  }       
}, [handleBackPress]);

async function AddInputValues() {
  const savedloginId = await AsyncStorage.getItem('loginId');
  const savedPassword = await AsyncStorage.getItem('password');
  const savedIsSelected = await AsyncStorage.getItem('isSelected');
  if (savedIsSelected) setSelection(savedIsSelected === 'true');
  if ((savedloginId != null && savedloginId != undefined) && (savedPassword != null && savedPassword != undefined)) {
    setrememberSelect(true);
    setUsername(savedloginId);
    setPassword(savedPassword);
  } else {
    setrememberSelect(false);
    setUsername(savedloginId);
    setPassword(savedPassword);
  }
}
// if (isLoading) {
//   return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'white' }}>
//           <ActivityIndicator size="large" color="rgba(177, 41, 44, 1)" />
//       </View>
//   );
// }
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
     <TextInput
        placeholder={t('password')}
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="white" 
        secureTextEntry
        style={styles.input}
        onPressIn={() => setPasswordError(false)}
      />
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
          onValueChange={setSelection}
          style={styles.checkbox}
          boxType='square'
          tintColors={{ true: 'rgba(43, 89, 195, 1)', false: !checkboxError ? 'gray' :  'red'}}
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

