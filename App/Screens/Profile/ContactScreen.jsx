import { Text, View ,Pressable, StyleSheet, Linking} from "react-native";
import RightArrowIcon from "../../../assets/Icon/RightArrowIcon";
import { useTranslation } from 'react-i18next';
import useBackButtonHandler from "../../Components/BackHandlerUtils";

const ContactScreen = ({navigation}) => {
    const { t } = useTranslation();
    useBackButtonHandler(navigation, false);
    const contactData=[
        {
            id:1,
            title:t('email'),
            arrowImage: <RightArrowIcon width={24} height={24} color="#393939"/>,
           
        },
        {
            id:2,
            title:t('call'),
            arrowImage: <RightArrowIcon width={24} height={24} color="#393939"/>,
           
        },

    ]
    const makePhoneCall = (id) => {
        if(id === 2){
            const url = `tel:${'6380388906'}`;
            Linking.canOpenURL(url)
              .then((supported) => {
                if (supported) {
                  Linking.openURL(url);
                } else {
                  console.error('Phone call is not supported on this device.');
                }
              })
              .catch((error) => {
                console.error('An error occurred when trying to make a phone call: ', error);
              });
        }
        else{
            const url = 'mailto:info@bansaltmtsariya.com'; 
            Linking.canOpenURL(url)
            .then((supported) => {
              if (supported) {
                Linking.openURL(url);
              } else {
                console.error('Email is not supported on this device.');
              }
            })
            .catch((error) => {
              console.error('An error occurred when redirecting to mail: ', error);
            });
        }
      };
    // const handleEmailPress = () => {
    //     // Open email application with pre-filled email
    //     Linking.openURL('mailto:info@bansaltmtsariya.com');
    //   };
    
    //   const handleCallPress = () => {
    //     // Initiate a phone call
    //     Linking.openURL('tel:6380388906');
    //   };
    
    return(
        <View style={{flex:1, backgroundColor:'white'}}>
          {contactData.map((data,index) => {
            return(
                <Pressable key={index} style={styles.listContainer} onPress={() => makePhoneCall(data.id)}>
                    <Text style={styles.listTitle}>{data.title}</Text>
                    {data.arrowImage}
                </Pressable>
            )
          })}
        </View>
    )

}

const styles = StyleSheet.create({
    listContainer:{
        width:'90%',
        height:60,
        backgroundColor:'white',
        elevation: 5,
        marginTop:15,
        alignSelf:'center',
        borderRadius:8,
        justifyContent:'flex-start',
        flexDirection:'row',
        alignItems:'center'
    },
    listTitle:{
        color:'#393939',
        marginLeft:20,
        fontWeight:'500',
        fontSize:16,
        fontFamily:'Poppins'
    },
})
export default ContactScreen;