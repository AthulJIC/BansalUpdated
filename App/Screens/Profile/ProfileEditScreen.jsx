import {View,TextInput,StyleSheet, Text, Pressable, Keyboard, ToastAndroid} from 'react-native';
import { useEffect, useState } from 'react';
import PenIcon from '../../../assets/Icon/PenIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProfileApi } from '../../service/profile/profileservice';
import ErrorIcon from '../../../assets/Icon/ErrorIcon';
import LoadingIndicator from '../../Components/LoadingIndicator';
import useBackButtonHandler from '../../Components/BackHandlerUtils';

const ProfileEditScreen = ({navigation}) => {
    const [userName, setUserName] = useState();
    const [emailid, setEmailId] = useState();
    const [mobile, setMobile] = useState();
    const [userError, setUserError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    //useBackButtonHandler(navigation, false);
    function saveHandler(){
        setIsLoading(true)
        Keyboard.dismiss()
        let isValid = true;
        console.log('user', userName);
        const regex = /^[a-zA-Z][a-zA-Z ]*$/;
        if(userName === ' ' || !regex.test(userName) || !userName){
            setUserError(true)
           isValid = false;
           setIsLoading(false)
        }
        if(isValid){
            const data = {
                name: userName
            }
           ProfileApi.updateUserName(data).then(async(res) => {
                if(res.status === 200){
                    await AsyncStorage.setItem('username', res.data.name);
                   setIsLoading(false)
                   ToastAndroid.show('Name updated successfully', ToastAndroid.SHORT);
                   navigation.navigate('Profile')
                }
           }).catch((err) => {
          })
          .finally(() => {
            setIsLoading(false);
          });
        }
    }
    useEffect(() => {
        const getValueFromStorage = async () => {
          try {
            const name = await AsyncStorage.getItem('username');
            const userEmail = await AsyncStorage.getItem('email')
            const mobileNo = await AsyncStorage.getItem('mobile_no')
            setUserName(name)
            setEmailId(userEmail)
            setMobile(mobileNo)
          } catch (error) {
            console.error('Error fetching data from AsyncStorage:', error);
          }
        };
        getValueFromStorage();
      }, []);
   
    function onChangeHandler(){
        navigation.navigate('ForgetPassword',{ text : 'Make Changes'})
    }
    return(
        <View style={styles.container}>
            <TextInput
                style={[styles.input,{borderColor: userError ? 'red':'black' }]}
                onChangeText={(value) => setUserName(value)}
                value={userName}
                onPressIn={() => setUserError(false)}
                maxLength={20}
                //keyboardType='ascii-capable'
            />
            {
                userError && (
                <View style={{flexDirection:'row',marginLeft:15}}>
                    <ErrorIcon/>
                    <Text style={{color:'red',marginLeft:5}}>Please enter valid name!</Text>
                </View>
                )
            }
            <View style={styles.inputContainer}>
                <Text style={{color:'rgba(57, 57, 57, 1)',fontSize:16,fontFamily:'Poppins-Regular'}}>{emailid}</Text>
                <Pressable style={{flexDirection:'row', justifyContent:'flex-end'}} onPress={onChangeHandler}>
                    <PenIcon width={18} height={18} color='#2B59C3'/>
                    <Text style={{color:'#2B59C3',fontSize:14,marginLeft:4,fontFamily:'Poppins-Regular'}}>Change</Text>
                </Pressable>
            </View>
            <View style={styles.inputContainer}>
                <Text style={{color:'rgba(57, 57, 57, 1)',fontSize:16,fontFamily:'Poppins-Regular'}}>{mobile}</Text>
                <Pressable style={{flexDirection:'row', justifyContent:'flex-end'}} onPress={onChangeHandler}>
                    <PenIcon width={18} height={18} color='#2B59C3'/>
                    <Text style={{color:'#2B59C3',fontSize:14,marginLeft:4,fontFamily:'Poppins-Regular'}}>Change</Text>
                </Pressable>
            </View>
            <View style={styles.modalButtonContainer}>
                <Pressable onPress={saveHandler} style={{ marginBottom: 10, borderRadius: 5, width: '100%', backgroundColor: 'rgba(177, 41, 44, 1)', alignItems: 'center', height: 48, radius: 4, padding: 12 }} >
                    <Text style={{ fontFamily: 'Poppins-Regular', fontWeight: '500', fontSize: 16, lineHeight: 24, color: '#ffffff', height: 24 }}>
                        Save
                    </Text>
                </Pressable>
            </View>
            {isLoading && <LoadingIndicator visible={isLoading} text='Loading...'/>}
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    input: {
        height: 50,
        margin: 7,
        borderWidth: 0.7,
        padding: 10,
        borderRadius:5,
        fontSize:15,
        fontFamily:'Poppins-Regular',
        color:'rgba(57, 57, 57, 1)',
        width:'93%',
        alignSelf:'center'
    },
    inputContainer:{
        height: 50,
        margin: 12,
        borderWidth: 0.7,
        padding: 10,
        borderRadius:5,
        backgroundColor:'rgba(132, 132, 132, 0.3)',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    modalButtonContainer: {
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        alignSelf:'center'
    }
})
export default ProfileEditScreen;