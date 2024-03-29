import { View, Text, Pressable, Animated, TextInput, StyleSheet, FlatList, Image, RefreshControl } from 'react-native'
import DownArrowIcon from '../../../assets/Icon/DownArrowIcon';
import Icon from 'react-native-vector-icons/Feather';
import React, { useCallback, useEffect, useState } from 'react';
import BookmarkIcon from '../../../assets/Icon/BookmarkIcon';
import { Dropdown } from 'react-native-element-dropdown';
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
import Icons from 'react-native-vector-icons/MaterialIcons';
import SearchIcon from '../../../assets/Icon/SearchIcon';
import { useAppContext } from '../../context/AppContext';
import { useFocusEffect } from '@react-navigation/native';
import { OrderApi } from '../../service/order/orderservice';

const OrderScreen = ({ navigation }) => {
    const [ordersLists, setOrdersList] = useState([])
    const [searchText, setSearchText] = useState('');
    const [value, setValue] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [bookmarkedItems, setBookmarkedItems] = useState([]);
    const [locationList, setLocationList] = useState([])
    const [bookMarkId, setBookmarkId] = useState('')
    const [isLoading, setisLoading] = useState(false)
    const [username, setUsername] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [is_BookMarked, setis_BookMarked] = useState(false)
    const [disable, setDisable] = useState(false)
    const [isEndReachedLoading, setIsEndReachedLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [page, setPage] =useState(1);
    const [nextUrl, setNextUrl] = useState(null);
    const [width, setWidth] = useState(null);
    const { t } = useTranslation();
     console.log("searchText",searchText, value)
    const {
        isBookmarkDeleted,
      } = useAppContext(); 
    useBackButtonHandler(navigation, false);
    let orderData = locationList.map((dataPoint) => ({
        value: dataPoint.district,
        label: dataPoint.district,
    }));
    const modalItem = ({ item }) => {
        setName(item.name)
        setQuantity(item.requestId)
    }
    const onLayout = (event) => {
        alert('test')
        const { width } = event.nativeEvent.layout;
        setWidth(width);
        console.log('width', width)
      };
    useEffect(() => {
        locationHistory()
        ordersList()
        setSearchText('')
    }, []);
    useFocusEffect(
        useCallback(() => {
            setSearchText('')
        }, [])
    );
    useEffect(() => {
        ordersList()
    }, [value, searchText])

    useEffect(() => {
        ordersList()
    }, [is_BookMarked,isBookmarkDeleted])

    const locationHistory = useCallback(() => {
        LocationService().then((res) => {

            if (res.status === 200) {
                console.log('success=====',res.data)
                setLocationList(res.data.results)
                if (res.data.results.length > 0) {
                    setValue(res.data.results[0].district);
                }

            }
        })
    }
    )
    const onRefresh = () => {
        // if (isEndReachedLoading || !nextUrl) {
        //     setPage(1)
        //     return;
        // }
        //setPage(page + 1)
        setRefreshing(true);
        setLocationList([]);
        locationHistory();
        setOrdersList([])
        ordersList()
        setSearchText('')
        setRefreshing(false);
    };
    function searchTextHandler(text){
       if(text !== '' && text.length >= 3){
           OrderApi.getLocation(text).then((res) => {
               console.log('location', res.data)
               if(res.status === 200){
                   setLocationList(res.data.results);
                   orderData = locationList.map((dataPoint) => ({
                       value: dataPoint.district,
                       label: dataPoint.district,
                   }));
                   console.log('list======', orderData, value)
               }
           }).catch((err) => {
               console.error(err)
           })
       }
    }
    
    const ordersList = () => {
        if(searchText!='')
        {
            setisLoading(false)
          
        }
        OrderService(value, searchText,page).then((res) => {
            if(res.status === 200){
            //     console.log('success',)
            //     setOrdersList(res.data.results)
            // }
            const newData = res.data.results;
            console.log('Received data:', res.data.results);
            if (page === 1) {
                if (value != null) {
                    setOrdersList(newData);
                    setisLoading(false)
                }
                else{
                    setisLoading(false)
                }
               
              } else {
                setOrdersList((prevData) => {
                  const newData = new Set([...prevData, ...res.data.results]);
                  return Array.from(newData);
                });
              }
              setisLoading(false);
              setNextUrl(res.data.next);
              setIsEndReachedLoading(false);
            }else {
                setisLoading(false);
                setIsEndReachedLoading(false);
              }
             
             }).catch(function (error) {
            console.log("order screen erorr",error);
            setIsEndReachedLoading(false);
            setisLoading(false);
          });
    }
    async function endReachedHandler() {
        console.log('end', isEndReachedLoading)
        if (isEndReachedLoading || !nextUrl) {
          setPage(1)
          return;
       }
        setPage(page + 1);
        setIsEndReachedLoading(true);
        if(selectedFilter?.title === 'All Transactions'){
          getHistoryList();
        }
        else getHistoryStatusList(selectedFilter?.value)
      }
    useFocusEffect(
        useCallback(() => {
          const getValueFromStorage = async () => {
            try {
              const value = await AsyncStorage.getItem('role');
              if (value !== null) {
                setUsername(value);
              }
            } catch (error) {
              console.error('Error fetching data from AsyncStorage:', error);
            }
          };
      
          getValueFromStorage();
      
          return () => {
            // Clean up logic if needed
          };
        }, [])
      );
    const HEADER_HEIGHT = 200;
    const scrollY = new Animated.Value(0);
    function chooseHandler(item) {
        console.log('itemchoose====', item);
        navigation.navigate('DistributorExpand', { selectedItem: item, page : 'Orders' })
    }
    function bookmarkHandler(item) {           
        if (item.is_bookmarked.is_bookmarked) {
            console.log("delete")
            const id = item.is_bookmarked.bookmark_id ;
            // console.log('bookmarId====', id)
            setis_BookMarked(true)
            BookMarkApi.deleteBookMark(id).then((res) => {
                if (res.status === 200) {

                    console.log('success')
                    setOrdersList(res.data.results)
                   
                }
                setis_BookMarked(false)
                // console.log('Book Mark Delete Response:', res);
                // setOrdersList(res.data.results)
            })

        } else {
            // console.log('add')
            setis_BookMarked(true)
            setDisable(true)
            setBookmarkedItems([...bookmarkedItems, item.id]);
            updateItemIsBookmarked(item.id, true)
            //console.log(itemId,bookMarkId)
            const data = {
                distributor: item.id,
            }
            // console.log('data====', data)
            BookMarkApi.addBookMark(data).then((res) => {
                if (res.status === 200) {
                    // console.log('success',)
                    setOrdersList(res.data.results)
                   
                }
                setis_BookMarked(false)
                setDisable(false)
                //console.log('Received data Book Mark:', res);
                setBookmarkId(res.id)
                // setOrdersList(res.data.results)
            })
        }
    }
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
    const bookmarker=(item)=>{
        const isBookmarkedTrue = item?.is_bookmarked?.is_bookmarked;
        //  console.log('isBookmarkedTrue',isBookmarkedTrue)
        if (item?.is_bookmarked?.is_bookmarked == true) {
            setBookmarkId(isBookmarkedTrue)
        }
    }
    const requestData = ({ item }) => {
        // console.log('item===',item)
        //const isBookmarked = bookmarkedItems.includes(item.id);
      
        const isBookmarked = bookmarkedItems.includes(item.id) || item.is_bookmarked;
        //console.log('type====', isBookmarked?.is_bookmarked)
        // setis_BookMarked(item.is_bookmarked)
        const firstTwoChars = item.name ? item.name.slice(0, 2) : '';
        return (
            item === 'noData' || value === null ? (
                <View style={{ flex: 1, alignSelf: 'center', marginTop: 100 }}>
                    <Image
                        style={styles.tinyLogo}
                        source={require('../../../assets/Images/orderEmpty.png')}
                        resizeMode='cover'
                    />
                    <Text style={{
                        fontFamily: 'Poppins-Large', fontWeight: '500', fontSize: 16, textAlign: 'center',
                        margin: 22, color: '#393939'
                    }}>{t('Results')}</Text>
                    <Text style={{
                        fontFamily: 'Poppins-Regular', fontWeight: '500', fontSize: 14, textAlign: 'center', color: '#848484'
                    }}>{t('DiffKeyword')}</Text>
                </View>

            ) : (
                <View style={[styles.card, styles.shadowProp]}>
                    <View style={{ borderRadius: 8, backgroundColor: 'rgba(182, 182, 182, 1)', justifyContent: 'center', alignItems: 'center', height: 95, width: '25%', marginLeft: 10, marginRight: 10 }}>
                        <Text style={{ textAlign: 'center', color: 'rgba(57, 57, 57, 1)', fontSize: 27, fontFamily: 'Poppins-Medium', }}>{firstTwoChars.toUpperCase()}</Text>
                    </View>

                    <View style={{ width: '67%', height: 100 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 13, color: 'rgba(177, 41, 44, 1)', marginTop: 0 }}> {item.user_id}</Text>
                            <Pressable disabled={disable} style={{ marginLeft: 'auto',marginRight:16 }} onPress={() => bookmarkHandler(item)}>
                                { !item?.is_bookmarked?.is_bookmarked ?
                                    (<BookmarkIcon height={20} width={20} color='#393939' />) :
                                    <BookMarkActiveIcon height={20} width={20} color='rgba(127, 176, 105, 1)' />
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
    const closeModal = (params) => {
        console.log("params close",params)
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
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                ListHeaderComponent={
                    <View>
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Dropdown
                                key={value}
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={[styles.selectedTextStyle,{width:width}]}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                data={orderData}
                                search
                                maxHeight={200}
                                labelField="label"
                                valueField="value"
                                iconColor='white'
                                placeholder={t('Select Location')}
                                searchPlaceholder={t('search')}
                                value={value}
                                onChange={item => {
                                    console.log('item=====',item)
                                    setValue(item.value);
                                    setIsOpen(false);
                                }}
                                onChangeText={(text) => searchTextHandler(text)}
                                itemTextStyle={{ color: 'black', fontSize: 12, fontFamily: 'Poppins-Regular' }}
                                containerStyle={styles.dropdownContainer}
                                renderRightIcon={() => (
                                    <Icons name={isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={27} color="rgba(57, 57, 57, 0.9)" style={{ bottom: 2 }} />
                                )}
                                onFocus={() => setIsOpen(true)}
                                onBlur={() => setIsOpen(false)}
                                onLayout={onLayout}
                            />
                            {username != 'Contractor' ?
                                <View style={{ marginLeft: 'auto', right: 20, width: '30%' }}>
                                    <Pressable style={{ backgroundColor: 'rgba(43, 89, 195, 1)', height: 37, width: '100%', borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}
                                        onPress={() => setModalVisible(true)}>
                                        <Text style={{ color: 'white', fontSize: 12, fontFamily: 'Poppins-Regular', padding: 7 }}>{t("refer")}</Text>
                                    </Pressable>
                                </View> : ''}
                        </View>
                        <View style={styles.container}>
                            <TextInput
                                style={styles.input}
                                placeholder={t("search")}
                                placeholderTextColor={'rgba(132, 132, 132, 1)'}
                                onChangeText={text => setSearchText(text)}
                                value={searchText}
                            />
                            {searchText === '' ?
                                <SearchIcon /> :
                                <Pressable onPress={() => setSearchText('')}>
                                    <Icon name="x" size={24} color="#393939" backgroundColor='#ffffff' />
                                </Pressable>
                            }
                            {/* {/ <Icon name="search" size={23} color="rgba(57, 57, 57, 1)" /> /} */}

                        </View>
                    </View>
                }
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )} 
                onEndReached={endReachedHandler}/>
            <ReferLead isVisible={modalVisible} onClose={(params)=>closeModal(params)} onRefer={(params) => handleRefer(params)} />
            {isLoading && <LoadingIndicator visible={isLoading} text='Loading...' />}
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
        width: '90%',
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
        backgroundColor: '#ffffff',
        height: 130,
        width: '100%',
        borderRadius: 5,
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontFamily: 'Poppins-Regular',
        color: '#FFFFFF',
    },
    tinyLogo: {
        width: 180,
        height: 150,
        borderRadius: 8,
        marginLeft: 10,
        marginHorizontal: 20,
        alignSelf: 'center'
    },
    dropdown: {
        // margin: 10,
        height: 40,
        width: '47%',
    },
    placeholderStyle: {
        fontSize: 13,
        marginLeft: 20,
        fontFamily: 'Poppins-Regular'
    },
    selectedTextStyle: {
        fontSize: 13,
        marginLeft: 20,
        color: 'rgba(57, 57, 57, 1)',
        fontFamily: 'Poppins-Regular',
        width:'auto'
    },
    iconStyle: {
        width: 25,
        height: 25,
        marginRight: 29,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 13,
        color: "#000000"
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