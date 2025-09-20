import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    SafeAreaView, Dimensions,
} from 'react-native';
import {
    Settings,
    Rocket,
    ChevronDown,
    Home,
    MessageCircle,
    Users,
    User,
    Phone, TrendingUp,
} from 'lucide-react-native';
import MenuIcon from "../../assets/svg/MenuIcon.svg";
import TickIcon from "../../assets/svg/TickIcon.svg";
import AlertIcon from "../../assets/svg/AlertIcon.svg";
import CrossIcon from "../../assets/svg/CrossIcon.svg";
import Flower from "../../assets/svg/Flower.svg";
import {LineChart} from 'react-native-chart-kit';
import {useAppNavigation} from "../../common/navigationHelper.ts";

const screenWidth = Dimensions.get('window').width;

export default function DashboardScreen() {
    const navigation = useAppNavigation();
    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                data: [15000, 20000, 15000, 15000, 14000, 18000],
                color: (opacity = 1) => `rgba(134, 239, 172, ${opacity})`, // teal-300 equivalent
                strokeWidth: 2,
            },
        ],
    };

    const chartConfig = {
        backgroundColor: 'transparent',
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        decimalPlaces: 0,
        color: (opacity = 1) => `#aad8d3`,
        labelColor: (opacity = 1) => `rgba(156, 163, 175, ${opacity})`, // gray-400
        style: {
            borderRadius: 16,
        },
        propsForDots: {
            r: '0',
        },
        propsForBackgroundLines: {
            strokeDasharray: '3,3',
            stroke: '#aad8d3',
        },
        fillShadowGradient: '#aad8d3',
        fillShadowGradientOpacity: 1,
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50 px-1">
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-4 pt-6 bg-white">
                <TouchableOpacity>
                    <MenuIcon/>
                </TouchableOpacity>
                <Text className="text-primary text-xl font-poppinsSemiBold">
                    Convogents
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("SectionNavigator", {
                            screen: "AccountSettingsScreen",
                        });
                    }}>
                    <Settings size={24} color="#374151"/>
                </TouchableOpacity>
            </View>

            {/* Enterprise Plan Card */}
            <ScrollView className="flex-1 bg-[#f6f7f9]">
                <View className="mx-4 mt-6 bg-primary rounded-2xl p-6 relative overflow-hidden">
                    {/* Decorative Flower pattern */}
                    <View className="absolute top-0 right-4 w-20 h-20 opacity-80">
                        <Flower/>
                    </View>
                    <Text className="text-white text-xl font-poppinsBold mb-4">
                        Enterprise Plan
                    </Text>

                    {/* Credits Section */}
                    <View className="mb-4">
                        <View className="flex flex-row justify-between items-center">
                            <Text className="text-white text-sm font-poppinsMedium mb-2">
                                Credits:
                            </Text>
                            <Text className="text-white text-xs font-poppinsMedium mb-2">
                                3000 out of 100000 minutes remaining
                            </Text>
                        </View>
                        <View className="w-full h-2 bg-white rounded-full">
                            <View className="w-2/5 h-full bg-[#57a697] rounded-full"/>
                        </View>
                    </View>

                    {/* Agents Section */}
                    <View className="mb-4">
                        <View className="flex flex-row justify-between items-center">
                            <Text className="text-white text-sm font-poppinsMedium mb-2">
                                Agents:
                            </Text>
                            <Text className="text-white text-xs font-poppinsMedium mb-2">
                                2 out of 5 agents used
                            </Text>
                        </View>
                        <View className="w-full h-2 bg-white rounded-full">
                            <View className="w-3/5 h-full bg-[#57a697] rounded-full"/>
                        </View>
                    </View>

                    {/* Info Text */}
                    <View className="flex-row items-center mb-8">
                        <View
                            className="w-4 h-4 border border-white rounded-full mr-2 flex items-center justify-center">
                            <Text className="text-white text-xs">i</Text>
                        </View>
                        <Text className="text-white text-xs font-poppinsMedium flex-1">
                            Get more benefits by upgrading your subscription
                        </Text>
                    </View>

                    {/* Upgrade Button */}
                    <TouchableOpacity className="bg-white rounded-xl py-3 px-4 flex-row items-center justify-center"
                                      onPress={() => {
                                          navigation.navigate("SectionNavigator", {
                                              screen: "SubscriptionScreen",
                                          });
                                      }}>
                        <Rocket size={21} color="#0d9488"/>
                        <Text className="text-primary text-sm font-poppinsSemiBold ml-2">
                            Upgrade Subscription
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Statistics Cards */}
                <View className="flex-row justify-between px-6 mt-6">
                    <View className="flex-1 bg-white rounded-xl p-4 mr-2 items-start">
                        <TickIcon/>
                        <Text className="text-black text-xl font-poppinsSemiBold mt-2">
                            70%
                        </Text>
                        <Text className="text-gray-400 text-xs font-poppinsMedium text-center">
                            Success rate
                        </Text>
                    </View>

                    <View className="flex-1 bg-white rounded-xl p-4 mx-1 items-start">
                        <AlertIcon/>
                        <Text className="text-black text-xl font-poppinsSemiBold mt-2">
                            22%
                        </Text>
                        <Text className="text-gray-400 text-xs font-poppinsMedium">
                            Follow-up required
                        </Text>
                    </View>

                    <View className="flex-1 bg-white rounded-xl p-4 ml-2 items-start">
                        <CrossIcon/>
                        <Text className="text-black text-xl font-poppinsSemiBold mt-2">
                            8%
                        </Text>
                        <Text className="text-gray-400 text-xs font-poppinsMedium text-center">
                            Rejection rate
                        </Text>
                    </View>
                </View>

                {/* Chart Section */}
                <View className="flex-1 bg-gray-50">
                    <View className="mx-4 mt-6 bg-white rounded-xl p-4">
                        <View className="flex-row items-center justify-between mb-4">
                            <Text className="text-black text-2xl font-poppinsSemiBold">
                                20000
                            </Text>
                            <TouchableOpacity className="flex-row items-center">
                                <Text className="text-gray-500 text-sm font-poppinsMedium mr-1">
                                    Last 6 month
                                </Text>
                                <ChevronDown size={16} color="#6b7280"/>
                            </TouchableOpacity>
                        </View>

                        <Text className="text-gray-400 text-sm font-poppinsMedium mb-4">
                            The last 6 months
                        </Text>

                        {/* Area Chart using react-native-chart-kit */}
                        <View className="mb-4">
                            <LineChart
                                data={chartData}
                                width={screenWidth - 40} // Account for margins and padding
                                height={160}
                                chartConfig={chartConfig}
                                bezier
                                style={{
                                    marginVertical: 8,
                                    borderRadius: 16,
                                }}
                                withDots={false}
                                withInnerLines={false}
                                withOuterLines={false}
                                withVerticalLines={false}
                                withHorizontalLines={false}
                                fromZero={false}
                                segments={4}
                            />
                        </View>

                        {/* Trending Information */}
                        <View className="flex-row items-center mb-2">
                            <TrendingUp size={14}/>
                            <Text className="text-black text-sm font-poppinsMedium ml-1">
                                Trending up by 5.2% this month
                            </Text>
                        </View>

                        <Text className="text-gray-400 text-sm font-poppinsMedium">
                            January - June 2024
                        </Text>
                    </View>
                </View>

                {/* Bottom spacing */}
                <View className="h-20"/>
            </ScrollView>

            {/* Bottom Navigation */}
            <View className="bg-white border-t border-gray-200 px-4 py-2">
                <View className="flex-row justify-between items-center">
                    <TouchableOpacity className="items-center py-2 px-3">
                        <Home size={24} color="#0d9488"/>
                        <Text className="text-primary text-xs font-poppinsMedium mt-1">
                            Dashboard
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="items-center py-2 px-3">
                        <MessageCircle size={24} color="#9ca3af"/>
                        <Text className="text-gray-400 text-xs font-poppinsMedium mt-1">
                            Conversation
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="items-center py-2 px-3">
                        <Users size={24} color="#9ca3af"/>
                        <Text className="text-gray-400 text-xs font-poppinsMedium mt-1">
                            Leads
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="items-center py-2 px-3">
                        <User size={24} color="#9ca3af"/>
                        <Text className="text-gray-400 text-xs font-poppinsMedium mt-1">
                            Agent
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="items-center py-2 px-3">
                        <Phone size={24} color="#9ca3af"/>
                        <Text className="text-gray-400 text-xs font-poppinsMedium mt-1">
                            Numbers
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};
