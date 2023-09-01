import { View, Text, FlatList,StyleSheet, Dimensions,Image, TouchableOpacity, Pressable, SafeAreaView } from 'react-native';
import CustomIcon from '../../../assets/Icon/startIcon';
import { useState } from 'react';
import Modal  from 'react-native-modal';
import Icon from 'react-native-vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler';
import AddressList from './Address';
import { useAppContext } from '../../context/AppContext';
import { useNavigation } from '@react-navigation/native';
const productsArray = [
    {
      name: "Product A",
      points: 100,
      details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at ligula eget turpis volutpat tempus."
    },
    {
      name: "Product B",
      points: 150,
      details: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
    },
    {
      name: "Product C",
      points: 200,
      details: "Fusce euismod justo et lorem tincidunt, eget feugiat neque feugiat. Nullam lacinia varius justo vitae vulputate."
    },
    {
      name: "Product D",
      points: 80,
      details: "Ut ullamcorper mi a nisi congue, nec tempus neque fringilla. Proin nec turpis nec lectus viverra interdum."
    },
    {
      name: "Product E",
      points: 300,
      details: "Suspendisse et augue vel urna venenatis ultrices. Vestibulum nec magna sit amet nisi hendrerit hendrerit."
    },
    {
      name: "Product F",
      points: 50,
      details: "Curabitur volutpat dolor at fermentum scelerisque. Nunc id metus non dolor auctor vulputate."
    },
    {
      name: "Product G",
      points: 180,
      details: "Nam non nisl ut justo consectetur condimentum non eu elit. Sed efficitur velit nec justo pellentesque, a facilisis risus hendrerit."
    },
    {
      name: "Product H",
      points: 120,
      details: "Praesent id elit sit amet felis fringilla congue vel nec orci. Vivamus convallis, tellus vel iaculis feugiat, elit felis commodo mi."
    },
    {
      name: "Product I",
      points: 250,
      details: "Vivamus vitae dolor nec nulla eleifend facilisis vel eu justo. Donec cursus, velit ut tincidunt volutpat, quam libero luctus dolor."
    },
    {
      name: "Product J",
      points: 70,
      details: "Aliquam vehicula tortor a est eleifend, non semper purus imperdiet. Sed vel enim in ex euismod venenatis."
    }
  ];
  const windowWidth = Dimensions.get('window').width;
  const cardWidth = (windowWidth - 32) / 2;
