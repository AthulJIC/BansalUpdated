import React, { useState , useEffect} from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Picker,Dimensions } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { BarChart } from 'react-native-gifted-charts';
import { useTranslation } from 'react-i18next';
import { HomeApi } from '../../service/home/homeservice';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon  from 'react-native-vector-icons/MaterialIcons';

const BarGraph = () => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('Monthly');
    const [barWeekData, setBarWeekData] = useState([]);
    const [barValue,setBarValue]=useState()
    const [barMonth,setBarMonth]=useState('')
    const[barQuarter, setBarQuarter] = useState('')
    const [barSpacing, setBarSpacing] = useState(11);
    const [barWidth, setBarWidth] = useState(12);
    const [totalOrders, setTotalOrders] = useState(50);
    const [total, setTotal] = useState('');
    const [role, setRole] = useState('')
    const [isOpen, setIsOpen] = useState(false);
    const [items, setItems] = useState([
        { label:'Weekly', value: 'Weekly' },
        { label:'Monthly', value: 'Monthly'},
        { label:'Quarterly', value: 'Quarterly'},
        
    ]);
    const [activeButton, setActiveButton] = useState('Orders');
    let barData;
    const referenceLine1Position = totalOrders * 0.3; 
    const referenceLine2Position = totalOrders * 0.65;
    const referenceLine3Position = totalOrders;
   
    function barHandler(item){
        setValue(item.value);
        setIsOpen(false);
            if(item.value === 'Monthly'){
                setBarSpacing(11);
                setBarWidth(12)
                getMonthlyOrders();
            }
            else if(item.value === 'Quarterly'){
                setBarSpacing(20)
                setBarWidth(55)
                getQuarterlyOrders();
            }
            else{
                setBarSpacing(25)
                setBarWidth(19)
                getWeeklyOrders();
            }
    }
        if(value === 'Monthly'){
    
            barData = [
                {value: barMonth===1?barValue:'0', label: 'Jan'},
                {value: barMonth===2?barValue:'0', label: 'Feb'},
                {value: barMonth===3?barValue:'0', label: 'Mar'},
                {value: barMonth===4?barValue:'0', label: 'Apr'},
                {value: barMonth===5?barValue:'0', label: 'May'},
                {value: barMonth===6?barValue:'0', label: 'Jun'},
                {value: barMonth===7?barValue:'0', label: 'Jul'},
                {value: barMonth===8?barValue:'0', label: 'Aug'},
                {value: barMonth===9?barValue:'0', label: 'Sep'},
                {value: barMonth===10?barValue:'0', label: 'Oct'},
                {value: barMonth===11?barValue:'0', label: 'Nov'},
                {value: barMonth===12?barValue:'0', label: 'Dec'},
            ]
        }
        else if(value === 'Quarterly'){
    
            barData = [
                {
                    value : barQuarter === 1 ? barValue : '0', label: 'Qtr 1'
                },
                {
                    value : barQuarter === 2 ? barValue : '0', label: 'Qtr 2'
                },
                {
                    value : barQuarter === 3 ? barValue : '0', label: 'Qtr 3'
                }, {
                    value : barQuarter === 4 ? barValue : '0', label: 'Qtr 4'
                },
            ] 
        }
        else if(value === 'Weekly'){
            barData = barWeekData.map((dataPoint) => ({
                value : activeButton === 'Orders' ? dataPoint.order_count : dataPoint.points,
                label : moment(dataPoint.date).format('ddd').toLocaleString('en-US')
            }))
        }
    useEffect(() => {
        const getValueFromStorage = async () => {
            try {
              const user = await AsyncStorage.getItem('role'); 
              setRole(user)
            } catch (error) {
             // console.error('Error fetching data from AsyncStorage:', error);
            }
          };
          
        getValueFromStorage();
        getMonthlyOrders();
        
        
      }, [activeButton]);
  
    function getMonthlyOrders(){
        if(role !== 'Distributor'){
            if(activeButton === 'Orders'){
                HomeApi.getMonthlyOrder().then((res) => {
                    if(res.status === 200){
                        setBarValue(res.data.order_counts_by_month[0].count)
                        setBarMonth(res.data.order_counts_by_month[0].month)
                        setTotalOrders(res.data.total_order_count_current_year)
                        setTotal(res.data.total_order_count_current_year)
                    }
                })
            }
            else{
                HomeApi.getMonthlyPoints().then((res) => {
                    if(res.status === 200){
                        setBarValue(res.data.monthly_points_data[0].total_points)
                        setBarMonth(res.data.monthly_points_data[0].month)
                        setTotalOrders(res.data.total_points_current_year)
                        setTotal(res.data.total_points_current_year)
                    }
                })
            }
        }
        else{
            HomeApi.getDistributorMonthlyOrder().then((res) => {
                if(res.status === 200){
                    setBarValue(res.data.order_counts_by_month[0].count)
                    setBarMonth(res.data.order_counts_by_month[0].month)
                    setTotalOrders(res.data.total_order_count_current_year)
                    setTotal(res.data.total_order_count_current_year)
                }
            })
        }
        
    }
    function getQuarterlyOrders(){
        if(role !== 'Distributor'){
            if(activeButton === 'Orders'){
                HomeApi.getQuarterlyOrder().then((res) => {
                    if(res.status ===200){
                        setBarValue(res.data.order_counts_by_quarter[0].count)
                        setBarQuarter(res.data.order_counts_by_quarter[0].quarter)
                        setTotalOrders(res.data.total_order_count_current_year)
                        setTotal(res.data.total_order_count_current_yearer)
                    }
                })
            }
            else{
                HomeApi.getQuarterlyPoints().then((res) => {
                    if(res.status ===200){
                        setBarValue(res.data.quarterly_points_data[0].total_points)
                        setBarQuarter(res.data.quarterly_points_data[0].quarter)
                        setTotalOrders(res.data.total_points_current_year)
                        setTotal(res.data.total_points_current_year)
                    }
                })
            }
        }
        else{
            HomeApi.getDistributorQuarterlyOrder().then((res) => {
                if(res.status ===200){
                    setBarValue(res.data.order_counts_by_quarter[0].count)
                    setBarQuarter(res.data.order_counts_by_quarter[0].quarter)
                    setTotalOrders(res.data.total_order_count_current_year)
                    setTotal(res.data.total_order_count_current_year)
                }
            })
        }
    }
    function getWeeklyOrders(){
        if( role !== 'Distributor'){
            if(activeButton === 'Orders' ){
                HomeApi.getWeeklyOrder().then((res) => {
                    if(res.status === 200){
                        setBarWeekData(res.data.daily_order_counts);
                        setTotalOrders(res.data.total_order_count_current_week)
                        setTotal(res.data.total_order_count_current_week)
                    }
                })
            }
            else {
                HomeApi.getWeeklyPoints().then((res) => {
                    if(res.status === 200){
                        setBarWeekData(res.data.daily_points);
                        setTotalOrders(res.data.total_points)
                        setTotal(res.data.total_points)
                    }
                })
            }
        }
        else{
            HomeApi.getDistributorWeeklyOrder().then((res) => {
                if(res.status === 200){
                    setBarWeekData(res.data.daily_order_counts);
                    setTotalOrders(res.data.total_order_count_current_week)
                    setTotal(res.data.total_order_count_current_week)
                }
            })
        }
    }
    
    const handleButton = (buttonName) => {
        setActiveButton(buttonName);
        setValue('Monthly')
        setBarSpacing(11);
        setBarWidth(12)
        setBarWeekData([])
        if(buttonName === 'Orders'){
            setTotalOrders(50);
            
        }
        else{
            setTotalOrders(750);
            
        }
      };
    return (
        <View style={styles.mainView}>
            <View style={{ flexDirection: 'row',alignItems: 'center'}}>
                <TouchableOpacity
                    style={[
                        styles.orderButton,
                        activeButton === 'Orders' && styles.activeButton,
                      ]}
                      onPress={() => handleButton('Orders')}
                >
                    <Text
                    style={[
                        styles.buttonText,
                        activeButton === 'Orders' && styles.activeButtonText,]}
                    >
                    {t('orders')}
                    </Text>
                </TouchableOpacity>

                {role !== 'Distributor' && (
                    <TouchableOpacity
                    style={[
                        styles.orderButton,
                        activeButton === 'Points' && styles.activeButton,
                      ]}
                      onPress={() => handleButton('Points')}
                    >
                    <Text
                        style={[
                            styles.buttonText,
                            activeButton === 'Points' && styles.activeButtonText,
                          ]}
                    >
                        {t('points')}
                    </Text>
                    </TouchableOpacity>
                )}
                <View style={{ marginHorizontal: 10,
                    width: "32%",
                    marginTop: 10,
                    borderRadius:6,
                    backgroundColor:'white',
                    marginLeft: 'auto',flexDirection:'row'}}>
                    <Dropdown
                        style={styles.dropdown}
                        selectedTextStyle={styles.selectedTextStyle}
                        value={value}
                        //iconStyle={styles.iconStyle}
                        data={items}
                        //maxHeight={120}
                        labelField="label"
                        valueField="value"
                        iconColor='white'                        
                        onChange={(item) => 
                            barHandler(item)
                        }
                        itemTextStyle = {{color:'black',fontSize:13,fontFamily:'Poppins-Regular',textAlign:'left',marginLeft: -10, height:20}}
                        containerStyle={styles.dropdownContainer}
                        renderRightIcon={() => (
                            <Icon name={isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={27} color="rgba(57, 57, 57, 0.9)" style={{bottom:1.5}}/>
                        )}
                        onFocus={() => setIsOpen(true)}
                        onBlur={() => setIsOpen(false)} 
                    />
                </View>
            </View>
            <Text style={styles.Text}>
                {t('total')} { activeButton === 'Orders' ? t('orders') : t('points')}
            </Text>
            <Text style={styles.number} >{total}</Text>
            { total === 0 ?
                    <View>
                        <Text>--</Text>
                        <Text>Complete your first order to view insights</Text>
                    </View>
                    :
            <View>
             <BarChart
                barWidth={barWidth}
                width={300}
                height={100}
                noOfSections={1}
                barBorderRadius={2} 
                frontColor="rgba(255,255,255,0.7)"
                data={barData}
                spacing={barSpacing}
                maxValue={totalOrders}
                initialSpacing={0}
                dashGap={2}
                labelWidth={40}
                xAxisLabelTextStyle={{color: 'white', textAlign:'center',marginRight:value === 'Quarterly' ? 0 :19, fontSize:10}}
                yAxisTextStyle={{color:'white',fontSize:10}}
                yAxisLabelTexts={[0, totalOrders]}
                xAxisLength={315}
                yAxisThickness={0}
                xAxisColor={'rgba(255,255,255,0.3)'}
                dashWidth={5}
                hideRules
                showReferenceLine1
                referenceLine1Position={referenceLine1Position}
                referenceLine1Config={{
                color: 'rgba(255,255,255,0.3)',
                dashWidth: 2,
                dashGap: 3,
                }}
                showReferenceLine2
                referenceLine2Position={referenceLine2Position}
                referenceLine2Config={{
                color: 'rgba(255,255,255,0.3)',
                dashWidth: 2,
                dashGap: 3,
                }}
                showReferenceLine3
                referenceLine3Position={referenceLine3Position}
                referenceLine3Config={{
                color: 'rgba(255,255,255,0.3)',
                dashWidth: 2,
                dashGap: 3,
                }}
                
                />
               
            </View>
                    
            }

        </View>
    );
};
const styles = StyleSheet.create({
    mainView: {
        backgroundColor: '#2B59C3',
        margin: 20,
        height: 290,
        width: '100%',
        borderRadius: 5,
        borderRadius: 10,
    },
    Text: {
        color: '#FFFFFF',
        fontFamily: 'Poppins',
        fontSize: 15,
        lineHeight: 16,
        fontWeight: '500',
        marginTop:10,
        marginLeft:10
    },
    number: {
        color: '#FFFFFF',
        fontFamily: 'Poppins',
        fontSize: 23,
        fontWeight: '700',
        marginLeft:10,
        marginTop:5
    },
    orderButton: {
        width: '15%',
        height: 28,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        alignItems: 'center',
        justifyContent:'center',
        marginLeft:10,
        borderRadius: 5,
        marginTop:10

    },
    dropdown: {
        height: 30,
        width:'100%',
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 13,
        marginLeft:5,
        color:'rgba(57, 57, 57, 1)',
        fontFamily:'Poppins-Regular'
    },
    iconStyle: {
        width: 25,
        height: 25,
        marginRight:2,
    },
    dropdownContainer:{
        borderRadius:3,
    },
    activeButton: {
        backgroundColor: 'rgba(255, 255, 255, 1)', 
    },
    activeButtonText: {
        color: 'black',
    },
    buttonText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 11,
        color: 'white',
      },

});

export default BarGraph;
