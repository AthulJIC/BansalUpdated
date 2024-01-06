import { useRef, useState } from "react";
import { Text, View, Pressable, StyleSheet, PermissionsAndroid, TextInput } from "react-native";
import LoadingIndicator from "../../Components/LoadingIndicator";
import { Dropdown } from 'react-native-element-dropdown';
import useBackButtonHandler from "../../Components/BackHandlerUtils";
import { RewardsApi } from "../../service/rewards/rewardservice";
import { useAppContext } from "../../context/AppContext";
import { t } from "i18next";

function IdVerificationScreen({ navigation , route}) {
  const id = route?.params.id;
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(id?.id_type);
  const [name, setName] = useState('');
  const [mobileNo, setMobileNo] = useState(id?.id_number);
  const [validationError, setvalidationError] = useState(false)
  const [erorrMessageName, seterorrMessageName] = useState('')
  const [erorrMessageid, seterorrMessageid] = useState('')
  const [validationIdError, setvalidationIdError] = useState(false)
  const [validationTypeError, setValidationTypeError] = useState(false)
  const [erorrMessagetype, seterorrMessagetype] = useState('')
  const { updateUserDetails } = useAppContext();
 
  console.log('id=====', id);
  useBackButtonHandler(navigation, false);
  const handleButtonPress = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handleCameraLaunch = async () => {
    const idNumberPattern = /^[a-zA-Z0-9]+$/;
    const regex = /^[a-zA-Z][a-zA-Z ]*$/;


    let nameError = '';
    let idNumberError = '';

    if (!name.trim() || !regex.test(name) || name === 'null') {
      setvalidationError(true)
      seterorrMessageName('Please enter a valid name');
      return
    } 
    else{
      setvalidationError(false)
      seterorrMessageName('');
    }

    if (!mobileNo.trim() || !idNumberPattern.test(mobileNo) || mobileNo === 'null') {
      setvalidationIdError(true)
      seterorrMessageid('Please enter a valid id number');
      return
    } 
     else{
      setvalidationIdError(false)
      seterorrMessageid('');
    }
    if (!value.trim() || !regex.test(value) || value === 'null' || (value.toLowerCase() !== 'aadhar' && value.toUpperCase() !== 'AADHAR' && value.toLowerCase() !== 'pan' && value.toUpperCase() !== 'PAN')) {
      setValidationTypeError(true)
      seterorrMessagetype('Please enter a valid id type');
      return
    } 
    else{
      setValidationTypeError(false)
      seterorrMessagetype('');
    }
    const data = {
      name: name , 
      id_type: value,
      id_number: mobileNo
    }
    RewardsApi.idVerify(data, id?.id).then((res) => {
      console.log('res=====', res.data)
      if(res.status === 200) {
        updateUserDetails({
          id_number: res.data.id_number,
          id_Type: res.data.id_type,
          name:res.data.name,
          id: id?.id
        });
        navigation.navigate('IdConfirmation')
      }
    })
 
  setLoading(false)

  };
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Text style={{ color: 'rgba(57, 57, 57, 1)', fontSize: 16, fontFamily: 'Poppins-Medium', marginLeft: 17 }}>{t("IdVerification")}</Text>
      <Text style={{ color: 'rgba(132, 132, 132, 1)', fontSize: 13, fontFamily: 'Poppins-Regular', marginLeft: 17 }}>{t("PhotoIdText")}</Text>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {/* <Pressable
                    style={[
                    styles.button,
                    activeButton === 'Aadhar Card' && styles.activeButton,
                    ]}
                    onPress={() => handleButtonPress('Aadhar Card')}
                >
                <Text style={[styles.buttonText, activeButton === 'Aadhar Card' && {color:'rgba(177, 41, 44, 1)'}]}>Aadhar Card</Text>
                </Pressable>
                <Pressable
                    style={[
                    styles.button,
                    activeButton === 'PAN Card' && styles.activeButton,
                    ]}
                    onPress={() => handleButtonPress('PAN Card')}
                >
                <Text style={[styles.buttonText, activeButton === 'PAN Card' && {color:'rgba(177, 41, 44, 1)'}]}>PAN Card</Text>
                </Pressable> */}
        {/* <View style={{
          marginHorizontal: 10,
          width: "93%",
          marginTop: 10,
          borderRadius: 4,
          backgroundColor: 'white',
          borderColor: 'rgba(132, 132, 132, 1)',
          borderWidth: 1,
          alignSelf: 'center'
        }}>
          <Dropdown
            style={styles.dropdown}
            //placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            //inputSearchStyle={styles.inputSearchStyle}
            value={value}
            iconStyle={styles.iconStyle}
            data={items}
            maxHeight={150}
            labelField="label"
            valueField="value"
            iconColor='rgba(57, 57, 57, 1)'
            // placeholder="Select item"
            //searchPlaceholder="Search..."
            // value={value}

            onChange={item => {
              setValue(item.value);
            }}
            //itemContainerStyle={{ height: 0 }} 
            itemTextStyle={{ color: 'black', fontSize: 14, fontFamily: 'Poppins-Regular' }}
            containerStyle={styles.dropdownContainer}
          />
        </View> */}
        <TextInput
          style={styles.inputContainer}
          onFocus={() => {
            setvalidationError(false);
            seterorrMessageName('');
          }}
          onBlur={() => {
            setvalidationError(false);
            seterorrMessageName('');
          }}
          maxLength={30}
          placeholder={t('IdType')}
          placeholderTextColor={'rgba(132, 132, 132, 1)'}
          onChangeText={text => {setValue(text); seterorrMessageName('')}}
          value={value}
         
        />
        {
          validationTypeError && (
            <View style={{ flexDirection: 'row', marginTop:validationTypeError ? 8 : 0 }}>
              <Text style={{ color: 'red', marginLeft: 15 }}>{erorrMessagetype}</Text>
            </View>
          )
        }
        <TextInput
          style={styles.inputContainer}
          onFocus={() => {
            setvalidationError(false);
            seterorrMessageName('');
          }}
          onBlur={() => {
            setvalidationError(false);
            seterorrMessageName('');
          }}
          maxLength={30}
          placeholder={t('IdName')}
          placeholderTextColor={'rgba(132, 132, 132, 1)'}
          onChangeText={text => {setName(text); seterorrMessageName('')}}
          value={name}
         
        />
        {
          validationError && (
            <View style={{ flexDirection: 'row', marginTop:validationError ?  8 : 0 }}>
              <Text style={{ color: 'red', marginLeft: 15 }}>{erorrMessageName}</Text>
            </View>
          )
        }
        <TextInput
          style={styles.inputContainer}
          onBlur={() => {
            setvalidationIdError(false);
            seterorrMessageid('');
          }}
          onFocus={() => {
            setvalidationIdError(false);
            seterorrMessageid('');
          }}   
          maxLength={35}     
          placeholder={t('IdNumber')}
          placeholderTextColor={'rgba(132, 132, 132, 1)'}
          onChangeText={text => {setMobileNo(text);seterorrMessageid('');}}
          value={mobileNo}
        />
        {
          validationIdError && (
            <View style={{ flexDirection: 'row', marginTop:validationIdError ? 8 : 0 }}>
              <Text style={{ color: 'red', marginLeft: 15 }}>{erorrMessageid}</Text>
            </View>
          )
        }
      </View>
      <Pressable style={{ width: '95%', backgroundColor: 'rgba(177, 41, 44, 1)', height: 50, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', bottom: 15, borderRadius: 5 }} onPress={handleCameraLaunch}>
        <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 16, fontFamily: 'Poppins-Medium', }}>{t("continueButton")}</Text>
      </Pressable>
      <LoadingIndicator visible={loading} text="Loading..." />
    </View>
  )
}
const styles = StyleSheet.create({

  activeButton: {
    borderColor: 'rgba(177, 41, 44, 1)',
  },
  buttonText: {
    color: '#333',
    fontWeight: '500',
    fontSize: 16

  },
  button: {
    width: '90%',
    height: 60,
    backgroundColor: 'white',
    elevation: 5,
    marginTop: 15,
    alignSelf: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    paddingLeft: 10
  },
  dropdown: {
    // margin: 10,
    height: 45,
    width: '100%'
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
    marginLeft: 5,
    color: 'rgba(57, 57, 57, 1)',
    fontFamily: 'Poppins-Regular'
  },
  iconStyle: {
    width: 25,
    height: 25,
    marginRight: 2,
  },
  dropdownContainer: {
    // marginLeft:15,
    //height:100
    borderRadius: 6
  },
  inputContainer: {
    height: 45,
    width: '93%', // Set width to 100% to occupy the whole screen
    color: 'rgba(57, 57, 57, 1)',
    borderColor: 'rgba(132, 132, 132, 1)',
    borderWidth: 1,
    borderRadius: 4,
    alignSelf: 'center',
    marginTop: 20,
    paddingLeft: 9,
    fontFamily: 'Poppins-Regular',

  },
})
export default IdVerificationScreen;