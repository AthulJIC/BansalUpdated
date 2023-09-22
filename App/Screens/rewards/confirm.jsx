import {Image, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import { useAppContext } from '../../context/AppContext'
import ChangeAddress from '../../../assets/Icon/changeIcon';
import PenIcon from '../../../assets/Icon/PenIcon';
import { confirmService } from '../../service/RewardsService/ConfirmService';
import ErorrPopUp from './erorrRedeem';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
const ConfirmPage=({route,navigation})=>{
    const { selectedProduct } = useAppContext();
    const [visible,setVisible]=useState(false)
    const { t } = useTranslation();
    const {addressItem}=route.params
    // console.log("selectedProduct",selectedProduct)
    const confirmHandler=(id)=>{
      
        // setVisible(true)
        confirmService(id).then((res) => {
            // if(res.status === 200){
            //     console.log('success',)
            //     setOrdersList(res.data.results)
            // }
            // console.log('confirm Response:', res.data.erorr);
          })
    }
   const uiParams={
        Product:t("Product"),
        Name:t("name"),
        Mobile:t("MobileSuccess"),
        Address:t("AddressLabel")
    }
    return (
        <View style={{backgroundColor:'#ffffff',height:'100%'}}>
        <View style={[styles.card, styles.shadowProp]}>
            <View style={styles.imageView}>
           <Image
                    style={styles.tinyLogo}
                    source={{uri:selectedProduct.item_image}}
                    resizeMode='cover'

                />
                </View>
          <View style={{ justifyContent: 'center'}}>
                <Text style={{ marginLeft: 20, fontFamily: 'Poppins-Medium', fontSize: 16, color: 'rgba(57, 57, 57, 1)' }}>{selectedProduct.title}</Text>
                <View style={styles.subContainer}>
                    <Text style={{
                        fontFamily: 'Poppins-Medium', fontWeight: '200', fontSize: 13, color: '#B1292C', marginHorizontal: 5
                    }}>{selectedProduct.points} {t('points')}</Text>
                    <View style={{width:'85%'}}>
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
                    <View style={{width:'85%'}}>
                    <Text style={{
                        fontFamily: 'Poppins-Regular', fontWeight: '500', fontSize: 13, color: '#848484', marginLeft: 5, marginBottom: 4
                    }}>{addressItem.address_1},{addressItem.address_2},{addressItem.land_mark},
                    {addressItem.city},{addressItem.state}</Text>
                    </View>
                </View>
                <Text style={{
                        fontFamily: 'Poppins-Regular', fontWeight: '500', fontSize: 13, color: '#848484', marginLeft: 20, marginBottom: 4
                    }}>{addressItem.mobile}</Text>
            </View>
           
           
        </View>
        <View style={styles.modalButtonContainer}>
                <Pressable onPress={()=>{confirmHandler(selectedProduct.id)
                    navigation.navigate('Success',{title: t('titleRewards'),content:t('titleContent'),addressItem,selectedProduct,uiParams})}} 
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
        marginTop:12,
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
        width: "35%",
        marginLeft:7,
        height: 112,
        justifyContent:'center',
        backgroundColor: '#F2F2F2',
        borderRadius: 8,
        alignItems: 'center',
        marginTop:5
      },
})