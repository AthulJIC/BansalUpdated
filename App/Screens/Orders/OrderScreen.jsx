import { View, Text, Pressable, Animated, TextInput, TouchableOpacity, StyleSheet, FlatList, Image, ScrollView, ActivityIndicator } from 'react-native'
import DownArrowIcon from '../../../assets/Icon/DownArrowIcon';
import Icon from 'react-native-vector-icons/Feather';
import { useEffect, useState } from 'react';
import BookmarkIcon from '../../../assets/Icon/BookmarkIcon';
import { Dropdown } from 'react-native-element-dropdown';

import Modal from 'react-native-modal'
import ReferLead from '../../Components/ReferLead';
import BookMarkActiveIcon from '../../../assets/Icon/BookmarkActiveIcon';
import { useTranslation } from 'react-i18next';
import { OrderService } from '../../service/Orders/OrderService';
import { LocationService } from '../../service/Orders/LocationService';
import { ReferService } from '../../service/Orders/ReferLeadsService';
import { BookMarkApi, BookMarkService } from '../../service/Orders/BookMarkService';
import { BookMarkDeleteService } from '../../service/Orders/BookMarkService';
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingIndicator from '../../Components/LoadingIndicator';
import useBackButtonHandler from '../../Components/BackHandlerUtils';
import Icons  from 'react-native-vector-icons/MaterialIcons';

