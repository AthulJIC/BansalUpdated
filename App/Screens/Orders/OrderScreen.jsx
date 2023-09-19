import { View, Text, Pressable, Animated, TextInput, TouchableOpacity, StyleSheet, FlatList, Image, ScrollView } from 'react-native'
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
import { BookMarkService } from '../../service/Orders/BookMarkService';
import { BookMarkDeleteService } from '../../service/Orders/BookMarkService';

const OrderScreen = ({ navigation }) => {
    const [ordersLists, setOrdersList] = useState([])
    const [searchText, setSearchText] = useState([0]);
    const [value, setValue] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [bookmarkedItems, setBookmarkedItems] = useState([]);
    const [locationList, setLocationList] = useState([])
    const [bookMarkId, setBookmarkId] = useState('')
    const { t } = useTranslation();

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
    }, [value, searchText])
    const ordersList = () => {
        OrderService(value, searchText).then((res) => {
            // if(res.status === 200){
            //     console.log('success',)
            //     setOrdersList(res.data.results)
            // }
            // console.log('Received data:', res.data.results);
            setOrdersList(res.data.results)
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
    const HEADER_HEIGHT = 200;
    const scrollY = new Animated.Value(0);
    function chooseHandler(item) {
        navigation.navigate('DistributorExpand', { selectedItem: item })
    }
    function bookmarkHandler(itemId, userId) {
        console.log("itemId", itemId, userId)
        if (bookmarkedItems.includes(itemId)) {
            setBookmarkedItems(bookmarkedItems.filter(id => id !== itemId));
            BookMarkDeleteService(bookMarkId).then((res) => {
                // if(res.status === 200){
                //     console.log('success',)
                //     setOrdersList(res.data.results)
                // }
                console.log('Book Mark Delete Response:', res);
                // setOrdersList(res.data.results)
            })

        } else {
            setBookmarkedItems([...bookmarkedItems, itemId]);
            BookMarkService(itemId).then((res) => {
                // if(res.status === 200){
                //     console.log('success',)
                //     setOrdersList(res.data.results)
                // }
                console.log('Received data Book Mark:', res);
                setBookmarkId(res.id)
                // setOrdersList(res.data.results)
            })
        }
    }

    const requestData = ({ item }) => {

        const isBookmarked = bookmarkedItems.includes(item.id);
        const firstTwoChars = item.name ? item.name.slice(0, 2) : '';
        return (
            item === 'noData' ? (
                <Text style={styles.noDataText}>No data available</Text>
            ) : (
                <View style={[styles.card, styles.shadowProp]}>
                    <View onPress={() => {
                        setModalVisible(!modalVisible);
                        modalItem(itemData.item)
                    }} style={{ borderRadius: 8, backgroundColor: 'rgba(182, 182, 182, 1)', justifyContent: 'center', alignItems: 'center', height: 95, width: '25%', marginLeft: 10, marginRight: 10 }}>
                        <Text style={{ textAlign: 'center', color: 'rgba(57, 57, 57, 1)', fontSize: 27, fontFamily: 'Poppins-Medium', }}>{firstTwoChars.toUpperCase()}</Text>
                    </View>

                    <View style={{ width: '60%', height: 88 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 13, color: 'rgba(177, 41, 44, 1)' }}> {item.user_id}</Text>
                            <Pressable onPress={() => bookmarkHandler(item.id)}>
                                {!isBookmarked ?
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
                keyExtractor={(item) => item.id}
                ListHeaderComponent={
                    <View>
                        <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'space-between' }}>
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
                                iconColor='rgba(57, 57, 57, 1)'
                                placeholder="Select item"
                                searchPlaceholder="Search..."
                                value={value}
                                onChange={item => {
                                    setValue(item.value);
                                }}
                                containerStyle={styles.dropdownContainer}
                            />
                            <Pressable style={{ backgroundColor: 'rgba(43, 89, 195, 1)', height: 37, width: '30%', borderRadius: 5, alignItems: 'center', justifyContent: 'center', marginRight: 15, marginTop: 7 }}
                                onPress={() => setModalVisible(true)}>
                                <Text style={{ color: 'white', fontSize: 13, fontFamily: 'Poppins-Regular' }}>Refer Leads</Text>
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
                )} />
            <ReferLead isVisible={modalVisible} onClose={closeModal} onRefer={(params) => handleRefer(params)} />

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
        alignItems: 'flex-start'
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
        height: 115,
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
        width: 90,
        height: 100,
        borderRadius: 8,
        marginLeft: 10,
        marginHorizontal: 20
    },
    dropdown: {
        // margin: 10,
        height: 50,
        width: '50%'
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
        fontSize: 16,
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