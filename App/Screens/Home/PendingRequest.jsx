import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import { useTranslation } from 'react-i18next';

const PendingRequest = ({role}) => {
    const [progress, setProgress] = useState(0);
    console.log('role', role)

    const { t } = useTranslation();
    const handleButtonPress = () => {
        // Navigate to the specified route when the button is pressed
        navigation.navigate(label);
    };
    // useEffect(() => {
    //     // const interval = setInterval(() => {
    //       setProgress((prevProgress) => {
    //         // Update progress value here
    //         const newProgress = prevProgress + 5; // For example, increase by 5% on each update
    //         if (newProgress >= 100) {
    //           //clearInterval(interval);
    //           return 100; // Ensure it doesn't go above 100%
    //         }
    //         return newProgress;
    //       });
    //     // }, 1000); // Update progress every second (adjust as needed)
    //   }, []);
    return (
        <View style={[styles.mainView,{height: role === "Distributor" ? 108 : 124}]} onPress={handleButtonPress}>
            {role === 'Distributor' ? 
             (
            <View>
                <Text style={styles.Text}>{t('pending')}</Text>
                <Text style={styles.number} >5</Text>
            </View>) :
            (
                <View style={{flexDirection:'row'}}>
                    <View>
                        <Text style={styles.Text}>Loyalty Balance</Text>
                        <Text style={styles.number} >2000 Pts</Text>
                        <Text style={styles.rewardText}>500 Pts till your next reward</Text>
                    </View>
                    <View style={{marginHorizontal: 25}}>
                        <ProgressCircle
                            percent={30}
                            radius={50}
                            borderWidth={10}
                            color="rgba(255, 255, 255, 1)"
                            shadowColor="rgba(255, 255, 255, 0.1)"
                            bgColor="rgba(177, 41, 44, 1)"
                        >
                        </ProgressCircle>
                    </View>
                </View>
            )
            
            }
        </View>
    );
};
const styles = StyleSheet.create({
    mainView: {
        backgroundColor: '#B1292C',
        paddingRight: 20,
        paddingTop: 12,
        paddingBottom: 24,
        paddingLeft: 20,
        margin: 0,
        // height: 108,
        width: '100%',
        borderRadius: 5,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderRadius: 10,
    },
    Text: {
        color: '#FFFFFF',
        textAlign: 'left',
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
    },
    number: {
        color: '#FFFFFF',
        textAlign: 'left',
        fontFamily: 'Poppins-Medium',
        fontSize: 23,
    },
    rewardText: {
        color: '#FFFFFF',
        textAlign: 'left',
        fontFamily: 'Poppins-Regular',
        fontSize: 11,
        marginTop:10
    }
});

export default PendingRequest;
