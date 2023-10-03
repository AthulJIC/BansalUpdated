import { View, Text, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity, Pressable, SafeAreaView, ActivityIndicator } from 'react-native';
import CustomIcon from '../../../assets/Icon/startIcon';
import { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler';
import AddressList from './Address';
import { useNavigation } from '@react-navigation/native';

import { useTranslation } from 'react-i18next';
import { useAppContext } from '../../context/AppContext';
import { RewardslistService } from '../../service/RewardsService/RewardsListService';
import { CommonAPI } from '../../service/common/Dbservice';
import { confirmService } from '../../service/RewardsService/ConfirmService';
import ErorrPopUp from './erorrRedeem';
import LoadingIndicator from '../../Components/LoadingIndicator';
import useBackButtonHandler from '../../Components/BackHandlerUtils';

const windowWidth = Dimensions.get('window').width;
const cardWidth = (windowWidth - 32) / 2;

const RewardScreen = (r) => {
  const [AddressItem, setAddressItem] = useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [itemName, setItemName] = useState('')
  const [points, setItemPoints] = useState('')
  const [details, setDetails] = useState('')
  const [productsArray, setProductsArray] = useState([])
  const [imageDetails,setImageDetails]=useState('')
  const [totalPoints,setTotalPoints]=useState('')
  const [redeemId,setRedeemId]=useState('')
  const [redeemValue,setRedeemValue]=useState('')
  const [erorrVisible,seterorrVisible]=useState(false)
  const { userDetails, updateUserDetails, updateSelectedProduct, UserPoints } = useAppContext();
  const [isLoading,setIsLoading]=useState(false)

  const navigation = useNavigation();
  const { t } = useTranslation();
  useBackButtonHandler(navigation, false);
  useEffect(() => {
    RewardsHandler()
    getLoyaltyPoints()
    
  }, []);
  const itemModal = (item) => {
    updateSelectedProduct(item);
    setItemName(item.title)
    setItemPoints(item.points)
    setDetails(item.description)
    setImageDetails(item.thumbnail_image)
    setRedeemId(item.id)
  }
  const confirmValidator=(item)=>{
    // confirmService(item.id).then((res) => {
    //   if(res.status === 200){
    //       console.log('success',res.data)
    //       setRedeemValue(res.data.error)
    //       seterorrVisible(true)
    //   }
    //   else{
        setModalVisible(true)
    //   }
    // })
    
  }
  const RewardsHandler = () => {
    RewardslistService().then((res) => {
      // if(res.status === 200){
      //     console.log('success',)
      //     setOrdersList(res.data.results)
      // }
      setProductsArray(res.data.results)
    })
  }
 
  const getLoyaltyPoints=()=>{
    setIsLoading(true)
    CommonAPI.Points().then((res) => {
        if(res.status === 200){
           // console.log('success')
            setTotalPoints(res.data.total_points)
            setIsLoading(false)
        }
    })
}

  const redirect = () => {
      const updatedUserDetails = {
      ...userDetails,
      redeemedProducts: [...(userDetails?.redeemedProducts || []), itemName],
    };
    updateUserDetails(updatedUserDetails);
    navigation.navigate('IdVerification')
    setModalVisible(false)
  }
  const renderCard = ({ item }) => (
 
    <View style={{width:'50%'}}>
      <View style={styles.card}>
        <View style={styles.imageView}>
          <Image
            style={styles.ImageContainer}
            source={{ uri:item.item_image }}
          />
        </View>
        <View style={{ alignItems: 'flex-start' }}>
          <Text style={styles.cardName}>{item.title}</Text>
          <Text style={styles.cardPoints}>{item.points}  {t('points1')}</Text>
          <Text style={styles.cardDetails}>{item.description}</Text>
        </View>
        <TouchableOpacity onPress={() => { itemModal(item) ;confirmValidator(item);}} style={styles.button}>
          <Text style={styles.buttonText}>{t('redeem')}</Text>
        </TouchableOpacity>
      </View>
  <ErorrPopUp isVisible={erorrVisible} onClose={() => seterorrVisible(false)}/>
    </View>
  );
//   if (isLoading) {
//     return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'white' }}>
//             <ActivityIndicator size="large" color="rgba(177, 41, 44, 1)" />
//         </View>
//     );
// }
  return (
    <View style={{ flex: 1 ,backgroundColor:'#ffffff'}}>
        <View style={[styles.container, styles.shadowProp]}>
          <FlatList
            data={productsArray}
            renderItem={renderCard}
            keyExtractor={(item) => item.name}
            numColumns={2} // Display two cards in a row
            contentContainerStyle={styles.flatListContent}
            style={styles.flatListStyle}
            ListHeaderComponent={
              <View style={{ flexDirection: 'row', justifyContent:'flex-start', width: '100%', alignItems: 'center' }}>
                <Text style={styles.rewardText}>{t('Rewards')}</Text>
                <View style={{
                  backgroundColor: 'rgba(241, 140, 19, 0.3)', width: '40%', height: 40,
                  justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderRadius: 8,
                   marginLeft:'auto'}}>
                  <CustomIcon width={20} height={20} fillColor="#F18C13" />
                  <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14,color:"#393939",marginLeft:5,marginTop:3 }} >
                    {totalPoints} {t('points')}</Text>
                </View>

              </View>
            }
          />
          {/* Modal */}
          <View style={styles.centeredView}>
            <Modal
              animationIn="slideInUp"
              animationOut="slideOutDown"
              isVisible={modalVisible}
              hasBackdrop={true}
              backdropColor="black"
              backdropOpacity={0.70}
              onBackdropPress={() => setModalVisible(false)}
              width={'100%'}
              style={{ alignItems: 'center', justifyContent: 'flex-end', margin: 0 }}
            >
              <View style={styles.centeredView}>

                <View style={styles.modalView}>
                  <TouchableOpacity
                    style={[{ alignItems: 'flex-end', marginBottom: 10, marginRight: 15 }]}
                    onPress={() => setModalVisible(false)}>
                    <Icon name="x" size={24} color="#393939" backgroundColor='#ffffff' />

                  </TouchableOpacity>
                  <View style={styles.imageModalView}>
                    <Image
                      style={styles.ImageModalContainer}
                      source={{ uri: imageDetails }}
                    />
                  </View>
                  <View style={{ alignItems: "flex-start" }}>
                    <Text style={styles.modalText}>{itemName}</Text>
                    <Text style={styles.modalPointsText}>{points} Points</Text>
                    <Text style={styles.detailsModal}>{details}</Text>
                  </View>
                  <View style={styles.modalButtonContainer}>
                    <Pressable onPress={() => { redirect(); }} style={{ marginBottom: 10, borderRadius: 5, width: '100%', backgroundColor: 'rgba(177, 41, 44, 1)', alignItems: 'center', height: 48, radius: 4, padding: 12 }} >
                      <Text style={{ fontFamily: 'Poppins-Regular', fontWeight: '500', fontSize: 16, lineHeight: 24, color: '#ffffff', height: 24 }}>
                        {t('redeem')}
                      </Text>
                    </Pressable>
                  </View>
                </View>

              </View>
            </Modal>
          </View>
        </View>
        {isLoading && <LoadingIndicator visible={isLoading} text='Loading'></LoadingIndicator>}
    </View>
  )
}
export default RewardScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    width : '100%'
  },
  flatListContent: {
    paddingBottom: 16,

  },
  rewardText: {
    fontFamily: 'Poppins-Medium',
    color: '#B1292C',
    fontSize: 16
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 8,
    paddingLeft: 10,
    margin: 8,
    elevation: 3,
    width:'90%',
    height:328,

  },
  cardName: {
    fontSize: 16,
    width: 107,
    height: 24,
    fontFamily: 'Poppins-Medium',
    color: '#393939',
    marginTop: 12
  },
  cardPoints: {
    fontSize: 13,
    color: '#B1292C',
    width: 75,
    height: 18,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    lineHeight: 20,
    flexDirection: 'row'

  },
  cardDetails: {
    marginTop: 8,
    fontWeight: '500',
    fontFamily: 'Poppins-Regular',
    fontSize: 11.11,
    lineHeight: 20,
    width: '100%',
    height: 60,
    color:'#848484'
  },
  imageView: {
    width: "90%",
    height: 140,
    justifyContent:'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    alignItems: 'center',
    marginTop:8
  },
  ImageContainer: {
    width: "75%",
    height: 113,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems:'center'
  },
  button: {
    width:'90%',
    height: 36,
    borderRadius: 4,
    justifyContent: 'center',
    backgroundColor: '#B1292C',
    alignItems: 'center',
    marginTop: 12
  },
  buttonText: {
    height: 20,
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: '#ffffff',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 22,
    width: '100%'
  },
  modalView: {
    marginTop: 70,
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  // button: {
  //   borderRadius: 20,
  //   padding: 10,
  //   elevation: 2,
  // },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 3,
    textAlign: 'left',
    marginTop: 20,
    fontFamily: 'Poppins-Medium',
    width: 328,
    height: 24,
    fontSize: 16,
    color: '#393939'
  },
  modalPointsText: {
    marginBottom: 3,
    textAlign: 'left',
    fontFamily: 'Poppins-Medium',
    width: 328,
    height: 24,
    fontSize: 13,
    color: '#B1292C'
  },
  detailsModal: {
    width: 328,
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#848484'
  },
  imageModalView: {
    width: '100%',
    elevation: 6
  },
  ImageModalContainer: {
    width: '100%',
    height: 180,
    borderRadius: 8,

  },
  modalButtonContainer: {
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 45,
    alignSelf: 'center'
  }
});
