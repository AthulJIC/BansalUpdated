import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView,Image,BackHandler, RefreshControl , Linking, Alert } from 'react-native';
import PendingRequest from './PendingRequest';
import BarGraph from './BarGraph';
import HeaderComponent from '../../Components/Header';
import { HomeApi } from '../../service/home/homeservice';
import LoadingIndicator from '../../Components/LoadingIndicator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import VersionCheck from 'react-native-version-check';

const HomeScreen = ({navigation}) => {
    const [adImages, setAdImages] = useState([]);
    const [isLoading, setIsLoading ] = useState(false); 
    const [refreshing, setRefreshing] = useState(false);
    useFocusEffect(
      React.useCallback(() => {
        const backAction = async () => {
          // Your code here before exiting the app
          // await AsyncStorage.setItem('LastScreen', 'Home');
          // await AsyncStorage.setItem('isSelected', 'false');
          BackHandler.exitApp();
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction
        );
    
        return () => {
          backHandler.remove();
        };
      }, [])
    );
    useFocusEffect(
      useCallback(() => {
        const fetchData = async () => {
         // await AsyncStorage.setItem('LastScreen', 'Home');
          getAdImages();
          checkAppVersion();
        };
  
        fetchData();
       
        return () => {
          // Optional: clean up logic when the screen is unfocused
        };
      }, [])
    );
    const checkAppVersion = async () => {
      try {
        const latestVersion = await VersionCheck.getLatestVersion();
    
        const currentVersion = VersionCheck.getCurrentVersion();
        console.log('version', latestVersion,currentVersion);
        if (latestVersion && currentVersion !== latestVersion) {
          Alert.alert(
            'Update Required',
            'A new version of the app is available. Please update to continue.',
            [
              {
                text: 'Update',
                onPress: () => {
                  // Redirect user to App Store/Play Store
                  Linking.openURL( 'https://play.google.com/store/apps/details?id=com.bansaltmtpoints'
                  );
                },
              },
            ],
            { cancelable: false }
          );
        }
      } catch (error) {
        console.error('Error checking app version:', error);
      }
    };
    
     const onRefresh = () => {
      setRefreshing(true);
      getAdImages();
      setTimeout(() => {
        setRefreshing(false);
      }, 1000); 
    };
    
      function getAdImages(){
        setIsLoading(true)
          HomeApi.getAds().then((res) => {
            console.log('res===',res.data);
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
      // contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
            <View style={styles.scrollViewContent}>
                <HeaderComponent refresh={refreshing}/>
                <PendingRequest refresh={refreshing}/>
                <BarGraph refresh={refreshing}/>
                {adImages.map((item,index) => {
                    return(
                        <View key={index} style={{width:'99%',elevation:8}}>
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
        paddingLeft: 16,
        paddingRight: 16,
    },
    ImageContainer: {
        height:150,
        width:'100%',
        borderRadius:8,
        marginBottom:15,
      },
});

export default HomeScreen;
