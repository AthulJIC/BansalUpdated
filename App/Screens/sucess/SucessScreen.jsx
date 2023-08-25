import { ImageBackground, Text, View } from "react-native";
import SuccessIcon from "../../../assets/Icon/SuccessIcon";

function SuccessScreen({route}){
    const data = route?.params;
  return(
    <ImageBackground source={require('../../../assets/Images/Success_bg.png')} style={{width:'98%', height:200,alignSelf:'center',backgroundColor:'white',flex:1}}>
        <View style={{alignSelf:'center',marginTop:80}}>
            <SuccessIcon/>
        </View>
        <View>
            <Text style={{color:'rgba(127, 176, 105, 1)', fontSize:16, textAlign:'center',fontFamily:'Poppins-Medium',marginTop:10}}>{data.title}</Text>
        </View>
    </ImageBackground>
  )
}
export default SuccessScreen;