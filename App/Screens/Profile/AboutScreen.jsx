import { Text, View } from "react-native";
import useBackButtonHandler from "../../Components/BackHandlerUtils";

const AboutScreen = ({navigation}) => {
    useBackButtonHandler(navigation, false);
    return(
        <View>
            <Text>About Us</Text>
        </View>
    )

}

export default AboutScreen;