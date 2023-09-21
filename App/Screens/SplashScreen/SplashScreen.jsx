import { ImageBackground, StatusBar, View, Image, Platform, StyleSheet } from "react-native";


function SplashScreen({ navigation }) {
    const statusBarColor = Platform.OS === 'android' ? "#5ca1f2" : "rgba(23, 62, 107, 1)";
    setTimeout(() => {
        navigation.navigate('Login');
        }, 2000);
    return (  
        <View style={{ flex: 1,alignSelf:'center',marginTop:323}}>
            <StatusBar 
              backgroundColor={styles.statusBarColor} 
                barStyle="dark-content"
                translucent={false}
                />
                <View style={{flex:1}}>
                    <Image
                        style={styles.tinyLogo}
                        source={require('../../../assets/Images/SplashScreen.png')}/>
                </View>
             
        </View>
    )
}

export default SplashScreen;
const styles = StyleSheet.create({
    tinyLogo: {
        width: 220,
        height: 154,
        borderRadius: 8,
        marginLeft: 40
    },
    statusBarColor:{
        backgroundColor:'#ffffff'
    }
})