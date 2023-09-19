import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { View,Image,StyleSheet } from "react-native";

function SplashScreen({ navigation }) {
    useFocusEffect(
        useCallback(() => {
          const timeoutId = setTimeout(async () => {
            const updateScreen = await AsyncStorage.getItem('isLoggedIn');
            //const screen = await AsyncStorage.getItem('RememberMe');
            console.log('screen====', updateScreen)
            if (!updateScreen) {
              navigation.navigate('Login');
            } else {
              if (updateScreen === 'true') {
                navigation.navigate('Homescreen');
              } else {
                navigation.navigate('Login');
              } 
            }
            // if(!screen && !updateScreen){
            //   navigation.navigate("Login")
            // }
            // else{
            //   if (screen === 'true' && updateScreen === 'Home') {
            //         navigation.navigate('Home screen');
            //       } else {
            //         navigation.navigate('Login');
            //       }
            // }
          }, 2000);
      
          return () => {
            clearTimeout(timeoutId);
          };
        }, [navigation]) 
      );
    return (  
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Image
                style={styles.tinyLogo}
                source={require('../../../assets/Images/SplashScreen.png')}/>
        </View>
             
    )
}

export default SplashScreen;
const styles = StyleSheet.create({
    tinyLogo: {
        width: 220,
        height: 154,
        borderRadius: 8,
    },
    statusBarColor:{
        backgroundColor:'#ffffff'
    }
})