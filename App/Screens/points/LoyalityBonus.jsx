import { useEffect, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native"
import ProgressBar from 'react-native-progress/Bar';
import { useTranslation } from 'react-i18next';
import { CommonAPI } from "../../service/common/Dbservice";

const LoyalityBonus = () => {
    const [points,setPoints]=useState("")
    const [progress] = useState(new Animated.Value(0));
    const { t } = useTranslation();
    let ProgressValue=((points/12000)*100)/100
    useEffect(() => {
          Animated.timing(progress, {
            toValue: 500,
            duration: 1000,
            useNativeDriver: false
          }).start();
          getLoyaltyPoints()
    }, []);
    const getLoyaltyPoints=()=>{
      CommonAPI.Points().then((res) => {
          if(res.status === 200){
              setPoints(res.data.total_points)
          }
      })
  }
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.textStyle}>{t('bonus')}</Text>
        <View>
          <Text style={styles.points}>{points +" "+ t('points3')}</Text>
          <Text style={styles.expire}>{t('points1') +'  240 ' +t('points2') }</Text>
        </View>
         <View style={{justifyContent:'center',marginTop:55}}>
            <Text style={{marginLeft:220,fontSize:9.26,fontWeight:'400',
            color:'#FFFFFF',lineHeight:14,fontFamily:'Poppins-Regular'}}>{'+12000 '+ t('points3')}</Text> 
      <ProgressBar progress={ProgressValue} width={300}height={16} color='#F18C13' borderRadius={22} backgroundColor='#ffffff'/>
    </View>
      </View>
    );
  };
export default LoyalityBonus
const styles = StyleSheet.create({
    mainContainer: {
      backgroundColor: '#B1292C',
      height:200,
      width:'90%',
      paddingLeft:20,
      paddingTop:20,
      paddingRight:24,
      paddingBottom:20,
      borderRadius:10,
      alignSelf:'center', 
      marginTop:10
    },
    textStyle:{
        fontFamily:'Poppins-Medium',
        fontSize:16,
        lineHeight:24,
        color:'#ffffff'
    },
    points:{
            fontFamily:'Poppins-ExtraBold',
            fontSize:23.04,
            lineHeight:32,
            color:'#ffffff',
            fontWeight:'600'
    },
    expire:{
        fontFamily:'Poppins-Bold',
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