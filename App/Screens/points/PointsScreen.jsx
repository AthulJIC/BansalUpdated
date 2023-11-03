import {View, StyleSheet} from 'react-native'
import LoyalityBonus from './LoyalityBonus';
import Transactions from './Transactions';
import useBackButtonHandler from '../../Components/BackHandlerUtils';

function PointsScreen({navigation}){
    useBackButtonHandler(navigation, false);
    return(
        <View style={styles.container}>
            <LoyalityBonus/>
            <Transactions/>
        </View>
    )
}
export default PointsScreen;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      //alignSelf:'center'
    
    },
})