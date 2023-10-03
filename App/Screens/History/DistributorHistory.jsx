import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, FlatList } from 'react-native';
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
    },
    {
      id: 2,
      title: 'Pending',
    },
    {
      id: 3,
      title: 'Accepted',
    },
    {
      id: 4,
      title: 'Rejected',
    },
  ];

  const [selectedFilter, setSelectedFilter] = useState(filterTitle[0]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading ] = useState(false); 
  useBackButtonHandler(navigation, false);

 useFocusEffect(
    useCallback(() => {
      setSelectedFilter(filterTitle[0])
      getHistoryList()
    }, [])
  );
  function getHistoryList(){
    setIsLoading(true);
     HistoryApi.getDistributorHistory().then((res) => {
      //  console.log('resssss', res.data)
       if(res.status === 200){
         setFilteredData(res.data.results)
         setIsLoading(false)
      }
     }).catch((err) => {
      //console.log(err);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }
  const handlePress = (item) => {
    setIsLoading(true)
    // console.log('itemmmmm===',item)
    setSelectedFilter(item);
    if(item.title === 'All Requests'){
      getHistoryList();
    }
    else{
      HistoryApi.getDistributorStatus(item.title).then((res) => {
        // console.log('resssss', res.data)
       if(res.status === 200){
         setFilteredData(res.data.results)
         setIsLoading(false)
      }
      }).catch((err) => {
        //console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
    }
  };
  const requestData = (itemData) => {
    if (itemData.item && itemData.item.created_at) {
      const dateTime = moment(itemData.item.created_at);
      const date = dateTime.format('DD MMM YYYY').toLocaleString('en-US');
      const time = dateTime.format('hh:mm A').toLocaleString('en-US');
  
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
          ) : itemData.item.user_approval === 'Pending' ? (
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
                style={{ color: 'black', width: '37%', fontSize: 14, fontFamily: 'Poppins-Medium' }}
              >
                {itemData.item.name}
              </Text>
              <Text style={{ fontWeight: '500', fontSize: 5, color: 'rgba(57, 57, 57, 1)', marginTop: 5, marginHorizontal: 5 }}>
                {'\u2B24'}
              </Text>
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
            <Text style={{ color: itemData.item.user_approval === 'Pending' ? 'rgba(31, 134, 255, 1)' : itemData.item.user_approval === 'Accepted' ? 'rgba(24, 183, 88, 1)' : 'rgba(235, 28, 28, 1)', fontFamily: 'Poppins-Medium', marginRight: 5 }}>
              {itemData.item.user_approval.toLocaleUpperCase()}
            </Text>
          </View>
        </View>
      );
    } else {
      // Handle the case when itemData.item or itemData.item.created_at is missing
      return null; // You can return null or some default content or an error message here
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
              onPress={() => handlePress(item)}
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
      <FlatList
          data={filteredData}
          renderItem={requestData}
          keyExtractor={(item) => item.id.toString()}
      />
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
    height: 60, // Adjust as needed
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

export default DistributorHistory;