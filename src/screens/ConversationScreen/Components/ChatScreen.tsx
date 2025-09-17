import {SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View} from "react-native";
import {ChevronLeft} from "lucide-react-native";
import React from "react";

export default function ChatScreen(){
    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <StatusBar barStyle="light-content" backgroundColor="teal" />

            {/* Header */}
            <View className="bg-teal-600 px-4 py-4">
                <View className="flex-row items-center">
                    <TouchableOpacity
                        className="mr-4"
                        // onPress={() => setCurrentScreen('leadInfo')}
                    >
                        <ChevronLeft size={24} color="white" />
                    </TouchableOpacity>
                    <Text className="text-white text-lg font-poppinsSemiBold">Conversation chat</Text>
                </View>
            </View>

            <ScrollView className="flex-1 px-4 py-6">
                <View className="space-y-4">
                    {/* Incoming Message */}
                    <View className="flex-row justify-start">
                        <View className="bg-white p-4 rounded-2xl rounded-tl-md max-w-xs shadow-sm">
                            <Text className="text-black text-base font-poppinsMedium">
                                Hello Demola,{'\n'}What job role is this document is this for?
                            </Text>
                        </View>
                    </View>

                    {/* Outgoing Message */}
                    <View className="flex-row justify-end">
                        <View className="bg-teal-500 p-4 rounded-2xl rounded-tr-md max-w-xs">
                            <Text className="text-white text-base font-poppinsMedium">
                                Technical Project Manager role.{'\n'}Hybrid, 3 days on site a week.
                            </Text>
                        </View>
                    </View>

                    {/* Incoming Message */}
                    <View className="flex-row justify-start">
                        <View className="bg-white p-4 rounded-2xl rounded-tl-md max-w-xs shadow-sm">
                            <Text className="text-black text-base font-poppinsMedium">
                                Hello Demola,{'\n'}What job role is this document is this for?
                            </Text>
                        </View>
                    </View>

                    {/* Outgoing Message */}
                    <View className="flex-row justify-end">
                        <View className="bg-teal-500 p-4 rounded-2xl rounded-tr-md max-w-xs">
                            <Text className="text-white text-base font-poppinsMedium">
                                Technical Project Manager role.{'\n'}Hybrid, 3 days on site a week.
                            </Text>
                        </View>
                    </View>

                    {/* Incoming Message */}
                    <View className="flex-row justify-start">
                        <View className="bg-white p-4 rounded-2xl rounded-tl-md max-w-xs shadow-sm">
                            <Text className="text-black text-base font-poppinsMedium">
                                Hello Demola,{'\n'}What job role is this document is this for?
                            </Text>
                        </View>
                    </View>

                    {/* Outgoing Message */}
                    <View className="flex-row justify-end">
                        <View className="bg-teal-500 p-4 rounded-2xl rounded-tr-md max-w-xs">
                            <Text className="text-white text-base font-poppinsMedium">
                                Technical Project Manager role.{'\n'}Hybrid, 3 days on site a week.
                            </Text>
                        </View>
                    </View>

                    {/* Incoming Message */}
                    <View className="flex-row justify-start">
                        <View className="bg-white p-4 rounded-2xl rounded-tl-md max-w-xs shadow-sm">
                            <Text className="text-black text-base font-poppinsMedium">
                                Hello Demola,{'\n'}What job role is this document is this for?
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
