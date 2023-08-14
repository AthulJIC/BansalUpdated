import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Picker,Dimensions } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {
    BarChart,
} from "react-native-chart-kit";
import { ScrollView } from 'react-native-gesture-handler';
const BarGraph = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Weekly', value: 'Weekly' },
        { label: 'Yearly', value: 'Yearly' }
    ]);
    const [chartParentWidth, setChartParentWidth] = useState(0);
    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 5) => `rgba(166, 193, 255, ${opacity})`,
        strokeWidth: 30, // optional, default 3
        // barPercentage: 0.5,
        useShadowColorFromDataset: false, // optional,
        decimalPlaces: 0
    };
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                data: [0,1,2,3,4,5,6]

            }
        ]
    };
    width='25%'
    const screenWidth = Dimensions.get("window").width;
    const barWidth = 340;
    const handleButtonPress = () => {
        // Navigate to the specified route when the button is pressed
        navigation.navigate(label);
    };

    return (
        <View style={styles.mainView} onPress={handleButtonPress}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity style={styles.orderButton}>
                    <Text style={{ height: 16, fontFamily: 'Poppins', lineHeight: 16, fontWeight: '400', fontSize: 11.11, color: '#393939' }}>
                        Orders
                    </Text>
                </TouchableOpacity>
                <DropDownPicker
                    placeholder="Monthly"
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    style={{
                        width: '25%',
                        width:'40%',
                        minHeight: 28,
                        paddingHorizontal: 10,
                        borderColor: 'none',
                        borderWidth: 0,
                        marginTop: 8,
                        borderRadius: 4,
                        fontFamily: 'Poppins',
                        fontWeight: '400',
                        fontSize: 11.11,
                        lineHeight: 16,
                        color: '#393939'
                    }}
                />
            </View>
            <Text style={styles.Text}>Total Orders</Text>
            <Text style={styles.number} >5</Text>
            <View style={{ flex: 1, width: '50%' }} horizontal={true} onLayout={({ nativeEvent }) => setChartParentWidth(nativeEvent.layout.width)}>
            <BarChart
                style={{borderRadius:8,paddingTop :16, paddingRight : 28,paddingLeft:1,marginLeft:2,flex:1}}
                withInnerLines={false}
                strokeWidth= {30}
                data={data}
                width={barWidth}
                height={250}
                chartConfig={chartConfig}
                verticalLabelRotation={0}
                withVerticalLabels={true}
                withHorizontalLabels={true}
                yAxisInterval={10}
            />
            </View>

        </View>
    );
};
const styles = StyleSheet.create({
    mainView: {
        backgroundColor: '#2B59C3',
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 24,
        paddingLeft: 10,
        margin: 20,
        height: 392,
        width: '100%',
        borderRadius: 5,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderRadius: 10,
    },
    Text: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontFamily: 'Poppins',
        fontSize: 13.33,
        lineHeight: 16,
        fontWeight: '500'
    },
    number: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontFamily: 'Poppins',
        fontSize: 23.04,
        lineHeight: 32,
        height: 32,
        fontWeight: '600',
        width: 26
    },
    orderButton: {
        width: 65,
        height: 28,
        radius: 4,
        paddingLeft: 4,
        paddingTop: 8,
        paddingRight: 4,
        paddingBottom: 14,
        backgroundColor: '#ffffff',
        borderRadius: 4,
        alignItems: 'center',
        margin: 8,
        marginRight: 130

    }
});

export default BarGraph;
