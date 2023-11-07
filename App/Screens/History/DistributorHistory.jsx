import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, FlatList,Image,RefreshControl } from 'react-native';
import AcceptedIcon from '../../../assets/Icon/AcceptedIcon';
import ProcessingIcon from '../../../assets/Icon/ProcessingIcon';
import RejectedIcon from '../../../assets/Icon/RejectedIcon';
import { HistoryApi } from '../../service/history/historyservice';
import moment from 'moment';
import LoadingIndicator from '../../Components/LoadingIndicator';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import useBackButtonHandler from '../../Components/BackHandlerUtils';



const DistributorHistory = ({navigation}) => {
  const filterTitle = [
    {
      id: 1,
      title: 'All Requests',
      value : 'AllRequests '
    },
    {
      id: 2,
      title: 'Pending',
      value : 'Processing'
    },
    {
      id: 3,
      title: 'Accepted',
      value : 'Accepted '
    },
    {
      id: 4,
      title: 'Rejected',
      value : 'Rejected '
    },
  ];

  const [selectedFilter, setSelectedFilter] = useState(filterTitle[0]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading ] = useState(false); 
  const [isEndReachedLoading, setIsEndReachedLoading] = useState(false);
  const [page, setPage] =useState(1);
  const [nextUrl, setNextUrl] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useBackButtonHandler(navigation, false);

 useFocusEffect(
    useCallback(() => {
      setPage(1)
      setSelectedFilter(filterTitle[0])
      getHistoryList()
    }, [])
  );
  const onRefresh = useCallback(() => {
    if (isEndReachedLoading || !nextUrl) {
      setPage(1)
      return;
    }
    setRefreshing(true);

    if (selectedFilter.title === 'All Requests') {
      getHistoryList();
    } else {
      getDistributorHistory(selectedFilter.value);
    }

    setRefreshing(false);
  }, [selectedFilter, getHistoryList, getDistributorHistory]);

  function getHistoryList(){
    setIsLoading(true);
    // setIsEndReachedLoading(true);
    console.log('getHistoryList page', page)
    //console.log('next===', next)
    HistoryApi.getDistributorHistory(page).then((res) => {
    if (res.status === 200) {
      if (res.data.results.length > 0) {
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
    setIsLoading(false)
  });
  }
  const handlePress = useCallback(
    (item) => {
      console.log('handlePress', item);
      setPage(1);
      console.log('handlePress1', page)
      setFilteredData([]);
      setIsLoading(true);
      setSelectedFilter(item);
      if (item.title === 'All Requests') {
        getHistoryList();
      } else {
       // alert('test');
        getDistributorHistory(item.value);
      }
    },
    [getHistoryList, getDistributorHistory]
  );
  function getDistributorHistory(item){
    console.log('page3', item)
    setIsLoading(true);
    
    HistoryApi.getDistributorStatus(page,item).then((res) => {
      if (res.status === 200) {
        if (res.data.results.length > 0) {
          if (page == 1) {
            setFilteredData(res.data.results);
          }
          else {
            setFilteredData([...filteredData, ...res.data.results]);
          }
         // setPage(page + 1);
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
      setIsLoading(false)
    });
  }
  async function endReachedHandler() {
    console.log('end', isEndReachedLoading)
    if (isEndReachedLoading || !nextUrl) {
      setPage(1)
      return;
   }
    setPage(page + 1)
    setIsEndReachedLoading(true); 
    if(selectedFilter?.title === 'All Requests'){
      getHistoryList();
    }
    else getDistributorHistory(selectedFilter?.value)
  }
  const requestData = (itemData) => {
    if (itemData.item && itemData.item.updated_at) {
      const dateTime = moment(itemData.item.updated_at);
      const date = dateTime.format('DD MMM YYYY').toLocaleString('en-US');
      const time = dateTime.format('hh:mm A').toLocaleString('en-US');
      let statusText = itemData.item.user_approval;
      if (itemData.item.user_approval === 'Processing') {
        statusText = 'Pending'
      }
      return (
        <View
          style={{
            flexDirection: 'row',
            height: 50,
            width: '99%',
            marginTop: 15,
            alignSelf: 'flex-start',
          }}
        >
          {itemData.item.user_approval === 'Accepted' ? (
            <View
              style={{
                backgroundColor: 'rgba(24, 183, 88, 0.2)',
                borderRadius: 8,
                padding: 8,
                height: 47,
                marginLeft: 15,
              }}
            >
              <AcceptedIcon />
            </View>
          ) : itemData.item.user_approval === 'Processing' ? (
            <View
              style={{
                backgroundColor: 'rgba(31, 134, 255, 0.2)',
                borderRadius: 8,
                padding: 8,
                height: 47,
                marginLeft: 15,
              }}
            >
              <ProcessingIcon />
            </View>
          ) : (
            <View
              style={{
                backgroundColor: 'rgba(235, 28, 28, 0.2)',
                borderRadius: 8,
                padding: 8,
                height: 47,
                marginLeft: 15,
              }}
            >
              <RejectedIcon />
            </View>
          )}
          <View style={{ flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row', flexWrap: 'nowrap', marginLeft: 25 }}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{ color: 'black',fontSize: 14, fontFamily: 'Poppins-Medium', width:'30%' }}
              >
                {itemData.item.name}
              </Text>
              <Text style={{ fontWeight: '500', fontSize: 5, color: 'rgba(57, 57, 57, 1)', marginTop:7, marginLeft:2 }}>
                {'\u2B24'}
              </Text>
              {/* <Text style={{ fontWeight: '500', fontSize: 13, color: 'rgba(57, 57, 57, 1)' ,fontFamily: 'Poppins-Regular',marginLeft:3}}>
                {itemData.item.transaction_id}
              </Text> */}
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'nowrap', marginLeft: 25 }}>
              <Text style={{ marginHorizontal: 3, fontSize: 11, color: 'black', fontFamily: 'Poppins-Regular' }}>{date}</Text>
              <Text style={{ fontWeight: '500', fontSize: 5, color: 'rgba(57, 57, 57, 1)', marginTop: 5, marginHorizontal: 5 }}>
                {'\u2B24'}
              </Text>
              <Text style={{ fontSize: 11, color: 'black', fontFamily: 'Poppins-Regular' }}>{time}</Text>
            </View>
          </View>
          <View style={{ marginLeft: 'auto', marginRight: 15 }}>
            <Text style={{ color: itemData.item.user_approval === 'Processing' ? 'rgba(31, 134, 255, 1)' : itemData.item.user_approval === 'Accepted' ? 'rgba(24, 183, 88, 1)' : 'rgba(235, 28, 28, 1)', fontFamily: 'Poppins-Medium', marginRight: 5 }}>
              {statusText.toLocaleUpperCase()}
            </Text>
          </View>
        </View>
      );
    } else {
      return null;
    }
  };
  
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
              onPress={() => {
                setPage(1);
                handlePress(item);
              }}
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
              margin:22,lineHeight:24,color:'#393939'}}>No Request History</Text>
              <Text  style={{width:'90%',fontFamily:'Poppins-Regular',fontWeight:'500',fontSize:14,textAlign:'center',
              lineHeight:20,color:'#848484',alignSelf:'center'}}>
              We don’t see any records from your history.</Text>
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
      </View>
      {isLoading && <LoadingIndicator visible={isLoading} text='Loading...'></LoadingIndicator>}
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
  tinyLogo: {
    width: '50%',
    height: 145,
    borderRadius: 8,
    //marginLeft: 10,
    //marginHorizontal: 20,
    alignSelf:'center'
},
});

export default DistributorHistory;