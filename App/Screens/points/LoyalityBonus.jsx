import { useEffect, useState } from "react";
import { Animated, Button, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { BarChart } from "react-native-gifted-charts";
import ProgressBar from 'react-native-progress/Bar';

const barData = [
    {value: 1, label: 'Jan'},
   
]
const LoyalityBonus = () => {
    const [progress] = useState(new Animated.Value(0));
    useEffect(() => {
      Animated.timing(progress, {
        toValue: 500,
        duration: 1000,
      }).start();
    }, []);
  
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.textStyle}>Loyalty Balance</Text>
        <View>
          <Text style={styles.points}>2000 Pts</Text>
          <Text style={styles.expire}>Pts will expire in 240 days</Text>
        </View>
        {/* <View>
          <View style={styles.container}>
            <Animated.View style={[styles.bar, { width: interpolatedWidth }]} />
          </View>
        </View> */}
         <View style={{justifyContent:'center',marginTop:55}}>
            <Text style={{marginLeft:245,fontSize:9.26,fontWeight:'400',
            color:'#FFFFFF',lineHeight:14,fontFamily:'Poppins-Regular'}}>+12000Pts</Text> 
      <ProgressBar progress={0.5} width={300}height={16} color='#F18C13' borderRadius={22} backgroundColor='#ffffff'/>
    </View>
      </View>
    );
  };
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
    },
    container: {
        height: 20,
        backgroundColor: '#ccc',
        borderRadius: 10,
        margin: 10,
      },
      bar: {
        height: 20,
        backgroundColor: '#333',
        borderRadius: 10,
      },

})