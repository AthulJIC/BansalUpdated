import React, { useCallback, useEffect, useState } from 'react';
import {  Text, StyleSheet, View, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { HomeApi } from '../../service/home/homeservice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const PendingRequest = ({refresh}) => {
    const [progress, setProgress] = useState(0);
    const [role, setRole] = useState('');
    const [request, setRequest] = useState(0);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const { t } = useTranslation();
    console.log('refresh', refresh)
    const handleButtonPress = () => {
        navigation.navigate(label);
    };
    console.log('poinst', request, progress)
    useFocusEffect(
        useCallback(() => {
          const fetchData = async () => {
            try {
              const user = await AsyncStorage.getItem('role');
              setRole(user);
              getLoyaltyPoints();
              getPendingRequest();
            } catch (error) {
              console.error('Error fetching data from AsyncStorage:', error);
            }
          };
      
          fetchData();
        }, [])
      );
      if(refresh){
        getLoyaltyPoints();
        getPendingRequest();
      }
      useEffect(() => {
        if (refresh && !isRefreshing) {
          setIsRefreshing(true);
          getLoyaltyPoints();
          getPendingRequest();
          setIsRefreshing(false);
        }
      }, [refresh]);
    
    function getLoyaltyPoints(){
        HomeApi.getPoints().then((res) => {
            if(res.status === 200){
                if(res.data.total_points !== null){
                    setProgress(res.data.total_points);
                }
                else {
                    setProgress(0);
                }
            }
        })
    }
    function getPendingRequest(){
        HomeApi.getRequest().then((res) => {
            //console.log('request====', res.data)
            if(res.status === 200){
                
              // setRequest(res.data.count)
               if(res.data.count !== null){
                   setRequest(res.data.count);
               }
               else {
                setRequest(0);
               }
            }
        })
    }
    return (
        <View style={[styles.mainView,{height: role === "Distributor" ? 108 : 124}]} onPress={handleButtonPress}>
            {role === 'Distributor' ? 
             (
            <View style={{flexDirection:'row'}}>
                <View style={{marginTop:20}}>
                    <Text style={styles.Text}>{t('pending')}</Text>
                    <Text style={styles.number} >{request}</Text>
                </View>
                <Image source={require('../../../assets/Images/Mask_group.png')} style={{width:'100%', height:110,position:'absolute',marginLeft:18  }}></Image>
            </View>) :
            (
                <View style={{flexDirection:'row'}}>
                    <View style={{marginTop:10}}>
                        <Text style={styles.Text}>{t('bonus')}</Text>
                        <Text style={styles.number} >{progress} {t('points3')}</Text>
                        <Text style={styles.rewardText}>{t('PointsLoyality')}</Text>
                    </View>
                    <Image source={require('../../../assets/Images/Mask_group.png')} style={{width:'100%', height:110,position:'absolute',marginLeft:18  }}></Image>

                </View>
            )
            
            }
        </View>
    );
};
const styles = StyleSheet.create({
    mainView: {
        backgroundColor: '#B1292C',
        paddingRight: 20,
        paddingBottom: 24,
        paddingLeft: 20,
        margin: 0,
        width: '100%',
        borderRadius: 5,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderRadius: 10,
    },
    Text: {
        color: '#FFFFFF',
        textAlign: 'left',
        fontFamily: 'Poppins-Medium',
        fontSize: 19,
    },
    number: {
        color: '#FFFFFF',
        textAlign: 'left',
        fontFamily: 'Poppins-Medium',
        fontSize: 20,
        marginTop:5
    },
    rewardText: {
        color: '#FFFFFF',
        textAlign: 'left',
        fontFamily: 'Poppins-Regular',
        fontSize: 11,
    }
});

export default PendingRequest;
