import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, FlatList,RefreshControl,Image } from 'react-native';
import AcceptedIcon from '../../../assets/Icon/AcceptedIcon';
import ProcessingIcon from '../../../assets/Icon/ProcessingIcon';
import RejectedIcon from '../../../assets/Icon/RejectedIcon';
import { HistoryApi } from '../../service/history/historyservice';
import moment from 'moment';
import LeadAcceptedIcon from '../../../assets/Icon/LeadAcceptedIcon';
import LeadProcessingIcon from '../../../assets/Icon/LeadProcessingIcon';
import LeadRejectedIcon from '../../../assets/Icon/LeadRejectedIcon';
import LoadingIndicator from '../../Components/LoadingIndicator';
import useBackButtonHandler from '../../Components/BackHandlerUtils';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { t } from 'i18next';

const HistoryScreen = ({navigation}) => {
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading ] = useState(false); 
  const [isEndReachedLoading, setIsEndReachedLoading] = useState(false);
  const [page, setPage] =useState(1);
  const [nextUrl, setNextUrl] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [role, setRole] = useState();

  let filterTitle = [
    {
      id: 1,
      title: t('alltransactions'),
      value: 'AllTransactions'
    },
    {
      id: 2,
      title: t('processing'),
      value: 'Processing'
    },
    {
      id: 3,
      title: t('accepted'),
      value: 'Accepted'
    },
    {
      id: 4,
      title: t('rejected'),
      value: 'Rejected'
    },
    
  ];
  if(role === 'Contractor'){
    filterTitle =[
        ...filterTitle
    ] ;
}
else{
  filterTitle = [
        ...filterTitle,
        {
          id: 5,
          title: t('referral'),
          value: 'Referral'
        },
    ]
}
  
const [selectedFilter, setSelectedFilter] = useState(filterTitle[0]);

  useBackButtonHandler(navigation, false);

  useFocusEffect(
    useCallback(() => {
      async function getRole(){
        const user = await AsyncStorage.getItem('role');
        console.log('role', user)
        setRole(user)
      }
      getRole();
      setPage(1)
      setSelectedFilter(filterTitle[0])
      getHistoryList()
    }, [])
  );
  const onRefresh = useCallback(() => {
    if (!isEndReachedLoading || !nextUrl) {
      setPage(1)
      return;
    }
    setRefreshing(true);

    if (selectedFilter.title === 'All Transactions') {
      getHistoryList();
    } else {
      getHistoryStatusList(selectedFilter?.value);
    }

    setRefreshing(false);
  }, [selectedFilter, getHistoryList, getHistoryStatusList]);
  function getHistoryList() {
    setIsLoading(true);
    
    console.log('page', page);
  
    HistoryApi.getHistory(page)
      .then((res) => {
        if (res.status === 200) {
          const newData = res.data.results;
          if (page === 1) {
            setFilteredData(newData);
          } else {
            setFilteredData((prevData) => {
              const newData = new Set([...prevData, ...res.data.results]);
              return Array.from(newData);
            });
          }
          setIsLoading(false);
          setNextUrl(res.data.next);
          setIsEndReachedLoading(false);
        } else {
          setIsLoading(false);
          setIsEndReachedLoading(false);
        }
      })
      .catch(function (error) {
        console.log(error);
        setIsEndReachedLoading(false);
        setIsLoading(false);
      });
  }
  
  function getHistoryStatusList(item) {
    setIsLoading(true);  
    let apiCall;
    if (item === 'Referral') {
      apiCall = HistoryApi.getReferralHistory(page, true);
    } else {
      apiCall = HistoryApi.getHistoryStatus(page, item);
    }
  
    apiCall
      .then((res) => {
        if (res.status === 200) {
          const newData = res.data.results;
          if (page === 1) {
            setFilteredData(newData);
          } else {
            setFilteredData((prevData) => {
              const newData = new Set([...prevData, ...res.data.results]);
              return Array.from(newData);
            });
          }
          setIsLoading(false);
          setIsEndReachedLoading(false);
          setNextUrl(res.data.next);
        } else {
          setIsLoading(false);
          setIsEndReachedLoading(false);
        }
      })
      .catch(function (error) {
        console.log(error);
        setIsEndReachedLoading(false);
        setIsLoading(false);
      });
  }
