import { View ,Text, Pressable, StyleSheet} from "react-native";
import { useAppContext } from '../../context/AppContext';
import { useState } from "react";
import useBackButtonHandler from "../../Components/BackHandlerUtils";

function IdConfirmationScreen({navigation}){
    const [itemName,setItemName]=useState('')
    const [points,setItemPoints]=useState('')
    const [details,setDetails]=useState('')
    const { userDetails, updateUserDetails, updateSelectedProduct } = useAppContext();
    useBackButtonHandler(navigation, false);
    const itemModal=(item)=>{
        updateSelectedProduct(item);
      setItemName(item.name)
      setItemPoints(item.points)
      setDetails(item.details)
      }
    function confirmHandler(){
        const updatedUserDetails = {
        ...userDetails,
        redeemedProducts: [...(userDetails?.redeemedProducts || []), itemName],
        };
        updateUserDetails(updatedUserDetails);
        navigation.navigate("AddressList",{
        fromProfile: false,
    });
    }
    return(
       <View style={{flex:1, backgroundColor:'white'}}>
         <Text style={{color:'rgba(57, 57, 57, 1)',fontSize:16,fontFamily:'Poppins-Medium', marginLeft:7}}>Check your ID details</Text>
         <Text style={{color:'rgba(132, 132, 132, 1)', fontSize:13, fontFamily:'Poppins-Regular', marginLeft:7}}>Verify the ID details below and continue.</Text>
         <View style={{height:120, width:'95%', backgroundColor:'rgba(255, 255, 255, 1)', elevation:5, alignSelf:'center', borderRadius:8, marginTop:10, justifyContent:'space-evenly', padding:15}}>
             <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                 <Text style={{color:'rgba(132, 132, 132, 1)', fontSize:13, fontFamily:'Poppins-Medium'}}>ID Type</Text>
                 <Text style={{color:'rgba(57, 57, 57, 1)', fontSize:13, fontFamily:'Poppins-Medium'}}>{userDetails.id_Type}</Text>
             </View>
             <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                 <Text style={{color:'rgba(132, 132, 132, 1)', fontSize:13, fontFamily:'Poppins-Medium'}}>ID Number</Text>
                 <Text style={{color:'rgba(57, 57, 57, 1)', fontSize:13, fontFamily:'Poppins-Medium'}}>{userDetails.id_number}</Text>
             </View>
             <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                 <Text style={{color:'rgba(132, 132, 132, 1)', fontSize:13, fontFamily:'Poppins-Medium'}}>Name</Text>
                 <Text style={{color:'rgba(57, 57, 57, 1)', fontSize:13, fontFamily:'Poppins-Medium'}}>{userDetails.name}</Text>
             </View>
         </View>
         <View style={styles.modalButtonContainer}>
                <Pressable style={{ marginBottom: 10, borderRadius: 5, width: '100%', backgroundColor: 'rgba(177, 41, 44, 1)', alignItems: 'center', height: 48, radius: 4, padding: 12 }} onPress={confirmHandler}>
                    <Text style={{ fontFamily: 'Poppins-Medium', fontWeight: '500', fontSize: 16, lineHeight: 24, color: '#ffffff', height: 24 }}>
                        Confirm
                    </Text>
                </Pressable>
            </View>
       </View>
    )
}
const styles = StyleSheet.create({
    modalButtonContainer: {
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        alignSelf:'center'
      }
})
export default IdConfirmationScreen;