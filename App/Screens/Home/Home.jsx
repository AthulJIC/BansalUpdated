import React from 'react'; // Don't forget to import React
import { View, Text, StyleSheet, ScrollView,Image  } from 'react-native';
import PendingRequest from './PendingRequest';
import BarGraph from './BarGraph';
import HeaderComponent from '../../Components/Header';
import ImageComponent from './Ads';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
    return (
        <ScrollView>
            <View style={styles.scrollViewContent}>
            <HeaderComponent />
            <PendingRequest />
            <BarGraph />
           
            <Image
        style={styles.ImageContainer}
        source={require('../../../assets/Images/Rectangle.jpg')}
      />
         <Image
        style={styles.ImageContainer}
        source={require('../../../assets/Images/Rectangle.jpg')}
      />
     </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // paddingTop: 50,
        paddingLeft: 16,
        paddingRight: 16,
        // paddingBottom: 16,
    },
    ImageContainer: {
        padding: 10,
        height:180,
        width:'100%',
        paddingRight:20,
        paddingTop:20,
        paddingLeft:24,
        paddingBottom:20,
        borderRadius: 5,
        margin:8,
        justifyContent:'center',
        borderRadius:10
      },
});

export default HomeScreen;
