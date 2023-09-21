import { useState } from "react";
import { Text, View,Pressable,StyleSheet,PermissionsAndroid,TextInput } from "react-native";
import {launchCamera} from 'react-native-image-picker'
import LoadingIndicator from "../../Components/LoadingIndicator";
import { Dropdown } from 'react-native-element-dropdown';

function IdVerificationScreen({navigation}){
    const [activeButton, setActiveButton] = useState('Aadhar Card');
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState("1");
    const [items, setItems] = useState([
      { label: 'Aadhar Card', value: "1" },
      { label: 'Pan Card', value: '2' },
  ]);
  const [name, setName] = useState('');
  const [mobileNo, setMobileNo] = useState('');

    const handleButtonPress = (buttonName) => {
      setActiveButton(buttonName);
    };
        
    const handleCameraLaunch = async () => {
        var options = {
            mediaType: 'photo', 
            saveToPhotos:false,  
            includeBase64:false,
          };
    try {
        const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
            title: "App Camera Permission",
            message:"App needs access to your camera ",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
        }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission given");
          const result = await launchCamera(options,(res) => {
                // console.log('Response = ', res);
                if (res.didCancel) {
                // console.log('User cancelled image picker');
                } else if (res.error) {
                // console.log('ImagePicker Error: ', res.error);
                } else if (res.customButton) {
                // console.log('User tapped custom button: ', res.customButton);
                alert(res.customButton);
                } else {
                // let source = res;
                // var resourcePath1 = source.assets[0].uri;
                const source = { uri: res.uri };
                // console.log('response', JSON.stringify(res));
                setSelectedImage(res)
                }
                // console.log('imageee',selectedImage)
        })
          setLoading(true)
          setTimeout(() => {
            // After data is loaded, hide the activity indicator
            setLoading(false);
            navigation.navigate('IdConfirmation')
          }, 2000); 
        } else {
        console.log("Camera permission denied");
        }
    } catch (err) {
        console.warn(err);
    }
    };
    return(
        <View style={{flex:1, backgroundColor:'white'}}>
            <Text style={{color:'rgba(57, 57, 57, 1)',fontSize:16, fontFamily:'Poppins-Medium', marginLeft:7}}>Photo ID Verification</Text>
            <Text style={{color:'rgba(132, 132, 132, 1)', fontSize:13, fontFamily:'Poppins-Regular',marginLeft:7}}>Place ID of your choice on a plane surface with the details clearly visible and take a photo.</Text>
            <View style={{flex:1, backgroundColor:'white'}}>
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
                  <View style={{ marginHorizontal: 10,
                    width: "95%",
                    marginTop: 10,
                    borderRadius:6,
                    backgroundColor:'white',
                    borderColor:'rgba(132, 132, 132, 1)',
                    borderWidth:1,
                    alignSelf:'center'}}>
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
                        itemTextStyle = {{color:'black',fontSize:14,fontFamily:'Poppins-Regular'}}
                        containerStyle={styles.dropdownContainer}
                    />
                </View>
                <TextInput
                  style={styles.inputContainer}
                  placeholder="Name On ID"
                  placeholderTextColor={'rgba(132, 132, 132, 1)'}
                  onChangeText={text => setName(text)}
                  value={name}
                />
                <TextInput
                  style={styles.inputContainer}
                  placeholder="ID Number"
                  placeholderTextColor={'rgba(132, 132, 132, 1)'}
                  onChangeText={text => setMobileNo(text)}
                  value={mobileNo}
                />
            </View>
            <Pressable style={{width:'95%', backgroundColor:'rgba(177, 41, 44, 1)',height:50,alignItems:'center',justifyContent:'center',alignSelf:'center',bottom:15, borderRadius:5}} onPress={handleCameraLaunch}>
                <Text style={{color:'rgba(255, 255, 255, 1)',fontSize:16, fontFamily:'Poppins-Medium', }}>Continue</Text>
            </Pressable>
            <LoadingIndicator visible={loading} text="Loading..."/>
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
      fontSize:16
      
    },
    button:{
      width:'90%',
      height:60,
      backgroundColor:'white',
      elevation: 5,
      marginTop:15,
      alignSelf:'center',
      borderRadius:8,
      borderWidth: 1,
      borderColor: '#ccc',
      justifyContent:'center',
      paddingLeft:10
  },
  dropdown: {
    // margin: 10,
    height: 45,
    width:'100%'
},
placeholderStyle: {
    fontSize: 16,
},
selectedTextStyle: {
    fontSize: 14,
    marginLeft:5,
    color:'rgba(57, 57, 57, 1)',
    fontFamily:'Poppins-Regular'
},
iconStyle: {
    width: 25,
    height: 25,
    marginRight:2,
},
dropdownContainer:{
    // marginLeft:15,
   //height:100
    borderRadius:6
},
inputContainer: {
    height: 45,
    width: '95%', // Set width to 100% to occupy the whole screen
    color: 'rgba(57, 57, 57, 1)',
    borderColor: 'rgba(132, 132, 132, 1)',
    borderWidth: 1,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
    paddingLeft: 15,
    fontFamily: 'Poppins-Regular',
    
  },
})
export default IdVerificationScreen;