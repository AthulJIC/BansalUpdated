import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  Pressable,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Image,
} from "react-native";
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';
import AsyncStorage from "@react-native-async-storage/async-storage";

function ProductPopup({ isVisible, onClose, onRefer, quantity, onEdit, onUpdateQuantity }) {
  const [name, setName] = useState();
  const [editQuantity, setEditQuantity] = useState(quantity);
  const [quantityError, setQuantityError] = useState(false);
  const [erorrText,setErorrText] =useState('')
  const [role, setRole] = useState('')
  console.log('role',role,editQuantity)
  const { t } = useTranslation();

  useEffect(() => {
    const getValueFromStorage = async () => {
      try {
        const user = await AsyncStorage.getItem('role'); 
        setRole(user)
        setErorrText('')
      } catch (error) {
        console.error('Error fetching data from AsyncStorage:', error);
      }
    };
    getValueFromStorage()
  }, []);
  useEffect(() => {
   setEditQuantity(quantity)
  }, [isVisible]);
  const onButton=()=>{
    setName('')
    setEditQuantity('')
    setErorrText('')
    onClose()
  }
  const handleRef = () => {
    const nonZeroNumberRegex = /^(?!0+$)[0-9]+$/;
    const updatedQuantity = onEdit ? editQuantity : name;
    if (updatedQuantity > 300 && role === 'Contractor') {
      setQuantityError(true);
      setErorrText('Maximum Limit exceeded. Your Limit is up to 300 in a single order');
      return;
    }
    if (updatedQuantity > 500 && (role === 'Engineer' || role === 'Architect')) {
      setQuantityError(true);
      setErorrText('Maximum Limit exceeded. Your Limit is up to 500 in a single order');
      return;
    }
    // else if (/\s/.test(updatedQuantity) || /[^\d]/.test(updatedQuantity)) {
    //   setQuantityError(true);
    //   setErorrText('* Only Numeric Values Excepted ');
    //   return;
    // }
  
    if ((onEdit && (!editQuantity || !nonZeroNumberRegex.test(editQuantity)) ) || (!onEdit && (!name || !nonZeroNumberRegex.test(name))) ) {
      setQuantityError(true);
      setErorrText('Please enter valid quantity');
      return;
    }
  
  
    // const containsNonZero = /[1-9]/.test(updatedQuantity);
    // const isOnlyZeros = /^0+$/.test(updatedQuantity);
    // const hasSpecialCharacters = /[^\d\s]/.test(updatedQuantity);
  
    // if (isOnlyZeros) {
    //   setErorrText('Input contains only zeros.');
    //   setQuantityError(true);
    //   return;
    // }
  
    // if (hasSpecialCharacters) {
    //   setErorrText('Input contains special characters or letters.');
    //   setQuantityError(true);
    //   return;
    // }
  
    // if (!containsNonZero) {
    //   setQuantityError(true);
    //   setErorrText('* Quantity should contain at least one non-zero digit');
    //   return;
    // }
  
    if (onRefer) {
      onRefer(updatedQuantity);
    }
  
    if (onUpdateQuantity) {
      onUpdateQuantity(updatedQuantity);
    }
  
    setName('');
    onClose();
  };
  

  const description = t('description')

  return (
    <Modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      isVisible={isVisible}
      hasBackdrop={true}
      backdropColor="black"
      backdropOpacity={0.70}
      onBackdropPress={onClose}
      width={'100%'}
      style={styles.modalContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ width: '100%' }}>
        <ScrollView contentContainerStyle={[styles.scrollViewContent]}>
          <View style={styles.centeredView}>
            <TouchableOpacity
              style={[{ alignItems: 'flex-end', marginTop: 15, marginRight: 5 }]}
              onPress={()=>{onButton()}}>
              <Icon name="close" size={24} color="#393939" backgroundColor='#ffffff' />
            </TouchableOpacity>
            <Image style={{ marginTop: 15, alignSelf: 'center' }} source={require('../../../assets/Images/ProductFullImage.png')} />
            <Text style={{ fontSize: 16, color: 'rgba(57, 57, 57, 1)', fontFamily: 'Poppins-Medium', marginLeft: 5, marginTop: 17 }}>TMT Bars</Text>
            <Text style={{ color: 'rgba(132, 132, 132, 1)', fontSize: 13, fontFamily: 'Poppins-Regular', marginLeft: 5 }}>{description}</Text>
            <View>
              <Text style={{ color: 'rgba(57, 57, 57, 1)', fontSize: 16, fontFamily: 'Poppins-Medium', marginTop: 8 }}>{t('quantity')}</Text>
              <TextInput
                style={styles.inputContainer}
                keyboardType="decimal-pad"
                maxLength={3}
                placeholder={t('Qinput')}
                placeholderTextColor={'rgba(132, 132, 132, 1)'}
                onChangeText={text => onEdit ? setEditQuantity(text) : setName(text)}
                value={onEdit ? editQuantity : name}
                onPressIn={() => { setQuantityError(false) }}
              />
            </View>
            {
              quantityError && (
                <View style={{ flexDirection: 'row',marginTop:8 }}>
                  <Text style={{ color: 'red', marginLeft: 5 }}>{erorrText}</Text>
                </View>
              )
            }
            <View style={styles.modalButtonContainer}>
              <Pressable style={styles.referButton} onPress={handleRef}>
                <Text style={styles.referButtonText}>
                  {t('purchase')} 
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end', 
    margin: 0,
  },
  centeredView: {
    backgroundColor: 'white',
    borderTopRightRadius: 9,
    borderTopLeftRadius: 9,
    padding: 15,
    height: 630
  },
  modalButtonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center'
  },
  inputContainer: {
    height: 45,
    width: '100%',
    color: '#848484',
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 10,
    paddingLeft: 15,
    fontFamily: 'Poppins-Regular',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  referButton: {
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
    backgroundColor: 'rgba(177, 41, 44, 1)',
    alignItems: 'center',
    height: 48,
    radius: 4,
    padding: 12,
  },
  referButtonText: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    color: '#ffffff',
    height: 24,
  },
});

export default ProductPopup;
