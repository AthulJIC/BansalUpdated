import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import CheckmarkIcon from '../../../assets/Icon/CheckMark';

const Notification = () => {
    const handleButtonPress = () => {
        // Navigate to the specified route when the button is pressed
        navigation.navigate(label);
    };

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <CheckmarkIcon />
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.textItem}>
                    500 Pts have been added from your purchase request.
                </Text>
                <Text style={styles.dateText}>05 Aug 2023 . 6:00pm</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        width: '92%',
        marginTop: 12,
        paddingHorizontal: 16,
        height: 84,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 16
    },
    textItem: {
        color: '#393939',
        fontWeight: '500',
        fontFamily: 'Poppins',
        fontSize: 13.33,
        lineHeight: 20,
    },
    dateText: {
        color: '#9A9A9A',
        textAlign: 'left',
    },
    iconContainer: {
        backgroundColor: 'rgba(24, 183, 88, 0.5)',
        width: 32,
        height: 45,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,

    },
});

export default Notification;
