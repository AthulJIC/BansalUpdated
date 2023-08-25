import {Image, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import { useAppContext } from '../../context/AppContext'
import ChangeAddress from '../../../assets/Icon/changeIcon';
import PenIcon from '../../../assets/Icon/PenIcon';
const ConfirmPage=({route,navigation})=>{
    const { selectedProduct } = useAppContext();
    const {addressItem}=route.params
    return (
        <View style={{backgroundColor:'#ffffff',height:'100%'}}>
        <View style={[styles.card, styles.shadowProp]}>
           <Image
                    style={styles.tinyLogo}
                    source={require('../../../assets/Images/Man.jpg')}
                    resizeMode='cover'

                />
          <View style={{ justifyContent: 'center'}}>
                <Text style={{ marginLeft: 20, fontFamily: 'Poppins-Medium', fontSize: 16, color: 'rgba(57, 57, 57, 1)' }}>{selectedProduct.name}</Text>
                <View style={styles.subContainer}>
                    <Text style={{
                        fontFamily: 'Poppins-Medium', fontWeight: '200', fontSize: 13.33, color: '#B1292C', marginHorizontal: 5
                    }}>{selectedProduct.points} Points</Text>
                    <View style={{width:'85%'}}>
                    <Text style={{
                        fontFamily: 'Poppins-Medium', fontWeight: '500', fontSize: 13, color: '#393939', marginLeft: 5, marginBottom: 4
                    }}>{selectedProduct.details}</Text>
                    </View>
                </View>
             
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            </View>
        </View>
         <View style={{flexDirection:'row', justifyContent:'space-between',marginLeft:25}}>
            <Text style={{fontFamily:'Poppins-Medium',color:'#393939',fontSize:16}}>Address</Text>
            <TouchableOpacity onPress={()=>{navigation.navigate('AddressList')}} style={{flexDirection:'row',marginRight:22,justifyContent:'center',alignItems:'center'}}>
            <PenIcon width={20} height={20} color={'#2B59C3'}/>
           <Text style={{margin:5}}>Change</Text>
            </TouchableOpacity>
           
         </View>
        <View style={[styles.card, styles.shadowProp]}>
          <View style={{ justifyContent: 'center'}}>
                <Text style={{ marginLeft: 20, fontFamily: 'Poppins-Medium', fontSize: 16, color: '3939' }}>{addressItem.name}</Text>
                <View style={styles.subContainer}>
                    <View style={{width:'85%'}}>
                    <Text style={{
                        fontFamily: 'Poppins-Regular', fontWeight: '500', fontSize: 13, color: '#848484', marginLeft: 5, marginBottom: 4
                    }}>{addressItem.address}</Text>
                    </View>
                </View>
             
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            </View>
        </View>
        <View style={styles.modalButtonContainer}>
                <Pressable onPress={()=>{redirect();}} style={{ marginBottom: 10, borderRadius: 5, width: '100%', backgroundColor: 'rgba(177, 41, 44, 1)', alignItems: 'center', height: 48, radius: 4, padding: 12 }} >
                    <Text style={{ fontFamily: 'Poppins-Regular', fontWeight: '500', fontSize: 16, lineHeight: 24, color: '#ffffff', height: 24 }}>
                       Confirm
                    </Text>
                </Pressable>
            </View> 
        </View>
    )
}
export default ConfirmPage
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        // padding: 10,
        height: 132,
        width: '90%',
        // paddingRight: 12,
        // paddingTop: 8,
        // paddingLeft: 8,
        // paddingBottom: 18,
        borderRadius: 5,
        justifyContent: 'space-evenly',
        borderRadius: 10,
        flexDirection: 'row',
        marginBottom: 17,
        alignItems: 'center',
        marginLeft: 2,
        alignSelf: 'center',
        marginTop:12,
        backgroundColor:'#ffffff'
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
        marginLeft: 40
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
      }
})