import { useEffect, useState } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import AcceptedIcon from "../../../assets/Icon/AcceptedIcon";
import ProcessingIcon from "../../../assets/Icon/ProcessingIcon";
import RejectedIcon from "../../../assets/Icon/RejectedIcon";
import ArrowDown from "../../../assets/Icon/Arrowdown";
import { TransactionAPI } from "../../service/Points/TransactionService";
import moment from 'moment';
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
const Transactions=()=>{
    const [selectedFilter, setSelectedFilter] = useState(filterTitle[0]);
    const [filteredData, setFilteredData] = useState([]);
    const [dateTime,setDateTime]=useState('')
    useEffect(() => {
      transactions()
    }, []);
    const transactions=()=>{
      TransactionAPI().then((res) => {
        // console.log("res",res)
          if(res.status === 200){
              console.log('success',)
              setFilteredData(res.data.results)
              setDateTime(res.data.results.item.created_at)
          }
      })
  }
    const requestData = (itemData) => {
        const createdAt = moment(itemData.item.created_at);
        const Date = createdAt.format('DD MMM YYYY');
        const Time = createdAt.format('h:mm A');
        let leads= itemData.item.id
        return(
    
         <View style={{
          flexDirection: 'row',
          height: 50,
          width: '99%',
          marginTop: 15,
          paddingRight:24
        //   justifyContent: 'space-between',
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
              <Text  style={{ color: 'black', fontSize:14,fontFamily:'Poppins-Regular'}}>{itemData.item.id}</Text>            
              <Text style={{  fontWeight: '500', fontSize: 5,color:'rgba(57, 57, 57, 1)', marginTop:5,marginHorizontal:5}}>{'\u2B24'}</Text>
              <Text style={{color:'black',fontSize:14,fontFamily:'Poppins-Regular'}}>{`${itemData.item.requestId}  string text`}hi
                {/* `${itemData.item.requestId}` Tons */}
                </Text>
                </View>): 
                <Text  style={{ color: 'black', fontSize:14,fontFamily:'Poppins-Regular'}}>{leads}</Text> }
              </View>
              <View style={{flexDirection:'row',flexWrap: 'nowrap'}}>
                <Text style={{marginHorizontal:3,fontSize:11,color:'black',fontFamily:'Poppins-Regular'}}>{Date}</Text>
                <Text style={{fontWeight: '500', fontSize: 5,color:'rgba(57, 57, 57, 1)', marginTop:5,marginHorizontal:5}}>{'\u2B24'}</Text>
                <Text style={{fontSize:11,color:'black',fontFamily:'Poppins-Regular'}}>{Time}</Text>
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