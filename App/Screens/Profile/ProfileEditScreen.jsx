import {View,TextInput,StyleSheet, Text, Pressable} from 'react-native';
import { useState } from 'react';
import PenIcon from '../../../assets/Icon/PenIcon';


const ProfileEditScreen = () => {
    const [userName, setUserName] = useState('Abhiram Ahuja');
    
    return(
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChange={(value) => setUserName(value)}
                value={userName}
            />
            <View style={styles.inputContainer}>
                <Text style={{color:'rgba(57, 57, 57, 1)',fontSize:16,fontFamily:'Poppins-Regular'}}>abahuja@gmail.com</Text>
                <Pressable style={{flexDirection:'row', justifyContent:'flex-end'}}>
                    <PenIcon width={18} height={18} color='#2B59C3'/>
                    <Text style={{color:'#2B59C3',fontSize:14,marginLeft:4,fontFamily:'Poppins-Regular'}}>Change</Text>
                </Pressable>
            </View>
            <View style={styles.inputContainer}>
                <Text style={{color:'rgba(57, 57, 57, 1)',fontSize:16,fontFamily:'Poppins-Regular'}}>987654325</Text>
                <Pressable style={{flexDirection:'row', justifyContent:'flex-end'}}>
                    <PenIcon width={18} height={18} color='#2B59C3'/>
                    <Text style={{color:'#2B59C3',fontSize:14,marginLeft:4,fontFamily:'Poppins-Regular'}}>Change</Text>
                </Pressable>
            </View>
            <View style={styles.modalButtonContainer}>
                <Pressable style={{ marginBottom: 10, borderRadius: 5, width: '100%', backgroundColor: 'rgba(177, 41, 44, 1)', alignItems: 'center', height: 48, radius: 4, padding: 12 }} >
                    <Text style={{ fontFamily: 'Poppins-Regular', fontWeight: '500', fontSize: 16, lineHeight: 24, color: '#ffffff', height: 24 }}>
                        Save
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    input: {
        height: 50,
        margin: 12,
        borderWidth: 0.7,
        padding: 10,
        borderRadius:5,
        fontSize:15,
        fontFamily:'Poppins-Regular'
    },
    inputContainer:{
        height: 50,
        margin: 12,
        borderWidth: 0.7,
        padding: 10,
        borderRadius:5,
        backgroundColor:'rgba(132, 132, 132, 0.3)',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    modalButtonContainer: {
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        alignSelf:'center'
    }
})
export default ProfileEditScreen;