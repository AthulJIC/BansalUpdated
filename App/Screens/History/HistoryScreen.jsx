import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, FlatList } from 'react-native';
import AcceptedIcon from '../../../assets/Icon/AcceptedIcon';
import ProcessingIcon from '../../../assets/Icon/ProcessingIcon';
import RejectedIcon from '../../../assets/Icon/RejectedIcon';
import { HistoryApi } from '../../service/history/historyservice';
import moment from 'moment';
import LeadAcceptedIcon from '../../../assets/Icon/LeadAcceptedIcon';
import LeadProcessingIcon from '../../../assets/Icon/LeadProcessingIcon';
import LeadRejectedIcon from '../../../assets/Icon/LeadRejectedIcon';
import LoadingIndicator from '../../Components/LoadingIndicator';

const HistoryScreen = () => {
  const filterTitle = [
    {
      id: 1,
      title: 'All Transactions',
      value: 'AllTransactions'
    },
    {
      id: 2,
      title: 'Processing',
      value: 'Pending'
    },
    {
      id: 3,
      title: 'Accepted',
      value: 'Accepted'
    },
    {
      id: 4,
      title: 'Rejected',
      value: 'Rejected'
    },
  ];

  const [selectedFilter, setSelectedFilter] = useState(filterTitle[0]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading ] = useState(false); 


  useEffect(() => {
    getHistoryList()
  }, []);
  function getHistoryList(){
    setIsLoading(true);
     HistoryApi.getHistory().then((res) => {
      //  console.log('resssss', res.data)
       if(res.status === 200){
         setFilteredData(res.data.results)
         setIsLoading(false)
      }
     }).catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }
  const handlePress = (item) => {
    setIsLoading(true)
    // console.log('itemmmmm===',item)
    setSelectedFilter(item);
    if(item.title === 'All Transactions'){
      getHistoryList();
    }
    else{
      HistoryApi.getHistoryStatus(item.value).then((res) => {
        // console.log('resssss', res.data)
       if(res.status === 200){
         setFilteredData(res.data.results)
         setIsLoading(false)
      }
      }).catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
    }
  };
  const requestData = (itemData) => {
    //console.log(itemData);
    const dateTime = moment(itemData.item.created_at);
    const date = dateTime.format('DD MMM YYYY').toLocaleString('en-US');
    const time = dateTime.format('hh:mm A').toLocaleString('en-US');
    let statusText = itemData.item.status;
    let pointsText = ''; 
    let displayText = '';
    let textColor;

  if (itemData.item.status === 'Pending') {
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
  }
    return(

     <View style={{
      flexDirection: 'row',
      height: 50,
      width: '99%',
      marginTop: 15,
      //justifyContent: 'space-around',
      alignSelf: 'flex-start',
      // Add this line to align items at the top
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
        ) : itemData.item.status === 'Pending' ? (
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
          <View style={{flexDirection:'row', flexWrap: 'nowrap',  marginLeft: 25, alignItems: 'center'}}>
                <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: 'black', width: itemData.item.lead !== null ? '0' : '27%',fontSize:14,fontFamily:'Poppins-Medium'}}>{itemData.item.name}</Text>
                {
                    itemData.item.lead === null && 
                    (
                        <View style={{flexDirection:'row'}}>
                            <Text style={{  fontWeight: '500', fontSize: 5, color: 'rgba(57, 57, 57, 1)',marginTop:5}}>{'\u2B24'}</Text>
                            <Text style={{color: 'black', fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 5}}>{displayText}</Text>
                        </View>
                    )
                }            
          </View>
          <View style={{flexDirection:'row',flexWrap: 'nowrap',marginLeft:25}}>
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

export default HistoryScreen;