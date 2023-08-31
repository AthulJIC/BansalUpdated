import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Pressable, KeyboardAvoidingView, ScrollView, TextInput } from 'react-native';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/Feather';
import ArrowIcon from '../../../assets/Icon/Arrow';
import EditIcon from '../../../assets/Icon/Edit';
import CheckBox from '@react-native-community/checkbox';

const addresses = [
  {
    id: '1',
    name: 'John Doe',
    address: '123 Main St, City, Country',
    mobileNo: '89989898989',
    pincode: '898989898898',
    City: 'thalassery',
    state: 'Kerala'
  },
  {
    id: '2',
    name: 'Jane Smith',
    address: '456 Elm St, Town, Country',
    mobileNo: '89989898989',
    pincode: '898989898898',
    City: 'thalassery',
    state: 'Kerala'
  },
  // Add more addresses as needed
];

const AddressList = ({navigation}) => {
  const [addressItem,setadressItem]=useState([])
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isVisible, setVisible] = useState(false)
  const [name, setName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [location, setLocation] = useState('');
  const [quantity, setQuantity] = useState('')
  const [landMark, setLandMark] = useState('')
  const [pinCode, setPinCode] = useState('')
  const [town, setTown] = useState('')
  const [states, setStates] = useState('')
  const [removeButton, setRemoveButton] = useState(false)
  const [rememberSelect, setrememberSelect] = useState(false)
  const selectAddress = (addressId) => {
    setSelectedAddress(addressId);
  };
  const onEditPress = (item) => {
    setName(item.name)
    setMobileNo(item.mobileNo)
    setLocation()
    setPinCode(item.pincode)
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {selectAddress(item.id) ;setadressItem(item)}}
      style={[
        styles.addressItem,
        selectedAddress === item.id && { backgroundColor: '#F0F0F0', borderColor: '#B1292C', borderWidth: 1 },
      ]}
    >
        <Text style={[styles.name, selectedAddress === item.id && { color: '#B1292C' }]}>{item.name}</Text>
      <TouchableOpacity onPress={() => { setVisible(true); onEditPress(item); setRemoveButton(true) }} style={styles.modalCard}>
      <EditIcon width={45} height={16} />
      </TouchableOpacity>
      <Text style={styles.address}>{item.address}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ backgroundColor: '#ffffff', height: '100%', borderRadius: 8 }}>
      <TouchableOpacity onPress={() => { setVisible(true); setRemoveButton(false) }} style={styles.addaddressItem}>
        <Text>Add New Address</Text>
        <ArrowIcon width={24} height={24} color="#393939" />
      </TouchableOpacity>
      <FlatList
        data={addresses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.modalButtonContainer}>
        <Pressable onPress={()=>{navigation.navigate('Confirm',{addressItem})}} style={{ marginBottom: 10, borderRadius: 5, width: '90%', backgroundColor: 'rgba(177, 41, 44, 1)', alignItems: 'center', height: 48, radius: 4, padding: 12 }} >
          <Text style={{ fontFamily: 'Poppins-Regular', fontWeight: '500', fontSize: 16, lineHeight: 24, color: '#ffffff', height: 24 }}>
            Continue
          </Text>
        </Pressable>
      </View>
      {/* Modal */}
      <View>
        <Modal
          animationIn="slideInUp"
          animationOut="slideOutDown"
          isVisible={isVisible}
          hasBackdrop={true}
          backdropColor="black"
          backdropOpacity={0.70}
          width={'100%'}
          style={styles.modalContainer}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ width: '100%' }}>
            <ScrollView contentContainerStyle={[styles.scrollViewContent]}>
              <View style={styles.centeredView}>
                <TouchableOpacity
                  onPress={() => { setVisible(false) }} style={[{ alignItems: 'flex-end', marginTop: 15, marginRight: 15 }]}>
                  <Icon name="x" size={24} color="#393939" backgroundColor='#ffffff' />
                </TouchableOpacity>
                <TextInput
                  style={styles.inputContainer}
                  placeholder="Name"
                  placeholderTextColor={'rgba(132, 132, 132, 1)'}
                  onChangeText={text => setName(text)}
                  value={name}
                />
                <TextInput
                  style={styles.inputContainer}
                  placeholder="Mobile Number"
                  placeholderTextColor={'rgba(132, 132, 132, 1)'}
                  onChangeText={text => setMobileNo(text)}
                  value={mobileNo}
                />
                <TextInput
                  style={styles.inputContainer}
                  placeholder="Flat/House no/Floor/Building"
                  placeholderTextColor={'rgba(132, 132, 132, 1)'}
                  onChangeText={text => setLocation(text)}
                  value={location}
                />
                <TextInput
                  style={styles.inputContainer}
                  placeholder="Area/Street/Sector/Village"
                  placeholderTextColor={'rgba(132, 132, 132, 1)'}
                  onChangeText={text => setQuantity(text)}
                  value={quantity}
                />
                <TextInput
                  style={styles.inputContainer}
                  placeholder="Landmark"
                  placeholderTextColor={'rgba(132, 132, 132, 1)'}
                  onChangeText={text => setLandMark(text)}
                  value={quantity}
                />
                <TextInput
                  style={styles.inputContainer}
                  placeholder="Pin Code"
                  placeholderTextColor={'rgba(132, 132, 132, 1)'}
                  onChangeText={text => setPinCode(text)}
                  value={pinCode}
                />
                <TextInput
                  style={styles.inputContainer}
                  placeholder="Town/City"
                  placeholderTextColor={'rgba(132, 132, 132, 1)'}
                  onChangeText={text => setTown(text)}
                  value={quantity}
                />
                <TextInput
                  style={styles.inputContainer}
                  placeholder="State"
                  placeholderTextColor={'rgba(132, 132, 132, 1)'}
                  onChangeText={text => setStates(text)}
                  value={quantity}
                />
                <View style={styles.checkboxContainer}>
                  <CheckBox
                    value={rememberSelect}
                    onValueChange={setrememberSelect}
                    style={[styles.checkbox]}
                    boxType='square'
                    tintColors={{ true: 'rgba(43, 89, 195, 1)', false: 'gray' }}
                  />
                  <Text style={styles.label}>Set As Default</Text>
                </View>
                <View style={{marginTop:75}}>
                  {removeButton == true ?
                    <TouchableOpacity style={styles.removeButton}>
                      <Text style={styles.removeText}>Remove</Text>
                    </TouchableOpacity> : null}
                  <View style={removeButton ? { marginTop: 1 } : { marginTop: 10 }}>
                    <Pressable style={styles.referButton} >
                      <Text style={styles.referButtonText}>
                        Save
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addressItem: {
    marginLeft: 12,
    padding: 16,
    paddingLeft: 16,
    width: '90%',
    marginTop: 15,
    elevation: 4,
    borderRadius: 8,
    backgroundColor: 'white',
    height: 116,
    marginBottom: 12
  },
  addaddressItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 12,
    padding: 16,
    paddingLeft: 16,
    width: '90%',
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
    borderRadius: 8
  },
  name: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#000',
  },
  address: {
    fontSize: 16,
    color: '#888',
  },
  modalButtonContainer: {
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 35,
    alignSelf: 'center',
  },
  modalCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,

  },
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  centeredView: {
    backgroundColor: 'white',
    borderTopRightRadius: 9,
    borderTopLeftRadius: 9,
    padding: 15,
    height: '100%',
  },
  modalButtonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  inputContainer: {
    height: 45,
    width: '100%', // Set width to 100% to occupy the whole screen
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
  removeButton: {
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
    borderColor: '#EB1C1C',
    borderWidth: 1,
    alignItems: 'center',
    height: 48,
    radius: 4,
    padding: 12,
    marginTop: 20
  },
  removeText: {
    color: '#EB1C1C',
    fontFamily: 'Poppins-Regular',
    fontSize: 16
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 0
  },
  checkbox: {
    height: 20,
    width: 20,
    transform: [{ scaleX: 1 }, { scaleY: 1 }],
    marginTop: 5
  },
  label: {
    fontFamily: 'Poppins-Regular',
    marginLeft: 8,
    color: '#393939',
    marginTop: 8,
    fontSize: 13

  },
});

export default AddressList;
