import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, Animated, Pressable } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Modal from 'react-native-modal';
import BellIcon from "../../assets/Icon/Bell";
import LanguageIcon from "../../assets/Icon/LanguageIcon";
import Icon from 'react-native-vector-icons/Feather';
import { useTranslation } from 'react-i18next';
import i18n from "../Languages/i18";
import { useAppContext } from "../context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLanguageContext } from "../context/LanguageContext";
import { HomeApi } from "../service/home/homeservice";

function HeaderComponent() {
  const [modalVisible, setModalVisible] = useState(false)
  const { language, changeNewLanguage } = useLanguageContext();
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [activeButton, setActiveButton] = useState('');
  const [newLanguage, setnewLanguage] = useState('')
  const [notiAlert,setNotiAlert]=useState('')
  const { changeLanguage } = useAppContext();
  const[username, setUsername] = useState('') ;
  const notificationAlert=()=>{
    HomeApi.getNotificationAlert().then((res) => {
      console.log("notificationAlert",res.data)
      setNotiAlert(res.data.unread_count)
    })
    .catch(function (error) {
      console.log(error,"Notification alert error");
    });
  }
  
  useFocusEffect(
    useCallback(() => {
      const getValueFromStorage = async () => {
        try {
          const value = await AsyncStorage.getItem('username');
          if (value !== null) {
            setUsername(value);
          }
        } catch (error) {
          console.error('Error fetching data from AsyncStorage:', error);
        }
      };
      getValueFromStorage();
      notificationAlert()
    }, [])
  );
  const handleButtonPress = (buttonName) => {
    setActiveButton(buttonName);
    setnewLanguage(buttonName);
  };

  const navigation = useNavigation();
  const { t, i18n } = useTranslation();

  const englishLanguage = () => {
    setActiveButton('English')
    setnewLanguage(i18n.language === 'hi' ? 'en' : 'en');
  }
  const hindiLanguage = () => {
    setActiveButton('Hindi')
    setnewLanguage(i18n.language === 'en' ? 'hi' : 'hi')
  };
  const confirmLanguage = async() => {
    i18n.changeLanguage(newLanguage);
    changeNewLanguage(newLanguage === 'en' ? 'English' : 'Hindi');
    //await AsyncStorage.setItem('Language', (newLanguage === 'en' ? 'English' : 'Hindi'))
  }
  // const handleNotificationClick = () => {
  //   HomeApi.getNotificationUnread().then((res) => {
  //     console.log("notificationAlert handleNotificationClick",res)
  //   })
  //   .catch(function (error) {
  //     console.log(error,"Notification alert error");
  //   });
  //   navigation.navigate('Notification')
  //   setNotificationMessage('New notification message here');
  //   setNotificationVisible(true);
  // };

  function openModal() {
    setActiveButton(language);
    setModalVisible(true);
  }

  function handleClose(){
     setModalVisible(!modalVisible)
  }
  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems:'center', margin:10,width:'100%', justifyContent:'flex-start' }}>
        <View style={{marginLeft:7, width:'50%'}}>
          <Text style={{ fontFamily: 'Poppins-Regular', color: '#848484', fontSize: 13 }}>{t('greeting')}</Text>
          <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#393939', fontSize: 17 }}>{username}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginLeft:'auto'}}>
          <TouchableOpacity style={styles.iconContainer} onPress={openModal}>
            <LanguageIcon width={24} height={24} color='#F18C13' />
          </TouchableOpacity >
          <TouchableOpacity onPress={() =>  navigation.navigate('Notification')} style={styles.iconContainer} >
            <BellIcon width={24} height={24} />
            <View style={[styles.notific,]}>
            {notiAlert!=0 ?
            <Text style={{color:'rgba(177, 41, 44, 1)',fontFamily:'Poppins-Regular',fontSize:16}}>{notiAlert}</Text> : ''
            }
            
            </View>
           
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationIn="slideInUp"
        animationOut="slideOutDown"
        isVisible={modalVisible}
        hasBackdrop={true}
        backdropColor="black"
        backdropOpacity={0.70}
        onBackdropPress={() => setModalVisible(!modalVisible)}
        width={'100%'}
        style={{ alignItems: 'center', justifyContent: 'flex-end', margin: 0 }}
      >
        <View style={styles.centeredView}>
          <TouchableOpacity
            style={[{ alignItems: 'flex-end', marginTop: 15, marginRight: 15 }]}
            onPress={handleClose}>
            <Icon name="x" size={24} color="#393939" backgroundColor='#ffffff' />

          </TouchableOpacity>
          <Pressable
            style={[
              styles.languageButton,
              activeButton === 'English' && styles.activeButton,
            ]}
            onPress={englishLanguage}
          >
            <Text style={[styles.languageButtonText, activeButton === 'English' && { color: 'rgba(177, 41, 44, 1)' }]}>English</Text>
          </Pressable>
          <Pressable
            style={[
              styles.languageButton,
              activeButton === 'Hindi' && styles.activeButton,
            ]}
            onPress={hindiLanguage}
          >
            <Text style={[styles.languageButtonText, activeButton === 'Hindi' && { color: 'rgba(177, 41, 44, 1)' }]}>Hindi</Text>
          </Pressable>
          <View style={styles.modalButtonContainer}>
            <Pressable style={{ marginBottom: 10, borderRadius: 5, width: '100%', backgroundColor: 'rgba(177, 41, 44, 1)', alignItems: 'center', height: 48, radius: 4, padding: 12 }} onPress={()=>{confirmLanguage();setModalVisible(false)}}>
              <Text  style={{ fontFamily: 'Poppins-Regular', fontWeight: '500', fontSize: 16, lineHeight: 24, color: '#ffffff', height: 24 }}>
                {t('confirmButton')}
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    // marginTop: 20,
    // flex: 1 
    // justifyContent: 'space-between',
    // alignItems: 'flex-start',
    // paddingLeft: 8,
    // marginBottom: 8,
  },
  iconContainer: {
    backgroundColor: 'rgba(241, 140, 19, 0.2)',
    borderRadius: 12,
    padding: 8,
    marginRight: 8
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  redButton: {
    color: '#B1292C',
  },
  blackButton: {
    color: '#393939'
  },
  modalView: {
    marginTop: 80,
    borderBottomLeftRadius: 0,
    borderBottomEndRadius: 0,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    height: '89%',
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    alignItems: 'flex-end'
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FFFFFF', // Customize button style as needed
    padding: 10,
    height: 64,
    width: 328,
    paddingRight: 20,
    paddingTop: 12,
    paddingLeft: 20,
    paddingBottom: 12,
    borderRadius: 8,
    margin: 10,
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#B1292C',
    fontWeight: '500',
    textAlign: 'left',
    fontFamily: 'Poppins',
    fontSize: 16,
    lineHeight: 24,
    height: 24
  },
  activeButton: {
    borderColor: 'rgba(177, 41, 44, 1)',
  },
  languageButtonText: {
    color: '#333',
    fontWeight: '500',
    fontSize: 16,
    fontFamily: 'Poppins-Regular'
  },
  languageButton: {
    width: '90%',
    height: 60,
    backgroundColor: 'white',
    elevation: 5,
    marginTop: 19,
    alignSelf: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    paddingLeft: 10
  },
  centeredView: {
    marginTop: 22,
    width: '100%',
    backgroundColor: 'white',
    height: 630,
    borderTopRightRadius: 9,
    borderTopLeftRadius: 9
  },
  modalButtonContainer: {
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  notific:{
    position:'absolute',
    top:17,
    right:9
  }
});

export default HeaderComponent;