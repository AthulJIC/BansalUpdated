import {Image, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import { useAppContext } from '../../context/AppContext'
import PenIcon from '../../../assets/Icon/PenIcon';
import { confirmService } from '../../service/RewardsService/ConfirmService';
import ErorrPopUp from './erorrRedeem';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useBackButtonHandler from '../../Components/BackHandlerUtils';
import { RewardsApi } from '../../service/rewards/rewardservice';

const ConfirmPage=({route,navigation})=>{
    const { selectedProduct } = useAppContext();
    const [visible,setVisible]=useState(false)
    const { t } = useTranslation();
    const {addressItem}=route.params
    const {userDetails}=useAppContext();
    const page = route?.params.page;
    console.log('userDetails==', userDetails,addressItem,'kkkkkkk',page);
    useBackButtonHandler(navigation, false);
    const confirmHandler=(id)=>{
        RewardsApi.redemption(id).then((res) => {
            console.log('res====', res.data);
            if(res.status === 200){
                const data = {
                    redemption_history : res.data.id
                }
                RewardsApi.idVerify(data, userDetails?.id).then((res) => {
                    console.log('res====', res.data);
                })
            }
        })
    }
   const uiParams={
        Product:t("Product"),
        Name:t("name"),
        Mobile:t("MobileSuccess"),
        Address:t("AddressLabel")
    }
    return (
        <View style={{backgroundColor:'#ffffff',flex:1}}>
        <View style={[styles.card, styles.shadowProp]}>
            <View style={styles.imageView}>
           <Image
                    style={styles.tinyLogo}
                    source={{uri:selectedProduct.item_image}}
                    resizeMode='center'

                />
                </View>
          <View style={{ justifyContent: 'center',bottom:5}}>
                <Text style={{ marginLeft: 20, fontFamily: 'Poppins-Medium', fontSize: 16, color: 'rgba(57, 57, 57, 1)' }}>{selectedProduct.title}</Text>
                <View style={styles.subContainer}>
                    <Text style={{
                        fontFamily: 'Poppins-Medium', fontWeight: '200', fontSize: 13, color: '#B1292C', marginHorizontal: 5
                    }}>{selectedProduct.points} {t('points')}</Text>
                    <View style={{width:'83%',height:'auto'}}>
                    <Text style={{
                        fontFamily: 'Poppins-Medium', fontWeight: '500', fontSize: 13, color: '#393939', marginLeft: 5, marginBottom: 4
                    }}>{selectedProduct.description}</Text>
                    </View>
                </View>
             
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            </View>
        </View>
         <View style={{flexDirection:'row', justifyContent:'space-between',marginLeft:25}}>
            <Text style={{fontFamily:'Poppins-Medium',color:'#393939',fontSize:16}}>{t('AddressLabel')}</Text>
            <TouchableOpacity onPress={()=>{navigation.navigate('AddressList',{
                    fromProfile: false,
                })}} style={{flexDirection:'row',marginRight:22,justifyContent:'center',alignItems:'center'}}>
            <PenIcon width={20} height={20} color={'#2B59C3'}/>
           <Text style={{margin:5,color:"rgba(43, 89, 195, 1)"}}>{t('Change')}</Text>
            </TouchableOpacity>
           
         </View>
        <View style={[styles.addressCard, styles.shadowProp]}>
          <View style={{ justifyContent: 'center'}}>
                <Text style={{ marginLeft: 20, fontFamily: 'Poppins-Medium', fontSize: 16, color: '#393939' }}>{addressItem.name}</Text>
                <View style={styles.subContainer}>
                    <View style={{width:'auto',height:'auto'}}>
                    <Text style={{
                        fontFamily: 'Poppins-Regular',  fontSize: 13, color: '#848484', marginLeft: 5, marginBottom: 4
                    }}>{addressItem.address_1},{addressItem.address_2},{addressItem.land_mark},
                    {addressItem.city},{addressItem.state_name?.state}-{addressItem.pincode}</Text>
                    </View>
                    <Text style={{
                        fontFamily: 'Poppins-Regular', fontWeight: '500', fontSize: 13, color: '#848484', marginLeft: 5, marginBottom: 4
                    }}>{addressItem.mobile}</Text>
                </View>
                
            </View>
           
           
        </View>
        <View style={styles.modalButtonContainer}>
                <Pressable onPress={()=>{confirmHandler(selectedProduct.id)
                    navigation.navigate('Success',{title: t('titleRewards'),content:t('titleContent'),addressItem,selectedProduct,uiParams,page})}} 
                    style={{ marginBottom: 10, borderRadius: 5, width: '100%', backgroundColor: 'rgba(177, 41, 44, 1)', alignItems: 'center', height: 48, radius: 4, padding: 12 }} >
                    <Text style={{ fontFamily: 'Poppins-Regular', fontWeight: '500', fontSize: 16, lineHeight: 24, color: '#ffffff', height: 24 }}>
                    {t('confirmButton')}
                    </Text>
                </Pressable>
            </View> 
            <ErorrPopUp isVisible={visible}/>
        </View>
       
    )
}
export default ConfirmPage
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        height: 132,
        width: '90%',
        borderRadius: 5,
        justifyContent: 'space-evenly',
        borderRadius: 10,
        flexDirection: 'row',
        marginBottom: 17,
        alignItems: 'center',
        marginLeft: 2,
        alignSelf: 'center',
        marginTop:10,
        backgroundColor:'#ffffff',
    },
    addressCard:{
        backgroundColor: '#ffffff',
        // padding: 10,
        height: 132,
        width: '90%',
        borderRadius: 5,
        justifyContent: 'center',
        borderRadius: 10,
        flexDirection: 'column',
        marginBottom: 17,
        marginLeft: 2,
        alignSelf: 'center',
        marginTop:12,
        backgroundColor:'#ffffff',
        alignItems:'flex-start'
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    tinyLogo: {
        width: 80,
        height: 90,
        borderRadius: 8,
        
    },
    subContainer: {
        marginLeft: 17,
        alignItems: 'flex-start',

    },
    modalButtonContainer: {
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 22,
        alignSelf:'center'
      },
      imageView: {
        width: "30%",
        marginLeft:30,
        height: 110,
        justifyContent:'center',
        backgroundColor: '#F2F2F2',
        borderRadius: 8,
        alignItems: 'center',
        // marginTop:5,
        marginHorizontal:10
      },
})