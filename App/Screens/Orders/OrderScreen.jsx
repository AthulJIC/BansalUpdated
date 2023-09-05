import {View,Text, Pressable,Animated,TextInput,TouchableOpacity, StyleSheet,FlatList,Image, ScrollView} from 'react-native'
import DownArrowIcon from '../../../assets/Icon/DownArrowIcon';
import Icon from 'react-native-vector-icons/Feather';
import { useState } from 'react';
import BookmarkIcon from '../../../assets/Icon/BookmarkIcon';
import { Dropdown } from 'react-native-element-dropdown';
import Modal from 'react-native-modal'
import ReferLead from '../../Components/ReferLead';
import BookMarkActiveIcon from '../../../assets/Icon/BookmarkActiveIcon';


const data = [
    { id: 1, name: 'John Nick', requestId: 458930},
    { id: 2, name: 'Alice Park' , requestId: 458930 },
    { id: 3, name: 'Bob Marley', requestId: 458930},
    { id: 4, name: 'Eva Conklin', requestId: 458930},
    { id: 5, name: 'Michael John', requestId: 458930 },
    { id: 6, name: 'Sophia Crystal', requestId: 458930},
    { id: 7, name: 'David Warner', requestId: 458930},
    { id: 8, name: 'Olivia Steve', requestId: 458930 },
    { id: 9, name: 'William Shakespeare', requestId: 458930},
    { id: 10, name: 'Emma Watson', requestId: 458930},
    { id: 11, name: 'Liam Marker', requestId: 458930},
    { id: 12, name: 'Ava Trevor', requestId: 458930},
    { id: 13, name: 'Noah William', requestId: 458930},
    { id: 14, name: 'Isabella Steve', requestId: 458930},
    { id: 15, name: 'James Bond', requestId: 458930},
    { id: 16, name: 'Mia Nick', requestId: 458930},
    { id: 17, name: 'Benjamin Conklin', requestId:458930},
    { id: 18, name: 'Luna Marker', requestId: 458930 },
    { id: 19, name: 'Lucas Cole', requestId: 458930},
    { id: 20, name: 'Harper Mark', requestId: 458930},
];
const place = [
    { label: 'Gwalior, MP', value: '1' },
    { label: 'Jabalpur, MP', value: '2' },
    { label: 'Ujjain, MP', value: '3' },
    { label: 'Bhopal', value: '4' },
    { label: 'Gwalior, MP', value: '5' },
    { label: 'Jabalpur, MP', value: '6' },

  ];
