import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Image, FlatList, Modal, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';


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
    const modalItem = ({ item }) => {
        setName(item.name)
        setDesignation(item.designation)
        setQuantity(item.quantity)
    }
    const requestData = ({ item }) => (
        <View style={[styles.card, styles.shadowProp]}>
            <TouchableOpacity onPress={() => { setModalVisible(true); modalItem({ item }) }} style={{ borderRadius: 8 }}>

                <Image
                    style={styles.tinyLogo}
                    source={require('../../Assets/Images/Man.jpg')}
                    resizeMode='cover'

                />
            </TouchableOpacity>

            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                <Text style={{ marginLeft: 14, width: 122, height: 24, fontFamily: 'Poppins', fontWeight: '500', fontSize: 16, lineHeight: 24, marginBottom: 12 }}> {item.name}</Text>
                <View style={styles.subContainer}>
                    <Text style={{
                        fontFamily: 'Poppins', fontWeight: '200', fontSize: 13.33,
                        lineHeight: 16, color: '#B1292C', width: 46, height: 16
                    }}>{item.quantity} tons</Text>
                    <Text style={{ width: 12, height: 16, fontWeight: '500', fontSize: 13.33, lineHeight: 16 }}>{'\u2B24'}</Text>
                    <Text style={{
                        fontFamily: 'Poppins', fontWeight: '500', fontSize: 13.33,
                        lineHeight: 16, color: '#393939', width: 69, height: 16, marginLeft: 8, marginBottom: 4
                    }}>{item.designation}</Text>

                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.buttonReject}>
                        <Text style={styles.buttonText}>Reject</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonAccept}>
                        <Text style={styles.buttonText}>Accept</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Search..."
                    onChangeText={text => setSearchText(text)}
                    value={searchText}
                />
                <TouchableOpacity>
                    <Icon name="search" size={30} color="#900" />
                </TouchableOpacity>
            </View>
            <FlatList
                data={data}
                renderItem={requestData}
                keyExtractor={(item) => item.name}
            />

            {/* Modal */}
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    statusBarTranslucent={true}
                    style={{ paddingBottom: 80 }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose, { alignItems: 'flex-end', marginLeft: 310 }]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Icon name="x" size={20} color="#393939" backgroundColor='#ffffff'  />
                            
                            </TouchableOpacity>
                            <View style={[styles.Modalcard, styles.shadowProp]}>

                                <Image
                                    style={styles.modalImage}
                                    source={require('../../Assets/Images/Man.jpg')}
                                    resizeMode='cover'
                                />
                                <View style={{ flexDirection: 'column', justifyContent: 'center', marginLeft: 15, paddingTop: 25,alignItems:'flex-start',marginRight:20 }}>
                                    <Text style={{ width: 184, height: 24, fontFamily: 'Poppins', fontWeight: '500', fontSize: 16, lineHeight: 24,marginLeft:0,textAlign:'left' }}> {name}</Text>
                                    <Text style={{
                                        fontFamily: 'Poppins', fontWeight: '500', fontSize: 13.33,
                                        lineHeight: 16, color: '#393939', width: 70, height: 16, marginBottom: 12
                                    }}>{designation}</Text>
                                    <Text style={{
                                        fontFamily: 'Poppins', fontWeight: '500', fontSize: 13.33,
                                        lineHeight: 16, color: '#848484', width: 70, height: 20, marginTop: 14
                                    }}>Quantity</Text>
                                    <Text style={{
                                        fontFamily: 'Poppins', fontWeight: '400', fontSize: 19.2,
                                        lineHeight: 20, color: '#B1292C', width: 76, height: 28
                                    }}>{quantity} Tons</Text>
                                </View>
                            </View>
                            <View style={[styles.ModalSecondCard, styles.shadowProp]}>
                                <View style={{ flexDirection: 'row',justifyContent: 'space-between' }}>
                                    <Text>Transaction ID</Text>
                                    <Text style={{color:'#393939',fontFamily:'Poppins',fontSize:13.33,fontWeight:'500',lineHeight:20,textAlign:'right'}}>A1234455667</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text>Unique ID</Text>
                                    <Text style={{ color:'#393939',fontFamily:'Poppins',fontSize:13.33,fontWeight:'500',lineHeight:20,textAlign:'right'}}>A1234455667</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text>Mobile</Text>
                                    <Text style={{ color:'#393939',fontFamily:'Poppins',fontSize:13.33,fontWeight:'500',lineHeight:20,textAlign:'right'}}>A1234455667</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Text>Location</Text>
                                    <Text style={{ color:'#393939',fontFamily:'Poppins',fontSize:13.33,fontWeight:'500',lineHeight:20,textAlign:'right'}}>Bhopal</Text>
                                </View>
                            </View>
                            <View style={styles.modalButtonContainer}>
                                <TouchableOpacity style={{ marginBottom: 10, borderRadius: 5, width: '100%', backgroundColor: '#EB1C1C', alignItems: 'center', height: 48, radius: 4, padding: 12 }} >
                                    <Text style={{ fontFamily: 'Poppins', fontWeight: '500', fontSize: 16, lineHeight: 24, color: '#ffffff', height: 24 }}>
                                        Reject
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: '100%', backgroundColor: '#18B758', borderRadius: 6, alignItems: 'center', height: 48, radius: 4, padding: 12 }} >
                                    <Text style={{ fontFamily: 'Poppins', fontWeight: '500', fontSize: 16, lineHeight: 24, color: '#ffffff', height: 24 }}>
                                        Accept
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
};
export default Requests
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 24,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 16,
        // width: 328,
        backgroundColor: '#ffffff'
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
        margin: 16,
        height: 48,
        backgroundColor: '#ffffff'

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
        padding: 10,
        height: 109,
        width: '96%',
        paddingRight: 12,
        paddingTop: 8,
        paddingLeft: 8,
        paddingBottom: 18,
        borderRadius: 5,
        justifyContent: 'space-evenly',
        borderRadius: 10,
        flexDirection: 'row',
        margin: 8
    },
    Modalcard: {
        backgroundColor: '#ffffff', // Customize button style as needed
        padding: 10,
        height: 132,
        width: '100%',
        paddingRight: 12,
        paddingTop: 8,
        paddingLeft: 8,
        paddingBottom: 18,
        borderRadius: 5,
        justifyContent: 'space-evenly',
        borderRadius: 10,
        flexDirection: 'row',
        margin: 8
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
        margin: 8,
        justifyContent: 'space-between',
        
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 10,
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
        width: 88,
        height: 88,
        flex: 1,
        borderRadius: 8
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        width: '100%',
    },
    modalView: {
        margin: 20,
        marginTop: 180,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 16,
        alignItems: 'center',
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
        backgroundColor: '#2196F3',
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
        width: 112,
        height: 112,
        borderRadius: 8,
        paddingLeft:0,
        marginLeft:0
    },
    modalButtonContainer: {
        marginTop: 200,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})