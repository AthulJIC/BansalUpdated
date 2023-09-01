import {View,Text, StyleSheet,Image, TouchableOpacity, Pressable,Alert, ScrollView} from 'react-native'
import LanguageIcon from '../../../assets/Icon/LanguageIcon'
import ContactIcon from '../../../assets/Icon/ContactIcon'
import AboutIcon from '../../../assets/Icon/AboutIcon'
import PrivacyIcon from '../../../assets/Icon/PrivacyIcon'
import PenIcon from '../../../assets/Icon/PenIcon'
import RightArrowIcon from '../../../assets/Icon/RightArrowIcon'
import BookMarkActiveIcon from '../../../assets/Icon/BookmarkActiveIcon'
import HistoryIcon from '../../../assets/Icon/HistoryIcon'
import AddressIcon from '../../../assets/Icon/AddressIcon'
import { useNavigation } from '@react-navigation/native'

const Profile =({role})=>{
    console.log(role);
    let navigation = useNavigation();
    let profileData=[
       
        {
            id:4,
            title:'Language',
            image: <LanguageIcon width={20} height={20} color='rgba(177, 41, 44, 1)'/>,
            arrowImage: <RightArrowIcon width={24} height={24} color="#393939"/>,
            navigation : () => navigation.navigate('Language')
        },
        {
            id:5,
            title:'Contact us',
            image:<ContactIcon/>,
            arrowImage: <RightArrowIcon width={24} height={24} color="#393939"/>,
            navigation : () => navigation.navigate('Contact')
        },
        {
            id:6,
            title:'About us',
            image:<AboutIcon/>,
            arrowImage: <RightArrowIcon width={24} height={24} color="#393939"/>,
            navigation : () => navigation.navigate('About')
        },
        {
            id:7,
            title:'Privacy Policy',
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
                title:'Favourites',
                image: <BookMarkActiveIcon width={20} height={20} color='rgba(177, 41, 44, 1)'/>,
                arrowImage: <RightArrowIcon width={24} height={24} color="#393939"/>,
                navigation : () => navigation.navigate('FavouritesScreen')
            },
            {
                id:2,
                title:'History',
                image: <HistoryIcon/>,
                arrowImage: <RightArrowIcon width={24} height={24} color="#393939"/>,
                navigation : () => navigation.navigate('HistoryScreen')
            },
            {
                id:3,
                title:'Addresses',
                image: <AddressIcon />,
                arrowImage: <RightArrowIcon width={24} height={24} color="#393939"/>,
                navigation : () => navigation.navigate('AddressList',{
                    fromProfile: true,
                })
            },
            ...profileData,
           
        ]
    }
    
function loginHandler(){
    // Alert.alert(
    //     'Logout',
    //     'Are you sure you want to exit?',
    //     [
    //       {
    //         text: 'Cancel',
    //         onPress: () => console.log('Cancel Pressed'),
    //         style: 'cancel',
    //       },
    //       {
    //         text: 'OK',
    //         onPress: () => navigation.navigate('Login'),
    //       },
    //     ],
    //     { cancelable: false }
    //   );
      navigation.navigate('Login')
}
    return (
    <ScrollView style={styles.container}>
        <View style={styles.profileView}>
           <Text style={styles.profileShortName}>AB</Text>
        </View>
            <View style={{flexDirection:'row', alignItems:'center',justifyContent:'center',marginTop:10}}>
                <Text style={styles.profileName}>Abhiram Ahuja</Text>
                <Pressable onPress={() => navigation.navigate('ProfileEdit')}>
                    <PenIcon height={18} width={18} color='rgb(0,0,0)'></PenIcon>
                </Pressable>
            </View>
        <Text style={styles.emailid}>abahuja@gmail.com</Text>
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
            <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
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
        height: 87,
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
        textAlign:'center'
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