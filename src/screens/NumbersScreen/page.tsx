import React, {useState} from 'react';
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
import CanadaSymbol from "../../assets/svg/CanadaSymbol.svg";
import ViewDetailsModal from "./components/ViewDetailsModal.tsx";
import AvailableNumbersModal from "./components/AvailableNumbersModal.tsx";
import CheckAvailabilityModal from "./components/CheckAvailabilityModal.tsx";

export default function NumbersScreen() {
    const navigation = useAppNavigation();
    const [searchNumber, setSearchNumber] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('United Kingdom');
    const [viewDetailsModalVisible, setViewDetailsModalVisible] = useState(false);
    const [checkAvailabilityModalVisible, setCheckAvailabilityModalVisible] = useState(false);
    const [availableNumbersModalVisible, setAvailableNumbersModalVisible] = useState(false);

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
                    onPress={() => {
                        navigation.navigate("SectionNavigator", {
                            screen: "AccountSettingsScreen",
                        });
                    }}>
                    <Settings size={24} color="#374151"/>
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 px-4 pt-4 bg-[#f6f7f9]">
                {/* Search Numbers Section */}
                <View className="mb-6">
                    <Text className="text-lg font-poppinsSemiBold text-black mb-3">
                        Search numbers
                    </Text>
                    <View className="flex-row items-center bg-white rounded-lg px-4 py-1 border border-gray-200">
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
                    <TouchableOpacity
                        className="flex-row items-center justify-between bg-white rounded-lg px-4 py-4 border border-gray-200">
                        <Text className="font-poppinsMedium text-gray-400">
                            {selectedCountry}
                        </Text>
                        <ChevronDown/>
                    </TouchableOpacity>
                </View>

                {/* Purchase Button */}
                <TouchableOpacity className="bg-primary rounded-lg py-4 mb-6" onPress={()=>{
                    setCheckAvailabilityModalVisible(true)
                }}>
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
                        <View key={index}
                              className="flex-row items-center justify-between py-5 border-[1px] border-gray-100 px-3 mb-4 rounded-lg bg-white">
                            <View className="flex flex-row items-center gap-2">
                                {/* Canadian Flag Icon */}
                                <CanadaSymbol/>
                                <Text className="font-poppinsMedium text-black text-base">
                                    {number}
                                </Text>
                            </View>
                            <TouchableOpacity className="px-3 py-2.5 border-gray-200 border-[1px] rounded-md"
                                              onPress={() => {
                                                  setViewDetailsModalVisible(true)
                                              }}>
                                <Text className="font-poppinsMedium text-teal-600 text-sm">
                                    View Details
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
                <View className="min-h-[150px] bg-transparent min-w-1"/>
            </ScrollView>

            {/*View Details Modal*/}
            <ViewDetailsModal visible={viewDetailsModalVisible} onClose={() => {
                setViewDetailsModalVisible(false)
            }} onApply={() => {
                setViewDetailsModalVisible(false)
            }}/>

            {/*Check Availability Modal*/}
            <CheckAvailabilityModal visible={checkAvailabilityModalVisible} onClose={()=>{setCheckAvailabilityModalVisible(false)}} setAvailableNumbersModalVisible={setAvailableNumbersModalVisible}/>

            {/*Available Numbers Modal*/}
            <AvailableNumbersModal visible={availableNumbersModalVisible} onClose={()=>{setAvailableNumbersModalVisible(false)}}/>
        </SafeAreaView>
    );
};
