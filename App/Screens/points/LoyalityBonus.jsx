import { StyleSheet, Text, View } from "react-native"
import { BarChart } from "react-native-gifted-charts";
const data=[ {value:50}, {value:80}, {value:90}, {value:70} ]
const LoyalityBonus=()=>{
return(
    <View style={styles.mainContainer}>
        <Text style={styles.textStyle}>Loyality Balance</Text>
        <View>
            <Text style={styles.points}>2000 Pts</Text>
            <Text style={styles.expire}>Pts will expire in 240 days</Text>
        </View>
    </View>
)
}
export default LoyalityBonus
const styles = StyleSheet.create({
    mainContainer: {
      backgroundColor: '#B1292C',
      height:200,
      width:'328',
      padding:20,
      margin:20,
      paddingLeft:20,
      paddingTopL:20,
      paddingRight:24,
      paddingBottom:20,
      borderRadius:10
    },
    textStyle:{
        fontStyle:'Poppins-Medium',
        fontSize:16,
        lineHeight:24,
        color:'#ffffff'
    },
    points:{
            fontStyle:'Poppins-ExtraBold',
            fontSize:23.04,
            lineHeight:32,
            color:'#ffffff',
            fontWeight:'600'
    },
    expire:{
        fontStyle:'Poppins-Bold',
        fontSize:11.11,
        lineHeight:16,
        color:'#ffffff'
    }

})