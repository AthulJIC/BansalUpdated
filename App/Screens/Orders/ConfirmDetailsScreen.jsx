import {View,Text,Pressable,TextInput, StyleSheet,TouchableOpacity} from 'react-native';
import PenIcon from '../../../assets/Icon/PenIcon';
import { useEffect, useState } from 'react';
import ReferLead from '../../Components/ReferLead';
import StarIcon from '../../../assets/Icon/StarIcon';
import { useRoute } from '@react-navigation/native';
import { ReferService } from '../../service/Orders/ReferLeadsService';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useBackButtonHandler from '../../Components/BackHandlerUtils';

function ConfirmDetailsScreen({navigation}){
    const route = useRoute();
    const {  referParams } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [details, setDetails] = useState(referParams);
    const[username, setUsername] = useState('') ;
    const { t } = useTranslation(); 
    useBackButtonHandler(navigation, false);
 const updateDetails = (newDetails) => {
   setDetails(newDetails)
  };
    const closeModal = () => {
        setModalVisible(false);
    };
    const confirmHandler=()=>{
        ReferService(details.mobileNo,details.name,details.location,details.quantity,details.location).then((res) => {
        })
    }
    useEffect(() => {
        const getValueFromStorage = async () => {
          try {
            const value = await AsyncStorage.getItem('role'); 
            console.log('role2344355', username)
            if (value !== null) {
              setUsername(value);
            }
          } catch (error) {
            console.error('Error fetching data from AsyncStorage:', error);
          }
        };
        getValueFromStorage();
      }, []);
    return(
        <View style={{flex:1,backgroundColor:'white'}}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{fontSize:16,color:'rgba(57, 57, 57, 1)', marginLeft:7,fontFamily:'Poppins-Regular'}}>Details</Text>
                <Pressable style={{flexDirection:'row', justifyContent:'flex-end',marginRight:7}} onPress={() => setModalVisible(true)}>
                    <PenIcon width={18} height={18} color='#2B59C3'/>
                    <Text style={{color:'#2B59C3',fontSize:14,marginLeft:4,fontFamily:'Poppins-Regular'}}>{t('Change')}</Text>
                </Pressable>
                
            </View>
            <View style={styles.inputContainer}>
               <Text style={{fontSize:16,fontFamily:'Poppins-Regular',color:'rgba(57, 57, 57, 1)'}}>{details.name}</Text>
            </View>
            <View style={styles.inputContainer}>
               <Text style={{fontSize:16,fontFamily:'Poppins-Regular',color:'rgba(57, 57, 57, 1)'}}>{details.mobileNo}</Text>
            </View>
            <View style={styles.inputContainer}>
               <Text style={{fontSize:16,fontFamily:'Poppins-Regular',color:'rgba(57, 57, 57, 1)'}}>{details.location}</Text>
            </View>
            <View style={styles.inputContainer}>
               <Text style={{fontSize:16,fontFamily:'Poppins-Regular',color:'rgba(57, 57, 57, 1)'}}>{details.quantity} {t('Ton')}</Text>
            </View>
            <View style={{backgroundColor:'rgba(4, 4, 4, 1)', width:'90%',height:92,padding:12,borderRadius:4,marginTop:20,alignSelf:'center'}}>
                <View style={{flexDirection:'row'}}>
                    <StarIcon/>
                    <Text style={{color:'rgba(241, 140, 19, 1)', fontSize:15,fontFamily:'Poppins-Regular',marginLeft:5}}>{t('500 Pts')}</Text>
                    <Text style={{color:'rgba(255, 255, 255, 1)', fontSize:15,fontFamily:'Poppins-Regular',marginLeft:5}}>{t('on confirmation')}</Text>
                </View>
                <Text style={{color:'rgba(132, 132, 132, 1)', fontSize:11, fontFamily:'Poppins-Regular',marginTop:5}}>{t('lines')}</Text>
            </View>
            <View style={styles.modalButtonContainer}>
                <TouchableOpacity onPress={confirmHandler} style={{ marginBottom: 10, borderRadius: 5, width: '100%', backgroundColor: 'rgba(177, 41, 44, 1)C', alignItems: 'center', height: 48, radius: 4, padding: 12 }} >
                    <Text style={{ fontFamily: 'Poppins', fontWeight: '500', fontSize: 16, lineHeight: 24, color: '#ffffff', height: 24 ,fontFamily:'Poppins-Regular'}}>
                       { t('Confirm Details')}
                    </Text>
                </TouchableOpacity>
            </View>
            <ReferLead onUpdateDetails={updateDetails}  isVisible={modalVisible} onClose={closeModal} editName={referParams.name} editMobile={referParams.mobileNo} editLocation={referParams.location} editquantity={referParams.quantity} onEdit={true} />
        </View>
    )
}
const styles = StyleSheet.create({
    inputContainer: {
        height: 45,
        width:'90%',
        color: '#848484',
        borderColor:'black',
        borderWidth:0.5,
        borderRadius:5,
        alignSelf:'center',
        marginTop:15,
        paddingLeft:15,
        fontFamily:'Poppins-Regular',
        backgroundColor:'rgba(132, 132, 132, 0.3)',
        justifyContent:'center'
    },
    modalButtonContainer: {
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        alignSelf:'center'
    }
})
export default ConfirmDetailsScreen;