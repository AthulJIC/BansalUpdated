import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Picker,Dimensions } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { ScrollView } from 'react-native-gesture-handler';
import { BarChart } from 'react-native-gifted-charts';
const BarGraph = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('Monthly');
    const [items, setItems] = useState([
        { label: 'Weekly', value: 'Weekly' },
        { label: 'Yearly', value: 'Yearly' },
        { label: 'Monthly', value: 'Monthly'}
    ]);
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

    return (
        <View style={styles.mainView} onPress={handleButtonPress}>
            <View style={{ flexDirection: 'row',alignItems: 'center', justifyContent:'space-between'}}>
                <TouchableOpacity style={styles.orderButton}>
                    <Text style={{fontFamily: 'Poppins', fontWeight: '600', fontSize: 14, color: '#393939'}}>
                        Orders
                    </Text>
                </TouchableOpacity>
                {/* <DropDownPicker
                    placeholder="Monthly"
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    style={{
                        // width:'40%',
                        // minHeight:30,
                        // borderColor: 'none',
                        // borderWidth: 0,
                        // borderRadius: 4,
                        // fontFamily: 'Poppins',
                        // fontWeight: '400',
                        // fontSize: 11.11,
                        // color: '#393939',
                        // position:'absolute',
                        width: '40%',
    minHeight: 10,
    borderColor: 'none',
    borderWidth: 0,
    borderRadius: 4,
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 11.11,
    color: '#393939',
    position:'absolute'
                    }}
                /> */}
                <View style={{ marginHorizontal: 10,
                    width: "40%",
                    marginTop: 10,
                    borderRadius:4,}}>
                    <DropDownPicker
                        style={{minHeight:28,borderColor:'none',borderWidth:0, borderRadius:4}}
                        open={open}
                        value={value} 
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        onChangeValue={onChange}
                    />
                </View>

            </View>
            <Text style={styles.Text}>Total Orders</Text>
            <Text style={styles.number} >75</Text>
            <View>
            {/* <BarChart
                data={data}
                width={barWidth}
                height={240}
                chartConfig={chartConfig}
                style={{borderRadius:5,marginTop:27}}
                yAxisInterval={5} 
                // verticalLabelRotation={0}
                // withVerticalLabels={true}
                // withHorizontalLabels={true}
                // yAxisInterval={5}
            /> */}
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
        // paddingRight: 20,
        // paddingTop: 20,
        // paddingBottom: 24,
        // paddingLeft: 10,
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
        width: '20%',
        height: 28,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent:'center',
        marginLeft:10,
        borderRadius: 5,
        marginTop:10

    }
});

export default BarGraph;