const OrderScreen =({navigation})=>{
    const [searchText, setSearchText] = useState('');
    const [value, setValue] = useState(place[0]);
    const [modalVisible, setModalVisible] = useState(false);
    const [bookmarkedItems, setBookmarkedItems] = useState([]);
    const modalItem = ({ item }) => {
        setName(item.name)
        setQuantity(item.requestId)
    }

    const HEADER_HEIGHT = 200;
    const scrollY = new Animated.Value(0);
   function chooseHandler(item){
        navigation.navigate('DistributorExpand',{ selectedItem: item })
   }
   function bookmarkHandler(itemId){
    if (bookmarkedItems.includes(itemId)) {
        setBookmarkedItems(bookmarkedItems.filter(id => id !== itemId));
      } else {
        setBookmarkedItems([...bookmarkedItems, itemId]);
      }
   }
   
    const requestData = ({ item }) => {
        const isBookmarked = bookmarkedItems.includes(item.id);
        return(

        <View style={[styles.card, styles.shadowProp]}>
            <Pressable>
                <Image
                    style={styles.tinyLogo}
                    source={require('../../../assets/Images/Man.jpg')}
                    resizeMode='cover'

                />
            </Pressable>

            <View style={{width:'60%', height:88}}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                   <Text style={{fontFamily: 'Poppins-Medium', fontSize: 13,color:'rgba(177, 41, 44, 1)'}}> {item.requestId}</Text>
                   <Pressable onPress={() => bookmarkHandler(item.id)}>
                       {!isBookmarked ?
                        (<BookmarkIcon height={16} width={16} color='#393939'/>) : 
                        <BookMarkActiveIcon height={16} width={16} color='rgba(127, 176, 105, 1)'/>
                       }
                   </Pressable>

                </View>
                <Text style={{fontFamily: 'Poppins-Medium', fontSize: 16,color:'rgba(57, 57, 57, 1)'}}> {item.name}</Text>
                <Pressable style={styles.buttonReject} onPress={() =>chooseHandler(item)}>
                    <Text style={styles.buttonText}>Choose</Text>
                </Pressable>
            </View>
        </View>
        )
    }; 
    const closeModal = () => {
        setModalVisible(false);
    };
    const handleRefer = () => {
        // Perform navigation to another page
        navigation.navigate('ConfirmDetail');
      };
    return (
    <View style={{flex:1, backgroundColor:'white'}}>
        
        <FlatList
            data={data}
            renderItem={requestData}
            keyExtractor={(item) => item.name}
            ListHeaderComponent={
                <View>
                    <View style={{flexDirection:'row',marginTop:5,justifyContent:'space-between'}}>
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={place}
                            search
                            maxHeight={200}
                            labelField="label"
                            valueField="value"
                            iconColor='rgba(57, 57, 57, 1)'
                            // placeholder="Select item"
                            searchPlaceholder="Search..."
                            value={value}
                            onChange={item => {
                            setValue(item.value);
                            }}
                            containerStyle={styles.dropdownContainer}
                        />
                        <Pressable style={{backgroundColor:'rgba(43, 89, 195, 1)', height:37, width:'30%',borderRadius:5,alignItems:'center',justifyContent:'center',marginRight:15,marginTop:7}}
                            onPress={() =>setModalVisible(true)}>
                            <Text style={{color:'white', fontSize:13, fontFamily:'Poppins-Regular'}}>Refer Leads</Text>
                        </Pressable> 
                    </View>
                    <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        placeholder="Search..."
                        placeholderTextColor={'rgba(132, 132, 132, 1)'}
                        onChangeText={text => setSearchText(text)}
                        value={searchText}
                    />
                    <TouchableOpacity>
                        <Icon name="search" size={23} color="rgba(57, 57, 57, 1)" />
                    </TouchableOpacity>
                    </View>
                </View>
            }
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: false }
            )}/>
            <ReferLead isVisible={modalVisible} onClose={closeModal} onRefer={handleRefer}/>

        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        // paddingTop: 24,
        // paddingLeft: 16,
        // paddingRight: 16,
       // paddingBottom: 16,
        // width: 328,
        backgroundColor: '#ffffff',
        
        
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#f2f2f2',
        borderColor: '#ccc',
        borderRadius: 4,
        borderWidth: 1,
        height: 48,
        backgroundColor: '#ffffff',
        width:'90%',
        alignSelf:'center',
        marginTop:5,
        marginBottom:20

    },
    subContainer: {
        flexDirection: 'row',
        marginLeft: 17,
        alignItems: 'flex-start',

    },
    input: {
        height: 40,
        marginRight: 8,
        color: '#848484',
        alignItems: 'flex-start'
    },
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
        
    },
    card: {
        backgroundColor: '#ffffff',
        height: 109,
        width: '90%',
        borderRadius: 5,
        borderRadius: 10,
        flexDirection: 'row',
        marginBottom:17,
        alignItems:'center',
        alignSelf:'center',
        justifyContent:'flex-start',
        
        
    },
    centeredView: {
        marginTop: 22,
        width: '100%',
        backgroundColor:'white',
        height:650,
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
     Modalcard: {
        backgroundColor: '#ffffff', // Customize button style as needed
        // padding: 10,
        height: 130,
        width: '100%',
        // paddingRight: 12,
        // paddingTop: 8,
        // paddingLeft: 8,
        // paddingBottom: 18,
        borderRadius: 5,
        // justifyContent: 'flex-start',
        // alignItems:'center',
        alignItems:'center',
        borderRadius: 10,
        flexDirection: 'row',
        marginTop: 18,
        alignSelf:'center'
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    buttonReject: {
        marginRight: 8,
        backgroundColor: 'rgba(177, 41, 44, 1)',
        width: '100%',
        height: 36,
        borderRadius: 4,
        // padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        // marginLeft: 12
    },
    buttonText: {
        fontFamily: 'Poppins-Regular',
        color: '#FFFFFF',
    },
    tinyLogo: {
        width: 80,
        height: 90,
        borderRadius: 8,
        marginLeft:10,
        marginHorizontal:20
    },
    dropdown: {
        // margin: 10,
        height: 50,
        width:'50%'
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
        marginLeft:20,
        color:'rgba(57, 57, 57, 1)',
        fontFamily:'Poppins-Regular'
    },
    iconStyle: {
        width: 25,
        height: 25,
        marginRight:29,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    dropdownContainer:{
        marginLeft:15,
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
export default OrderScreen