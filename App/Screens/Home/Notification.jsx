import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image, ActivityIndicator } from 'react-native';
import CheckmarkIcon from '../../../assets/Icon/CheckMark';
import { useAppContext } from '../../context/AppContext';
import { HomeApi } from '../../service/home/homeservice';
import moment from 'moment';

const Notification = () => {
     const [data, setData] = useState([]);
     const [isLoading, setIsLoading] = useState(true);
    // const handleButtonPress = () => {
    //     // Navigate to the specified route when the button is pressed
    //     navigation.navigate(label);
    // };
    useEffect(() => {
        getNotificationHandler();
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, []);
    function getNotificationHandler(){
        HomeApi.getNotification().then((res) => {
            // console.log(res.data);
            if(res.status === 200){
               setData(res.data.results)
            }
        })
    }
    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'white' }}>
                <ActivityIndicator size="large" color="rgba(177, 41, 44, 1)" />
            </View>
        );
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
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
                    style={{ height: '50%', height: 150 }}
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
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        width: '92%',
        marginTop: 12,
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