const RewardScreen =(r)=>{
  const [AddressItem,setAddressItem]=useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [itemName,setItemName]=useState('')
  const [points,setItemPoints]=useState('')
  const [details,setDetails]=useState('')
  const { userDetails, updateUserDetails, updateSelectedProduct } = useAppContext();
  const navigation = useNavigation();
  const itemModal=(item)=>{
    updateSelectedProduct(item);
  setItemName(item.name)
  setItemPoints(item.points)
  setDetails(item.details)
  }
  const redirect=()=>{
    const updatedUserDetails = {
      ...userDetails,
      redeemedProducts: [...(userDetails?.redeemedProducts || []), itemName],
    };
    updateUserDetails(updatedUserDetails);
    navigation.navigate("AddressList",{
      fromProfile: false,
  });
    setModalVisible(false)
  }
    const renderCard = ({ item }) => (
      <View>
        <View style={styles.card}>
            <View style={styles.imageView}>
              <Image
        style={styles.ImageContainer}
        source={require('../../../assets/Images/Rectangle.jpg')}
      />
      </View>
      <View style={{alignItems:'flex-start'}}>
          <Text style={styles.cardName}>{item.name}</Text>
          <Text style={styles.cardPoints}>{item.points} Points</Text>
          <Text style={styles.cardDetails}>{item.details}</Text>
      </View>
          <TouchableOpacity onPress={() =>{ setModalVisible(true);itemModal(item)}} style={styles.button}>
        <Text style={styles.buttonText}>Redeem Now</Text>
      </TouchableOpacity>
        </View>
   
</View>
      );
    return (
      <SafeAreaView style={{flex:1}}>
        <ScrollView nestedScrollEnabled={true} >
        <View style={[styles.container,styles.shadowProp]}>
       <View style={{flexDirection:'row',justifyContent:'space-between',width:'95%',alignItems:'center'}}>
        <Text style={styles.rewardText}>Rewards</Text>
        <View style={{backgroundColor:'rgba(241, 140, 19, 0.3)',width:149,height:40,
        justifyContent:'center',alignItems:'center',flexDirection:'row',justifyContent:'space-between',padding:10,borderRadius:8}}>
          <CustomIcon width={20} height={20} fillColor="#F18C13" />
        <Text style={{fontFamily:'Poppins-Regular',fontSize:16}} >
          2500 Points</Text>
        </View>
       
       </View>
      <FlatList
        data={productsArray}
        renderItem={renderCard}
        keyExtractor={(item) => item.name}
        numColumns={2} // Display two cards in a row
        contentContainerStyle={styles.flatListContent}
        style={styles.flatListStyle}
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
          style={{alignItems: 'center' ,justifyContent: 'flex-end', margin: 0}}
      >
        <View style={styles.centeredView}>
          
          <View style={styles.modalView}>
          <TouchableOpacity
              style={[{ alignItems: 'flex-end',marginBottom:10,marginRight:15}]}
              onPress={() => setModalVisible(false)}>
              <Icon name="x" size={24} color="#393939" backgroundColor='#ffffff'  />
                              
            </TouchableOpacity>
          <View style={styles.imageModalView}>
              <Image
        style={styles.ImageModalContainer}
        source={require('../../../assets/Images/Rectangle.jpg')}
      />
      </View>
      <View style={{alignItems:"flex-start"}}>
            <Text style={styles.modalText}>{itemName}</Text>
            <Text style={styles.modalPointsText}>{points} Points</Text>
            <Text style={styles.detailsModal}>{details}</Text>
      </View>
      <View style={styles.modalButtonContainer}>
                <Pressable onPress={()=>{redirect();}} style={{ marginBottom: 10, borderRadius: 5, width: '100%', backgroundColor: 'rgba(177, 41, 44, 1)', alignItems: 'center', height: 48, radius: 4, padding: 12 }} >
                    <Text style={{ fontFamily: 'Poppins-Regular', fontWeight: '500', fontSize: 16, lineHeight: 24, color: '#ffffff', height: 24 }}>
                        Redeem Now
                    </Text>
                </Pressable>
            </View> 
</View>

        </View>
      </Modal>
    </View>
   </View>
   </ScrollView>
   </SafeAreaView>
    )
}
export default RewardScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:'center',
      alignItems: 'center',
      padding:16,
      backgroundColor:'#ffffff'
     
    },
    flatListContent: {
      paddingBottom: 16,
      
    },
    rewardText:{
       fontFamily:'Poppins-Medium',
       color:'#B1292C',
       fontSize:19.2
    },
    card: {
      backgroundColor:'#ffffff',
      borderRadius: 8,
      borderWidth:1,
      paddingLeft: 10,
      paddingRight:12,
      height:328,
      justifyContent:'center',
      margin:8,
      alignItems:'center',
     borderColor:'#ffffff',
    elevation:3
      
    },
    cardName: {
      fontSize:16,
      width:107,
      height:24,
      fontFamily:'Poppins-Medium',
      color:'#393939',
      marginTop:12
    },
    cardPoints: {
      fontSize: 13,
      color: '#B1292C',
      width:75,
      height:16,
      fontFamily:'Poppins-Medium',
      fontWeight:'500',
      lineHeight:16

    },
    cardDetails: {
      marginTop: 8,
      fontWeight:'500',
      fontFamily:'Poppins-Regular',
      fontSize:11.11,
      lineHeight:20,
      width:140,
      height:60
    },
    imageView:{
       width:140,
       height:140,
      justifyContent:'center',
       backgroundColor:'#F2F2F2',
       borderRadius:8,
       alignItems:'center'
    },
    ImageContainer:{
        width:115,
        height:113,
        borderRadius:8
   },
   button:{
    width:140,
    height:36,
    borderRadius:4,
    justifyContent:'center',
    backgroundColor:'#B1292C',
    alignItems:'center',
    marginTop:12
   },
   buttonText:{
    height:20,
    fontFamily:'Poppins-Medium',
   fontSize:13,
    color:'#ffffff',
   },
   centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 22,
    width:'100%'
  },
  modalView: {
    marginTop:70,
    backgroundColor: 'white',
    width:'100%',
    height:'100%',
    borderRadius: 20,
   borderBottomLeftRadius:0,
   borderBottomRightRadius:0,
   padding:12,
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
    marginTop:20,
    fontFamily:'Poppins-Medium',
    width:328,
    height:24,
    fontSize:16,
    color:'#393939'
  },
  modalPointsText:{
    marginBottom: 3,
    textAlign: 'left',
    fontFamily:'Poppins-Medium',
    width:328,
    height:24,
    fontSize:13,
    color:'#B1292C'
  },
  detailsModal:{
    width:328,
    fontFamily:'Poppins-Regular',
    fontSize:13,
    color:'#848484'
  },
  imageModalView:{
    width:'100%',
    elevation:6
  },
  ImageModalContainer:{
    width:'100%',
    height:180,
    borderRadius:8,
   
  },
  modalButtonContainer: {
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 45,
    alignSelf:'center'
  }
  });
  