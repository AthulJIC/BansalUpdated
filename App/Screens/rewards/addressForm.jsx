import { useState } from "react";
import { View, TouchableOpacity, TextInput, Pressable, Text, StyleSheet, KeyboardAvoidingView, ScrollView } from "react-native";
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/Feather';

function ReferLead({ isVisible, onClose, onRefer }) {
    const [name, setName] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [location, setLocation] = useState('');
    const [quantity, setQuantity] = useState('')
    function handleRef() {
        if (onRefer) {
            onRefer();
        }
        onClose();
    }
    return (
        <View>
            <Modal
                animationIn="slideInUp"
                animationOut="slideOutDown"
                isVisible={isVisible}
                hasBackdrop={true}
                backdropColor="black"
                backdropOpacity={0.70}
                onBackdropPress={onClose}
                width={'100%'}
                style={styles.modalContainer}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    style={{ width: '100%' }}>
                    <ScrollView contentContainerStyle={[styles.scrollViewContent]}>
                        <View style={styles.centeredView}>
                            <TouchableOpacity
                                style={[{ alignItems: 'flex-end', marginTop: 15, marginRight: 15 }]}
                                onPress={onClose}>
                                <Icon name="x" size={24} color="#393939" backgroundColor='#ffffff' />
                            </TouchableOpacity>
                            <TextInput
                                style={styles.inputContainer}
                                placeholder="Name"
                                placeholderTextColor={'rgba(132, 132, 132, 1)'}
                                onChangeText={text => setName(text)}
                                value={name}
                            />
                            <TextInput
                                style={styles.inputContainer}
                                placeholder="Mobile Number"
                                placeholderTextColor={'rgba(132, 132, 132, 1)'}
                                onChangeText={text => setMobileNo(text)}
                                value={mobileNo}
                            />
                            <TextInput
                                style={styles.inputContainer}
                                placeholder="Site Location"
                                placeholderTextColor={'rgba(132, 132, 132, 1)'}
                                onChangeText={text => setLocation(text)}
                                value={location}
                            />
                            <TextInput
                                style={styles.inputContainer}
                                placeholder="Required Quantity in Ton"
                                placeholderTextColor={'rgba(132, 132, 132, 1)'}
                                onChangeText={text => setQuantity(text)}
                                value={quantity}
                            />
                            <View style={styles.modalButtonContainer}>
                                <Pressable style={styles.referButton}
                                    onPress={handleRef} >
                                    <Text style={styles.referButtonText}>
                                        Refer
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </Modal>
        </View>

    )

}
const styles = StyleSheet.create({
    modalContainer: {
        justifyContent: 'flex-end', // Position modal at the bottom
        margin: 0,
    },
    centeredView: {
        backgroundColor: 'white',
        borderTopRightRadius: 9,
        borderTopLeftRadius: 9,
        padding: 15,
        height: 630
    },
    modalButtonContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center'
    },
    inputContainer: {
        height: 45,
        width: '100%', // Set width to 100% to occupy the whole screen
        color: '#848484',
        borderColor: 'black',
        borderWidth: 0.5,
        borderRadius: 5,
        alignSelf: 'center',
        marginTop: 15,
        paddingLeft: 15,
        fontFamily: 'Poppins-Regular',
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    referButton: {
        marginBottom: 10,
        borderRadius: 5,
        width: '100%',
        backgroundColor: 'rgba(177, 41, 44, 1)',
        alignItems: 'center',
        height: 48,
        radius: 4,
        padding: 12,
    },
    referButtonText: {
        fontFamily: 'Poppins-Regular',
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 24,
        color: '#ffffff',
        height: 24,
    },
});
export default ReferLead;