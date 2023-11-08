import React, {  useEffect, useState } from 'react';
import {  Text, StyleSheet, View, Image, ActivityIndicator, ScrollView ,RefreshControl} from 'react-native';
import CheckmarkIcon from '../../../assets/Icon/CheckMark';
import { HomeApi } from '../../service/home/homeservice';
import moment from 'moment';
import useBackButtonHandler from '../../Components/BackHandlerUtils';
import LoadingIndicator from '../../Components/LoadingIndicator';

const Notification = ({navigation}) => {
     const [data, setData] = useState([]);
     const [isLoading, setIsLoading] = useState(true);
     const [refreshing, setRefreshing] = useState(false);
    useBackButtonHandler(navigation, false);
    useEffect(() => {
        getNotificationHandler();
    }, []);
    function getNotificationHandler(){
        HomeApi.getNotification().then((res) => {
            console.log('resss=====', res.data);
            if(res.status === 200){
                setIsLoading(false)
                setRefreshing(false)
                setData(res.data.notifications)
            }
        }).catch((err) => {
            setIsLoading(false)
            setRefreshing(false)
        })
    }
    const onRefresh = () => {
        setRefreshing(true);
       getNotificationHandler();
       setRefreshing(false)
      };
    // if (isLoading) {
    //     return (
    //         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'white' }}>
    //             <ActivityIndicator size="large" color="rgba(177, 41, 44, 1)" />
    //         </View>
    //     );
    // }
    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }}
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
         { data.length !== 0 ? (
            data.map((item, index) => {
                const dateTime = moment(item.created_at);
                const date = dateTime.format('DD MMM YYYY').toLocaleString('en-US');
                const time = dateTime.format('hh:mm A').toLocaleString('en-US');
                return (
                    <View key={index} style={styles.container}>
                        <View style={styles.iconContainer}>
                            <CheckmarkIcon />
                        </View>
                        <View style={styles.contentContainer}>
                            <Text style={styles.textItem}>{item.message}</Text>
                            <Text style={styles.dateText}>{date}.{time}</Text>
                        </View>
                    </View>
                );
            })
        ) : (
            <View style={{ alignSelf: 'center', backgroundColor: 'white', top: 150 }}>
                <Image
                    source={require('../../../assets/Images/NotificationImage.png')}
                    style={{ width: '50%', height: 150 }}
                    resizeMode='center'
                ></Image>
                <View style={{ marginTop: 20 }}>
                    <Text style={{ color: 'rgba(57, 57, 57, 1)', fontSize: 16, fontFamily: 'Poppins-Medium', textAlign: 'center' }}>
                        No New Notifications
                    </Text>
                    <Text style={{ color: 'rgba(132, 132, 132, 1)', fontSize: 13, fontFamily: 'Poppins-Regular', textAlign: 'center' }}>
                        You have no new notifications right now.
                    </Text>
                </View>
            </View>
        )}
        {isLoading && <LoadingIndicator visible={isLoading} text='Loading...'></LoadingIndicator>}
    </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        width: '92%',
        marginTop: 5,
        paddingHorizontal: 16,
        height: 84,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginBottom:15
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 16
    },
    textItem: {
        color: 'rgba(57, 57, 57, 1)',
        fontWeight: '500',
        fontFamily: 'Poppins-Medium',
        fontSize: 13.33,
        lineHeight: 20,
    },
    dateText: {
        color: 'rgba(132, 132, 132, 1)',
        textAlign: 'left',
        fontSize:11,
        fontFamily:'Poppins-Regular'
    },
    iconContainer: {
        backgroundColor: 'rgba(24, 183, 88, 0.2)',
        width: 50,
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,

    },
});

export default Notification;
