import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';
import { CircularProgress } from 'react-native-svg-circular-progress';
import Svg from 'react-native-svg';
import { useTranslation } from 'react-i18next';
import { HomeApi } from '../../service/home/homeservice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PendingRequest = () => {
    const [progress, setProgress] = useState(0);
    const [role, setRole] = useState('');
    const [request, setRequest] = useState(0);
    const total = 12000; 

    const percentage = (progress / total) * 100;
    console.log('role', role)

    const { t } = useTranslation();
    const handleButtonPress = () => {
        navigation.navigate(label);
    };
    useEffect(() => {
        const getValueFromStorage = async () => {
            try {
              const user = await AsyncStorage.getItem('role'); 
              console.log('role2344355', role)
              setRole(user)
            } catch (error) {
              console.error('Error fetching data from AsyncStorage:', error);
            }
          };
        getValueFromStorage();
        getLoyaltyPoints();
        getPendingRequest();
      }, []);
    function getLoyaltyPoints(){
        HomeApi.getPoints().then((res) => {
            console.log(res.data);
            if(res.status === 200){
                console.log('success')
                setProgress(res.data.total_points)
            }
        })
    }
    function getPendingRequest(){
        HomeApi.getRequest().then((res) => {
            console.log(res.data);
            if(res.status === 200){
               setRequest(res.data.count)
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
                <View></View>
                <Image source={require('../../../assets/Images/Mask_group.png')} style={{width:'100%', height:110,position:'absolute',marginLeft:18  }}></Image>
            </View>) :
            (
                <View style={{flexDirection:'row', marginTop:15}}>
                    <View >
                        <Text style={styles.Text}>Loyalty Balance</Text>
                        <Text style={styles.number} >{progress} Pts</Text>
                        <Text style={styles.rewardText}>500 Pts till your next reward</Text>
                    </View>
                    {/* <View style={{marginLeft:50}}>
                        <Svg width={100} height={100}>
                            <CircularProgress
                            percentage={percentage}
                            radius={20}
                            strokeWidth={10}
                            backgroundColor="rgba(177, 41, 44, 1)"
                            fillColor='rgba(177, 41, 44, 1)'
                            blankColor='rgba(255, 255, 255, 0.6)'
                            donutColor='white'
                            />
                        </Svg>
                    </View> */}
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
        fontSize: 16,
    },
    number: {
        color: '#FFFFFF',
        textAlign: 'left',
        fontFamily: 'Poppins-Medium',
        fontSize: 23,
    },
    rewardText: {
        color: '#FFFFFF',
        textAlign: 'left',
        fontFamily: 'Poppins-Regular',
        fontSize: 11,
        marginTop:10
    }
});

export default PendingRequest;
