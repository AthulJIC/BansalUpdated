import { ImageBackground, StatusBar, View, Image, Platform, StyleSheet } from "react-native";


function SplashScreen({ navigation }) {
    setTimeout(() => {
        navigation.navigate('Login');
        }, 2000);
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