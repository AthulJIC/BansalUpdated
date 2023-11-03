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
        const createdAt = moment(itemData.item.created_at);
        const Date = createdAt.format('DD MMM YYYY');
        const Time = createdAt.format('h:mm A');
        let leads= itemData.item.id;
        let statusText = itemData.item.status;
        let pointsText = ''; 
        let displayText = '';

        if (itemData.item.status === 'Processing') {
          statusText = 'Processing'; 
          displayText = itemData.item.quantity;
        }
        else if (itemData.item.status === 'Accepted') {
          displayText = itemData.item.transaction_id
        }
        else{
          displayText = itemData.item.transaction_id
        }

        if(itemData.item.points > 500){
          pointsText = "+500";
        }
        else pointsText = itemData.item.points;
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
              height:47}}>
                <ArrowDown width={32} height={32} color="#18B758"/> 
              </View>
            ) : itemData.item.status === 'Processing' ? (
              <View style={{backgroundColor: 'rgba(31, 134, 255, 0.2)',
              borderRadius: 8,
              padding: 8,
              height:47}}>
              <ProcessingIcon/>
              </View>
            ) :(
              <View style={{backgroundColor: 'rgba(235, 28, 28, 0.2)',
              borderRadius: 8,
              padding: 8,
              height:47}}>
              <RejectedIcon/>
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

                <Text numberOfLines={1} ellipsizeMode="tail"  style={{ color: 'black', fontSize:14,fontFamily:'Poppins-Regular',width: itemData.item.lead !== null ? '15%' : '20%'}}>{itemData.item.name}</Text> 
                <Text style={{  fontWeight: '500', fontSize: 5,color:'rgba(57, 57, 57, 1)', marginTop:7,marginHorizontal:5}}>{'\u2B24'}</Text>
             <Text numberOfLines={1} ellipsizeMode="tail" style={{color:'black',fontSize:14,fontFamily:'Poppins-Regular',width:'50%'}}>{displayText}</Text>
                </View>
                } 
              </View>
              <View style={{flexDirection:'row',flexWrap: 'nowrap'}}>
                <Text style={{marginHorizontal:3,fontSize:11,color:'black',fontFamily:'Poppins-Regular'}}>{Date}</Text>
                <Text style={{fontWeight: '500', fontSize: 5,color:'rgba(57, 57, 57, 1)', marginTop:5,marginHorizontal:5}}>{'\u2B24'}</Text>
                <Text style={{fontSize:11,color:'black',fontFamily:'Poppins-Regular'}}>{Time}</Text>
              </View>
            </View>
            <View style={{marginLeft:'auto',justifyContent:'flex-end'}}>
              <Text style={{color : itemData.item.status === 'Processing' ? '#1F86FF' : itemData.item.status === 'Accepted' ? 'rgba(24, 183, 88, 1)' : 'rgba(235, 28, 28, 1)',
              fontFamily:'Poppins-Regular',textAlign:'right'}}>{pointsText}Pts</Text>
              <Text style={{fontSize:11.11,lineHeight:16,fontFamily:'Poppins-Regular',textAlign:'right',color:'#393939'}}>{statusText.toLocaleUpperCase()}</Text>
            </View>
         </View>
        )
      }
 return(
    <View style={styles.mainContainer}>
        <Text style={styles.font}>
            Transactions
        </Text>
        <View style={styles.container}>
      <View style={styles.flatListSection}> 
      {filteredData.length === 0 ? (
            <View style={{flex:1,marginTop:90}}>
                 <Image
            style={styles.tinyLogo}
            source={require('../../../assets/Images/TransactionsEmpty.png')}
            resizeMode='cover'
        />
        <Text style={{fontFamily:'Poppins-Large',fontWeight:'500',fontSize:16,textAlign:'center',
        margin:22,lineHeight:24,color:'#393939'}}>No Transactions</Text>
        <Text  style={{width:'90%',fontFamily:'Poppins-Regular',fontWeight:'500',fontSize:16,textAlign:'center',
          lineHeight:20,color:'#848484',alignSelf:'center'}}>
          We don’t see any records from your history.</Text>
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
    </View>
   
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
        fontWeight:'500',
        fontSize:16,
        lineHeight:24,
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
        width: 230,
        height: 190,
        borderRadius: 8,
        marginLeft: 10,
        marginHorizontal: 20,
        alignSelf:'center'
    },
})