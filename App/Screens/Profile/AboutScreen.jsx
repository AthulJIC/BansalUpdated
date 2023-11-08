import { Text, View,ScrollView } from "react-native";
import useBackButtonHandler from "../../Components/BackHandlerUtils";

const AboutScreen = ({navigation}) => {
   useBackButtonHandler(navigation, false);
    return(
        <ScrollView style={{flex:1, backgroundColor:'white',padding:9}}>
        <Text style={{color:'black', fontSize:15, fontFamily:'Poppins-Regular'}}>Bansal TMT is the leading iron industry in Madhya Pradesh established in 2007 
            Bansal is known for superior steel quality, especially in the field of TMT Bars. Our 
            TMT Bars are famous and highly demanded in the central region of India. Bansal 
            TMT gives your construction a new dimension. We are committed to maintaining 
            quality products as per ISI standards. The advanced technology of Bansal TMT 
            makes your construction earthquake-proof. We have a strong research group to 
            cater constantly changing market and environment. We have a strong presence in 
            the central India. Bansal TMT manufactures high-quality TMT Rebars. Bansal is one 
            of the fastest-growing renowned manufacturers of high-grade steel products, 
            established in 2007. The prime motive of the company is to deliver the best quality 
            steel products for building the nation. The company manufactures durable, safe and 
            rust—resistant reinforcement TMT Rebars with the Brand Name “BANSAL TMT 
            SARIYA” “We aim to achieve leadership in the iron industry and customer 
            satisfaction by delivering products of consistently high quality and strive for 
            continuous up-gradation and adoption of the best industry practices to provide the 
            best to our consumers.” </Text>
        <Text style={{color:'black', fontSize:15, fontFamily:'Poppins-Regular',marginTop:10, marginBottom:15}}>Bansal TMT Sariya is a venture of Bansal group. Bansal group has a diversified 
            business profile which includes the Agribusiness division, Educational Business 
            division – BGI Bhopal, Electronic Media - Bansal News, Health Sector - Bansal 
            Hospital, Infrastructure </Text>
    </ScrollView>
    )

}

export default AboutScreen;