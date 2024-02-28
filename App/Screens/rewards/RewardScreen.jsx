import { View, Text, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity, Pressable,RefreshControl,PermissionsAndroid } from 'react-native';
import CustomIcon from '../../../assets/Icon/startIcon';
import { useCallback, useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { useTranslation } from 'react-i18next';
import { useAppContext } from '../../context/AppContext';
import { RewardslistService } from '../../service/RewardsService/RewardsListService';
import { CommonAPI } from '../../service/common/Dbservice';
import ErorrPopUp from './erorrRedeem';
import LoadingIndicator from '../../Components/LoadingIndicator';
import useBackButtonHandler from '../../Components/BackHandlerUtils';
import { RewardsApi } from '../../service/rewards/rewardservice';
import { Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';


const RewardScreen = (r) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [itemName, setItemName] = useState('')
  const [points, setItemPoints] = useState('')
  const [details, setDetails] = useState('')
  const [productsArray, setProductsArray] = useState([])
  const [imageDetails,setImageDetails]=useState('')
  const [totalPoints,setTotalPoints]=useState('')
  const [redeemId,setRedeemId]=useState('')
  const [erorrVisible,seterorrVisible]=useState(false)
  const { userDetails, updateUserDetails, updateSelectedProduct, UserPoints } = useAppContext();
  const [isLoading,setIsLoading]=useState(false)
  const [redeemValue,setRedeemValue]=useState('')
  const [refreshing, setRefreshing] = useState(false);
  const [isEndReachedLoading, setIsEndReachedLoading] = useState(false);
  const [page, setPage] =useState(1);
  const [nextUrl, setNextUrl] = useState(null);
  const navigation = useNavigation();
  const { t } = useTranslation();
  console.log(totalPoints,"hhhhhh")
  useBackButtonHandler(navigation, false);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        RewardsHandler();
        getLoyaltyPoints();
      };
  
      fetchData();
    }, [])
  );
  const itemModal = (item) => {
    updateSelectedProduct(item);
    setItemName(item.title)
    setItemPoints(item.points)
    setDetails(item.description)
    setImageDetails(item.thumbnail_image)
    setRedeemId(item.id)
  }
  const confirmValidator=(item)=>{
     if( totalPoints < item.points )
     {
     return (Alert.alert(t('alert'), t('enoughpoints'), [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]));
      
     }
    console.log('item====',item.points)
    // confirmService(item.id).then((res) => {
    //   if(res.status === 200){
    //       console.log('success',res.data)
    //       setRedeemValue(res.data.error)
    //       seterorrVisible(true)
    //   }
    //   else{
    //     setModalVisible(true)
    //   }
    // })
    //setModalVisible(true)
    RewardsApi.purchaseRewards(item?.id).then((res) => {
      if(res.status === 200){
          console.log('success redeem',res)
           
          setRedeemValue(res.data.error)
          setModalVisible(true)
         
      }
      else{
        seterorrVisible(true)
        // setModalVisible(true)
      }
    })
    
  }
  const onRefresh = () => {
    setRefreshing(true);
    RewardsHandler();
    getLoyaltyPoints();
    setRefreshing(false)
  };
  const RewardsHandler = () => {
    RewardslistService(page).then((res) => {
      if (res.status === 200) {
        const newData = res.data.results;
        if (page === 1) {
          setProductsArray(newData);
        } else {
          setProductsArray((prevData) => {
            const newData = new Set([...prevData, ...res.data.results]);
            return Array.from(newData);
          });
        }
        setIsLoading(false);
        setNextUrl(res.data.next);
        setIsEndReachedLoading(false);
      } else {
        setIsLoading(false);
        setIsEndReachedLoading(false);
      }
      // setProductsArray(res.data.results)
      // setIsLoading(false)
    }).catch((err) => {
      setIsLoading(false)
    })
  }
 
  const getLoyaltyPoints=()=>{
    setIsLoading(true)
    CommonAPI.Points().then((res) => {
        if(res.status === 200){
          if(res.data.total_points !== null){
            setTotalPoints(res.data.total_points);
        }
        else {
          setTotalPoints(0);
        }
            // setTotalPoints(res.data.total_points)
             setIsLoading(false)
        }
    })
}

  const redirect = () => {
  
      const updatedUserDetails = {
      ...userDetails,
      redeemedProducts: [...(userDetails?.redeemedProducts || []), itemName],
    };
    console.log('updatedUserDetails',updatedUserDetails)
    updateUserDetails(updatedUserDetails);
    cameraHandler();
    setModalVisible(false)
   
  }
  async function cameraHandler(){
    // var options = {
    //   mediaType: 'photo',
    //   saveToPhotos: false,
    //   includeBase64: false,
    //   cameraType: 'back',

    // };
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message: "App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // const result = await launchCamera(options, (res) => {
        //   // console.log('Response = ', res);
        //   if (res.didCancel) {
        //     // console.log('User cancelled image picker');
        //   } else if (res.error) {
        //     // console.log('ImagePicker Error: ', res.error);
        //   } else if (res.customButton) {
        //     // console.log('User tapped custom button: ', res.customButton);
        //     alert(res.customButton);
        //   } else {
        //     // let source = res;
        //     // var resourcePath1 = source.assets[0].uri;
        //     const source = { uri: res.uri };
        //     // console.log('response', JSON.stringify(res));
        //     //setSelectedImage(res)
        //     console.log('res=====', res);
        //     const imageUri = res.assets[0].uri;
        //     console.log('source response', imageUri);
        //     var bodyFormData = new FormData();
        //     bodyFormData.append('image', {
        //       uri: imageUri,
        //       type: 'image/jpeg', 
        //       name: 'photo.jpeg', 
        //     });
        //     console.log('formData', bodyFormData);
        //     setIsLoading(true)
        //     RewardsApi.postIdVerification(bodyFormData).then((res) => {

        //       console.log('res====/////', res.data)
        //       // updateUserDetails({
        //       //   id: res.data.id,
        //       //   id_number: res.data.id_number,
        //       //   id_Type: res.data.id_type,
        //       //   manual_verification_required: res.data.manual_verification_required,
        //       //   message: res.data.message,
        //       //   name: res.data.name,
        //       //   name_verified: res.data.name_verified,
        //       // });
        //       //navigation.navigate('IdVerification')
        //       setIsLoading(false)
        //     }).catch((err) => {
        //       console.log(err)
        //       setIsLoading(false)
        //     })
        //   }
        // })
        ImagePicker.openCamera({
          width: 400,
          height: 500,
          cropping: true,
          freeStyleCropEnabled : true,
          //compressImageQuality : 0.8,
          includeBase64: true,
          includeExif: true,
        }).then(image => {
          console.log(('image===', image));
           const imageUri = image.path;
            var bodyFormData = new FormData();
            bodyFormData.append('image', {
              uri: imageUri,
              type: 'image/jpeg', 
              name: 'photo.jpeg', 
            });
             setIsLoading(true)
            RewardsApi.postIdVerification(bodyFormData).then((res) => {
         
              console.log('res====/////', res.status)
              if(res.status === 201){
                  navigation.navigate('IdVerification',{
                    id : res.data
                  })
              }
              // updateUserDetails({
              //   id: res.data.id,
              //   id_number: res.data.id_number,
              //   id_Type: res.data.id_type,
              //   manual_verification_required: res.data.manual_verification_required,
              //   message: res.data.message,
              //   name: res.data.name,
              //   name_verified: res.data.name_verified,
              // });
              
              setIsLoading(false)
            }).catch((err) => {
              console.log(err)
              setIsLoading(false)
            })
        }).catch((e) => {
          console.log(e)
          setIsLoading(false)
          //setModalVisible(false)
          //updateFileInfo(null)
        });
      } else {
        //console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }
  async function endReachedHandler() {
    console.log('end', isEndReachedLoading)
    if (isEndReachedLoading || !nextUrl) {
      setPage(1)
      return;
   }
    setPage(page + 1);
    setIsEndReachedLoading(true);
    RewardsHandler();
  }
  const renderCard = ({ item }) => {
    console.log('item===', item)
    if (!item.is_active) {
      return null; // If item is not active, don't render anything
    }
    return(
    <View style={{width:'50%',alignSelf:'center'}}>
      <View style={styles.card}>
        <View style={styles.imageView}>
          <Image
            style={styles.ImageContainer}
            source={{ uri:item.item_image }}
            resizeMode='contain'
          />
        </View>
        <View style={{ alignItems: 'flex-start',marginLeft:10 }}>
          <Text style={styles.cardName}>{item.title}</Text>
          <Text style={styles.cardPoints}> {item.points}  {t('points3')}</Text>
          <Text style={styles.cardDetails}>{item.description}</Text>
        </View>
        <TouchableOpacity onPress={() => { itemModal(item) ;confirmValidator(item);}} style={styles.button}>
          <Text style={styles.buttonText}>{t('redeem')}</Text>
        </TouchableOpacity>
      </View>
  <ErorrPopUp isVisible={erorrVisible} onClose={() => seterorrVisible(false)}/>
    </View>
    )
  };
  // const activeItems = productsArray.filter(item => item.is_active);
  return (
    <View style={{ flex: 1 ,backgroundColor:'#ffffff'}}>
{/*         
          {
            productsArray.length === 0 && (
              <View style={{ alignSelf: 'center', backgroundColor: 'white', top: 150 }}>
                <Image
                    source={require('../../../assets/Images/RewardsEmpty.png')}
                    style={{ height: '50%', height: 150 }}
                    resizeMode='center'
                ></Image>
                <View style={{ marginTop: 20 }}>
                    <Text style={{ color: 'rgba(57, 57, 57, 1)', fontSize: 16, fontFamily: 'Poppins-Medium', textAlign: 'center' }}>
                    {t("rewardsempty")}
                    </Text>
                    <Text style={{ color: 'rgba(132, 132, 132, 1)', fontSize: 13, fontFamily: 'Poppins-Regular', textAlign: 'center' }}>
                      {t('rewardscontent')}
                    </Text>
                </View>
              </View>
            )
          } */}
          <View style={styles.container}>
          <FlatList
            data={productsArray}
            renderItem={renderCard}
            keyExtractor={(item) => item.name}
            numColumns={2}
            onEndReached={endReachedHandler}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListHeaderComponent={
              <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <Text style={styles.rewardText}>{t('Rewards')}</Text>
                <View style={{
                  backgroundColor: 'rgba(241, 140, 19, 0.3)', width: 'auto', height: 40,
                  justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderRadius: 8,
                   marginLeft:'auto',paddingRight:10,paddingLeft:10}}>
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
              backdropOpacity={0.7}
              onBackdropPress={() => setModalVisible(false)}
              width={'100%'}
              style={{ alignItems: 'center', justifyContent: 'flex-end', margin: 0 }}
            >

                <View style={styles.modalView}>
                  <TouchableOpacity
                    style={[{ alignItems: 'flex-end', marginBottom: 10, marginRight: 15 }]}
                    onPress={() => setModalVisible(false)}>
                    <Icon name="close" size={24} color="#393939" backgroundColor='#ffffff' />

                  </TouchableOpacity>
                  <View style={styles.imageModalView}>
                    <Image
                      style={styles.ImageModalContainer}
                      source={{ uri: imageDetails }}
                      // resizeMode='stretch'
                    />
                  </View>
                  <View style={{ alignItems: "flex-start",marginLeft:15 }}>
                    <Text style={styles.modalText}>{itemName}</Text>
                    <Text style={styles.modalPointsText}>{points} {t('points')}</Text>
                    <Text style={styles.detailsModal}>{details}</Text>
                  </View>
                  <View style={{alignSelf:'center',marginTop:'auto', bottom:110}}>
                    <Text style={{color:'black', fontSize:14}}>{ t('verify') }</Text>
                  </View>
                  <View style={styles.modalButtonContainer}>
                    <Pressable onPress={() => { redirect(); }} style={{ marginBottom: 10, borderRadius: 5, width: '100%', backgroundColor: 'rgba(177, 41, 44, 1)', alignItems: 'center', height: 48, radius: 4, padding: 12 }} >
                      <Text style={{ fontFamily: 'Poppins-Regular', fontWeight: '500', fontSize: 16, lineHeight: 24, color: '#ffffff', height: 24 }}>
                        {t('redeem')}
                      </Text>
                    </Pressable>
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
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 16,
    // backgroundColor: '#ffffff',
  },
  flatListContent: {
    paddingBottom: 16,

  },
  rewardText: {
    fontFamily: 'Poppins-Medium',
    color: '#B1292C',
    fontSize: 16,
    marginLeft:10
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 8,
    alignSelf:'center',
    elevation: 3,
    width:'94%',
    height:328,
    marginTop:10,
    marginBottom:10

  },
  cardName: {
    fontSize: 15,
    width: '99%',
    fontFamily: 'Poppins-Medium',
    color: '#393939',
    marginTop: 12,
    height:'auto'
  },
  cardPoints: {
    fontSize: 13,
    color: '#B1292C',
    fontFamily: 'Poppins-Medium',
    flexDirection: 'row',
    marginTop:2
  },
  cardDetails: {
    marginTop: 2,
    fontFamily: 'Poppins-Regular',
    fontSize: 11.11,
    width: '95%',
    color:'#848484',
    height:'auto'
  },
  imageView: {
    width: "90%",
    height: 140,
    justifyContent:'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    alignItems: 'center',
    marginTop:8,
    alignSelf:'center'
  },
  ImageContainer: {
    width: '75%',
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
    marginTop: 6,
    alignSelf:'center'
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
    marginTop: 'auto',
    backgroundColor: 'white',
    width: '100%',
    height: '80%',
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
    width: '75%',
    height: 190,
    borderRadius: 8,
    alignSelf:'center'

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
