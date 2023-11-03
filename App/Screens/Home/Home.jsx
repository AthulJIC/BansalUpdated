import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView,Image,BackHandler, RefreshControl  } from 'react-native';
import PendingRequest from './PendingRequest';
import BarGraph from './BarGraph';
import HeaderComponent from '../../Components/Header';
import { HomeApi } from '../../service/home/homeservice';
import LoadingIndicator from '../../Components/LoadingIndicator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({navigation}) => {
    const [adImages, setAdImages] = useState([]);
    const [isLoading, setIsLoading ] = useState(false); 
    const [refreshing, setRefreshing] = useState(false);
    useEffect(() => {
      const backAction = async() => {
        //await AsyncStorage.setItem('LastScreen', 'Home');
       // await AsyncStorage.setItem('isSelected', 'false');
        BackHandler.exitApp();
        return true;
      };
  
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      );
  
      return () => backHandler.remove();
    }, []); 
    useFocusEffect(
      useCallback(() => {
        const fetchData = async () => {
         // await AsyncStorage.setItem('LastScreen', 'Home');
          getAdImages();
        };
  
        fetchData();
  
        return () => {
          // Optional: clean up logic when the screen is unfocused
        };
      }, [])
    );
  
     const onRefresh = () => {
      setRefreshing(true);
      // return(
      //   <BarGraph/>
      // );
      setTimeout(() => {
        setRefreshing(false);
      }, 1000); 
    };
    
      function getAdImages(){
        setIsLoading(true)
          HomeApi.getAds().then((res) => {
            if(res.status === 200){
                setAdImages(res.data.results)
                setIsLoading(false)
            }
          }).catch((err) => {
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    return (
      <ScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
            <View style={styles.scrollViewContent}>
                <HeaderComponent refresh={refreshing}/>
                <PendingRequest refresh={refreshing}/>
                {/* <BarGraph refresh={refreshing}/> */}
                {adImages.map((item,index) => {
                    return(
                        <View key={index} style={{width:'100%'}}>
                          <Image source={{uri:item.ad_image}} style={styles.ImageContainer} resizeMode='stretch'></Image>
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
        paddingLeft: 16,
        paddingRight: 16,
    },
    ImageContainer: {
        height:150,
        width:'100%',
        borderRadius:8,
        marginBottom:15
      },
});

export default HomeScreen;
