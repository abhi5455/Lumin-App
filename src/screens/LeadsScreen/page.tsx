import {SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {EllipsisVertical, Settings} from "lucide-react-native";
import MenuIcon from '../../assets/svg/MenuIcon.svg'
import FilterIcon from '../../assets/svg/FilterIcon.svg'
import PhoneTickIcon from '../../assets/svg/PhoneTickIcon.svg'
import React from "react";

export default function LeadsScreen() {
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
                <TouchableOpacity>
                    <Settings size={24} color="#374151"/>
                </TouchableOpacity>
            </View>

            {/* Existing Leads Header */}
            <View className="flex-row items-center bg-[#f6f7f9] justify-between px-4 py-3">
                <Text className="text-black text-lg font-poppinsMedium">Existing Leads</Text>
                <TouchableOpacity className="bg-white">
                    <FilterIcon/>
                </TouchableOpacity>
            </View>

            {/* Conversation List */}
            <ScrollView className="flex-1 flex px-4 bg-[#f6f7f9] pt-1">
                {Array.from({length: 10}).map((_, index) => (
                    <TouchableOpacity
                        key={index}
                        className="flex-row items-center justify-between py-4 px-3 mb-4 rounded-lg border-b bg-white border-gray-100"
                        // onPress={() => setCurrentScreen('leadInfo')}
                    >
                        <View className="flex flex-row">
                            <View className="w-12 h-12 bg-teal-600 rounded-full items-center justify-center mr-4">
                                <Text className="text-white text-lg font-poppinsSemiBold">A</Text>
                            </View>
                            <View className="">
                                <Text className="text-black text-base font-poppinsMedium">Adam</Text>
                                <Text className="text-gray-500 text-sm font-poppinsMedium">+912545788</Text>
                            </View>
                            <View className="flex justify-center items-center mx-2 ml-3">
                                <PhoneTickIcon/>
                            </View>
                        </View>
                        <View className="px-2 py-1 border-[#4caf50] border-[1px] rounded-full">
                            <Text className="text-[#4caf50] text-xs font-poppinsMedium">Scheduled</Text>
                        </View>

                        <View className="mr-1">
                            <EllipsisVertical size={20}/>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}