const handlePress = (item) => {
  console.log("handlePress",item)
  //setIsLoading(true)
  setSelectedFilter(item);
  console.log('selected==', item)
  if(item.title === 'All Transactions'){
    getHistoryList();
  }
  else{
    getHistoryStatusList(item.value);
  }
};
async function endReachedHandler() {
  console.log('end', isEndReachedLoading)
  if (isEndReachedLoading || !nextUrl) {
    setPage(1)
    return;
 }
  setPage(page + 1);
  setIsEndReachedLoading(true);
  if(selectedFilter?.title === 'All Transactions'){
    getHistoryList();
  }
  else getHistoryStatusList(selectedFilter?.value)
}
  // async function endReachedHandler() {
  //   if (isEndReachedLoading || !nextUrl) {
  //      setPage(1)
  //     return;
  //   }
  //   setPage(page + 1)
    
  //   if(selectedFilter?.title === 'All Transactions'){
  //     getHistoryList();
  //   }
  //   else getHistoryStatusList(selectedFilter?.value)
  // }
  const requestData = (itemData) => {
    console.log('itmData===',itemData.item);
    const dateTime = moment(itemData.item.created_at);
    const date = dateTime.format('DD MMM YYYY').toLocaleString('en-US');
    const time = dateTime.format('hh:mm A').toLocaleString('en-US');
    let statusText = itemData.item.status;
    let pointsText = ''; 
    let displayText = '';
    let textColor;
    let textwidth;
    let name;
    
  if(itemData.item.lead === null){
    name = itemData.item.name;
    if(itemData.item.name.length > 8)
    {
      textwidth = '35%'
    }
    else{
      textwidth = 'auto'
    }
    if (itemData.item.status === 'Processing') {
      statusText = 'Processing'; 
      pointsText = '500 Pts'; 
      displayText = itemData.item.quantity;
      textColor = "rgba(31, 134, 255, 1)";
    }
    else if (itemData.item.status === 'Accepted') {
      pointsText = '+500 Pts'; 
      displayText = itemData.item.transaction_id
      textColor = "rgba(24, 183, 88, 1)";
    }
    else{
      displayText = itemData.item.transaction_id
      textColor = "rgba(235, 28, 28, 1)";
      pointsText = '0 Pts'; 
    }
  }
  else {
    name = 'Referral'
    textwidth = 'auto'
    if (itemData.item.status === 'Processing') {
      statusText = 'Processing'; 
      pointsText = '25 Pts'; 
      // displayText = itemData.item.quantity;
       textColor = "rgba(31, 134, 255, 1)";
    }
    else if (itemData.item.status === 'Accepted') {
      pointsText = '25 Pts'; 
      // displayText = itemData.item.transaction_id
       textColor = "rgba(24, 183, 88, 1)";
    }
    else{
    //   displayText = itemData.item.transaction_id
        textColor = "rgba(235, 28, 28, 1)";
        pointsText = '0 Pts'; 
     }
  }
    return(

     <View style={{
      flexDirection: 'row',
      height: 50,
      width: '99%',
      marginTop: 15,
      alignSelf: 'flex-start',
    }}>
        { itemData.item.status === 'Accepted' ? (
          <View style={{backgroundColor: 'rgba(24, 183, 88, 0.2)',
          borderRadius: 8,
          padding: 8,
          height:47,
          marginLeft:15
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
          marginLeft:15
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
          marginLeft:15
          }}>
            {itemData.item.lead !== null ? (
                <LeadRejectedIcon/>
            ): 
            <RejectedIcon/>
        }
          </View>
        )}
        <View style={{flexDirection:'column'}}>
          <View style={{flexDirection:'row', flexWrap: 'nowrap',  marginLeft: 15, alignItems: 'center'}}>
                <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: 'black', width: itemData.item.lead !== null ? 'auto' : textwidth,fontSize:14,fontFamily:'Poppins-Medium'}}>{name}</Text>
                {
                    itemData.item.lead === null && 
                    (
                        <View style={{flexDirection:'row'}}>
                            <Text style={{  fontWeight: '500', fontSize: 5, color: 'rgba(57, 57, 57, 1)',marginTop:5,marginHorizontal:3}}>{'\u2B24'}</Text>
                            <Text style={{color: 'black', fontSize: 13, fontFamily: 'Poppins-Medium'}}>{displayText}</Text>
                        </View>
                    )
                }            
          </View>
          <View style={{flexDirection:'row',flexWrap: 'nowrap',marginLeft:15}}>
            <Text style={{marginHorizontal:3,fontSize:11,color:'black',fontFamily:'Poppins-Regular'}}>{date}</Text>
            <Text style={{fontWeight: '500', fontSize: 5,color:'rgba(57, 57, 57, 1)', marginTop:5,marginHorizontal:5}}>{'\u2B24'}</Text>
            <Text style={{fontSize:11,color:'black',fontFamily:'Poppins-Regular'}}>{time}</Text>
          </View>
        </View>
        <View style={{marginLeft:'auto', marginRight:10}}>
            <Text style={{textAlign:'right', marginRight:5, color : textColor}}>{pointsText}</Text>
          <Text style={{color : 'rgba(57, 57, 57, 1)', fontSize:11,fontFamily:'Poppins-Medium',marginRight:5}}>{statusText.toLocaleUpperCase()}</Text>
        </View>
     </View>
    )
  }
  return (
    <View style={styles.container}>
      <View style={styles.filterSection}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {filterTitle.map((item, index) => {
          return (
            <Pressable
              key={index}
              style={[
                styles.filterContainer,
                selectedFilter.id === item.id && styles.selectedFilter,
              ]}
              onPress={() => {handlePress(item);setPage(1)}}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter.id === item.id && styles.selectedText,
                ]}
              >
                {item.title}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
      </View>
      <View style={styles.flatListSection}> 
      {filteredData.length === 0 ? (
        <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
            <Image
                style={styles.tinyLogo}
                source={require('../../../assets/Images/TransactionsEmpty.png')}
                resizeMode='cover'
              />
              <Text style={{fontFamily:'Poppins-Large',fontWeight:'500',fontSize:16,textAlign:'center',
              margin:22,lineHeight:24,color:'#393939'}}>{t("RequestHistory")}</Text>
              <Text  style={{width:'90%',fontFamily:'Poppins-Regular',fontWeight:'500',fontSize:14,textAlign:'center',
              lineHeight:20,color:'#848484',alignSelf:'center'}}>
              {t("HistoryText")}</Text>
        </View>
  
      ) : (

        <FlatList
            data={filteredData}
            renderItem={requestData}
            keyExtractor={(item) => item.id.toString()}
            onEndReached={endReachedHandler}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        />
      )}          
      {/* <FlatList
          data={filteredData}
          renderItem={requestData}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={endReachedHandler}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
      /> */}
      </View>
      {isLoading && <LoadingIndicator visible={isLoading} text='Loading...'/>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  filterContainer: {
    height: 40,
    borderWidth: 0.5,
    borderRadius: 5,
    marginHorizontal: 8,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    elevation: 8,
    backgroundColor: 'white',
    marginBottom:20
  },
  filterSection: {
    height: 60,
    justifyContent: 'center',
    marginBottom: 10,
  },
  flatListSection: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom:20 
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
});

export default HistoryScreen;