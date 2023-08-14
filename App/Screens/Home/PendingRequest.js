import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const PendingRequest = () => {
    const handleButtonPress = () => {
        // Navigate to the specified route when the button is pressed
        navigation.navigate(label);
    };

    return (
        <View style={styles.mainView} onPress={handleButtonPress}>
            <Text style={styles.Text}>Pending Requests</Text>
            <Text style={styles.number} >5</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    mainView: {
        backgroundColor: '#B1292C',
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 24,
        paddingLeft: 20,
        margin: 0,
        height: 108,
        width: '100%',
        borderRadius: 5,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderRadius: 10,
    },
    Text: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontFamily: 'Poppins',
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '500'
    },
    number: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontFamily: 'Poppins',
        fontSize: 23.04,
        lineHeight: 32,
        height: 30,
        fontWeight: '600'
    }
});

export default PendingRequest;
