import { Image, View,Text } from "react-native";

function EmptyComponent(){
    return(
        <View style={{ alignSelf: 'center', backgroundColor: 'white', top: 150 }}>
                <Image
                    source={require('../../assets/Images/EmptyResult.png')}
                    style={{ height: '50%', height: 150 }}
                    resizeMode='center'
                ></Image>
                <View style={{ marginTop: 20 }}>
                    <Text style={{ color: 'rgba(57, 57, 57, 1)', fontSize: 16, fontFamily: 'Poppins-Medium', textAlign: 'center' }}>
                    No Results Found
                    </Text>
                    <Text style={{ color: 'rgba(132, 132, 132, 1)', fontSize: 13, fontFamily: 'Poppins-Regular', textAlign: 'center' }}>
                       Please try again with a different keyword.
                    </Text>
                </View>
            </View>
    )
}
export default EmptyComponent;