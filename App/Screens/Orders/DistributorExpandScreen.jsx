import { Text, View ,Pressable, Image, StyleSheet} from "react-native";
import { useState } from "react";
import ProductPopup from "./ProductPopup";
import { useTranslation } from 'react-i18next';
import useBackButtonHandler from "../../Components/BackHandlerUtils";

function DistributorExpandScreen({navigation, route}){

    const { selectedItem } = route?.params;
    const page = route?.params.page;
    const [modalVisible, setModalVisible] = useState(false);
    useBackButtonHandler(navigation, false);
    console.log('selectedItem====', selectedItem,page)
    const { t } = useTranslation();
    const description = t('description')
    const handleRefer = (quantity) => {
        navigation.navigate('ConfirmPurchase',{
             selectedItem:selectedItem,
             quantity:quantity,
             page:page
            });

       };
    let districtText;
    let stateText;
    if(page === 'Orders'){
        stateText = selectedItem.state;
        districtText = selectedItem.district;
    }
    else{
        stateText = selectedItem.state_name;
        districtText = selectedItem.district_name;
    }
    return(
        <View style={{flex:1,backgroundColor:'white'}}>
            <View style={{backgroundColor:'rgba(182, 182, 182, 1)',height:112, width:'90%',borderRadius:8,alignSelf:'center',alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:30,fontFamily:'Poppins-SemiBold',color:'rgba(57, 57, 57, 1)'}}>{selectedItem?.name?.slice(0, 2).toUpperCase()}</Text>
            </View>
            <View style={{marginLeft:10,marginTop:7}}>
                <Text style={{color:'rgba(177, 41, 44, 1)',marginLeft:15,fontSize:14,fontFamily:'Poppins-Medium'}}>{selectedItem.user_id}</Text>
                <Text style={{color:'rgba(57, 57, 57, 1)',marginLeft:15,fontSize:14,fontFamily:'Poppins-Medium'}}>{selectedItem.name}</Text>
                <Text style={{color:'rgba(132, 132, 132, 1)',marginLeft:15,fontSize:14,fontFamily:'Poppins-Regular',width:'75%'}}>{districtText}, {stateText}</Text>
                <View style={{ width:'95%',borderBottomColor:'black', borderBottomWidth:1,alignSelf:'center',marginTop:10}}></View>
                <Text style={{color:'rgba(57, 57, 57, 1)', fontSize:16,fontFamily:'Poppins-Medium',marginLeft:15,marginTop:10}}>{t('Products')}</Text>
            </View>
            <View style={{backgroundColor:'white', width:'37%', height:235,elevation:8,borderRadius:8, marginLeft:20,marginTop:10}}>
                <Image source={require('../../../assets/Images/ProductImage.png')} style={{width:120, height:120,marginTop:7,borderRadius:8,alignSelf:'center'}}></Image>
                <View>
                    <Text style={{fontSize:16, color:'rgba(57, 57, 57, 1)', fontFamily:'Poppins-Medium',marginLeft:10,marginTop:7}}>TMT Bars</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: 'rgba(132, 132, 132, 1)', width: '85%',fontSize:11,fontFamily:'Poppins-Regular',marginLeft:10}}>{description}</Text>
                    <Pressable style={styles.buttonReject} onPress={() => setModalVisible(true)}>
                       <Text style={styles.buttonText}>{t('choose')}</Text>
                    </Pressable>
                </View>
            </View>
           <ProductPopup isVisible={modalVisible} onClose={()=> setModalVisible(false)} onRefer={handleRefer}/>
        </View>
    )
}
const styles = StyleSheet.create({
    buttonReject: {
        marginRight: 8,
        backgroundColor: 'rgba(177, 41, 44, 1)',
        width: '90%',
        height: 36,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 7,
        marginTop:10
    },
    buttonText: {
        fontFamily: 'Poppins-Regular',
        color: '#FFFFFF',
    },
    modalContainer: {
        justifyContent: 'flex-end', 
        margin: 0,
    },
      centeredView: {
        backgroundColor: 'white',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        padding: 15,
        height:630
      },
      modalButtonContainer: {
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 20,
          alignSelf:'center'
      },
      inputContainer: {
        height: 45,
        width: '97%', 
        color: '#848484',
        borderColor: 'black',
        borderWidth: 0.5,
        borderRadius: 5,
        alignSelf: 'center',
        marginTop: 10,
        paddingLeft: 15,
        fontFamily: 'Poppins-Regular',
      },
      scrollViewContent: {
        flexGrow: 1,
      },
      referButton: {
        marginBottom: 10,
        borderRadius: 5,
        width: '100%',
        backgroundColor: 'rgba(177, 41, 44, 1)',
        alignItems: 'center',
        height: 48,
        radius: 4,
        padding: 12,
      },
      referButtonText: {
        fontFamily: 'Poppins-Regular',
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 24,
        color: '#ffffff',
        height: 24,
      },
})
export default DistributorExpandScreen;