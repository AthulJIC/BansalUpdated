import {View,Text, Pressable,Animated,TextInput,TouchableOpacity, StyleSheet} from 'react-native'
import DownArrowIcon from '../../../assets/Icon/DownArrowIcon';
import Icon from 'react-native-vector-icons/Feather';
import { useState } from 'react';


const OrderScreen =()=>{
    const [searchText, setSearchText] = useState('');

    const HEADER_HEIGHT = 200; // Define the height of your header
    const scrollY = new Animated.Value(0);
    return (
    <View style={{flex:1, backgroundColor:'white'}}>
        <View style={{flexDirection:'row',marginTop:15,justifyContent:'space-between'}}>
            <Pressable style={{flexDirection:'row', alignItems:'center'}}>
                <Text style={{color:'rgba(57, 57, 57, 1)', fontSize:18, fontFamily:'Poppins-Medium',marginLeft:10,marginHorizontal:15}}>Bhopal</Text>
                <DownArrowIcon />
            </Pressable>
            <Pressable style={{backgroundColor:'rgba(43, 89, 195, 1)', height:37, width:'30%',borderRadius:5,alignItems:'center',justifyContent:'center',marginRight:15}}>
                <Text style={{color:'white', fontSize:13, fontFamily:'Poppins-Regular'}}>Refer Leads</Text>
            </Pressable>
        </View>
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
                    placeholder="Search..."
                    placeholderTextColor={'rgba(132, 132, 132, 1)'}
                    onChangeText={text => setSearchText(text)}
                    value={searchText}
                />
                <TouchableOpacity>
                    <Icon name="search" size={23} color="rgba(57, 57, 57, 1)" />
                </TouchableOpacity>
            </Animated.View>
    </View>
    )
}
const styles = StyleSheet.create({
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
        height: 48,
        backgroundColor: '#ffffff',
        width:'90%',
        alignSelf:'center',
        marginTop:15,
        marginBottom:20

    },
    input: {
        flex: 1,
        height: 40,
        marginRight: 8,
        color: '#848484',
        alignItems: 'flex-start'
    },
})
export default OrderScreen