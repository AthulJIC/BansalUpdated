import { View,Text, StyleSheet ,Pressable} from "react-native"
function ForgetPasswordScreen({route}){
    const text = route.params?.text;
    return(
        <View style={{flex:1, backgroundColor:'white'}}>
            <Text style={{fontSize:19,textAlign:'justify',width:'93%',alignSelf:'center',color:'rgba(57, 57, 57, 1)', fontFamily:'Poppins-Regular'}}>Please Connect with the sales team to {text}</Text>
            <Text style={{color:'rgba(132, 132, 132, 1)', fontSize:16,width:'93%',alignSelf:'center',marginTop:5, fontFamily:'Poppins-Regular'}}>Click to call our sales representative.</Text>
            <View style={styles.modalButtonContainer}>
                <Pressable style={{ marginBottom: 10, borderRadius: 5, width: '100%', backgroundColor: 'rgba(177, 41, 44, 1)', alignItems: 'center', height: 48, radius: 4, padding: 12 }} >
                    <Text style={{ fontFamily: 'Poppins-Regular', fontWeight: '500', fontSize: 16, lineHeight: 24, color: '#ffffff', height: 24 }}>
                        Call
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    modalButtonContainer: {
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        alignSelf:'center'
    }
})
export default ForgetPasswordScreen;