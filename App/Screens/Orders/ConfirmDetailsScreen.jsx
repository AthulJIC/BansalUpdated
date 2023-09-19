import {View,Text,Pressable,TextInput, StyleSheet,TouchableOpacity} from 'react-native';
import PenIcon from '../../../assets/Icon/PenIcon';
import { useState } from 'react';
import ReferLead from '../../Components/ReferLead';
import StarIcon from '../../../assets/Icon/StarIcon';
import { useRoute } from '@react-navigation/native';
import { ReferService } from '../../service/Orders/ReferLeadsService';


function ConfirmDetailsScreen(){
    const route = useRoute();
    const {  referParams } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [details, setDetails] = useState(referParams); 
 const updateDetails = (newDetails) => {
   setDetails(newDetails)
  };
    const closeModal = () => {
        setModalVisible(false);
    };
    const confirmHandler=()=>{
        ReferService(details.mobileNo,details.name,details.location,details.quantity,details.location).then((res) => {
        //   console.log('Received data:', res);
        })
    }
    return(
        <View style={{flex:1,backgroundColor:'white'}}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{fontSize:16,color:'rgba(57, 57, 57, 1)', marginLeft:7,fontFamily:'Poppins-Regular'}}>Details</Text>
                <Pressable style={{flexDirection:'row', justifyContent:'flex-end',marginRight:7}} onPress={() => setModalVisible(true)}>
                    <PenIcon width={18} height={18} color='#2B59C3'/>
                    <Text style={{color:'#2B59C3',fontSize:14,marginLeft:4,fontFamily:'Poppins-Regular'}}>Change</Text>
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
               <Text style={{fontSize:16,fontFamily:'Poppins-Regular',color:'rgba(57, 57, 57, 1)'}}>{details.quantity} Ton</Text>
            </View>
            <View style={{backgroundColor:'rgba(4, 4, 4, 1)', width:'90%',height:92,padding:12,borderRadius:4,marginTop:20,alignSelf:'center'}}>
                <View style={{flexDirection:'row'}}>
                    <StarIcon/>
                    <Text style={{color:'rgba(241, 140, 19, 1)', fontSize:15,fontFamily:'Poppins-Regular',marginLeft:5}}>500 Pts</Text>
                    <Text style={{color:'rgba(255, 255, 255, 1)', fontSize:15,fontFamily:'Poppins-Regular',marginLeft:5}}>on confirmation</Text>
                </View>
                <Text style={{color:'rgba(132, 132, 132, 1)', fontSize:11, fontFamily:'Poppins-Regular',marginTop:5}}>You can earn 500 Pts from this referral. Redeem this points on the rewards section for exciting gifts.</Text>
            </View>
            <View style={styles.modalButtonContainer}>
                <TouchableOpacity onPress={confirmHandler} style={{ marginBottom: 10, borderRadius: 5, width: '100%', backgroundColor: 'rgba(177, 41, 44, 1)C', alignItems: 'center', height: 48, radius: 4, padding: 12 }} >
                    <Text style={{ fontFamily: 'Poppins', fontWeight: '500', fontSize: 16, lineHeight: 24, color: '#ffffff', height: 24 ,fontFamily:'Poppins-Regular'}}>
                        Confirm Details
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