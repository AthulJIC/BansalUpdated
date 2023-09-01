import {View,Text, StyleSheet} from 'react-native'
import LoyalityBonus from './LoyalityBonus';
import Transactions from './Transactions';
import { SafeAreaView } from 'react-native-safe-area-context';
function PointsScreen(){
    return(
        <View style={styles.container}>
            <SafeAreaView>
            <LoyalityBonus/>
            <Transactions/>
            </SafeAreaView>
            
        </View>
    )
}
export default PointsScreen;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
})