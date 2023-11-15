import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect } from "react";
import { View,Image,StyleSheet } from "react-native";


function SplashScreen({ navigation }) {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
      useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
          await delay(2000);
          const token = await AsyncStorage.getItem('access_token');
          console.log('token', token);
          if (token) {
            navigation.replace('Homescreen');
          } else {
            navigation.replace('Login');
          }
        });
        return unsubscribe;
      }, [navigation]);
      
    return (  
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Image
                style={styles.tinyLogo}
                source={require('../../../assets/Images/Logo.png')}
                resizeMode='center'></Image>
            <Image
            style={styles.logoText}
            source={require('../../../assets/Images/LogoText.png')}
            resizeMode="center"/> 
        </View>
             
    )
}

export default SplashScreen;
const styles = StyleSheet.create({
    tinyLogo: {
        width:'50%',
        height: 100,
    },
    logoText:{
       width:'39%',
       height:48,
       marginTop:20
    },
    statusBarColor:{
        backgroundColor:'#ffffff'
    }
})