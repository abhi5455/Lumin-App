import {SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View} from "react-native";
import {ChevronLeft, Phone} from "lucide-react-native";
import React from "react";
import {useAppNavigation} from "../../../common/navigationHelper.ts";

export default function LeadInfoScreen() {
    const navigation = useAppNavigation()

    return (

        <SafeAreaView className="flex-1 bg-white">

            {/* Header */}
            <View className="bg-primary px-4 py-4">
                <View className="flex-row items-center">
                    <TouchableOpacity
                        className="mr-4"
                        onPress={() => navigation.goBack()}
                    >
                        <ChevronLeft size={24} color="white" />
                    </TouchableOpacity>
                    <Text className="text-white text-lg font-poppinsSemiBold">Lead Information</Text>
                </View>
            </View>

            <ScrollView className="flex-1 px-4 py-6">
                {/* Profile Section */}
                <View className="flex-row items-center mb-6">
                    <View className="w-12 h-12 bg-teal-600 rounded-full items-center justify-center mr-4">
                        <Text className="text-white text-lg font-poppinsSemiBold">A</Text>
                    </View>
                    <View className="flex-1">
                        <Text className="text-black text-xl font-poppinsSemiBold">Adam</Text>
                        <Text className="text-gray-500 text-sm font-poppinsMedium">+912545788</Text>
                    </View>
                    <View className="bg-green-100 px-3 py-1 rounded-full">
                        <Text className="text-green-600 text-xs font-poppinsMedium">Resolved</Text>
                    </View>
                </View>

                {/* Info Sections */}
                <View className="space-y-6">
                    <View>
                        <Text className="text-gray-400 text-xs font-poppinsMedium uppercase tracking-wide mb-2">EMAIL</Text>
                        <Text className="text-black text-base font-poppinsMedium">enos.bogisich@orland.tv</Text>
                    </View>

                    <View>
                        <Text className="text-gray-400 text-xs font-poppinsMedium uppercase tracking-wide mb-2">TIME</Text>
                        <Text className="text-black text-base font-poppinsMedium">07:30-08:30 PM</Text>
                    </View>

                    <View>
                        <Text className="text-gray-400 text-xs font-poppinsMedium uppercase tracking-wide mb-2">DATE</Text>
                        <Text className="text-black text-base font-poppinsMedium">18-10-2025</Text>
                    </View>

                    <View>
                        <Text className="text-gray-400 text-xs font-poppinsMedium uppercase tracking-wide mb-2">AGENT</Text>
                        <Text className="text-black text-base font-poppinsMedium">Chris</Text>
                    </View>

                    <View>
                        <Text className="text-gray-400 text-xs font-poppinsMedium uppercase tracking-wide mb-2">DURATION</Text>
                        <Text className="text-black text-base font-poppinsMedium">30 min</Text>
                    </View>

                    <View>
                        <Text className="text-gray-400 text-xs font-poppinsMedium uppercase tracking-wide mb-2">CALL TYPE</Text>
                        <View className="flex-row items-center">
                            <Phone size={16} color="green" className="mr-2" />
                            <Text className="text-black text-base font-poppinsMedium">Inbound Calls</Text>
                        </View>
                    </View>

                    <View>
                        <Text className="text-gray-400 text-xs font-poppinsMedium uppercase tracking-wide mb-2">CONVERSATION</Text>
                        <Text className="text-black text-base font-poppinsMedium leading-6">
                            Born and raised in Pennsylvania, Swift moved to Nashville, Tennessee, at the age of 14 to pursue a career in country music. She signed with the label Big Machine Records and became the youngest artist ever signed by the Sony/ATV Music publishing house.
                        </Text>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Button */}
            <View className="">
                <TouchableOpacity
                    className="bg-teal-600 py-5"
                    onPress={() => {
                        navigation.navigate("SectionNavigator", {
                            screen: "ChatScreen",
                        });
                    }}
                >
                    <Text className="text-white text-center text-lg font-poppinsSemiBold">View Conversation</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
