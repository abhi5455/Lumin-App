import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import {
    Menu,
    Settings,
    Rocket,
    CheckCircle,
    AlertTriangle,
    XCircle,
    ChevronDown,
    Home,
    MessageCircle,
    Users,
    User,
    Phone,
} from 'lucide-react-native';

export default function DashboardScreen() {
    return (
        <SafeAreaView className="flex-1 bg-gray-50">
                {/* Header */}
                <View className="flex-row items-center justify-between px-6 py-4 pt-6 bg-white">
                    <TouchableOpacity>
                        <Menu size={24} color="#374151"/>
                    </TouchableOpacity>
                    <Text className="text-primary text-lg font-poppinsBold">
                        Convogents
                    </Text>
                    <TouchableOpacity>
                        <Settings size={24} color="#374151"/>
                    </TouchableOpacity>
                </View>

                {/* Enterprise Plan Card */}
            <ScrollView className="flex-1 px-2">
                <View className="mx-4 mt-6 bg-primary rounded-2xl p-6 relative overflow-hidden">
                    {/* Decorative leaf pattern - using simple View elements */}
                    <View className="absolute top-4 right-4 w-20 h-20 opacity-20">
                        <View className="w-full h-full border border-white rounded-full"/>
                        <View className="absolute top-2 left-2 w-16 h-16 border border-white rounded-full"/>
                        <View className="absolute top-4 left-4 w-12 h-12 border border-white rounded-full"/>
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
                        <View className="w-full h-2 bg-white/20 rounded-full">
                            <View className="w-1/3 h-full bg-white rounded-full"/>
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
                        <View className="w-full h-2 bg-white/20 rounded-full">
                            <View className="w-2/5 h-full bg-white rounded-full"/>
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
                    <TouchableOpacity className="bg-white rounded-xl py-3 px-4 flex-row items-center justify-center">
                        <Rocket size={20} color="#0d9488"/>
                        <Text className="text-primary text-sm font-poppinsSemiBold ml-2">
                            Upgrade Subscription
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Statistics Cards */}
                <View className="flex-row justify-between px-6 mt-6">
                    <View className="flex-1 bg-white rounded-xl p-4 mr-2 items-center">
                        <CheckCircle size={24} color="#10b981"/>
                        <Text className="text-black text-2xl font-poppinsSemiBold mt-2">
                            70%
                        </Text>
                        <Text className="text-gray-500 text-xs font-poppinsMedium text-center">
                            Success rate
                        </Text>
                    </View>

                    <View className="flex-1 bg-white rounded-xl p-4 mx-1 items-center">
                        <AlertTriangle size={24} color="#f59e0b"/>
                        <Text className="text-black text-2xl font-poppinsSemiBold mt-2">
                            22%
                        </Text>
                        <Text className="text-gray-500 text-xs font-poppinsMedium text-center">
                            Follow-up required
                        </Text>
                    </View>

                    <View className="flex-1 bg-white rounded-xl p-4 ml-2 items-center">
                        <XCircle size={24} color="#ef4444"/>
                        <Text className="text-black text-2xl font-poppinsSemiBold mt-2">
                            8%
                        </Text>
                        <Text className="text-gray-500 text-xs font-poppinsMedium text-center">
                            Rejection rate
                        </Text>
                    </View>
                </View>

                {/* Chart Section */}
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

                    {/* Simple Chart Representation */}
                    <View className="h-32 flex-row items-end justify-between mb-4">
                        <View className="flex-1 items-center">
                            <View className="w-full h-20 bg-teal-300 rounded-t-lg mb-2"/>
                            <Text className="text-gray-400 text-xs font-poppinsMedium">Jan</Text>
                        </View>
                        <View className="flex-1 items-center mx-1">
                            <View className="w-full h-24 bg-teal-300 rounded-t-lg mb-2"/>
                            <Text className="text-gray-400 text-xs font-poppinsMedium">Feb</Text>
                        </View>
                        <View className="flex-1 items-center mx-1">
                            <View className="w-full h-16 bg-teal-300 rounded-t-lg mb-2"/>
                            <Text className="text-gray-400 text-xs font-poppinsMedium">Mar</Text>
                        </View>
                        <View className="flex-1 items-center mx-1">
                            <View className="w-full h-12 bg-teal-300 rounded-t-lg mb-2"/>
                            <Text className="text-gray-400 text-xs font-poppinsMedium">Apr</Text>
                        </View>
                        <View className="flex-1 items-center mx-1">
                            <View className="w-full h-18 bg-teal-300 rounded-t-lg mb-2"/>
                            <Text className="text-gray-400 text-xs font-poppinsMedium">May</Text>
                        </View>
                        <View className="flex-1 items-center">
                            <View className="w-full h-28 bg-teal-300 rounded-t-lg mb-2"/>
                            <Text className="text-gray-400 text-xs font-poppinsMedium">Jun</Text>
                        </View>
                    </View>

                    {/* Chart Label */}
                    <View className="flex-row items-center">
                        <View className="w-2 h-2 bg-teal-300 rounded-full mr-2"/>
                        <Text className="text-gray-400 text-xs font-poppinsMedium">200 hr</Text>
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
