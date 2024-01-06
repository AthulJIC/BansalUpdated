import React, {  useEffect, useState } from 'react';
import {  Text, StyleSheet, View, Image, ActivityIndicator, ScrollView ,RefreshControl, FlatList,BackHandler} from 'react-native';
import CheckmarkIcon from '../../../assets/Icon/CheckMark';
import { HomeApi } from '../../service/home/homeservice';
import moment from 'moment';
import useBackButtonHandler from '../../Components/BackHandlerUtils';
import LoadingIndicator from '../../Components/LoadingIndicator';
import { t } from 'i18next';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const Notification = ({route}) => {
     const count = route?.params.notiAlert;
     const [data, setData] = useState([]);
     const [isLoading, setIsLoading] = useState(true);
     const [refreshing, setRefreshing] = useState(false);
     const [isEndReachedLoading, setIsEndReachedLoading] = useState(false);
     const [page, setPage] =useState(1);
     const [nextUrl, setNextUrl] = useState(null);
     //const [notiCount, setNotiCount] = useState();
    //useBackButtonHandler(navigation, false);
    
    const navigation = useNavigation();

    useEffect(() => {
      const backAction = () => {
        // Call your function when going back from the Notification screen
        handleNotificationBack();
        // Return false to disable the default back functionality
        return false;
      };
  
      // Add the event listener for Android hardware back button
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
  
      return () => backHandler.remove(); // Clean up the event listener
  
    }, []);
  
    const handleNotificationBack = () => {
      // Call the function to handle notification click
      HomeApi.getNotificationUnread()
        .then((res) => {
          console.log("notificationAlert handleNotificationClick", res);
          // Perform the necessary actions on notification click
        })
        .catch(function (error) {
          console.log(error, "Notification alert error");
        });
  
      // Navigate back to the previous screen
      navigation.goBack();
    };
  
useFocusEffect(
    React.useCallback(() => {
      console.log('count===== ', count);
      getNotificationHandler();
    }, [count])
  );
    function getNotificationHandler(){
        setIsLoading(true)
        HomeApi.getNotification(page).then((res) => {
            console.log('resss=====', res.data);
            if (res.status === 200) {
                const newData = res.data.results;
                if (page === 1) {
                    setData(newData);
                } else {
                    setData((prevData) => {
                    const newData = new Set([...prevData, ...res.data.results]);
                    return Array.from(newData);
                  });
                }
                setIsLoading(false);
                setNextUrl(res.data.next);
                setIsEndReachedLoading(false);
                //setRefreshing(false)
              } else {
                setIsLoading(false);
                setIsEndReachedLoading(false);
                //setRefreshing(false)
              }
        }).catch((err) => {
            setIsLoading(false)
            //setRefreshing(false)
        })
    }
      function onEndReached(){
        console.log('end', isEndReachedLoading)
        if (isEndReachedLoading || !nextUrl) {
          setPage(1)
          return;
       }
        setPage(page + 1);
        setIsEndReachedLoading(true);
        getNotificationHandler()
      }
    function renderItem({item}) {
        const dateTime = moment(item.created_at);
        const date = dateTime.format('DD MMM YYYY').toLocaleString('en-US');
        const time = dateTime.format('hh:mm A').toLocaleString('en-US');
        return (
            <View style={styles.container}>
                <View style={styles.iconContainer}>
                    <CheckmarkIcon />
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.textItem}>{item.message}</Text>
                    <Text style={styles.dateText}>{date}.{time}</Text>
                </View>
            </View>
        );

    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}
       >
         { count !== 0 && data.length !== 0? (
           <FlatList
           data={data}
           renderItem={renderItem}
           keyExtractor={(item) => item.id.toString()}
          onEndReached={onEndReached}></FlatList>
        ) : (
            <View style={{ backgroundColor: 'white', flex:1 ,alignItems:'center'}}>
                <Image
                    source={require('../../../assets/Images/NotificationImage.png')}
                    style={{ width: '40%', height: 200, marginTop:50}}
                    resizeMode='center'
                ></Image>
                <View style={{ marginTop: 20 }}>
                    <Text style={{ color: 'rgba(57, 57, 57, 1)', fontSize: 16, fontFamily: 'Poppins-Medium', textAlign: 'center' }}>
                        {t("NewNotification")}
                    </Text>
                    <Text style={{ color: 'rgba(132, 132, 132, 1)', fontSize: 13, fontFamily: 'Poppins-Regular', textAlign: 'center' }}>
                        {t("NotificationText")}
                    </Text>
                </View>
            </View>
        )}
        {isLoading && <LoadingIndicator visible={isLoading} text='Loading...'></LoadingIndicator>}
    </View>
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
