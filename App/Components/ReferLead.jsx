import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { View, TouchableOpacity, TextInput, Pressable, Text, StyleSheet, KeyboardAvoidingView, ScrollView } from "react-native";
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/Feather';

function ReferLead({ isVisible,onUpdateDetails, onClose, onRefer, onEdit, editquantity, editLocation, editMobile, editName, }) {
  const [name, setName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [location, setLocation] = useState('');
  const [quantity, setQuantity] = useState('')
  const [localQuantity, setLocalQuantity] = useState(editquantity)
  const [localMobile, setLocalMobile] = useState(editMobile)
  const [localLocation, setLocalLocation] = useState(editLocation)
  const [localName, setLocalName] = useState(editName)
  const [erorrMessage,setErorr]=useState('')
  const [erorrMessageName,seterorrMessageName]=useState('')
  const [erorrMessageMobile,seterorrMessageMobile]=useState('')
  const [validationError,setvalidationError]=useState(false)
  const [erorrLocation,setErorrLocation]=useState('')
  const [quantityErorr,setQuantityErorr]=useState('')
  // const resetState = () => {
  //   setName('');
  //   setMobileNo('');
  //   setLocation('');
  //   setQuantity('');
  //   setLocalQuantity(editquantity);
  //   setLocalMobile(editMobile);
  //   setLocalLocation(editLocation);
  //   setLocalName(editName);
  //   // setErorrMessage('');
  //   // seterorrMessageName('');
  //   // seterorrMessageMobile('');
  //   // setvalidationError(false);
  //   // setErorrLocation('');
  //   // setQuantityErorr('');
  // };
  function handleRef() {
    const params = {
      name: onEdit == true ? localName : name,
      mobileNo: onEdit == true ? localMobile : mobileNo,
      location: onEdit == true ? localLocation : location,
      quantity: onEdit == true ? localQuantity : quantity,
    };
    const isOnlyZeros = /^0+$/.test(quantity);
    const hasPattern = /000|00000/.test(name);
    const hasSpecialCharacters = /[,.]/.test(quantity);
    const hasQuantityPattern = /000|00/.test(quantity);
    if(params.name==='')
    {
      setvalidationError(true)
      seterorrMessageName('* Name Required')
      return
    }
    if (params.mobileNo.length<10 || params.mobileNo.length > 10)
    {
      setvalidationError(true)
      seterorrMessageMobile('* Please enter a valid mobile Number')
      return
    }
    if(params.location==='')
    {
      setvalidationError(true)
    setErorrLocation('* Location Field is empty')
    return
    }
    if (params.quantity === '' ) {
      setvalidationError(true);
      setQuantityErorr('* Quantity Required');
      return
    } else if (isOnlyZeros || hasSpecialCharacters || hasQuantityPattern) {
      setvalidationError(true);
      setQuantityErorr('* Enter a valid number');
      return
    }
    if(params.quantity>500)
    {
      setvalidationError(true);
      setQuantityErorr('* Limit Exceeded');
      return
    }
   if (onRefer) {
      onRefer(params);
    }
    if(onUpdateDetails)
    {
      onUpdateDetails(params)
    }
    setName('');
    setMobileNo('');
    setLocation('');
    setQuantity('');
    onClose(params); 
   }
  return (
    <View>
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
                style={[{ alignItems: 'flex-end', marginTop: 15, marginRight: 15 }]}
                onPress={onClose}>
                <Icon name="x" size={24} color="#393939" backgroundColor='#ffffff' />
              </TouchableOpacity>
              <TextInput
                style={styles.inputContainer}
                placeholder="Name"
                onFocus={() => {
                  seterorrMessageName(''); 
                  setvalidationError(false); 
                }}
                placeholderTextColor={'rgba(132, 132, 132, 1)'}
                onChangeText={text => onEdit ? setLocalName(text) : setName(text)}
                value={onEdit ? localName : name}
                maxLength={15}
              />
               {
              validationError && (
                <View style={{ flexDirection: 'row',marginTop:8 }}>
                  <Text style={{ color: 'red', marginLeft: 5 }}>{erorrMessageName}</Text>
                </View>
              )
            }
              <TextInput
                style={styles.inputContainer}
                onFocus={() => {
                  seterorrMessageName(''); 
                  seterorrMessageMobile(false); 
                }}
                placeholder="Mobile Number"
                keyboardType="phone-pad"
                placeholderTextColor={'rgba(132, 132, 132, 1)'}
                onChangeText={text => onEdit ? setLocalMobile(text) : setMobileNo(text)}
                value={onEdit ? localMobile : mobileNo}
                maxLength={10}
              />
               {
              validationError && (
                <View style={{ flexDirection: 'row',marginTop:8 }}>
                  <Text style={{ color: 'red', marginLeft: 5 }}>{erorrMessageMobile}</Text>
                </View>
              )
            }
              <TextInput
                style={styles.inputContainer}
                onFocus={() => {
                  seterorrMessageName(''); 
                  setErorrLocation(false); 
                }}
                placeholder="Site Location"
                placeholderTextColor={'rgba(132, 132, 132, 1)'}
                onChangeText={text => onEdit ? setLocalLocation(text) : setLocation(text)}
                value={onEdit ? localLocation : location}
               
              />

               {
              validationError && (
                <View style={{ flexDirection: 'row',marginTop:8 }}>
                  <Text style={{ color: 'red', marginLeft: 5 }}>{erorrLocation}</Text>
                </View>
              )
            }
              <TextInput
                style={styles.inputContainer}
                onFocus={() => {
                  seterorrMessageName(''); 
                  setQuantityErorr(false); 
                }}
                placeholder="Required Quantity in Ton"
                keyboardType="numeric"
                placeholderTextColor={'rgba(132, 132, 132, 1)'}
                onChangeText={text => onEdit ? setLocalQuantity(text) : setQuantity(text)}
                value={onEdit ? localQuantity : quantity}
                maxLength={3}
              />
               {
              validationError && (
                <View style={{ flexDirection: 'row',marginTop:8 }}>
                  <Text style={{ color: 'red', marginLeft: 5 }}>{quantityErorr}</Text>
                </View>
              )
            }
              <View style={styles.modalButtonContainer}>
                <Pressable style={styles.referButton}
                  onPress={handleRef} >
                  <Text style={styles.referButtonText}>
                    Refer
                  </Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </View>

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
    marginTop: 15,
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
export default ReferLead;