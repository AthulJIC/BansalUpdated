import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Image, FlatList, Pressable, Animated, Alert, ActivityIndicator,KeyboardAvoidingView } from 'react-native'
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Feather';
import CustomAlert from '../../Components/alertBox';
import { RequestApi } from '../../service/request/requestservice';
import EmptyComponent from '../../Components/EmptyComponent';
import { useTranslation } from 'react-i18next';

const data = [
    { img: '', name: 'John', designation: 'Contractor', quantity: 10 },
    { img: '', name: 'Alice', designation: 'Engineer', quantity: 5 },
    { img: '', name: 'Bob', designation: 'Contractor', quantity: 8 },
    { img: '', name: 'Eva', designation: 'Engineer', quantity: 3 },
    { img: '', name: 'Michael', designation: 'Contractor', quantity: 12 },
    { img: '', name: 'Sophia', designation: 'Engineer', quantity: 6 },
    { img: '', name: 'David', designation: 'Contractor', quantity: 7 },
    { img: '', name: 'Olivia', designation: 'Engineer', quantity: 2 },
    { img: '', name: 'William', designation: 'Contractor', quantity: 9 },
    { img: '', name: 'Emma', designation: 'Engineer', quantity: 4 },
    { img: '', name: 'Liam', designation: 'Contractor', quantity: 11 },
    { img: '', name: 'Ava', designation: 'Engineer', quantity: 7 },
    { img: '', name: 'Noah', designation: 'Contractor', quantity: 6 },
    { img: '', name: 'Isabella', designation: 'Engineer', quantity: 3 },
    { img: '', name: 'James', designation: 'Contractor', quantity: 8 },
    { img: '', name: 'Mia', designation: 'Engineer', quantity: 5 },
    { img: '', name: 'Benjamin', designation: 'Contractor', quantity: 14 },
    { img: '', name: 'Luna', designation: 'Engineer', quantity: 1 },
    { img: '', name: 'Lucas', designation: 'Contractor', quantity: 13 },
    { img: '', name: 'Harper', designation: 'Engineer', quantity: 2 },
];
const Requests = () => {
    const [searchText, setSearchText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('')
    const [designation, setDesignation] = useState('')
    const [quantity, setQuantity] = useState('')
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertAcceptVisible,setAlertAcceptVisible] =useState(false)
    const [requestList, setRequestList] = useState([]);
    const [requestId, setRequestId] = useState('');
    const [distributorItem, setDistributorItem] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const { t } = useTranslation();

    const searchPlaceholder = t('search');
    const showAlert = (item) => {

        setRequestId(item)
        setAlertVisible(true);
    };
    const showAcceptAlert=()=>{
        setAlertAcceptVisible(true)
    }
    const hideAlert = () => {
        setAlertVisible(false);
        setAlertAcceptVisible(false)
    };
    useEffect(() => {
       getRequestList();
       setTimeout(() => {
        setIsLoading(false);
    }, 2000);
    }, []);
    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'white' }}>
                <ActivityIndicator size="large" color="rgba(177, 41, 44, 1)" />
            </View>
        );
    }
    function getRequestList(){
        RequestApi.getRequest().then((res) => {
            // console.log('resss', res.data);
            if(res.status === 200){
                setRequestList(res.data.results)
            }
        })
    }
    const handleAccept = () => {
        // Handle accept button press
        hideAlert();
        // Additional logic as needed
    };

    const handleReject = (status) => {
        // console.log('requestId',requestId)
        // console.log('status', status)
        if(status === 'Reject'){
            RequestApi.rejectRequest(requestId).then((res) => {
                // console.log('resss', res.data)
                if(res.status === 200){
                    hideAlert();
                    getRequestList();
                }
            })
        }
        else{
            RequestApi.acceptRequest(requestId).then((res) => {
                // console.log('resss', res.data)
                if(res.status === 200){
                    hideAlert();
                    getRequestList();
                }
            })
        }
        // Handle reject button press
       // hideAlert();
        // Additional logic as needed
    };
    const modalItem = ( item ) => {
        // console.log('distributor----', item)
        setDistributorItem(item)
        // setName(item.name)
        // setDesignation(item.designation)
        // setQuantity(item.quantity)
    }
    function searchHandler(text){
        setSearchText(text)
        RequestApi.searchRequest(text).then((res) => {
            // console.log('resss--',res.data)
            if(res.status === 200){
                setRequestList(res.data.results)
            }
        })
    }
    // console.log('distributor', distributorItem.name)
    const HEADER_HEIGHT = 200; // Define the height of your header
    const scrollY = new Animated.Value(0);
    const requestData = ( itemData ) => {
        return(
            <View style={[styles.card, styles.shadowProp]}>
                <Pressable onPress={() => {
                    setModalVisible(!modalVisible);
                    modalItem( itemData.item )
                }} style={{ borderRadius: 8 , backgroundColor:'rgba(182, 182, 182, 1)',justifyContent:'center', alignItems:'center',height:85, width:'25%'}}>

                    {/* <Image
                        style={styles.tinyLogo}
                        source={require('../../../assets/Images/Man.jpg')}
                        resizeMode='cover'

                    /> */}
                    <Text style={{textAlign:'center',color:'rgba(57, 57, 57, 1)',fontSize:27,fontFamily:'Poppins-Medium',}}>{itemData.item.name.slice(0, 2).toUpperCase()}</Text>
                </Pressable>

                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ marginLeft: 14, fontFamily: 'Poppins-Medium', fontSize: 16, color: 'rgba(57, 57, 57, 1)' }}> {itemData.item.name}</Text>
                    <View style={styles.subContainer}>
                        <Text style={{
                            fontFamily: 'Poppins-Medium', fontWeight: '200', fontSize: 13.33, color: '#B1292C', marginHorizontal: 5
                        }}>{itemData.item.quantity}</Text>
                        <Text style={{ fontWeight: '500', fontSize: 6, color: 'rgba(57, 57, 57, 1)', marginTop: 5 }}>{'\u2B24'}</Text>
                        <Text style={{
                            fontFamily: 'Poppins-Medium', fontWeight: '500', fontSize: 13, color: '#393939', marginLeft: 5, marginBottom: 4
                        }}>{itemData.item.role}</Text>

                    </View>
                    <View style={styles.buttonsContainer}>
                        <Pressable onPress={()=>showAlert(itemData.item.id)} style={styles.buttonReject}>
                            <Text style={styles.buttonText}>{t("reject")}</Text>
                        </Pressable>
                        <Pressable onPress={showAcceptAlert} style={styles.buttonAccept}>
                            <Text style={styles.buttonText}>{t("accept")}</Text>
                        </Pressable>
                    </View>
                </View>
                {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                </View> */}
            </View>
        )
    };
    return (
        <KeyboardAvoidingView style={styles.mainContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Animated.View
                style={[{
                    height: HEADER_HEIGHT,
                    marginTop: scrollY.interpolate({
                        inputRange: [0, HEADER_HEIGHT],
                        outputRange: [0, -HEADER_HEIGHT],
                        extrapolate: 'clamp',
                    }),
                }, styles.container]}
            >
                <TextInput
                    style={styles.input}
                    placeholder={searchPlaceholder}
                    placeholderTextColor={'rgba(132, 132, 132, 1)'}
                    onChangeText={text => searchHandler(text)}
                    value={searchText}
                />
                <TouchableOpacity onPress={searchHandler}>
                    <Icon name="search" size={23} color="rgba(57, 57, 57, 1)" />
                </TouchableOpacity>
            </Animated.View>
            { requestList.length !== 0 ? (

                <FlatList
                    data={requestList}
                    renderItem={requestData}
                    keyExtractor={(item) => item.id.toString()}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: false }
                    )}
                   // keyboardShouldPersistTaps="handled" 
                />
            ): <EmptyComponent/>}

            {/* Modal */}
            <Modal
                animationIn="slideInUp"
                animationOut="slideOutDown"
                isVisible={modalVisible}
                hasBackdrop={true}
                backdropColor="black"
                backdropOpacity={0.70}
                onBackdropPress={() => setModalVisible(!modalVisible)}
                width={'100%'}
                style={{ alignItems: 'center', justifyContent: 'flex-end', margin: 0 }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose, { alignItems: 'flex-end' }]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Icon name="x" size={24} color="#393939" backgroundColor='#ffffff' />

                        </TouchableOpacity>
                        <View style={[styles.Modalcard, styles.shadowProp]}>

                            <Image
                                style={styles.modalImage}
                                source={require('../../../assets/Images/ProductImage.png')}
                                resizeMode='cover'
                            />
                            {/* <View style={ {borderRadius: 8 , backgroundColor:'rgba(182, 182, 182, 1)',justifyContent:'center', alignItems:'center',height:85, width:'25%'}}>
                                <Text style={{textAlign:'center',color:'rgba(57, 57, 57, 1)',fontSize:27,fontFamily:'Poppins-Medium',}}>{distributorItem.name?.slice(0, 2).toUpperCase() || ''}</Text>
                            </View> */}

                            <View style={{ justifyContent: 'center', marginLeft: 15, height: 100, width: '35%' }}>
                                <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 17, color: 'rgba(57, 57, 57, 1)' }}> {distributorItem.name}</Text>
                                <Text style={{
                                    fontFamily: 'Poppins-Medium', fontSize: 12,
                                    color: '#393939', marginLeft: 5
                                }}>{distributorItem.role}</Text>
                                <Text style={{
                                    fontFamily: 'Poppins-Regular', fontSize: 13,
                                    color: '#848484', marginTop: 12, marginLeft: 5
                                }}>{t('quantity')}</Text>
                                <Text style={{
                                    fontFamily: 'Poppins-Medium', fontSize: 17,
                                    color: '#B1292C', marginLeft: 5
                                }}>{distributorItem.quantity}</Text>
                            </View>
                        </View>
                        <View style={[styles.ModalSecondCard, styles.shadowProp]}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: '#848484', fontFamily: 'Poppins-Regular' }}>{t('transaction')}</Text>
                                <Text style={{ color: '#393939', fontFamily: 'Poppins-Regular', fontSize: 13.33, fontWeight: '500', lineHeight: 20, textAlign: 'right' }}>{distributorItem.transaction_id}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                                <Text style={{ color: '#848484', fontFamily: 'Poppins-Regular' }}>{t('unique')}</Text>
                                <Text style={{ color: '#393939', fontFamily: 'Poppins-Regular', fontSize: 13.33, fontWeight: '500', lineHeight: 20, textAlign: 'right' }}>A1234455667</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                                <Text style={{ color: '#848484', fontFamily: 'Poppins-Regular' }}>{t('mobile')}</Text>
                                <Text style={{ color: '#393939', fontFamily: 'Poppins-Regular', fontSize: 13.33, fontWeight: '500', lineHeight: 20, textAlign: 'right' }}>{distributorItem.mobile}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                                <Text style={{ color: '#848484', fontFamily: 'Poppins-Regular' }}>{t('Location')}</Text>
                                <Text style={{ color: '#393939', fontFamily: 'Poppins-Regular', fontSize: 13.33, fontWeight: '500', lineHeight: 20, textAlign: 'right' }}>{distributorItem.location}</Text>
                            </View>
                        </View>
                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity onPress={() => handleReject('Reject')} style={{ marginBottom: 10, borderRadius: 5, width: '100%', backgroundColor: '#EB1C1C', alignItems: 'center', height: 48, radius: 4, padding: 12 }} >
                                <Text style={{ fontFamily: 'Poppins', fontWeight: '500', fontSize: 16, lineHeight: 24, color: '#ffffff', height: 24, fontFamily: 'Poppins-Regular' }}>
                                {t("reject")}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleReject('Accept')} style={{ width: '100%', backgroundColor: '#18B758', borderRadius: 6, alignItems: 'center', height: 48, radius: 4, padding: 12 }} >
                                <Text style={{ fontFamily: 'Poppins', fontWeight: '500', fontSize: 16, lineHeight: 24, color: '#ffffff', height: 24, fontFamily: 'Poppins-Regular' }}>
                                {t("accept")}
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
            {/* Reject alert Box */}
            <Modal
               animationIn="fadeIn" // Use slideInUp animation for the modal to slide up
               animationOut="fadeOut" // Use slideOutDown animation to close the modal
               backdropTransitionOutTiming={0} // Remove backdrop gradually when closing modal
               backdropOpacity={0.5} // Adjust the backdrop opacity
               useNativeDriverForBackdrop 
                isVisible={alertVisible}
            // ... other modal props ...
            >
                <View style={styles.alertModal}>
                    <Text style={styles.alertTitle}>{t('confirmationTitle')}</Text>
                    <Text style={styles.alertText}>{t('confirmation')}</Text>
                    <View style={styles.alertButtonsContainer}>
                        <TouchableOpacity style={styles.alertCancelButton} onPress={hideAlert}>
                            <Text style={styles.alertButtonText}>{t("cancel")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.alertRejectButton} onPress={() => handleReject('Reject')}>
                            <Text style={styles.alertButton}>{t("reject")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Accept Button */}
            <Modal
               animationIn="fadeIn" // Use slideInUp animation for the modal to slide up
               animationOut="fadeOut" // Use slideOutDown animation to close the modal
               backdropTransitionOutTiming={0} // Remove backdrop gradually when closing modal
               backdropOpacity={0.5} // Adjust the backdrop opacity
               useNativeDriverForBackdrop 
                isVisible={alertAcceptVisible}
            // ... other modal props ...
            >
                <View style={styles.alertModal}>
                    <Text style={styles.alertTitle}>Confirm your Action</Text>
                    <Text style={styles.alertText}>Are you sure you want to Accept this request?</Text>
                    <View style={styles.alertButtonsContainer}>
                        <TouchableOpacity style={styles.alertCancelButton} onPress={hideAlert}>
                            <Text style={styles.alertButtonText}>{t("cancel")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.alertRejectButton} onPress={() =>handleReject('Accept')}>
                            <Text style={styles.alertButton}>{t("accept")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </KeyboardAvoidingView>
    );
};
export default Requests
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
        // paddingVertical: 8,
        backgroundColor: '#f2f2f2',
        borderColor: '#ccc',
        borderRadius: 4,
        borderWidth: 1,
        height: 48,
        backgroundColor: '#ffffff',
        width:'90%',
        alignSelf:'center',
        marginTop:15,
        marginBottom:15,
        width: '90%',
        alignSelf: 'center',
        marginTop: 15,
        marginBottom: 20

    },
    subContainer: {
        flexDirection: 'row',
        marginLeft: 17,
        alignItems: 'flex-start',

    },
    input: {
        flex: 1,
        height: 40,
        marginRight: 8,
        color: '#848484',
        alignItems: 'flex-start'
    },
    card: {
        backgroundColor: '#ffffff',
        // padding: 10,
        height: 109,
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
    ModalSecondCard: {
        backgroundColor: '#ffffff', // Customize button style as needed
        padding: 10,
        height: 132,
        width: '100%',
        paddingRight: 12,
        paddingTop: 18,
        paddingBottom: 28,
        borderRadius: 5,
        borderRadius: 10,
        marginTop: 18,
        justifyContent: 'space-between',
        alignSelf: 'center'

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
        marginLeft: 5,
        textAlign:'center',
        color:'rgba(57, 57, 57, 1)',
        fontSize:33,
        fontFamily:'Poppins-Medium',
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
        backgroundColor: 'white',
        height: 630,
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
        marginLeft: 10,

    },
    modalButtonContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center'
    },
    alertModal: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 20,
        width: 300,
        alignSelf: 'center',
    },
    alertTitle: {
        fontFamily: 'Poppins-Medium',
        fontSize:16,
        marginBottom: 10,
        color: '#393939',
        fontWeight:'500',
        lineHeight:24
    },
    alertText: {
        fontFamily: 'Poppins-Regular',
        marginBottom: 12,
        color: '#848484',
        fontWeight:'400',
        fontSize:11.11,
        lineHeight:16,
    },
    alertButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    alertCancelButton: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 4,
        width:126,
        height:36,
        margin:12,
        alignItems:'center',
        borderColor:'#848484',
        borderWidth:1

    },
    alertRejectButton: {
        backgroundColor: '#B1292C',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 4,
        width:126,
        height:36,
        margin:12,
        alignItems:'center'
    },
    alertButtonText: {
        fontFamily: 'Poppins',
        fontWeight: '500',
        color: '#393939',
        width:48,
        height:20,
        fontSize:13.33
    },
    alertButton:{
        color:'#FFFFFF',
        fontFamily: 'Poppins',
        fontWeight: '500',
        width:48,
        height:20,
        fontSize:13.33
    }
    
})