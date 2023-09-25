import React, { useEffect, useState } from 'react'; // Don't forget to import React
import { View, Text, StyleSheet, ScrollView,Image,BackHandler  } from 'react-native';
import PendingRequest from './PendingRequest';
import BarGraph from './BarGraph';
import HeaderComponent from '../../Components/Header';
import { HomeApi } from '../../service/home/homeservice';

const HomeScreen = () => {
    const [adImages, setAdImages] = useState([]);
    // console.log('image', adImages)
    const backAction = () => {
        BackHandler.exitApp(); // This will close the app
        return true; // Prevent default back button behavior (navigation)
    };
      
    useEffect(() => {
       getAdImages();
       BackHandler.addEventListener('hardwareBackPress', backAction);
       return () => {
       BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
        
      }, []);

      function getAdImages(){
          HomeApi.getAds().then((res) => {
            // console.log('ress', res.data);
            if(res.status === 200){
                setAdImages(res.data.results)
            }
          })
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
