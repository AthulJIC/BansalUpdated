import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, FlatList } from 'react-native';
import AcceptedIcon from '../../../assets/Icon/AcceptedIcon';
import ProcessingIcon from '../../../assets/Icon/ProcessingIcon';
import RejectedIcon from '../../../assets/Icon/RejectedIcon';

const History = () => {
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
  const data = [
    { id: 1, name: 'John Nick', requestId: 458930, status: "PENDING" , date:'05 AUG 2023', time:'6:00 PM'},
    { id: 2, name: 'Alice Park' , requestId: 458930, status: 'PENDING',date:'05 AUG 2023', time:'6:00 PM' },
    { id: 3, name: 'Bob Marley', requestId: 458930, status: 'ACCEPTED',date:'05 AUG 2023', time:'6:00 PM'},
    { id: 4, name: 'Eva Conklin', requestId: 458930, status: 'REJECTED',date:'05 AUG 2023', time:'6:00 PM' },
    { id: 5, name: 'Michael John', requestId: 458930, status: "REJECTED",date:'05 AUG 2023', time:'6:00 PM' },
    { id: 6, name: 'Sophia Crystal', requestId: 458930, status: 'ACCEPTED',date:'05 AUG 2023', time:'6:00 PM' },
    { id: 7, name: 'David Warner', requestId: 458930, status: 'PENDING',date:'05 AUG 2023' , time:'6:00 PM'},
    { id: 8, name: 'Olivia Steve', requestId: 458930, status: 'ACCEPTED',date:'05 AUG 2023', time:'6:00 PM' },
    { id: 9, name: 'William Shakespeare', requestId: 458930, status: 'REJECTED',date:'05 AUG 2023' , time:'6:00 PM'},
    { id: 10, name: 'Emma Watson', requestId: 458930, status: 'PENDING',date:'05 AUG 2023' , time:'6:00 PM'},
    { id: 11, name: 'Liam Marker', requestId: 458930, status: 'ACCEPTED',date:'05 AUG 2023' , time:'6:00 PM'},
    { id: 12, name: 'Ava Trevor', requestId: 458930, status: 'REJECTED',date:'05 AUG 2023' , time:'6:00 PM'},
    { id: 13, name: 'Noah William', requestId: 458930, status: 'REJECTED',date:'05 AUG 2023' , time:'6:00 PM'},
    { id: 14, name: 'Isabella Steve', requestId: 458930, status: 'PENDING',date:'05 AUG 2023' , time:'6:00 PM'},
    { id: 15, name: 'James Bond', requestId: 458930, status: 'ACCEPTED',date:'05 AUG 2023' , time:'6:00 PM'},
    { id: 16, name: 'Mia Nick', requestId: 458930, status: 'PENDING',date:'05 AUG 2023' , time:'6:00 PM'},
    { id: 17, name: 'Benjamin Conklin', requestId:458930, status: 'REJECTED',date:'05 AUG 2023' , time:'6:00 PM'},
    { id: 18, name: 'Luna Marker', requestId: 458930, status: 'ACCEPTED',date:'05 AUG 2023', time:'6:00 PM' },
    { id: 19, name: 'Lucas Cole', requestId: 458930, status: 'PENDING',date:'05 AUG 2023' , time:'6:00 PM'},
    { id: 20, name: 'Harper Mark', requestId: 458930, status: 'ACCEPTED',date:'05 AUG 2023' , time:'6:00 PM'},
];

  const [selectedFilter, setSelectedFilter] = useState(filterTitle[0]);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    if (selectedFilter.title === 'All Requests') {
      setFilteredData(data); // Show all data for 'All Requests'
    } else {
      const filteredItems = data.filter(item => item.status === selectedFilter.title.toLocaleUpperCase());
      setFilteredData(filteredItems);
    }
  }, [selectedFilter]);

  const handlePress = (item) => {
    //console.log(item.title)
    setSelectedFilter(item);
    if(item.title === 'Pending'){

    }
  };
  const requestData = (itemData) => {
    //console.log(itemData);
    return(

     <View style={{
      flexDirection: 'row',
      height: 50,
      width: '99%',
      marginTop: 15,
      justifyContent: 'space-around',
      alignSelf: 'flex-start',
      // Add this line to align items at the top
    }}>
        { itemData.item.status === 'ACCEPTED' ? (
          <View style={{backgroundColor: 'rgba(24, 183, 88, 0.2)',
          borderRadius: 8,
          padding: 8,
          height:47,
          marginHorizontal:5}}>
            <AcceptedIcon/> 
          </View>
        ) : itemData.item.status === 'PENDING' ? (
          <View style={{backgroundColor: 'rgba(31, 134, 255, 0.2)',
          borderRadius: 8,
          padding: 8,
          height:47,
          marginHorizontal:5}}>
          <ProcessingIcon/>
          </View>
        ) :(
          <View style={{backgroundColor: 'rgba(235, 28, 28, 0.2)',
          borderRadius: 8,
          padding: 8,
          height:47,
          marginHorizontal:5}}>
          <RejectedIcon/>
          </View>
        )}
        <View style={{flexDirection:'column'}}>
          <View style={{flexDirection:'row', flexWrap: 'nowrap'}}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: 'black', width: '37%',fontSize:14,fontFamily:'Poppins-Regular'}}>{itemData.item.name}</Text>            
          <Text style={{  fontWeight: '500', fontSize: 5,color:'rgba(57, 57, 57, 1)', marginTop:5,marginHorizontal:5}}>{'\u2B24'}</Text>
          <Text style={{color:'black',fontSize:14,fontFamily:'Poppins-Regular'}}>{itemData.item.requestId}</Text>
          </View>
          <View style={{flexDirection:'row',flexWrap: 'nowrap'}}>
            <Text style={{marginHorizontal:3,fontSize:11,color:'black',fontFamily:'Poppins-Regular'}}>{itemData.item.date}</Text>
            <Text style={{fontWeight: '500', fontSize: 5,color:'rgba(57, 57, 57, 1)', marginTop:5,marginHorizontal:5}}>{'\u2B24'}</Text>
            <Text style={{fontSize:11,color:'black',fontFamily:'Poppins-Regular'}}>{itemData.item.time}</Text>
          </View>
        </View>
        <View>
          <Text style={{color : itemData.item.status === 'PENDING' ? 'rgba(31, 134, 255, 1)' : itemData.item.status === 'ACCEPTED' ? 'rgba(24, 183, 88, 1)' : 'rgba(235, 28, 28, 1)',fontFamily:'Poppins-Regular',marginRight:5}}>{itemData.item.status}</Text>
        </View>
     </View>
    )
  }
  return (
    <View style={styles.container}>
      <View style={styles.filterSection}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {filterTitle.map((item) => {
          return (
            <Pressable
              key={item.id}
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

export default History;