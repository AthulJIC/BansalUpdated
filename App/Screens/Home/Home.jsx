import React, { useCallback, useEffect, useState } from 'react'; // Don't forget to import React
import { View, Text, StyleSheet, ScrollView,Image,BackHandler, ToastAndroid  } from 'react-native';
import PendingRequest from './PendingRequest';
import BarGraph from './BarGraph';
import HeaderComponent from '../../Components/Header';
import { HomeApi } from '../../service/home/homeservice';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { useNavigationState } from '@react-navigation/native';
import LoadingIndicator from '../../Components/LoadingIndicator';
import { handleBackButton } from '../../Components/BackHandlerUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {
    const [adImages, setAdImages] = useState([]);
    const [isLoading, setIsLoading ] = useState(false); 
    useEffect(() => {
      const backAction = async() => {
        await AsyncStorage.setItem('LastScreen', 'Home')
        // Perform your logic here (e.g., show an exit confirmation dialog)
        // Return true to exit the app, or false to stay on the current screen
        // For example, you can show an exit confirmation dialog and return false to prevent accidental exits
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
      getAdImages();        
     }, []);

      function getAdImages(){
        setIsLoading(true)
          HomeApi.getAds().then((res) => {
            // console.log('ress', res.data);
            if(res.status === 200){
                setAdImages(res.data.results)
                setIsLoading(false)
            }
          }).catch((err) => {
            //console.log(err);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    return (
        <ScrollView>
            <View style={styles.scrollViewContent}>
                <HeaderComponent />
                <PendingRequest />
                <BarGraph/>
                {adImages.map((item,index) => {
                    // console.log(item.ad_image)
                    return(
                        <View key={index} style={{width:'100%', height:180}}>
                          <Image source={{uri:item.ad_image}} style={styles.ImageContainer}></Image>
                        </View>
                    )
                })}
                {isLoading && <LoadingIndicator visible={isLoading} text="Loading..." />}
                </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // paddingTop: 50,
        paddingLeft: 16,
        paddingRight: 16,
        // paddingBottom: 16,
    },
    ImageContainer: {
        //padding: 10,
        height:160,
        width:'100%',
        borderRadius:8
        //paddingRight:150,
        // paddingTop:0,
        // paddingLeft:4,
        // paddingBottom:0,
        // borderRadius: 5,
        //margin:8,
       // justifyContent:'center',
       // borderRadius:10,
    //    position:'relative'
      },
});

export default HomeScreen;
