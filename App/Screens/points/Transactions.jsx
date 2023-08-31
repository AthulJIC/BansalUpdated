import { useState } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import AcceptedIcon from "../../../assets/Icon/AcceptedIcon";
import ProcessingIcon from "../../../assets/Icon/ProcessingIcon";
import RejectedIcon from "../../../assets/Icon/RejectedIcon";
import ArrowDown from "../../../assets/Icon/Arrowdown";
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
    { id: 1, name: '135687', requestId: 65, status: "Processing" , date:'05 AUG 2023', time:'6:00 PM',points:'600'},
    { id: 2, name: ' 135687' , requestId: 10, status: 'Processing',date:'05 AUG 2023', time:'6:00 PM',points:'400' },
    { id: 3, name: '135687', requestId: 45, status: 'ACCEPTED',date:'05 AUG 2023', time:'6:00 PM',points:'900'},
    { id: 6, name: '135687', requestId: 30, status: 'ACCEPTED',date:'05 AUG 2023', time:'6:00 PM',points:'250' },
    { id: 7, name: '135687', requestId: 30, status: 'Processing',date:'05 AUG 2023' , time:'6:00 PM',points:'490'},
    { id: 8, name: '135687', requestId: 30, status: 'ACCEPTED',date:'05 AUG 2023', time:'6:00 PM',points:'900' },
    { id: 9, name: '135687', requestId: 30, status: 'REJECTED',date:'05 AUG 2023' , time:'6:00 PM',points:'100'},
    { id: 10, name: '135687', requestId: 45, status: 'Processing',date:'05 AUG 2023' , time:'6:00 PM',points:'200'},
    { id: 11, name: '135687', requestId: 45, status: 'ACCEPTED',date:'05 AUG 2023' , time:'6:00 PM',points:'300'},
    { id: 12, name: '135687', requestId: 90, status: 'REJECTED',date:'05 AUG 2023' , time:'6:00 PM',points:'490'},
    { id: 13, name: '135687', requestId: 30, status: 'REJECTED',date:'05 AUG 2023' , time:'6:00 PM',points:'890'},
    { id: 14, name: '135687', requestId: 45, status: 'PENDING',date:'05 AUG 2023' , time:'6:00 PM',points:'990'},
    { id: 15, name: '135687', requestId: 30, status: 'ACCEPTED',date:'05 AUG 2023' , time:'6:00 PM',points:'400'},
    { id: 16, name: '135687', requestId: 45, status: 'Processing',date:'05 AUG 2023' , time:'6:00 PM',points:'499'},
    { id: 17, name: '135687', requestId:30, status: 'REJECTED',date:'05 AUG 2023' , time:'6:00 PM',points:'780'},
    { id: 18, name: '135687', requestId: 40, status: 'ACCEPTED',date:'05 AUG 2023', time:'6:00 PM' ,points:'400'},
    { id: 19, name: '135687', requestId: 50, status: 'Processing',date:'05 AUG 2023' , time:'6:00 PM',points:'380'},
    { id: 20, name: '135687', requestId: 80, status: 'ACCEPTED',date:'05 AUG 2023' , time:'6:00 PM',points:'240'},
];
const Transactions=()=>{
    const [selectedFilter, setSelectedFilter] = useState(filterTitle[0]);
    const [filteredData, setFilteredData] = useState(data);
    const requestData = (itemData) => {
        console.log(itemData);
        return(
    
         <View style={{
          flexDirection: 'row',
          height: 50,
          width: '99%',
          marginTop: 15,
          paddingRight:24
        //   justifyContent: 'space-between',
        }}>
            { itemData.item.status === 'ACCEPTED' ? (
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
              <Text  style={{ color: 'black', fontSize:14,fontFamily:'Poppins-Regular'}}>{itemData.item.name}</Text>            
              <Text style={{  fontWeight: '500', fontSize: 5,color:'rgba(57, 57, 57, 1)', marginTop:5,marginHorizontal:5}}>{'\u2B24'}</Text>
              <Text style={{color:'black',fontSize:14,fontFamily:'Poppins-Regular'}}>{itemData.item.requestId} Tons</Text>
              </View>
              <View style={{flexDirection:'row',flexWrap: 'nowrap'}}>
                <Text style={{marginHorizontal:3,fontSize:11,color:'black',fontFamily:'Poppins-Regular'}}>{itemData.item.date}</Text>
                <Text style={{fontWeight: '500', fontSize: 5,color:'rgba(57, 57, 57, 1)', marginTop:5,marginHorizontal:5}}>{'\u2B24'}</Text>
                <Text style={{fontSize:11,color:'black',fontFamily:'Poppins-Regular'}}>{itemData.item.time}</Text>
              </View>
            </View>
            <View style={{marginLeft:'auto',justifyContent:'flex-end'}}>
              <Text style={{color : itemData.item.status === 'Processing' ? '#1F86FF' : itemData.item.status === 'ACCEPTED' ? 'rgba(24, 183, 88, 1)' : 'rgba(235, 28, 28, 1)',
              fontFamily:'Poppins-Regular',textAlign:'right'}}>{itemData.item.points}Pts</Text>
              <Text style={{fontSize:11.11,lineHeight:16,fontFamily:'Poppins-Regular',textAlign:'right',color:'#393939'}}>{itemData.item.status}</Text>
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
      <FlatList
          data={filteredData}
          renderItem={requestData}
          keyExtractor={(item) => item.id.toString()}
      />
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
        width:'328',
        marginLeft:20,
        paddingTop:20,
        paddingBottom:20,
        borderRadius:10
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
        height: 60, // Adjust as needed
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
})