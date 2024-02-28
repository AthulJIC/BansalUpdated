import { useCallback, useEffect, useState } from "react";
import { Animated, StyleSheet, Text, View ,Image} from "react-native"
import ProgressBar from 'react-native-progress/Bar';
import { useTranslation } from 'react-i18next';
import { CommonAPI } from "../../service/common/Dbservice";
import { Dimensions } from 'react-native';
import { useFocusEffect } from "@react-navigation/native";

const windowWidth = Dimensions.get('window').width;
const LoyalityBonus = () => {
    const [points,setPoints]=useState("")
    const [progress] = useState(new Animated.Value(0));
    const { t } = useTranslation();
    let ProgressValue=((points/12000)*100)/100
    const parentComponentWidth = 400; // Set the width of the parent component
    const progressBarWidth = (ProgressValue / 100) * parentComponentWidth;
   
    useFocusEffect(
      useCallback(() => {
        const fetchData = async () => {
          Animated.timing(progress, {
            toValue: 500,
            duration: 1000,
            useNativeDriver: false
          }).start();
          
          getLoyaltyPoints();
        };
    
        fetchData();
      }, [])
    );
    const getLoyaltyPoints=()=>{
      CommonAPI.Points().then((res) => {
          if(res.status === 200){
              //setPoints(res.data.total_points)
              if(res.data.total_points !== null){
                setPoints(res.data.total_points);
            }
            else {
              setPoints(0);
            }
          }
      })
  }
    return (
      <View style={styles.mainContainer}>
        <View style={{flexDirection:'row'}}>
           <Text style={styles.textStyle}>{t('bonus')}</Text>
           <Image source={require('../../../assets/Images/Mask_group.png')} style={{width:'100%', height:130,position:'absolute',marginLeft:20, marginTop:-20 }}></Image>
        </View>
        <View style={{marginTop:10}}>
          <Text style={styles.points}>{points +" "+ t('points3')}</Text>
          <Text style={styles.expire}>{t('points1')}</Text>
        </View>
         {/* <View style={{justifyContent:'center',marginTop:25}}>
            <Text style={{textAlign:'right',fontSize:9.26,
            color:'#FFFFFF',fontFamily:'Poppins-Regular'}}>{'+12000 '+ t('points3')}</Text> 
      <ProgressBar progress={ProgressValue} width={windowWidth * 0.85}  height={16} color='#F18C13' borderRadius={22} backgroundColor='#ffffff'/>
    </View> */}
      </View>
    );
  };
export default LoyalityBonus
const styles = StyleSheet.create({
    mainContainer: {
      backgroundColor: '#B1292C',
      height:130,
      width:'95%',
      paddingLeft:20,
      paddingTop:20,
      paddingRight:24,
      paddingBottom:20,
      borderRadius:10,
      alignSelf:'center', 
      marginTop:10,
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