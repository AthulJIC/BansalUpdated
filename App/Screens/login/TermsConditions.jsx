import { Text, ScrollView,View} from "react-native";
import useBackButtonHandler from "../../Components/BackHandlerUtils";

function TermsScreen({navigation}) {
    useBackButtonHandler(navigation, false);
    return(
        <ScrollView style={{flex:1, backgroundColor:'white',padding:9}}>
            <Text style={{color:'black', fontSize:15, fontFamily:'Poppins-Regular'}}>These terms and conditions ("Terms") outline the rules and regulations governing the use of the 
                Bansal TMT Mobile Application's Customer Loyalty Program ("Program"). By participating in the 
                Program, you ("User", "You") agree to comply with these Terms. The Program is provided by 
                Bansal TMT ("Company", "We", "Us"), and these Terms constitute a legally binding agreement 
                between You and the Company.</Text>
            <Text style={{color:'black', fontSize:15, fontFamily:'Poppins-Regular',marginTop:10}}>1. Eligibility: 1.1 The Program is open to architects, engineers, contractors, dealers, and 
                distributors who have downloaded and registered on the Bansal TMT Mobile Application ("App").</Text>
            <Text style={{color:'black', fontSize:15, fontFamily:'Poppins-Regular',marginTop:10}}>2. Loyalty Points: 2.1 Users can earn loyalty points ("Points") by making purchases of Bansal TMT 
                products through the App. 2.2 Different products and purchase amounts may yield varying 
                Points. 2.3 Points are not transferrable, have no cash value, and cannot be exchanged for money. </Text>
            <Text style={{color:'black', fontSize:15, fontFamily:'Poppins-Regular',marginTop:10}}>3. Redemption of Gifts: 3.1 Accumulated Points can be redeemed for gifts available in the 
                Program's catalog. 3.2 Each gift has a designated Points value required for redemption. 3.3 Gifts 
                can only be redeemed once per quarter. 3.4 The redemption availability of gifts may change 
                based on stock availability. </Text>
            <Text style={{color:'black', fontSize:15, fontFamily:'Poppins-Regular',marginTop:10}}>4. Approval of Purchase Request: 4.1 Dealers and distributors will review and approve purchase 
                requests made by Users on the App. 4.2 The Company reserves the right to cancel or modify any 
                purchase request at its discretion. </Text>
            <Text style={{color:'black', fontSize:15, fontFamily:'Poppins-Regular',marginTop:10}}>5. Modification of Program: 5.1 The Company reserves the right to modify, suspend, or terminate 
                the Program, its Terms, and the gift catalog at any time without prior notice. 5.2 Changes to the 
                Program will be effective immediately upon posting updated Terms on the App. </Text> 
            <Text style={{color:'black', fontSize:15, fontFamily:'Poppins-Regular',marginTop:10}}>6. Termination and Suspension: 6.1 The Company may suspend or terminate a User's 
                participation in the Program if there is a violation of these Terms or suspicious activity. 6.2 Users 
                may voluntarily withdraw from the Program at any time by notifying the Company.  </Text> 
            <Text style={{color:'black', fontSize:15, fontFamily:'Poppins-Regular',marginTop:10}}>7. Data Privacy: 7.1 User information collected for the Program will be used in accordance with 
                the Company's Privacy Policy. 7.2 By participating in the Program, Users consent to the collection, processing, and use of their personal information. </Text> 
            <Text style={{color:'black', fontSize:15, fontFamily:'Poppins-Regular',marginTop:10}}>5. Modification of Program: 5.1 The Company reserves the right to modify, suspend, or terminate 
                the Program, its Terms, and the gift catalog at any time without prior notice. 5.2 Changes to the 
                Program will be effective immediately upon posting updated Terms on the App. </Text> 
            <Text style={{color:'black', fontSize:15, fontFamily:'Poppins-Regular',marginTop:10}}>8. Limitation of Liability: 8.1 The Company shall not be liable for any damages, losses, or 
                expenses arising from the use of the Program or the redemption of gifts. 8.2 The Company shall 
                not be responsible for any technical issues, interruptions, or errors related to the App or the 
                Program. </Text> 
            <Text style={{color:'black', fontSize:15, fontFamily:'Poppins-Regular',marginTop:10}}>9. Governing Law: 9.1 These Terms and the Program are governed by the laws of the jurisdiction 
                in which the Company operates. </Text> 
            <Text style={{color:'black', fontSize:15, fontFamily:'Poppins-Regular',marginTop:10}}>10. Contact Information: 10.1 For inquiries, assistance, or concerns related to the Program, 
                please contact our customer support at customer-support@bansaltmtapp.com.</Text>    
            <Text style={{color:'black', fontSize:15, fontFamily:'Poppins-Regular',marginTop:10,marginBottom:20}}>By participating in the Bansal TMT Mobile Application's Customer Loyalty Program, you 
                acknowledge that you have read, understood, and agree to abide by these Terms and Conditions. 
                The Company reserves the right to update these Terms at any time, and it is your responsibility to 
                review them periodically for changes. Your continued use of the Program constitutes your 
                acceptance of any modifications. </Text>
        </ScrollView>
    )
}
export default TermsScreen;