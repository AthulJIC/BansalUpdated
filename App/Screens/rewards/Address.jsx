import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Pressable, KeyboardAvoidingView, ScrollView, TextInput,Image, ActivityIndicator ,Alert} from 'react-native';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/Feather';
import ArrowIcon from '../../../assets/Icon/Arrow';
import EditIcon from '../../../assets/Icon/Edit';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation,getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { AddAddressService, deleteAddressService, updateAddressService } from '../../service/RewardsService/addAddressService';
import { AddressListService } from '../../service/RewardsService/AddressListService';
import LoadingIndicator from '../../Components/LoadingIndicator';
import useBackButtonHandler from '../../Components/BackHandlerUtils';
import { Dropdown } from 'react-native-element-dropdown';
import { RewardsApi } from '../../service/rewards/rewardservice';
import Icons from 'react-native-vector-icons/MaterialIcons'

const AddressList = ({navigation,route}) => {
  const data = route?.params.fromProfile;
  const [addresses,setaddresses]=useState([])
  const [addressItem,setadressItem]=useState([])
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isVisible, setVisible] = useState(false)
  const [name, setName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [location, setLocation] = useState('');
  const [area, setArea] = useState('')
  const [landMark, setLandMark] = useState('')
  const [pinCode, setPinCode] = useState('')
  const [Value, setTown] = useState('')
  const [states, setStates] = useState('')
  const [removeButton, setRemoveButton] = useState(false)
  const [rememberSelect, setrememberSelect] = useState(false)
  const [userId,setUserId]=useState('')
  const [editPress,setEditPress]=useState(false)
  const [textVisible,setTextVisible]=useState(false)
  const [isOpen, setIsOpen] = useState(false);

  const [nameError, setNameError] = useState('');
  const [mobileNoError, setMobileNoError] = useState('');
  const [pinCodeError, setPinCodeError] = useState('');
  const [statesError, setStatesError] = useState('');
  const [landMarkError, setLandMarkError] = useState('');
  const [houseNoError, setHouseNoError] = useState('');
  const [areaError, setAreaError] = useState('')
  const [townError, setTownError] = useState('');
  const [isLoading,setisLoading]=useState(false)
  const [value, setValue] = useState('');
  const { t } = useTranslation();
  const[stateList, setStateList]= useState([]);
  const [selectedStateName, setSelectedStateName] = useState('');
  const [stateId, setStateId ] = useState();
  console.log(addresses.length)
  useBackButtonHandler(navigation, false);
  const selectAddress = (addressId) => {
    setSelectedAddress(addressId);
  };
  let stateData = stateList.map((item) => ({
    value: item.id,
    label: item.state,
}));
function findStateNameById(stateId) {
  const state = stateList.find(item => item.id === stateId);
  return state ? state.state_name : '';
}
  useEffect(() => {
    addressList();
    getStateList();
    if (stateId) {
      const selectedStateName = findStateNameById(stateId);
      console.log('StateName====', selectedStateName);
      setValue(selectedStateName);
    }
}, [isVisible, stateId]);

  const onAddAddress=()=>{
    if(addresses.length===5)
    {
     Alert.alert('Alert', 'Address Limit Exceeded 5', [
       {
         text: 'OK',
         onPress: () => console.log('Cancel Pressed'),
         style: 'cancel',
       },
     ]);
     return
    }
    setVisible(true);
    setName('')
    setMobileNo('')
    setLocation("")
    setPinCode("")
    setTown("")
    //setSelectedStateName('');
    setValue('')
    setStateId('')
    setLandMark("")
    setTown('')
    setArea("")
    setEditPress(false)

  }
  const params={
    mobile:mobileNo,
    name:name,
    location:location,
    area:area,
    landMark:landMark,
    pinCode:pinCode,
    Value:Value,
    states:states,
    isDefault:rememberSelect
  }
  const handleInputFocus = (field) => {
    switch (field) {
      case 'name':
        setNameError('');
        break;
      case 'mobileNo':
        setMobileNoError('');
        break;
      case 'pinCode':
        setPinCodeError('');
        break;
      case 'states':
        setStatesError('');
        break;
      case 'landMark':
        setLandMarkError('');
        break;
      case 'houseNo' : 
        setHouseNoError('');
        break;
      case 'area':
        setAreaError('');
        break;
      case 'town':
        setTownError('');
        break;
      default:
        break;
    }
  };
  const addressList=()=>{
    setisLoading(true)
    AddressListService().then((res)=>{
      console.log('list', res.data.results)
      setaddresses(res.data.results)
      const selectedAddress = addresses.find(address => address.state_name === stateId);
      console.log('id===', selectedAddress);
      if (selectedAddress) {
        setValue(selectedAddress.state_name);
      }
      console.log("selectedStateName====", selectedStateName);
      setisLoading(false)
    })
  }
  function getStateList(){
      RewardsApi.getState().then((res) => {
         //console.log('success');
         if(res.status === 200){
           //console.log(res.data)
           setStateList(res.data.results)
         }
      })
  }
  const confirmHandler=()=>{
    if (isLoading) {
      return;
    }
    setisLoading(true)
    setNameError('');
    setMobileNoError('');
    setPinCodeError('');
    setStatesError('');
    setLandMarkError('');
    setTownError('');
    setAreaError('');
    setHouseNoError('');
    let isValid = true;
    if (name.trim() === '') {
      setNameError('Name is required');
      isValid = false;
      setisLoading(false)
    }

    if (mobileNo.trim() === '') {
      setMobileNoError('Mobile number Required');
      isValid = false;
      setisLoading(false)
    }
    if(mobileNo.length > 0 && mobileNo.length !== 10)
    {
      setMobileNoError('Mobile number Should be 10 digits');
      isValid = false;
      setisLoading(false)
    }

    if (pinCode.trim() === '' || pinCode.length !== 6 || pinCode.length >6 ) {
      setPinCodeError('Pin code should be 6 digits');
      isValid = false;
      setisLoading(false)
    }

    if (!value) {
      setStatesError('State is required');
      isValid = false;
      setisLoading(false)
    }

    if (landMark.trim() === '') {
      setLandMarkError('Landmark is required');
      isValid = false;
      setisLoading(false)
    }

    if (Value.trim() === '') {
      setTownError('Town is required');
      isValid = false;
      setisLoading(false)

    }
    if(area.trim() === ''){
      setAreaError('Area is required');
      isValid = false;
      setisLoading(false)
    }
    if(location.trim() === ''){
      setHouseNoError('House/Flat No is required');
      isValid = false;
      setisLoading(false)
    }
    if (isValid) {
      addressHandler();
    }
}
function addressHandler(){
  console.log('editPress', editPress)
   if(editPress){
    const data = {
      mobile: mobileNo,
      name:name,
      address_1:location,
      address_2:area,
      land_mark:landMark,
      pincode:pinCode,
      city:Value,
      is_default:rememberSelect,
      state_name:value
   }
   console.log('data====',data)
   RewardsApi.updateAddress(data, userId).then((res) => {
    console.log('success',res.status);
         if(res.status === 200){
          setVisible(false);
          setisLoading(false)
         }
     }).catch((err) => {
      setisLoading(false);
   })
   }
   else{
     const data = {
        mobile: mobileNo,
        name:name,
        address_1:location,
        address_2:area,
        land_mark:landMark,
        pincode:pinCode,
        city:Value,
        is_default:rememberSelect,
        state_name:value
     }
     console.log('data====',data)
     RewardsApi.addAddress(data).then((res) => {
         console.log('success',res.status);
         if(res.status === 201){
          setVisible(false);
          setisLoading(false)
         }
     }).catch((err) => {
      setisLoading(false);
     })
   }
}

const deleteHandler=()=>{
  if (isLoading) {
    return;
  }
  setisLoading(true)
  RewardsApi.deleteAddress(userId).then((res) => {
    console.log(res.status)
    if(res.status === 204){
      setVisible(false)
      setisLoading(false)
    }
 }).catch((err) => {
  setisLoading(false);
 })
}

  const onEditPress = (item) => {
    console.log('item=====', item)
    setName(item.name)
    setMobileNo(item.mobile)
    setLocation(item.address_1)
    setArea(item.address_2)
    setPinCode(item.pincode)
    setLandMark(item.land_mark)
    setTown(item.city)
    //setValue(item.state_name);
    setStateId(item.state_name)
    setrememberSelect(item.is_default)
    setUserId(item.id)
    setEditPress(true)
  }
 const continueButton=()=>{
  if(selectedAddress===null){
      setTextVisible(true)
  }
  else{
   
    navigation.navigate('Confirm',{addressItem})
  }
 }
 function stateHandler(item){
    console.log(item);
    // const stateName = findStateNameById(item.value);
    // setSelectedStateName(stateName);
    setValue(item?.value);
    setIsOpen(true)
 }
 function closeHandler(){
  setVisible(false)
  setNameError('');
  setMobileNoError('');
  setPinCodeError('');
  setStatesError('');
  setLandMarkError('');
  setTownError('');
  setAreaError('');
  setHouseNoError('');
 }
 const renderItem = ({ item }) => {
  //console.log('item1===', item)

    return (
      <Pressable
        //disabled={data}
        onPress={() => {
          selectAddress(item.id);
          setadressItem(item);
          setTextVisible(false)
        }}
        style={[
          styles.addressItem,
          (selectedAddress === item?.id || (item?.is_default && selectedAddress === null)) && {
            borderColor: '#B1292C',
            borderWidth: 1,
          },]}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={[styles?.name, selectedAddress === item?.id && { color: '#B1292C' }]}>{item.name}</Text>
          <TouchableOpacity
            onPress={() => {
              onEditPress(item);
              setRemoveButton(true);
              setVisible(true);
            }}
            style={styles.modalCard}
          >
            <EditIcon width={45} height={16} />
          </TouchableOpacity>
        </View>
        <Text style={styles.address}>
          {item.address_1},{item.address_2},{item.land_mark},{item.city},{item.state}
        </Text>
        <Text style={{ marginTop: 8 }}>{item.mobile}</Text>
      </Pressable>
    );
  }
  return (
    <View style={{ backgroundColor: '#ffffff', height: '100%', borderRadius: 8 }}>
      <TouchableOpacity onPress={() => {onAddAddress(); setRemoveButton(false) }} style={styles.addaddressItem}>
        <Text style={{color:"#393939",fontFamily:"Poppins-Medium",fontSize:16,fontWeight:500,lineHeight:24}}>{t('address')}</Text>
        <ArrowIcon width={24} height={24} color="#393939" />
      </TouchableOpacity>
    
{addresses.length !== 0 ?
      (
      <View style={{flex:1}}>
      <FlatList
        data={addresses}
        renderItem={renderItem}
        keyExtractor={(item) => item?.id}
        contentContainerStyle={{ paddingBottom: 20 }} 
      />
      {textVisible ?
      <Text style={{color:'rgba(177, 41, 44, 1)',fontFamily:"Poppins",fontSize:13.33,textAlign:'center',lineHeight:20}}>
      Please select an address for delivery.
      </Text>: null}
      </View>)
      :
      (<View style={{alignSelf:'center',justifyContent:"center",alignItems:'center'}}> 
        <View style={{width:220,height:200,backgroundColor:'#F2F2F2',justifyContent:"center",alignItems:"center",borderRadius:100,marginTop:20,}}>
      <Image style={{width:170,height:100}} source={require('../../../assets/Images/AddressEmpty.png')} alt="Image" />
     </View> 
     <Text style={{marginTop:20,width:220,height:24,fontFamily:'Poppins-Bold',
     fontSize:16,fontWeight:'500',alignItems:'center',marginLeft:90,color:'#393939'}}>No addresses yet</Text>
     <Text style={{fontFamily:"Poppins",fontSize:13.33,color:"#848484",textAlign:'center',lineHeight:20}}>
     Please add your address for delivery.
     </Text>
     </View>)}
      <View style={styles.modalButtonContainer}>
        { !data && 
          <Pressable onPress={()=>{continueButton()}} style={{ marginBottom: 10, borderRadius: 5, width: '90%', backgroundColor: 'rgba(177, 41, 44, 1)', alignItems: 'center', height: 48, radius: 4, padding: 12 }} >
            <Text style={{ fontFamily: 'Poppins-Regular', fontWeight: '500', fontSize: 16, lineHeight: 24, color: '#ffffff', height: 24 }}>
             {t('continueButton')}
            </Text>
          </Pressable>
        }
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
                  onPress={closeHandler} style={[{ alignItems: 'flex-end', marginTop: 15, marginRight: 15 }]}>
                  <Icon name="x" size={24} color="#393939" backgroundColor='#ffffff' />
                </TouchableOpacity>
                <TextInput
                  style={styles.inputContainer}
                  placeholder={t("name")}
                  placeholderTextColor={'rgba(132, 132, 132, 1)'}
                  onChangeText={text => setName(text)}
                  value={name}
                  maxLength={25}
                  onFocus={() => handleInputFocus('name')}
                />
                {nameError ? <Text style={{ color: '#B1292C' }}>{nameError}</Text> : null}
                <TextInput
                  style={styles.inputContainer}
                  placeholder={t('mobile')}
                  placeholderTextColor={'rgba(132, 132, 132, 1)'}
                  onChangeText={text => setMobileNo(text)}
                  value={mobileNo}
                  keyboardType='phone-pad'
                  onFocus={() => handleInputFocus('mobileNo')}
                  maxLength={10}
                />
                 {mobileNoError ? <Text style={{ color: '#B1292C' }}>{mobileNoError}</Text> : null}
                <TextInput
                  style={styles.inputContainer}
                  placeholder={t("house")}
                  placeholderTextColor={'rgba(132, 132, 132, 1)'}
                  onChangeText={text => setLocation(text)}
                  value={location}
<<<<<<< HEAD
                  maxLength={25}
                 
=======
                  onFocus={() => handleInputFocus('houseNo')}
>>>>>>> origin/main
                />
               {houseNoError ? <Text style={{ color: '#B1292C' }}>{houseNoError}</Text> : null}
                <TextInput
                  style={styles.inputContainer}
                  placeholder={t('area')}
                  placeholderTextColor={'rgba(132, 132, 132, 1)'}
                  onChangeText={text => setArea(text)}
                  value={area}
<<<<<<< HEAD
                  maxLength={25}
=======
                  onFocus={() => handleInputFocus('area')}
>>>>>>> origin/main
                />
                {areaError ? <Text style={{ color: '#B1292C' }}>{areaError}</Text> : null}
                <TextInput
                  style={styles.inputContainer}
                  placeholder={t("landMark")}
                  placeholderTextColor={'rgba(132, 132, 132, 1)'}
                  onChangeText={text => setLandMark(text)}
                  value={landMark}
                  maxLength={25}
                  onFocus={() => handleInputFocus('landMark')}
                />
                {landMarkError ? <Text style={{ color: '#B1292C' }}>{landMarkError}</Text> : null}
                <TextInput
                  style={styles.inputContainer}
                  placeholder={t("pin")}
                  placeholderTextColor={'rgba(132, 132, 132, 1)'}
                  onChangeText={text => setPinCode(text)}
                  value={pinCode}
                  keyboardType='phone-pad'
                  onFocus={() => handleInputFocus('pinCode')}
                  maxLength={6}
                />
                {pinCodeError ? <Text style={{ color: '#B1292C' }}>{pinCodeError}</Text> : null}
                <TextInput
                  style={styles.inputContainer}
                  placeholder={t("town")}
                  placeholderTextColor={'rgba(132, 132, 132, 1)'}
                  onChangeText={text => setTown(text)}
                  value={Value}
                  maxLength={25}
                  onFocus={() => handleInputFocus('town')}
                />
                {townError ? <Text style={{ color: '#B1292C' }}>{townError}</Text> : null}
                {/* <TextInput
                  style={styles.inputContainer}
                  placeholder={t("state")}
                  placeholderTextColor={'rgba(132, 132, 132, 1)'}
                  onChangeText={text => setStates(text)}
                  value={states}
                  onFocus={() => handleInputFocus('states')}
                /> */}
                <View >
                  <Dropdown
                      style={styles.dropdown}
                      selectedTextStyle={styles.selectedTextStyle}
                      value={value} 
                      data={stateData}
                      mode='modal'
                      labelField="label"
                      valueField="value"
                      iconColor='white'   
                      placeholder='State'   
                      placeholderStyle={styles.placeholderStyle}                 
                      onChange={(item) => 
                          stateHandler(item)
                      }
                      itemTextStyle = {{color:'black',fontSize:11,fontFamily:'Poppins-Regular',maxHeight:15}}
                      containerStyle={styles.dropdownContainer}
                      renderRightIcon={() => (
                          <Icons name={isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={27} color="rgba(57, 57, 57, 0.9)" style={{bottom:1.5}}/>
                      )}
                      onFocus={() => {
                        setIsOpen(true)
                        setStatesError('')
                      }}
                      onBlur={() => setIsOpen(false)} 
                  />
                </View>
                {statesError ? <Text style={{ color: '#B1292C' }}>{statesError}</Text> : null}
                <View style={styles.checkboxContainer}>
                  <CheckBox
                    value={rememberSelect}
                    onValueChange={setrememberSelect}
                    style={[styles.checkbox]}
                    boxType='square'
                    tintColors={{ true: 'rgba(43, 89, 195, 1)', false: 'gray' }}
                  />
                  <Text style={styles.label}>{t('default')}</Text>
                </View>
                <View style={{marginTop:75}}>
                  {removeButton == true ?
                    <TouchableOpacity onPress={()=>{deleteHandler(userId)}}  style={styles.removeButton}>
                      <Text style={styles.removeText}>Remove</Text>
                    </TouchableOpacity> : null}
                  <View style={removeButton ? { marginTop: 1 } : { marginTop: 10 }}>
                    <Pressable onPress={confirmHandler} style={styles.referButton} >
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
      {isLoading && <LoadingIndicator visible={isLoading} text='Loading...'/>}
    </View>
  );
};

const styles = StyleSheet.create({
  addressItem: {
    padding: 16,
    width: '90%',
    marginTop: 15,
    elevation: 4,
    borderRadius: 8,
    backgroundColor: 'white',
    height: 116,
    alignSelf:'center',
    height:'auto'
 
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
    width:'80%'
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
    width: '100%',
    color: 'black',
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
  dropdown: {
    height: 45,
    width:'100%',
    borderColor:'black',
    borderWidth:0.5,
    borderRadius:5,
    marginTop:10
},
placeholderStyle: {
    fontSize: 14,
    color:'rgba(132, 132, 132, 1)',
    fontFamily:'Poppins-Regular',
    marginLeft:15
},
selectedTextStyle: {
    fontSize: 15,
    marginLeft:15,
    color:'rgba(57, 57, 57, 1)',
    fontFamily:'Poppins-Regular'
},
iconStyle: {
    width: 25,
    height: 25,
    marginRight:2,
},
dropdownContainer:{
    borderRadius:3,
},
});

export default AddressList;