const OrderScreen = ({ navigation }) => {
    const [ordersLists, setOrdersList] = useState([])
    const [searchText, setSearchText] = useState([0]);
    const [value, setValue] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [bookmarkedItems, setBookmarkedItems] = useState([]);
    const [locationList, setLocationList] = useState([])
    const [bookMarkId, setBookmarkId] = useState('')
    const [isLoading,setisLoading]=useState(false)
    const[username, setUsername] = useState('') ;
    const [isOpen, setIsOpen] = useState(false);
    const [is_BookMarked,setis_BookMarked]=useState(false)
    const { t } = useTranslation();
    useBackButtonHandler(navigation, false);

    let orderData = locationList.map((dataPoint) => ({
        value: dataPoint.district_name,
        label: dataPoint.district_name,
    }));
    const modalItem = ({ item }) => {
        setName(item.name)
        setQuantity(item.requestId)
    }
    useEffect(() => {
        ordersList()
        locationHistory()
    }, []);
    useEffect(() => {
        ordersList()
    }, [value, searchText,is_BookMarked])
    const ordersList = () => {
        if(searchText.length=='')
        {
            setisLoading(true)
        }
        OrderService(value, searchText).then((res) => {
            // if(res.status === 200){
            //     console.log('success',)
            //     setOrdersList(res.data.results)
            // }
            // console.log('Received data:', res.data.results);
            setOrdersList(res.data.results)
            setisLoading(false)
        })
    }
    const locationHistory = () => {
        LocationService().then((res) => {

            if (res.status === 200) {
                //   console.log('success',)
                setLocationList(res.data.results)
                if (res.data.results.length > 0) {
                    setValue(res.data.results[0].district_name);
                }

            }
        })
    }
    useEffect(() => {
        const getValueFromStorage = async () => {
          try {
            const value = await AsyncStorage.getItem('role'); 
            // console.log('role2344355', username)
            if (value !== null) {
              setUsername(value);
            }
          } catch (error) {
            console.error('Error fetching data from AsyncStorage:', error);
          }
        };
        getValueFromStorage();
      }, []);
    const HEADER_HEIGHT = 200;
    const scrollY = new Animated.Value(0);
    function chooseHandler(item) {
        navigation.navigate('DistributorExpand', { selectedItem: item })
    }
    // function bookmarkHandler(itemId, userId) {
    //    // console.log("itemId", itemId, userId)
    //     if (bookmarkedItems.includes(itemId)) {
    //         setBookmarkedItems(bookmarkedItems.filter(id => id !== itemId));
    //         BookMarkDeleteService(bookMarkId).then((res) => {
    //             // if(res.status === 200){
    //             //     console.log('success',)
    //             //     setOrdersList(res.data.results)
    //             // }
    //             // console.log('Book Mark Delete Response:', res);
    //             // setOrdersList(res.data.results)
    //         })
    //     } else {
    //         setBookmarkedItems([...bookmarkedItems, itemId]);
    //         BookMarkService(itemId).then((res) => {
    //             // if(res.status === 200){
    //             //     console.log('success',)
    //             //     setOrdersList(res.data.results)
    //             // }
    //             // console.log('Received data Book Mark:', res);
    //             setBookmarkId(res.id)
    //             // setOrdersList(res.data.results)
    //         })
    //     }
    // }
    function bookmarkHandler(item) {
        //console.log("itemId", bookMarkId,itemId,bookmark)

        if (item.is_bookmarked.is_bookmarked) {
            console.log("delete")
            setBookmarkedItems(bookmarkedItems.filter(id => id !== item.id));
            updateItemIsBookmarked(item.id, false)

            const id = bookMarkId || item.id;
            console.log('bookmarId====', id)
            BookMarkApi.deleteBookMark(id).then((res) => {
                if(res.status === 200){
                    console.log('success',)
                    setOrdersList(res.data.results)
                }
                // console.log('Book Mark Delete Response:', res);
                // setOrdersList(res.data.results)
            })

        } else {
            console.log('add')
            setBookmarkedItems([...bookmarkedItems, item.id]);
            updateItemIsBookmarked(item.id, true)
            //console.log(itemId,bookMarkId)
            const data ={
                distributor: item.id,
            }
            console.log('data====', data)
            BookMarkApi.addBookMark(data).then((res) => {
                if(res.status === 200){
                    console.log('success',)
                    setOrdersList(res.data.results)
                }
                //console.log('Received data Book Mark:', res);
                setBookmarkId(res.id)
                // setOrdersList(res.data.results)
            })
        }
    }
    
    // function bookmarkHandler(item) {
    //     // Check if the item is already bookmarked
    //     console.log('item====', item)
    //     if (item.is_bookmarked.is_bookmarked ) {
    //         console.log('delete')
    //       // Item is already bookmarked, so delete it
    //     //   BookMarkApi.deleteBookMark(item.is_bookmarked.bookmark_id).then((res) => {
    //     //     if (res.status === 200) {
    //     //       // Bookmark deleted successfully
    //     //       console.log('Bookmark deleted:', res);
    //     //       updateItemIsBookmarked(item.id, false);
    //     //     } else {
    //     //       console.error('Failed to delete bookmark:', res);
    //     //     }
    //     //   });
    //     } else {
    //         console.log('add')
    //       // Item is not bookmarked, so add it
    //       const data = {
    //         distributor: item.id,
    //       };
    //       console.log('data', data)
    //       BookMarkApi.addBookMark(data).then((res) => {
    //         if (res.status === 200) {
    //           // Bookmark added successfully
    //           console.log('Bookmark added:', res);
    //           updateItemIsBookmarked(item.id, true);
    //         } else {
    //           console.error('Failed to add bookmark:', res);
    //         }
    //       });
    //     }
    //   }
const updateItemIsBookmarked = (itemId, isBookmarked) => {
        // Create a copy of the ordersList array
        const updatedOrdersList = [...ordersLists];
        // Find the index of the item in the array
        const itemIndex = updatedOrdersList.findIndex(item => item.id === itemId);
        // If the item is found, update its is_bookmarked property
        if (itemIndex !== -1) {
            updatedOrdersList[itemIndex].is_bookmarked = isBookmarked;
            // Set the updated ordersList
            setOrdersList(updatedOrdersList);
        }
    };
    const requestData = ({ item }) => {
        //console.log('item===',item)
        //const isBookmarked = bookmarkedItems.includes(item.id);
       // const isBookmarked = item?.is_bookmarked?.is_bookmarked;
        if(item?.is_bookmarked?.is_bookmarked==true)
        {
            setBookmarkId(item?.is_bookmarked?.bookmark_id)
        }
        const isBookmarked = bookmarkedItems.includes(item.id)||item.is_bookmarked ;
        //console.log('type====', isBookmarked?.is_bookmarked)
        setis_BookMarked(isBookmarked)
        const firstTwoChars = item.name ? item.name.slice(0, 2) : '';
        return (
            item === 'noData' ? (
                <View style={{flex:1,alignSelf:'center',marginTop:100}}>
                     <Image
                style={styles.tinyLogo}
                source={require('../../../assets/Images/orderEmpty.png')}
                resizeMode='cover'
            />
            <Text style={{fontFamily:'Poppins-Large',fontWeight:'500',fontSize:16,textAlign:'center',
            margin:22,lineHeight:24,color:'#393939'}}>No Results Found</Text>
            <Text  style={{fontFamily:'Poppins-Regular',fontWeight:'500',fontSize:16,textAlign:'center',
              lineHeight:20,color:'#848484'}}>Please try again with a different keyword.</Text>
                </View>

            ) : (
                <View style={[styles.card, styles.shadowProp]}>
                    <View style={{ borderRadius: 8, backgroundColor: 'rgba(182, 182, 182, 1)', justifyContent: 'center', alignItems: 'center', height: 95, width: '25%', marginLeft: 10, marginRight: 10 }}>
                        <Text style={{ textAlign: 'center', color: 'rgba(57, 57, 57, 1)', fontSize: 27, fontFamily: 'Poppins-Medium', }}>{firstTwoChars.toUpperCase()}</Text>
                    </View>

                    <View style={{ width: '67%', height: 100}}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 13, color: 'rgba(177, 41, 44, 1)',marginTop:0 }}> {item.user_id}</Text>
                            <Pressable style={{marginLeft:'auto'}} onPress={() => bookmarkHandler(item)}>
                                {!isBookmarked || !item?.is_bookmarked?.is_bookmarked ?
                                    (<BookmarkIcon height={16} width={16} color='#393939' />) :
                                    <BookMarkActiveIcon height={16} width={16} color='rgba(127, 176, 105, 1)' />
                                }
                            </Pressable>

                        </View>
                        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 16, marginBottom: 8, color: 'rgba(57, 57, 57, 1)' }}> {item.name}</Text>
                        <Pressable style={styles.buttonReject} onPress={() => chooseHandler(item)}>
                            <Text style={styles.buttonText}>{t('choose')}</Text>
                        </Pressable>
                    </View>
                </View>)
        )
    };
    const closeModal = () => {
        setModalVisible(false);
    };
    const handleRefer = (params) => {

        navigation.navigate('ConfirmDetail', {
            referParams: params,
        });
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>

            <FlatList
                data={ordersLists.length === 0 ? ['noData'] : ordersLists}
                renderItem={requestData}
                keyExtractor={(item) => item.user_id}
                ListHeaderComponent={
                    <View>
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                data={orderData}
                                search
                                maxHeight={200}
                                labelField="label"
                                valueField="value"
                                iconColor='white'
                                placeholder="Select item"
                                searchPlaceholder="Search..."
                                value={value}
                                onChange={item => {
                                    setValue(item.value);
                                    setIsOpen(false);
                                }}
                                itemTextStyle = {{color:'black',fontSize:12,fontFamily:'Poppins-Regular'}}
                                containerStyle={styles.dropdownContainer}
                                renderRightIcon={() => (
                                    <Icons name={isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={27} color="rgba(57, 57, 57, 0.9)" style={{marginRight:77,bottom:2}}/>
                                )}
                                onFocus={() => setIsOpen(true)}
                                onBlur={() => setIsOpen(false)} 
                            />
                            {username!='Contractor' ?
                            <View style={{marginLeft:'auto', right:20, width:'30%'}}>
                            <Pressable style={{ backgroundColor: 'rgba(43, 89, 195, 1)', height: 37, width: '100%', borderRadius: 4, justifyContent:'center',alignItems:'center'}}
                                onPress={() => setModalVisible(true)}>
                                <Text style={{ color: 'white', fontSize: 12, fontFamily: 'Poppins-Regular', padding:7 }}>Refer Leads</Text>
                            </Pressable>
                            </View>:''}
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
                )} />
            <ReferLead isVisible={modalVisible} onClose={closeModal} onRefer={(params) => handleRefer(params)} />
            {isLoading && <LoadingIndicator visible={isLoading} text=''/>}
        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
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
        width: '90%',
        alignSelf: 'center',
        marginTop: 5,
        marginBottom: 20
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
        alignItems: 'flex-start',
        width:'90%',
    },
    inputContainer: {
        height: 45,
        width: '90%',
        color: '#848484',
        borderColor: 'black',
        borderWidth: 0.5,
        borderRadius: 5,
        alignSelf: 'center',
        marginTop: 15,
        paddingLeft: 15,
        fontFamily: 'Poppins-Regular',
    },
    card: {
        backgroundColor: '#ffffff',
        height: 130,
        width: '90%',
        borderRadius: 5,
        borderRadius: 10,
        flexDirection: 'row',
        marginBottom: 17,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'flex-start',
    },
    centeredView: {
        marginTop: 22,
        width: '100%',
        backgroundColor: 'white',
        height: 650,
        borderTopRightRadius: 9,
        borderTopLeftRadius: 9
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
        alignItems: 'center',
        borderRadius: 10,
        flexDirection: 'row',
        marginTop: 18,
        alignSelf: 'center'
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
        width: 230,
        height: 190,
        borderRadius: 8,
        marginLeft: 10,
        marginHorizontal: 20,
        alignSelf:'center'
    },
    dropdown: {
        // margin: 10,
        height: 40,
        width: '65%'
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
        marginLeft: 20,
        color: 'rgba(57, 57, 57, 1)',
        fontFamily: 'Poppins-Regular'
    },
    iconStyle: {
        width: 25,
        height: 25,
        marginRight: 29,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 13,
        color:"#000000"
    },
    dropdownContainer: {
        marginLeft: 15,
    },
    modalButtonContainer: {
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center'
    },
    noDataText: {
        color: '',
        alignSelf: 'center',
        color: "rgba(177, 41, 44, 1)"
    }
})
export default OrderScreen