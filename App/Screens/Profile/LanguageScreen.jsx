import { Pressable, StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import { useTranslation } from 'react-i18next';
import { useLanguageContext } from '../../context/LanguageContext';
import useBackButtonHandler from "../../Components/BackHandlerUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LanguageScreen = ({navigation}) => {
  const { language, changeNewLanguage } = useLanguageContext();
  const [activeButton, setActiveButton] = useState(language); 
    const [newLanguage, setnewLanguage] = useState(language)
   

    const { changeLanguage } = useAppContext();
    const { t, i18n } = useTranslation();
    useBackButtonHandler(navigation, false);
    const englishLanguage = () => {
      setActiveButton('English')
      setnewLanguage(i18n.language === 'en' ? 'hi' : 'en');
    }
    const hindiLanguage = () => {
      setActiveButton('Hindi')
      setnewLanguage(i18n.language === 'hi' ? 'en' : 'hi')
    };
    const confirmLanguage = async() => {
      i18n.changeLanguage(newLanguage);
      changeNewLanguage(newLanguage === 'en' ? 'English' : 'Hindi');
      await AsyncStorage.setItem('Language', (newLanguage === 'en' ? 'English' : 'Hindi'))
      navigation.navigate('Profile')
    }
    useEffect(() => {
      setActiveButton(language);
    },[language])
    return(
        <View style={{flex:1, backgroundColor:'white'}}>
            <Pressable
                style={[
                styles.button,
                activeButton === 'English' && styles.activeButton,
                ]}
                onPress={englishLanguage}
            >
               <Text style={[styles.buttonText, activeButton === 'English' && {color:'rgba(177, 41, 44, 1)'}]}>English</Text>
            </Pressable>
            <Pressable
                style={[
                styles.button,
                activeButton === 'Hindi' && styles.activeButton,
                ]}
                onPress={hindiLanguage}
            >
               <Text style={[styles.buttonText, activeButton === 'Hindi' && {color:'rgba(177, 41, 44, 1)'}]}>Hindi</Text>
            </Pressable>
            <Pressable style={{ marginBottom: 10, borderRadius: 5, width: '95%', backgroundColor: 'rgba(177, 41, 44, 1)', alignItems: 'center', height: 48, radius: 4, padding: 12 ,alignSelf:'center',marginTop:'auto'}} onPress={()=>{confirmLanguage()}}>
              <Text  style={{ fontFamily: 'Poppins-Medium', fontWeight: '500', fontSize: 16, lineHeight: 24, color: '#ffffff', height: 24 }}>
                {t('confirmButton')}
              </Text>
            </Pressable>
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
})
export default LanguageScreen;