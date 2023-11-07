import {View,Text, StyleSheet, Pressable,Alert, ScrollView} from 'react-native'
import LanguageIcon from '../../../assets/Icon/LanguageIcon'
import ContactIcon from '../../../assets/Icon/ContactIcon'
import AboutIcon from '../../../assets/Icon/AboutIcon'
import PrivacyIcon from '../../../assets/Icon/PrivacyIcon'
import PenIcon from '../../../assets/Icon/PenIcon'
import RightArrowIcon from '../../../assets/Icon/RightArrowIcon'
import BookMarkActiveIcon from '../../../assets/Icon/BookmarkActiveIcon'
import HistoryIcon from '../../../assets/Icon/HistoryIcon'
import AddressIcon from '../../../assets/Icon/AddressIcon'
import { CommonActions, useFocusEffect, useNavigation } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ProfileApi } from '../../service/profile/profileservice'
import { useTranslation } from 'react-i18next';
import LoadingIndicator from '../../Components/LoadingIndicator';
import useBackButtonHandler from '../../Components/BackHandlerUtils';

const Profile =({route})=>{
    const [role, setRole] = useState();
    const [name, setName] = useState();
    const [emailid, setEmailId] = useState();
    const [ refreshToken, setRefreshToken] = useState()
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();
    let navigation = useNavigation();
    useBackButtonHandler(navigation, false);
    let profileData=[
       
        {
            id:4,
            title:t('languages'),
            image: <LanguageIcon width={20} height={20} color='rgba(177, 41, 44, 1)'/>,
            arrowImage: <RightArrowIcon width={24} height={24} color="#393939"/>,
            navigation : () => navigation.navigate('Language')
        },
        {
            id:5,
            title:t('contact us'),
            image:<ContactIcon/>,
            arrowImage: <RightArrowIcon width={24} height={24} color="#393939"/>,
            navigation : () => navigation.navigate('Contact')
        },
        {
            id:6,
            title:t('about us'),
            image:<AboutIcon/>,
            arrowImage: <RightArrowIcon width={24} height={24} color="#393939"/>,
            navigation : () => navigation.navigate('About')
        },
        {
            id:7,
            title:t('privacy policy'),
            image: <PrivacyIcon/>,
            arrowImage: <RightArrowIcon width={24} height={24} color="#393939"/>,
            navigation : () => navigation.navigate('Privacy')
        }
    ]
    if(role === 'Distributor'){
        profileData =[
            ...profileData
        ] ;
    }
    else{
        profileData = [
           
            {
                id:1,
                title:t('favourites'),
                image: <BookMarkActiveIcon width={20} height={20} color='rgba(177, 41, 44, 1)'/>,
                arrowImage: <RightArrowIcon width={24} height={24} color="#393939"/>,
                navigation : () => navigation.navigate('FavouritesScreen')
            },
            {
                id:2,
                title:t('history'),
                image: <HistoryIcon/>,
                arrowImage: <RightArrowIcon width={24} height={24} color="#393939"/>,
                navigation : () => navigation.navigate('HistoryScreen')
            },
            {
                id:3,
                title:t('addresses'),
                image: <AddressIcon />,
                arrowImage: <RightArrowIcon width={24} height={24} color="#393939"/>,
                navigation : () => navigation.navigate('AddressList',{
                    fromProfile: true,
                })
            },
            ...profileData,
           
        ]
    }
    useFocusEffect(
        useCallback(() => {
          const getValueFromStorage = async () => {
            setIsLoading(true);
            try {
              const user = await AsyncStorage.getItem('role');
              const userName = await AsyncStorage.getItem('username');
              const userEmail = await AsyncStorage.getItem('email');
              const refresh = await AsyncStorage.getItem('refresh_token');
      
              let newRole = user;
              let newUserName = userName;
              let newUserEmail = userEmail;
              let newRefreshToken = refresh;
      
              if (
                newRole !== role ||
                newUserName !== name ||
                newUserEmail !== emailid ||
                newRefreshToken !== refreshToken
              ) {
                setRole(newRole);
                setName(newUserName);
                setEmailId(newUserEmail);
                setRefreshToken(newRefreshToken);
              }
      
              setIsLoading(false);
            } catch (error) {
              console.error('Error fetching data from AsyncStorage:', error);
              setIsLoading(false);
            }
          };
          getValueFromStorage();
        }, [role, name, emailid, refreshToken])
      );
function loginHandler(){
    Alert.alert(
        'Logout',
        'Are you sure you want to exit?',[
        {
            text: "No",
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
        },
        {
            text: "Yes", 
            onPress:() => {
                setIsLoading(true)
                const data = {
                    refresh : refreshToken
                }
                console.log('data', data);
                ProfileApi.logout(data).then(async(res) => {
                    console.log('res', res.data);
                    if(res.status === 200){
                        await AsyncStorage.removeItem('access_token')
                        await AsyncStorage.removeItem('isLoggedIn');
                        await AsyncStorage.removeItem('mobile_no');
                        await AsyncStorage.removeItem('role');
                        await AsyncStorage.removeItem('username');
                        await AsyncStorage.removeItem('email')
                        setIsLoading(false)
                        navigation.dispatch(
                            CommonActions.reset({
                              index: 0,
                              routes: [
                                { name: 'Login' }, // Navigate to the login screen
                              ],
                            })
                          );
                    }
                }).catch((err) => {
                })
                  .finally(() => {
                    setIsLoading(false);
                });
            }
        },
      ]);
    
    
}
    return (
    <ScrollView style={styles.container}>
        <View style={styles.profileView}>
           <Text style={styles.profileShortName}>{name?.slice(0, 2).toUpperCase() || ''}</Text>
        </View>
            <View style={{flexDirection:'row', alignItems:'center',justifyContent:'center',marginTop:10}}>
                <Text style={styles.profileName}>{name}</Text>
                <Pressable onPress={() => navigation.navigate('ProfileEdit',{name:name})}>
                    <PenIcon height={18} width={18} color='rgb(0,0,0)'></PenIcon>
                </Pressable>
            </View>
        <Text style={styles.emailid}>{emailid}</Text>
        <View style={{marginTop:20}}>
          {profileData.map((data,index) => {
            return(
                <Pressable key={index} style={styles.listContainer} onPress={data.navigation}>
                    <View style={styles.iconContainer}>
                      {data.image}
                    </View>
                    <Text style={styles.listTitle}>{data.title}</Text>
                    {data.arrowImage}
                </Pressable>
            
            )
          })}
        </View>
        <Pressable style={styles.logoutButton} onPress={loginHandler}>
            <Text style={styles.logoutText}>{t("logout")}</Text>
        </Pressable>
        {isLoading && <LoadingIndicator visible={isLoading} text='Loading...'></LoadingIndicator>}
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#ffff',
        flex:1,
    },
    profileView:{
        width: '25%',
        height: 93,
        borderRadius: 50, 
        backgroundColor:'#B6B6B6',
        alignSelf:'center',
        marginTop:20,
        alignItems:'center',
        justifyContent:'center'
    },
    profileShortName:{
        color:'#393939',
        fontSize:25,
        fontWeight:'bold'
    },
    profileName:{
        fontSize:18,
        color:'#393939',
        fontFamily: 'Poppins-Medium',
        textAlign:'center',
        marginHorizontal:5
    },
    penIcon:{
        width: 37,
        height:37,
    },
    emailid:{
        fontSize:12,
        fontFamily : 'Poppins-Regular',
        textAlign:'center',
        color:'rgba(132, 132, 132, 1)'
    },
    listContainer:{
        width:'90%',
        height:60,
        backgroundColor:'white',
        elevation: 5,
        marginTop:15,
        alignSelf:'center',
        borderRadius:8,
        justifyContent:'flex-start',
        flexDirection:'row',
        alignItems:'center'
    },
    listTitle:{
        color:'#393939',
        marginLeft:19,
        fontSize:15,
        fontFamily:'Poppins-Medium'
    },
    listImage:{
        height:40,
        width:'12%',
        marginLeft:10,
        borderRadius:8

    },
    arrowImage:{
        width:'10%',
        height:15,
        position:'absolute',
        right: 10, 
    },
    logoutButton:{
        backgroundColor:'#B1292C',
        height:45,
        width:'90%',
        marginTop:18,
        borderRadius:4,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:20
    },
    logoutText:{
        color: '#FFFFFF',
        fontSize:17,
        fontFamily:'Poppins-Regular'
    },
    iconContainer: {
        backgroundColor: 'rgba(177, 41, 44, 0.2)',
        borderRadius: 5,
        padding: 8,
        marginLeft:10
      },
    
})
export default Profile