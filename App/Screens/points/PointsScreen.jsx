import {View,Text, StyleSheet} from 'react-native'
import LoyalityBonus from './LoyalityBonus';
import { SafeAreaView } from 'react-native-safe-area-context';
function PointsScreen(){
    return(
        <View style={styles.container}>
            <SafeAreaView>
            <LoyalityBonus/>
            <Text>Points Screen</Text>
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