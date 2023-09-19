import { Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { useTranslation } from 'react-i18next';

const LanguageScreen = () => {
    const [activeButton, setActiveButton] = useState('English');
    const [newLanguage, setnewLanguage] = useState('')
    const { changeLanguage } = useAppContext();
    const { t, i18n } = useTranslation();
    const englishLanguage = () => {
      setnewLanguage(i18n.language === 'hi' ? 'en' : 'en');
      i18n.changeLanguage(i18n.language === 'hi' ? 'en' : 'en');
      changeLanguage(i18n.language === 'hi' ? 'en' : 'en')
    }
    const hindiLanguage = () => {
      // setnewLanguage(i18n.language === 'en' ? 'hi' : 'en')
      i18n.changeLanguage(i18n.language === 'en' ? 'hi' : 'en');
      changeLanguage(i18n.language === 'en' ? 'hi' : 'en')
    };
  const handleButtonPress = (buttonName) => {
    setActiveButton(buttonName);
  };
    return(
        <View style={{flex:1, backgroundColor:'white'}}>
            <Pressable
                style={[
                styles.button,
                activeButton === 'English' && styles.activeButton,
                ]}
                onPress={() => {handleButtonPress('English');;englishLanguage()}}
            >
               <Text style={[styles.buttonText, activeButton === 'English' && {color:'rgba(177, 41, 44, 1)'}]}>English</Text>
            </Pressable>
            <Pressable
                style={[
                styles.button,
                activeButton === 'Hindi' && styles.activeButton,
                ]}
                onPress={() => {handleButtonPress('Hindi');hindiLanguage()}}
            >
               <Text style={[styles.buttonText, activeButton === 'Hindi' && {color:'rgba(177, 41, 44, 1)'}]}>Hindi</Text>
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