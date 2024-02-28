import { useCallback, useEffect, useState } from "react";
import {  FlatList, StyleSheet, Text, View, RefreshControl } from "react-native";
import AcceptedIcon from "../../../assets/Icon/AcceptedIcon";
import ProcessingIcon from "../../../assets/Icon/ProcessingIcon";
import RejectedIcon from "../../../assets/Icon/RejectedIcon";
import ArrowDown from "../../../assets/Icon/Arrowdown";
import { TransactionAPI } from "../../service/Points/TransactionService";
import moment from 'moment';
import { Image } from "react-native";
import LoadingIndicator from "../../Components/LoadingIndicator";
import { useFocusEffect } from "@react-navigation/native";
import { HistoryApi } from "../../service/history/historyservice";
import LeadAcceptedIcon from "../../../assets/Icon/LeadAcceptedIcon";
import LeadProcessingIcon from "../../../assets/Icon/LeadProcessingIcon";
import LeadRejectedIcon from "../../../assets/Icon/LeadRejectedIcon";
import { t } from "i18next";

const Transactions=()=>{
    const [filteredData, setFilteredData] = useState([]);
    const [dateTime,setDateTime]=useState('')
    const [isLoading,setIsLoading]=useState(false);
    const [isEndReachedLoading, setIsEndReachedLoading] = useState(false);
    const [page, setPage] =useState(1);
    const [nextUrl, setNextUrl] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
   
    useFocusEffect(
      useCallback(() => {
        const fetchData = async () => {
          transactions();
        };
    
        fetchData();
      }, [])
    );
    const onRefresh = useCallback(() => {
      if (isEndReachedLoading || !nextUrl) {
        setPage(1)
        return;
      }
      setRefreshing(true);
  
      setIsEndReachedLoading(true); 
     // setPage(page + 1)
      transactions();
  
      setRefreshing(false);
    }, [ transactions]);
    const transactions=()=>{
      setIsLoading(true);
      HistoryApi.getHistory(page).then((res) => {
       // console.log('data', res.data.results)
            if (res.status === 200) {
              if (res.data.results.length > 0) {
                setDateTime(res.data.results.updated_at)
                if (page == 1) {
                  setFilteredData(res.data.results);
                }
                else {
                  setFilteredData([...filteredData, ...res.data.results]);
                }
                //setPage(page + 1);
                setIsLoading(false)
                setNextUrl(res.data.next)
              }
              else {
                if (page == 1) {
                  setFilteredData([]);
                  setIsLoading(false)
                }
              }
            setIsEndReachedLoading(false);
          }
          else {
            setIsEndReachedLoading(false);
          }
      })
      .catch(function (error) {
        console.log(error);
        setIsEndReachedLoading(false);
        setIsLoading(false);
      });
  }
  async function endReachedHandler() {
    console.log('end', isEndReachedLoading)
    if (isEndReachedLoading || !nextUrl) {
      setPage(1)
      return;
   }
    setIsEndReachedLoading(true); 
    setPage(page + 1)
    transactions();
  }
    const requestData = (itemData) => {
      console.log('itmData===',itemData.item);
        const createdAt = moment(itemData.item.created_at);
        const Date = createdAt.format('DD MMM YYYY');
        const Time = createdAt.format('h:mm A');
        let leads= itemData.item.id;
        let statusText = itemData.item.status;
        let pointsText = ''; 
        let displayText = '';
        let textwidth;
        let name;
        
        if(itemData.item.lead === null){
          name =itemData.item.name;
          if(itemData.item.name.length > 8)
          {
            textwidth = '30%'
          }
          else{
            textwidth = 'auto'
          }
          if (itemData.item.status === 'Processing') {
            statusText = 'Processing'; 
            if (itemData.item.quantity >= 10000000)
          {
            displayText = (itemData.item.quantity / 10000000).toFixed(1) + 'CR'; 
          }
          else if (itemData.item.quantity >= 100000) {
            displayText =  (itemData.item.quantity / 100000).toFixed(1) + 'L'; // Convert to lakh format
          } else if (itemData.item.quantity >= 1000) {
            displayText = (itemData.item.quantity / 1000).toFixed(1) + 'K'; 
          }
          else displayText = itemData.item.quantity;
            // displayText = itemData.item.quantity;
          }
          else if (itemData.item.status === 'Accepted') {
            displayText = itemData.item.transaction_id
          }
          else{
            displayText = itemData.item.transaction_id
          }
          if (itemData.item.points >= 10000000)
          {
            pointsText = (itemData.item.points / 10000000).toFixed(1) + 'CR'; 
          }
          else if (itemData.item.points >= 100000) {
            pointsText =  (itemData.item.points / 100000).toFixed(1) + 'L'; // Convert to lakh format
          } else if (itemData.item.points >= 1000) {
            pointsText = (itemData.item.points / 1000).toFixed(1) + 'K'; 
          }
          else pointsText = itemData.item.points;
        }
        else{
          name = 'Referral'
          textwidth = 'auto'
          if (itemData.item.status === 'Processing') {
            statusText = 'Processing'; 
            pointsText = '25'; 
            // displayText = itemData.item.quantity;
             textColor = "rgba(31, 134, 255, 1)";
          }
          else if (itemData.item.status === 'Accepted') {
            pointsText = '25'; 
            // displayText = itemData.item.transaction_id
             textColor = "rgba(24, 183, 88, 1)";
          }
          else{
          //   displayText = itemData.item.transaction_id
              textColor = "rgba(235, 28, 28, 1)";
              pointsText = '0'; 
           }
        }
        return(
         
         <View style={{
          flexDirection: 'row',
          height: 50,
          width: '99%',
          marginTop: 15,
          paddingRight:24,
          flex:1
        }}>
           { itemData.item.status === 'Accepted' ? (
          <View style={{backgroundColor: 'rgba(24, 183, 88, 0.2)',
          borderRadius: 8,
          padding: 8,
          height:47,
          }}>
            {itemData.item.lead !== null ? (
                <LeadAcceptedIcon/>
            ): 
            <AcceptedIcon/> 
            }
          </View>
        ) : itemData.item.status === 'Processing' ? (
          <View style={{backgroundColor: 'rgba(31, 134, 255, 0.2)',
          borderRadius: 8,
          padding: 8,
          height:47,
          }}>
            {itemData.item.lead !== null ? (
                <LeadProcessingIcon/>
            ): 
            <ProcessingIcon/>
            }
         
          </View>
        ) :(
          <View style={{backgroundColor: 'rgba(235, 28, 28, 0.2)',
          borderRadius: 8,
          padding: 8,
          height:47,
          }}>
            {itemData.item.lead !== null ? (
                <LeadRejectedIcon/>
            ): 
            <RejectedIcon/>
        }
          </View>
        )}
            <View style={{flexDirection:'column',marginHorizontal:15}}>
              
              <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
              {leads==='null'?(
                <View>
              <Text  style={{ color: 'black', fontSize:14,fontFamily:'Poppins-Regular'}}>{itemData.item.transaction_id}</Text>            
              <Text style={{  fontWeight: '500', fontSize: 5,color:'rgba(57, 57, 57, 1)', marginTop:5,marginHorizontal:5}}>{'\u2B24'}</Text>
             <Text style={{color:'black',fontSize:14,fontFamily:'Poppins-Regular'}}>{displayText }
                </Text>
                </View>
                ): 
                <View style={{flexDirection:'row',justifyContent:'flex-start',width:'85%'}}>
                  <Text numberOfLines={1} ellipsizeMode="tail"  style={{ color: 'black', fontSize:14,fontFamily:'Poppins-Medium',width: itemData.item.lead !== null ? 'auto' : textwidth}}>{name}</Text> 
                  {
                    itemData.item.lead === null && (
                      <View style={{flexDirection:'row'}}>
                        <Text style={{  fontWeight: '500', fontSize: 5,color:'rgba(57, 57, 57, 1)', marginTop:7,marginHorizontal:4}}>{'\u2B24'}</Text>
                        <Text numberOfLines={1} ellipsizeMode="tail" style={{color:'black',fontSize:13,fontFamily:'Poppins-Medium',width:'60%'}}>{displayText}</Text>
                      </View>
                    )
                  }
                </View>
                } 
              </View>
              <View style={{flexDirection:'row',flexWrap: 'nowrap'}}>
                <Text style={{marginHorizontal:3,fontSize:11,color:'black',fontFamily:'Poppins-Regular'}}>{Date}</Text>
                <Text style={{fontWeight: '500', fontSize: 5,color:'rgba(57, 57, 57, 1)', marginTop:5,marginHorizontal:5}}>{'\u2B24'}</Text>
                <Text style={{fontSize:11,color:'black',fontFamily:'Poppins-Regular'}}>{Time}</Text>
              </View>
            </View>
            <View style={{marginLeft:'auto'}}>
              <Text style={{color : itemData.item.status === 'Processing' ? '#1F86FF' : itemData.item.status === 'Accepted' ? 'rgba(24, 183, 88, 1)' : 'rgba(235, 28, 28, 1)',
                fontFamily:'Poppins-Regular',textAlign:'right'}}>{pointsText} Pts</Text>
              <Text style={{fontSize:11.11,fontFamily:'Poppins-Regular',textAlign:'right',color:'#393939'}}>{statusText.toLocaleUpperCase()}</Text>
            </View>
         </View>
        )
      }
 return(
    <View style={styles.mainContainer}>
        <Text style={styles.font}>
            {t('Transactions')}
        </Text>
      {filteredData.length === 0 ? (
            <View style={{flex:1,marginTop:50,alignSelf:'center'}}>
                 <Image
            style={styles.tinyLogo}
            source={require('../../../assets/Images/TransactionsEmpty.png')}
            resizeMode='cover'
        />
        <Text style={{fontFamily:'Poppins-Large',fontSize:16,textAlign:'center',
        color:'#393939'}}>{t("NoTransactions")}</Text>
        <Text  style={{fontFamily:'Poppins-Regular',fontSize:14,textAlign:'center',
          color:'#848484'}}>
          {t('NoRecords')}</Text>
            </View>
           
        ) :        
      <FlatList
          data={filteredData}
          renderItem={requestData}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={endReachedHandler}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
      />}

<LoadingIndicator visible={isLoading} text='Loading...'/>

   
    </View>
 )
}
export default Transactions
const styles = StyleSheet.create({
    mainContainer: {
        justifyContent:'center',
        alignItems:'flex-start',
        height:'100%',
        width:'100%',
        marginLeft:20,
        paddingTop:20,
        paddingBottom:20,
        borderRadius:10,
        backgroundColor:'#ffffff',
        flex:1
      },
    font:{
        fontFamily:'Poppins-Medium',
        fontSize:16,
        color:'#393939'
    },
      filterContainer: {
        height: 40,
        borderWidth: 0.5,
        borderRadius: 5,
        marginHorizontal: 8,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
        backgroundColor: 'white',
        marginBottom:20
      },
      filterSection: {
        height: 60,
        justifyContent: 'center',
        marginBottom: 10,
      },
      selectedFilter: {
        borderColor: 'rgba(177, 41, 44, 1)',
      },
      filterText: {
        color: 'black',
        fontFamily: 'Poppins-Regular'
      },
      selectedText: {
        color: 'rgba(177, 41, 44, 1)',
      },
      iconContainer: {
        backgroundColor: 'rgba(31, 134, 255, 0.3)',
        borderRadius: 5,
        padding: 8,
        marginLeft:10
      },
      tinyLogo: {
        width: 190,
        height: 155,
        alignSelf:'center',
        marginBottom:20
    },
})