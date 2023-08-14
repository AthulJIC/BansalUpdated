import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, Modal, Animated  } from "react-native";
import { useNavigation } from "@react-navigation/native";

import BellIcon from "../Assets/Icon/Bell";
import AddSquareIcon from "../Assets/Icon/Language";
import Icon from 'react-native-vector-icons/Feather';
import Notification from "../Screens/Home/Notification";
function HeaderComponent() {
  const [modalVisible, setModalVisible] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('');
  const [sliderAnim] = useState(new Animated.Value(0));
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [isEnglishButtonRed, setIsEnglishButtonRed] = useState(false);
  const [isHindiButtonRed, setIsHindiButtonRed] = useState(false);

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

  const handleNotificationClick = () => {
    navigation.navigate('Notification')
    setNotificationMessage('New notification message here');
    setNotificationVisible(true);
  };

  const handleCloseNotification = () => {
    setNotificationVisible(false);
  };

 
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', paddingRight: 130, paddingLeft: 65, fontFamily: 'Poppins' }}>
      <View style={styles.titleContainer}>
        <Text style={{ fontFamily: 'Poppins', height: 20, width: 99, color: '#848484' }}>Welcome Back</Text>
        <Text style={{ fontFamily: 'Poppins', lineHeight: 28, height: 28, width: 328, color: '#393939', fontWeight: 700, fontSize: 19.2 }}>Abhiram Ahuja</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity  style={styles.iconContainer} onPress={() => setModalVisible(true)}>
          <AddSquareIcon width={24} height={24} />
        </TouchableOpacity >
        <TouchableOpacity onPress={handleNotificationClick} style={styles.iconContainer} >
          <BellIcon width={24} height={24} />
        </TouchableOpacity>
      </View>
      {/* Modal */}
      <View style={styles.centeredView}>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: 20,
    flexDirection: "column",
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingLeft: 8,
    marginBottom: 8
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
  redButton:{
   color:'#B1292C',
  },
  blackButton:{
   color:'#393939'
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
    alignItems:'flex-end'
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
    height:64,
    width:328,
    paddingRight:20,
    paddingTop:12,
    paddingLeft:20,
    paddingBottom:12,
    borderRadius: 8,
    margin: 10,
    justifyContent:'center',
    borderRadius:10,
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
    fontFamily:'Poppins',
    fontSize:16,
    lineHeight:24,
    height:24
  },
});

export default HeaderComponent;
