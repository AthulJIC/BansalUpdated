import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Picker,Dimensions } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { ScrollView } from 'react-native-gesture-handler';
import { BarChart } from 'react-native-gifted-charts';
import { useTranslation } from 'react-i18next';
const BarGraph = ({role}) => {
    // console.log('roleeee',role)


    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("Monthly");
    const [items, setItems] = useState([
        { label: 'Weekly', value: "Weekly" },
        { label: 'Yearly', value: 'Yearly' },
        { label: 'Monthly', value: 'Monthly'}
    ]);
    const [activeButton, setActiveButton] = useState('Orders');
    const barData = [
        {value: 1, label: 'Jan'},
        {value: 4, label: 'Feb'},
        {value: 9, label: 'Mar'},
        {value: 3, label: 'Apr'},
        {value: 6, label: 'May'},
        {value: 10, label: 'Jun'},
        {value: 8, label: 'Jul'},
        {value: 4.5, label: 'Aug'},
        {value: 7, label: 'Sep'},
        {value: 2.5, label: 'Oct'},
        {value: 5, label: 'Nov'},
        {value: 0.5, label: 'Dec'},
    ]
    
    
    // const [chartParentWidth, setChartParentWidth] = useState(0);
    // const chartConfig = {
    //     backgroundGradientFrom: "#1E2923",
    //     backgroundGradientFromOpacity: 0,
    //     backgroundGradientTo: "#08130D",
    //     backgroundGradientToOpacity: 0,
    //     color: (opacity = 5) => `rgba(255, 255, 255, ${opacity})`,
    //     strokeWidth: 3, // optional, default 3
    //     barPercentage: 0.35,
    //     useShadowColorFromDataset: false, // optional,
    //     decimalPlaces: 0
        
    // };
    // const data = {
    //     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun",'Jul','Aug','Sept','Oct','Nov','Dec'],
    //     datasets: [
    //         {
    //             data: [0,10]

    //         }
    //     ],
    //     barColors: ['rgba(255,255,255,0)']
    // };
    // width='25%'
    // const screenWidth = Dimensions.get("window").width;
    const barWidth =Dimensions.get("window").width - 50;
    const handleButtonPress = () => {
        // Navigate to the specified route when the button is pressed
        navigation.navigate(label);
    };

    function onChange(){

    }
    const handleButton = (buttonName) => {
        setActiveButton(buttonName);
        // Handle button press actions here
      };
    return (
        <View style={styles.mainView} onPress={handleButtonPress}>
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
                        Points
                    </Text>
                    </TouchableOpacity>
                )}
                <View style={{ marginHorizontal: 10,
                    width: "34%",
                    marginTop: 10,
                    borderRadius:6,
                    backgroundColor:'white',
                    marginLeft: 'auto'}}>
                    <Dropdown
                        style={styles.dropdown}
                        //placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        //inputSearchStyle={styles.inputSearchStyle}
                        value={value}
                        iconStyle={styles.iconStyle}
                        data={items}
                        maxHeight={150}
                        labelField="label"
                        valueField="value"
                        iconColor='rgba(57, 57, 57, 1)'
                        // placeholder="Select item"
                        //searchPlaceholder="Search..."
                        // value={value}
                        
                        onChange={item => {
                        setValue(item.value);
                        }}
                        //itemContainerStyle={{ height: 0 }} 
                        itemTextStyle = {{color:'black',fontSize:11,fontFamily:'Poppins-Regular'}}
                        containerStyle={styles.dropdownContainer}
                    />
                </View>
            </View>
            <Text style={styles.Text}>{t('totalorders')}</Text>
            <Text style={styles.number} >75</Text>
            <View>
             <BarChart
                barWidth={12}
                width={290}
                height={100}
                noOfSections={1}
                barBorderRadius={2}
                frontColor="rgba(255,255,255,0.7)"
                data={barData}
                spacing={12}
                maxValue={10}
                initialSpacing={0}
                dashGap={2}
                labelWidth={40}
                xAxisLabelTextStyle={{color: 'white', textAlign:'center',marginRight:19, fontSize:10}}
                yAxisTextStyle={{color:'white',fontSize:10}}
                yAxisLabelTexts={[0, 10]}
                xAxisLength={290}
                yAxisThickness={0}
                xAxisColor={'rgba(255,255,255,0.3)'}
                dashWidth={5}
                hideRules
                showReferenceLine1
                referenceLine1Position={3}
                referenceLine1Config={{
                color: 'rgba(255,255,255,0.3)',
                dashWidth: 2,
                dashGap: 3,
                }}
                showReferenceLine2
                referenceLine2Position={6.5}
                referenceLine2Config={{
                color: 'rgba(255,255,255,0.3)',
                dashWidth: 2,
                dashGap: 3,
                }}
                showReferenceLine3
                referenceLine3Position={10}
                referenceLine3Config={{
                color: 'rgba(255,255,255,0.3)',
                dashWidth: 2,
                dashGap: 3,
                }}
                
                />
            </View>

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
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent:'center',
        marginLeft:10,
        borderRadius: 5,
        marginTop:10

    },
    dropdown: {
        // margin: 10,
        height: 30,
        width:'100%'
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
        // marginLeft:15,
       //height:100
        borderRadius:6
    },
    activeButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)', 
    },
    activeButtonText: {
        color: 'white', // Change this to the desired active text color
    },
    buttonText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 11,
        color: '#393939',
      },

});

export default BarGraph;
