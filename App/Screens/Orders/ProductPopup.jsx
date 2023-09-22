import React, { useState } from "react";
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
import Icon from 'react-native-vector-icons/Feather';
import { useTranslation } from 'react-i18next';
import ErrorIcon from "../../../assets/Icon/ErrorIcon";

function ProductPopup({ isVisible, onClose, onRefer, quantity, onEdit, onUpdateQuantity }) {
  const [name, setName] = useState('');
  const [editQuantity, setEditQuantity] = useState(quantity);
  const [quantityError, setQuantityError] = useState(false);
  // console.log('quantityError',quantityError,name)
  const { t } = useTranslation();

  const handleRef = () => {
    if (name === '' || (onEdit === false && !editQuantity)) {
      setQuantityError(true);
      return;
    }

    const updatedQuantity = onEdit ? editQuantity : name;
    
    if (onRefer) {
      onRefer(updatedQuantity);
    }
    
    if (onUpdateQuantity) {
      onUpdateQuantity(updatedQuantity);
    }

    onClose();
  }

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
              onPress={onClose}>
              <Icon name="x" size={24} color="#393939" backgroundColor='#ffffff' />
            </TouchableOpacity>
            <Image style={{ marginTop: 15, alignSelf: 'center' }} source={require('../../../assets/Images/ProductFullImage.png')} />
            <Text style={{ fontSize: 16, color: 'rgba(57, 57, 57, 1)', fontFamily: 'Poppins-Medium', marginLeft: 5, marginTop: 17 }}>TMT Bars</Text>
            <Text style={{ color: 'rgba(132, 132, 132, 1)', fontSize: 13, fontFamily: 'Poppins-Regular', marginLeft: 5 }}>{description}</Text>
            <View>
              <Text style={{ color: 'rgba(57, 57, 57, 1)', fontSize: 16, fontFamily: 'Poppins-Medium', marginTop: 8 }}>{t('quantity')}</Text>
              <TextInput
                style={styles.inputContainer}
                keyboardType="decimal-pad"
                maxLength={10}
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
                  <Text style={{ color: 'red', marginLeft: 5 }}>This field is required</Text>
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
    justifyContent: 'flex-end', // Position modal at the bottom
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
    width: '100%', // Set width to 100% to occupy the whole screen
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
