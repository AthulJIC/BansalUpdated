import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, Animated, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Modal from 'react-native-modal';
import BellIcon from "../../assets/Icon/Bell";
import LanguageIcon from "../../assets/Icon/LanguageIcon";
import Icon from 'react-native-vector-icons/Feather';
import Notification from "../Screens/Home/Notification";
import { useTranslation } from 'react-i18next';
import i18n from "../Languages/i18";
import { useAppContext } from "../context/AppContext";
function HeaderComponent() {
  const [modalVisible, setModalVisible] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('');
  const [sliderAnim] = useState(new Animated.Value(0));
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [isEnglishButtonRed, setIsEnglishButtonRed] = useState(false);
  const [isHindiButtonRed, setIsHindiButtonRed] = useState(false);
  const [activeButton, setActiveButton] = useState('English');
  const [newLanguage, setnewLanguage] = useState('')
  const { language, changeLanguage } = useAppContext();
  const handleButtonPress = (buttonName) => {
    setActiveButton(buttonName);
  };

  const toggleEnglishButtonColor = () => {
    setIsEnglishButtonRed(true);
    setIsHindiButtonRed(false);
  };

  const toggleHindiButtonColor = () => {
    setIsHindiButtonRed(true);
    setIsEnglishButtonRed(false);
  };

  const englishButtonColor = isEnglishButtonRed ? styles.redButton : styles.blackButton;
  const hindiButtonColor = isHindiButtonRed ? styles.redButton : styles.blackButton;

  const navigation = useNavigation();
  const { t, i18n } = useTranslation();

  console.log("newLanguage", newLanguage)
  const handleLanguageChange = (newLanguage) => {
    changeLanguage(newLanguage);
  };
  const englishLanguage = () => {
    setnewLanguage(i18n.language === 'hi' ? 'en' : 'en');

  }
  const hindiLanguage = () => {
    setnewLanguage(i18n.language === 'en' ? 'hi' : 'en')
  };
  const confirmLanguage = () => {
    i18n.changeLanguage(newLanguage);
    changeLanguage(newLanguage)
  }
  const handleNotificationClick = () => {
    navigation.navigate('Notification')
    setNotificationMessage('New notification message here');
    setNotificationVisible(true);
  };

  const handleCloseNotification = () => {
    setNotificationVisible(false);
  };
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <View style={styles.titleContainer}>
        <Text style={{ fontFamily: 'Poppins-Regular', color: '#848484', fontSize: 13 }}>{t('greeting')}</Text>
        <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#393939', fontSize: 17 }}>Abhiram Ahuja</Text>
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 90 }}>
        <TouchableOpacity style={styles.iconContainer} onPress={() => setModalVisible(true)}>
          <LanguageIcon width={24} height={24} color='#F18C13' />
        </TouchableOpacity >
        <TouchableOpacity onPress={handleNotificationClick} style={styles.iconContainer} >
          <BellIcon width={24} height={24} />
        </TouchableOpacity>
      </View>
      {/* Modal */}
      {/* <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.centeredView}>
          
            <View style={styles.modalView}>
            <TouchableOpacity
                style={ { alignItems: 'flex-end', marginLeft: 302 }}
                onPress={() => setModalVisible(!modalVisible)}>
                <Icon name="x" size={20} color="#393939" backgroundColor='#ffffff'  />
            
            </TouchableOpacity>
              <TouchableOpacity onPress={toggleEnglishButtonColor} style={[styles.button]} >
                <Text style={[styles.buttonText,englishButtonColor]}>English</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleHindiButtonColor} style={styles.button} >
                <Text style={[styles.buttonText,hindiButtonColor]}>Hindi</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View> */}
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
            onPress={() => setModalVisible(!modalVisible)}>
            <Icon name="x" size={24} color="#393939" backgroundColor='#ffffff' />

          </TouchableOpacity>
          <Pressable
            style={[
              styles.languageButton,
              activeButton === 'English' && styles.activeButton,
            ]}
            onPress={() => { handleButtonPress('English'); englishLanguage(); }}
          >
            <Text style={[styles.languageButtonText, activeButton === 'English' && { color: 'rgba(177, 41, 44, 1)' }]}>English</Text>
          </Pressable>
          <Pressable
            style={[
              styles.languageButton,
              activeButton === 'Hindi' && styles.activeButton,
            ]}
            onPress={() => { handleButtonPress('Hindi'); hindiLanguage() }}
          >
            <Text style={[styles.languageButtonText, activeButton === 'Hindi' && { color: 'rgba(177, 41, 44, 1)' }]}>Hindi</Text>
          </Pressable>
          <View style={styles.modalButtonContainer}>
            <Pressable style={{ marginBottom: 10, borderRadius: 5, width: '100%', backgroundColor: 'rgba(177, 41, 44, 1)', alignItems: 'center', height: 48, radius: 4, padding: 12 }} >
              <Text onPress={confirmLanguage} style={{ fontFamily: 'Poppins-Regular', fontWeight: '500', fontSize: 16, lineHeight: 24, color: '#ffffff', height: 24 }}>
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
    marginTop: 20,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingLeft: 8,
    marginBottom: 8,
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
    alignSelf: 'center'
  }
});

export default HeaderComponent;
