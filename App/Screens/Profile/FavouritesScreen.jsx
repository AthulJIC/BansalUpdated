import { Text, View ,ScrollView,FlatList,Animated,StyleSheet,Pressable,Image, ActivityIndicator} from "react-native";
import ReferLead from "../rewards/addressForm";
import { useCallback, useEffect, useState } from "react";
import BookMarkActiveIcon from "../../../assets/Icon/BookmarkActiveIcon";
import BookmarkIcon from "../../../assets/Icon/BookmarkIcon";
import { BookMarkApi, BookMarkListService } from "../../service/Orders/BookMarkService";
import { BookMarkDeleteService } from "../../service/Orders/BookMarkService";
import LoadingIndicator from "../../Components/LoadingIndicator";
import useBackButtonHandler from "../../Components/BackHandlerUtils";
import { useAppContext } from "../../context/AppContext";

function FavouritesScreen({navigation}){
    const [modalVisible, setModalVisible] = useState(false);
    const [bookMarkListValue,setBookMarkListValue]=useState([])
    const [selectedIndices, setSelectedIndices] = useState([]);
    const [isLoading,setisLoading]=useState(false);
    const [IsSelected,setIsSelected]=useState(false)
    const { markBookmarkDeleted } = useAppContext();
    // console.log("bookMarkListValue",bookMarkListValue)
   // useBackButtonHandler(navigation, false);
      let isSelected
      console.log("IsSelected",IsSelected)
    const scrollY = new Animated.Value(0);
    useEffect(() => {
        BookMarkList()
      
    }, [])
    useEffect(() => {
        BookMarkList()
      
    }, [IsSelected])
    const closeModal = () => {
        setModalVisible(false);
    };
    const BookMarkList = () => {
        setisLoading(true)
        BookMarkApi.getBookMarkList().then((res) => {
            console.log("res.data",res.data)
            setBookMarkListValue(prevState => res.data.results);
            setSelectedIndices(bookMarkListValue.map((item, index) => index))
           setisLoading(false)
        })
      
    }
    function chooseHandler(item){
        navigation.navigate('DistributorExpand',{ selectedItem: item })
   }
    const handleRefer = () => {
        navigation.navigate('ConfirmDetail');
      };
      const bookmarkHandler = (itemId,id,isSelected) => {
        // console.log('item===', itemId,id,isSelected)
        const updatedIndices = [...selectedIndices];
        if (!isSelected) {
          BookMarkApi.deleteBookMark(id).then((res) => {
            console.log('del res',res.status)  
            const newList = [...bookMarkListValue];
            newList.splice(itemId,1);
            setBookMarkListValue(newList);
            markBookmarkDeleted(true);
        })
        } else {
          updatedIndices.push(itemId);
        }
        markBookmarkDeleted(false)
        setSelectedIndices(updatedIndices);
      };
    const requestData = (item,index ) => {
        const isSelected = selectedIndices.includes(index);
        setIsSelected(isSelected)
        console.log("isSelected requestData",isSelected)
        const isLoadingBookmark = isLoading && isSelected;
        console.log("item",item)
        return(

            <View style={[styles.card, styles.shadowProp]}>
                <View style={{ borderRadius: 8, backgroundColor: 'rgba(182, 182, 182, 1)', justifyContent: 'center', alignItems: 'center', height: 95, width: '25%', marginLeft: 10, marginRight: 10 }}>
                    <Text style={{ textAlign: 'center', color: 'rgba(57, 57, 57, 1)', fontSize: 27, fontFamily: 'Poppins-Medium', }}>{item?.name?.slice(0, 2)?.toUpperCase()}</Text>
                </View>
                <View style={{width:'60%', height:88}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        
                        <Text style={{fontFamily: 'Poppins-Medium', fontSize: 13,color:'rgba(177, 41, 44, 1)'}}> {item?.user_id}</Text>
                        <Pressable onPress={() => bookmarkHandler(index,item.id,isSelected)}>
                        {isSelected?
                            (
                                (
                                    <BookmarkIcon height={16} width={16} color='#393939'/>
                                )
                            ) : 
                            <BookMarkActiveIcon height={17} width={17} color='rgba(127, 176, 105, 1)'/>
                        }                           
                         </Pressable>
                    </View>
                    <Text style={{fontFamily: 'Poppins-Medium', fontSize: 16,color:'rgba(57, 57, 57, 1)'}}> {item?.name}</Text>
                    <Pressable style={styles.buttonReject} onPress={() =>chooseHandler(item)}>
                        <Text style={styles.buttonText}>Choose</Text>
                    </Pressable>
                </View>
            </View>
        )
    }; 
            
    return(
    <View style={{flex:1, backgroundColor:'white'}}>
        {bookMarkListValue.length===0?
       <View style={{ alignSelf: 'center', backgroundColor: 'white', top: 150 }}>
       <Image
           source={require('../../../assets/Images/favouritesEmpty.png')}
           style={{ height: 150,alignSelf:'center' }}
       />
       <View style={{ marginTop: 20 }}>
           <Text style={{ color: 'rgba(57, 57, 57, 1)', fontSize: 16, fontFamily: 'Poppins-Medium', textAlign: 'center' }}>
           No Favourites
           </Text>
           <Text style={{ color: 'rgba(132, 132, 132, 1)', fontSize: 13, fontFamily: 'Poppins-Regular', textAlign: 'center' }}>
           Start adding Distributors to your favourites list.
           </Text>
       </View>
   </View>
         :
        <FlatList
          data={bookMarkListValue.map((item, index) => ({ ...item, index }))}
          renderItem={({ item, index }) => requestData(item, index)}
            keyExtractor={(item,index) => index.toString()}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: false }
            )}/>}
            <ReferLead isVisible={modalVisible} onClose={closeModal} onRefer={handleRefer}/>
            {isLoading && <LoadingIndicator visible={isLoading} text='Loading...'/>}
        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#f2f2f2',
        borderColor: '#ccc',
        borderRadius: 4,
        borderWidth: 1,
        height: 48,
        backgroundColor: '#ffffff',
        width:'90%',
        alignSelf:'center',
        marginTop:5,
        marginBottom:20

    },
    subContainer: {
        flexDirection: 'row',
        marginLeft: 17,
        alignItems: 'flex-start',

    },
    input: {
        height: 40,
        marginRight: 8,
        color: '#848484',
        alignItems: 'flex-start'
    },
    inputContainer: {
        height: 45,
        width:'90%',
        color: '#848484',
        borderColor:'black',
        borderWidth:0.5,
        borderRadius:5,
        alignSelf:'center',
        marginTop:15,
        paddingLeft:15,
        fontFamily:'Poppins-Regular',
        
    },
    card: {
        backgroundColor: '#ffffff',
        height: 109,
        width: '90%',
        borderRadius: 5,
        borderRadius: 10,
        flexDirection: 'row',
        marginBottom:17,
        alignItems:'center',
        alignSelf:'center',
        justifyContent:'flex-start',
        
        
    },
    centeredView: {
        marginTop: 22,
        width: '100%',
        backgroundColor:'white',
        height:650,
        borderTopRightRadius:9,
        borderTopLeftRadius:9
        
        
    },
    modalView: {
         padding: 16,
         width: '100%',
         height: '100%',
         shadowColor: '#000',
         shadowOffset: {
             width: 0,
             height: 2,
         },
         shadowOpacity: 0.25,
         shadowRadius: 4,
         elevation: 5,
     },
     Modalcard: {
        backgroundColor: '#ffffff',
        height: 130,
        width: '100%',
        borderRadius: 5,
        alignItems:'center',
        borderRadius: 10,
        flexDirection: 'row',
        marginTop: 18,
        alignSelf:'center'
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    buttonReject: {
        marginRight: 8,
        backgroundColor: 'rgba(177, 41, 44, 1)',
        width: '100%',
        height: 36,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontFamily: 'Poppins-Regular',
        color: '#FFFFFF',
    },
    tinyLogo: {
        width: 80,
        height: 90,
        borderRadius: 8,
        marginLeft:10,
        marginHorizontal:20
    },
    dropdown: {
        height: 50,
        width:'50%'
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
        marginLeft:20,
        color:'rgba(57, 57, 57, 1)',
        fontFamily:'Poppins-Regular'
    },
    iconStyle: {
        width: 25,
        height: 25,
        marginRight:29,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    dropdownContainer:{
        marginLeft:15,
    },
    modalButtonContainer: {
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        alignSelf:'center'
      }
})
export default FavouritesScreen;