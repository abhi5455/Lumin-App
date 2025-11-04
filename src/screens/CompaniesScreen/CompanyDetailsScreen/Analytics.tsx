import {Dimensions, Text, View} from "react-native";
import {BarChart, PieChart} from "react-native-chart-kit";
import {BarChart2Icon, BarChart3Icon, ChartNoAxesCombined, PieChartIcon} from "lucide-react-native";

const departmentData = [
    {name: "CSE", value: 89, color: "#14b8a6"}, // Main teal
    {name: "RAI", value: 67, color: "#0d9488"}, // Darker teal
    {name: "ECE", value: 45, color: "#0f766e"}, // Deep teal
    {name: "ME", value: 33, color: "#115e59"}, // Very dark teal
    {name: "CE", value: 28, color: "#5eead4"}, // Light teal
    {name: "EEE", value: 35, color: "#2dd4bf"}, // Medium light teal
]

const yearlyPlacements = [
    {year: "2020", placed: 14},
    {year: "2021", placed: 5},
    {year: "2022", placed: 9},
    {year: "2023", placed: 20},
    {year: "2024", placed: 23},
];

export default function Analytics() {
    const screenWidth = Dimensions.get("window").width;
    const barData = {
        labels: yearlyPlacements.map(item => item.year),
        datasets: [
            {
                data: yearlyPlacements.map(item => item.placed),
            },
        ],
    };

    return (
        <View className="flex flex-col justify-center px-5 mt-5 gap-4">
            <View
                className="flex flex-col justify-center gap-2 border-[1px] bg-gray-100/40 border-primary rounded-xl p-2 mt-5">
                <View className="flex flex-row items-center gap-3">
                    <View
                        className="flex justify-center items-center self-start mt-2 ml-2 bg-[#DAA520]/10 w-12 h-12 rounded-full">
                        <BarChart3Icon size={19} color={"#DAA520"}/>
                    </View>
                    <View className="flex-1">
                        <Text className="font-poppinsMedium text-lg">
                            Department Distribution
                        </Text>
                    </View>
                </View>
                <PieChart
                    data={departmentData}
                    width={screenWidth - 20}
                    height={220}
                    chartConfig={{
                        backgroundColor: "#FF8000",
                        backgroundGradientFrom: "#FF8000",
                        backgroundGradientTo: "#FF8000",
                        color: (opacity = 1) => `rgba(0, 106, 99, ${opacity})`,
                    }}
                    accessor={"value"}
                    backgroundColor={"transparent"}
                    paddingLeft={"15"}
                    absolute
                />
            </View>


            <View
                className="flex flex-col justify-center items-center gap-4 border-[1px] bg-gray-100/40 border-primary rounded-xl p-2 mt-5 pb-4">
                <View className="flex flex-row items-center gap-3">
                    <View
                        className="flex justify-center items-center self-start mt-2 ml-2 bg-[#DAA520]/10 w-12 h-12 rounded-full">
                        <ChartNoAxesCombined size={19} color={"#DAA520"}/>
                    </View>
                    <View className="flex-1">
                        <Text className="font-poppinsMedium text-lg">
                            Hiring Trend
                        </Text>
                    </View>
                </View>
                <BarChart
                    data={barData}
                    width={screenWidth - 60}
                    height={230}
                    fromZero
                    yAxisLabel=""
                    yAxisSuffix=""
                    chartConfig={{
                        backgroundColor: "#F9FAFB66",
                        backgroundGradientFrom: "#F9FAFB66",
                        backgroundGradientTo: "#F9FAFB66",
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(0, 106, 99, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        barPercentage: 0.6,
                    }}
                    showValuesOnTopOfBars
                    style={{
                        borderRadius: 8,
                    }}
                />
            </View>

            <View className="min-h-[30px]"/>
        </View>
    );
}
