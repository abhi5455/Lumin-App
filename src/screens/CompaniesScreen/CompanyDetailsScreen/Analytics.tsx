import {Dimensions, FlatList, Text, View} from "react-native";
import {BarChart, PieChart} from "react-native-chart-kit";
import {
    BarChart3Icon,
    ChartNoAxesCombined,
    HandCoins,
    Handshake,
    History,
    TrendingUp,
} from "lucide-react-native";
import {ICompany} from "../../../types/typeCompany.ts";

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

export default function Analytics({company}: { company: ICompany }) {
    const screenWidth = Dimensions.get("window").width;
    const barData = {
        labels: yearlyPlacements.map(item => item.year),
        datasets: [
            {
                data: yearlyPlacements.map(item => item.placed),
            },
        ],
    };

    const metricsData = [
        {
            id: "1",
            icon: TrendingUp,
            label: "Total Hires",
            value: company?.total_hires,
        },
        {
            id: "2",
            icon: HandCoins,
            label: "Average Salary",
            value: company?.avg_salary,
        },
        {
            id: "3",
            icon: History,
            label: "Last Recruited",
            value: company?.last_recruited,
        },
        {
            id: "4",
            icon: Handshake,
            label: "Service Agreement",
            value: `${company?.agreement} yrs`,
        },
    ]

    return (
        <View className="flex flex-col justify-center px-5 mt-5 gap-4">
            <View
                className="flex flex-col justify-center gap-1 border-[1px] bg-gray-100/40 border-[#006a63]/50 rounded-xl p-2">
                <View className="flex flex-row items-start w-full gap-4 mt-2">
                    <View
                        className="flex justify-center items-center self-start ml-2 bg-primary/10 w-[45px] h-[45px] rounded-full">
                        <BarChart3Icon size={19} color={"#006a63"}/>
                    </View>
                    <View className="">
                        <Text className="font-poppinsMedium text-lg">Department Distribution</Text>
                        <Text className="font-poppinsLight text-gray-600 text-[13px]">Hiring across academic streams</Text>
                    </View>
                </View>
                <PieChart
                    data={departmentData}
                    width={screenWidth - 20}
                    height={220}
                    chartConfig={{
                        backgroundColor: "#006a63",
                        backgroundGradientFrom: "#006a63",
                        backgroundGradientTo: "#006a63",
                        color: (opacity = 1) => `rgba(0, 106, 99, ${opacity})`,
                    }}
                    accessor={"value"}
                    backgroundColor={"transparent"}
                    paddingLeft={"15"}
                    absolute
                />
            </View>


            <View
                className="flex flex-col justify-center items-center gap-4 border-[1px] bg-gray-100/40 border-[#006a63]/50 rounded-xl p-2 pb-4">

                <View className="flex flex-row items-start w-full gap-4 mt-2">
                    <View
                        className="flex justify-center items-center self-start ml-2 bg-primary/10 w-[45px] h-[45px] rounded-full">
                        <ChartNoAxesCombined size={19} color={"#006a63"}/>
                    </View>
                    <View className="">
                        <Text className="font-poppinsMedium text-lg">Hiring Trend</Text>
                        <Text className="font-poppinsLight text-gray-600 text-[13px]">Year-wise hiring statistics and trends</Text>
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

            <View className="border-[1px] bg-gray-100/35 border-[#006a63]/50 rounded-xl overflow-hidden">
                <FlatList
                    data={metricsData}
                    keyExtractor={(item) => item.id}
                    scrollEnabled={false}
                    renderItem={({ item, index }) => {
                        const IconComponent = item.icon
                        const isLastItem = index === metricsData.length - 1
                        return (
                            <View
                                className={`flex flex-row items-center gap-4 p-4 ${!isLastItem ? "border-b-[1px] border-[#006a63]/20" : ""}`}
                            >
                                <View className="flex justify-center items-center bg-primary/10 w-12 h-12 rounded-full shrink-0">
                                    <IconComponent size={19} color={"#006a63"} />
                                </View>
                                <View className="flex-1">
                                    <Text className="font-poppinsLight text-gray-800 text-[13px]">{item.label}</Text>
                                    <Text className="font-poppinsMedium text-lg text-[#006a63]">{item.value}</Text>
                                </View>
                            </View>
                        )
                    }}
                />
            </View>

            <View className="min-h-[30px]"/>
        </View>
    );
}
