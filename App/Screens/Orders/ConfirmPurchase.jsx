import { StyleSheet, Text, View ,Image,TouchableOpacity, Pressable} from "react-native";
import PenIcon from "../../../assets/Icon/PenIcon";
import StarIcon from "../../../assets/Icon/StarIcon";
import ProductPopup from "./ProductPopup";
import { useEffect, useState } from "react";
import { ConfirmPurchaseService } from "../../service/Orders/ConfirmPurchaseService";
import { useTranslation } from 'react-i18next';
import AsyncStorage from "@react-native-async-storage/async-storage";

function ConfirmPurchase({route,navigation}){
    const item = route?.params;
    const [modalVisible,setModalVisible]=useState(false)
    const [ton,setTons]=useState(item.quantity)
    const [quantity, setQuantity] = useState(0)
    const[username, setUsername] = useState('') ;
    const { t } = useTranslation();
    console.log("item=======", item)
   const uiParams={
    Product:t('quantity'),
    Name:t('unique'),
    Mobile:t('Mnumber'),
    Address:t('Location'),
    }
    useEffect(() => {
        const getValueFromStorage = async () => {
            try {
              const user = await AsyncStorage.getItem('role'); 
            //   console.log('role2344355', role)
              setUsername(user)
            } catch (error) {
              console.error('Error fetching data from AsyncStorage:', error);
            }
          };
        getValueFromStorage();
      }, []);
   function successHandler(ton,id,distributorId){
    let Id
    if (item.page==='favourites')
    {
         Id=distributorId
    }
    else{
        Id=id
    }
    ConfirmPurchaseService(ton,Id,).then((res) => {
        // console.log('Received data:', res.role);
        navigation.navigate('Success',{
            title : t('title'),
            content: t('content'),
            addressItem:item,
            selectedProduct:null,
            uiParams,
            page:'orders',
            ton,
            // roles:res.roles
      });
     }) .catch((errr)=>{
        console.log("errr",errr)
      })
}
    const ProductVisible=()=>{
        setModalVisible(true)
        
    }
    const updateTon = (newTon) => {
        setTons(newTon);
      };
    return(
        <View style={{flex:1, backgroundColor:'white'}}>
            <View style={[styles.Modalcard, styles.shadowProp]}>
            <View style={{backgroundColor:'rgba(182, 182, 182, 1)',height:112, width:'35%',borderRadius:8,alignSelf:'center',alignItems:'center',justifyContent:'center',marginLeft:10}}>
                <Text style={{fontSize:30,fontFamily:'Poppins-SemiBold',color:'rgba(57, 57, 57, 1)'}}>{item.selectedItem.name?.slice(0, 2).toUpperCase()}</Text>
            </View>
                <View style={{justifyContent: 'center', marginLeft: 15,height:100,width:'35%'}}>
                    <Text style={{ fontFamily: 'Poppins-Medium',fontSize: 17 , color:'rgba(57, 57, 57, 1)',marginTop:5}}>{item.selectedItem.name}</Text>
                    <Text style={{
                        fontFamily: 'Poppins-Medium', fontSize: 12,
                        color: '#393939'
                    }}>{username}</Text>
                    <Text style={{
                        fontFamily: 'Poppins-Regular',fontSize: 13,
                        color: '#848484',marginTop:12
                    }}>{t('quantity')}</Text>
                    <View style={{flexDirection:'row',marginTop:8}}>
                        <Text style={{
                            fontFamily: 'Poppins-Medium', fontSize: 17,
                            color: '#B1292C'
                        }}>{ton} {t('Ton')}</Text>
                        <Pressable onPress={() => {setModalVisible(true)}}  style={{marginTop:3,marginLeft:6}}>
                          <PenIcon width={17} height={17} color='rgba(57, 57, 57, 1)'/>
                        </Pressable>
                    </View>
                </View>
            </View>
            <View style={[styles.ModalSecondCard, styles.shadowProp]}>
                {/* <View style={{ flexDirection: 'row',justifyContent: 'space-between' }}>
                    <Text style={{color:'#848484',fontFamily:'Poppins-Regular'}}>Transaction ID</Text>
                    <Text style={{color:'#393939',fontFamily:'Poppins-Medium',fontSize:13.33,fontWeight:'500',lineHeight:20,textAlign:'right'}}>A1234455667</Text>
                </View> */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{color:'#848484',fontFamily:'Poppins-Regular'}}>{t('unique')}</Text>
                    <Text style={{ color:'#393939',fontFamily:'Poppins-Medium',fontSize:13.33,fontWeight:'500',lineHeight:20,textAlign:'right', width:"60%"}}>{item.selectedItem.user_id}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop:5 }}>
                    <Text style={{color:'#848484',fontFamily:'Poppins-Regular'}}>{t('Mnumber')}</Text>
                    <Text style={{ color:'#393939',fontFamily:'Poppins-Medium',fontSize:13.33,fontWeight:'500',lineHeight:20,textAlign:'right', width:"50%"}}>{item.selectedItem.mobile}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop:5}}>
                    <Text style={{color:'#848484',fontFamily:'Poppins-Regular'}}>{t('Location')}</Text>
                    <Text style={{ color:'#393939',fontFamily:'Poppins-Medium',fontSize:13.33,textAlign:'right', width:"50%"}}>{item.selectedItem.district_name},{item.selectedItem.state_name}</Text>
                </View>
            </View>
            <View style={{backgroundColor:'rgba(4, 4, 4, 1)', width:'90%',height:110,padding:12,borderRadius:4,marginTop:20,alignSelf:'center'}}>
                <View style={{flexDirection:'row'}}>
                    <StarIcon/>
                    <Text style={{color:'rgba(241, 140, 19, 1)', fontSize:15,fontFamily:'Poppins-Regular',marginLeft:5}}>{t('500 Pts')}</Text>
                    <Text style={{color:'rgba(255, 255, 255, 1)', fontSize:15,fontFamily:'Poppins-Regular',marginLeft:5}}>{t('on confirmation')}</Text>
                </View>
                <Text style={{color:'rgba(132, 132, 132, 1)', fontSize:11, fontFamily:'Poppins-Regular',marginTop:5}}>{t('lines')}</Text>
            </View>
            <View style={styles.modalButtonContainer}>
                <Pressable style={{ width: '90%', backgroundColor: 'rgba(177, 41, 44, 1)', borderRadius: 6, alignItems: 'center', height: 48, radius: 4, padding: 12 }} onPress={() => successHandler(ton,item.selectedItem.id,item.selectedItem.distributor)}>
                    <Text style={{ fontFamily: 'Poppins', fontWeight: '500', fontSize: 16, lineHeight: 24, color: '#ffffff', height: 24,fontFamily:'Poppins-Regular' }}>
                  {t('confirm')}
                    </Text>
                </Pressable>
            </View>
            <ProductPopup  onUpdateQuantity={updateTon}  isVisible={modalVisible} onClose={()=> setModalVisible(false)} quantity={item.quantity} onEdit={true} />
        </View>
    )
}
const styles = StyleSheet.create({
    Modalcard: {
        backgroundColor: '#ffffff', 
        // padding: 10,
        height: 130,
        width: '90%',
        borderRadius: 5,
        alignItems:'center',
        borderRadius: 10,
        flexDirection: 'row',
        marginTop: 5,
        alignSelf:'center'
    },
    ModalSecondCard: {
        backgroundColor: '#ffffff', // Customize button style as needed
        padding: 10,
        height: 132,
        width: '90%',
        paddingRight: 12,
        paddingTop: 18,
        paddingBottom: 28,
        borderRadius: 5,
        borderRadius: 10,
        marginTop: 18,
        justifyContent: 'space-between',
        alignSelf:'center'
        
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    buttonAccept: {
        marginRight: 8,
        backgroundColor: '#18B758',
        width: 103,
        height: 36,
        borderRadius: 4,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonReject: {
        marginRight: 8,
        backgroundColor: '#EB1C1C',
        width: 103,
        height: 36,
        borderRadius: 4,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 12
    },
    buttonText: {
        width: 45,
        height: 20,
        fontFamily: 'Poppins',
        fontWeight: '500',
        lineHeight: 20,
        color: '#FFFFFF',
    },
    tinyLogo: {
        width: 80,
        height: 90,
        borderRadius: 8,
        marginLeft:5
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingBottom: 8
    },

    closeButton: {
        marginTop: 20,
        backgroundColor: '#18B758',
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    centeredView: {
        marginTop: 22,
        width: '100%',
        backgroundColor:'white',
        height:630,
        borderTopRightRadius:9,
        borderTopLeftRadius:9
        
        
    },
    modalView: {
       // marginTop: 180,
        //backgroundColor: 'white',
        //borderRadius: 20,
        padding: 16,
        width: '100%',
        height: '100%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonClose: {
        //backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    modalImage: {
        width: 100,
        height: 109,
        borderRadius: 8,
        marginLeft:10,

    },
    modalButtonContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        alignSelf:'center'
    }
})
export default ConfirmPurchase;