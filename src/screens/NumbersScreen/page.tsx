import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import MenuIcon from "../../assets/svg/MenuIcon.svg";
import {ChevronDown, Search, Settings} from "lucide-react-native";
import {useAppNavigation} from "../../common/navigationHelper.ts";

export default function NumbersScreen() {
    const navigation = useAppNavigation();
    const [searchNumber, setSearchNumber] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('United Kingdom');

    const phoneNumbers = [
        '+912545788',
        '+912545788',
        '+912545788',
        '+912545788',
    ];

    return (
        <SafeAreaView className="flex-1 bg-white px-1">
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-4 pt-6 bg-white">
                <TouchableOpacity>
                    <MenuIcon/>
                </TouchableOpacity>
                <Text className="text-primary text-xl font-poppinsSemiBold">
                    Convogents
                </Text>
                <TouchableOpacity
                    onPress={()=>{
                        navigation.navigate("SectionNavigator", {
                            screen: "AccountSettingsScreen",
                        });
                    }}>
                    <Settings size={24} color="#374151"/>
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 px-4">
                {/* Search Numbers Section */}
                <View className="mb-6">
                    <Text className="text-lg font-poppinsSemiBold text-black mb-3">
                        Search numbers
                    </Text>
                    <View className="flex-row items-center bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
                        <TextInput
                            className="flex-1 font-poppinsMedium text-black"
                            placeholder="Type number"
                            placeholderTextColor="#9CA3AF"
                            value={searchNumber}
                            onChangeText={setSearchNumber}
                        />
                        <Search color={'#889baf'} size={20}/>
                    </View>
                </View>

                {/* Search Country Section */}
                <View className="mb-6">
                    <Text className="text-lg font-poppinsSemiBold text-black mb-3">
                        Search country
                    </Text>
                    <TouchableOpacity className="flex-row items-center justify-between bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
                        <Text className="font-poppinsMedium text-gray-400">
                            {selectedCountry}
                        </Text>
                        <ChevronDown />
                    </TouchableOpacity>
                </View>

                {/* Purchase Button */}
                <TouchableOpacity className="bg-teal-600 rounded-lg py-4 mb-6">
                    <Text className="text-center text-white font-poppinsSemiBold text-lg">
                        Purchase a number
                    </Text>
                </TouchableOpacity>

                {/* Numbers Section */}
                <View className="mb-6">
                    <Text className="text-lg font-poppinsSemiBold text-black mb-4">
                        Numbers
                    </Text>

                    {phoneNumbers.map((number, index) => (
                        <View key={index} className="flex-row items-center justify-between py-4 border-b border-gray-100">
                            <View className="flex-row items-center">
                                {/* Canadian Flag Icon */}
                                <View className="w-8 h-6 bg-red-500 rounded-sm mr-3 items-center justify-center">
                                    <Text className="text-white text-xs font-poppinsSemiBold">🍁</Text>
                                </View>
                                <Text className="font-poppinsMedium text-black text-base">
                                    {number}
                                </Text>
                            </View>
                            <TouchableOpacity>
                                <Text className="font-poppinsMedium text-teal-600 text-sm">
                                    View Details
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
