import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    SafeAreaView, ActivityIndicator,
} from 'react-native';
import BackIcon from "../../../assets/svg/BackIcon.svg";
import {useAppNavigation} from "../../../common/navigationHelper.ts";
import {CalendarFold} from "lucide-react-native";
import {useRoute} from "@react-navigation/core";
import {ILead} from "../../../types/leads.ts";
import axios from "axios";
import {BASE_URL} from "../../../../test";
import Toast from "react-native-toast-message";

interface IOutboundCallsScreenParams{
    lead: ILead
}

const OutboundCallsScreen = () => {
    const route = useRoute<IOutboundCallsScreenParams>();
    const { lead } = route?.params;
    console.log("Lead Info ", lead)
    const navigation = useAppNavigation();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [instruction, setInstruction] = useState('');
    const [dateRange, setDateRange] = useState('');
    const [timeRange, setTimeRange] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setFullName(lead?.fullName)
        setEmail(lead.email)
        setPhoneNumber(lead?.phone)
        setCompanyName(lead?.company)
        setInstruction(lead?.instruction)
    }, [lead]);

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
            <View className="bg-primary px-6 py-5">
                <View className="flex-row items-center">
                    <TouchableOpacity
                        className="mr-4"
                        onPress={() => navigation.goBack()}
                    >
                        <BackIcon/>
                    </TouchableOpacity>
                    <Text className="text-white text-lg font-poppinsSemiBold">Outbound Calls - Leads</Text>
                </View>
            </View>

            <ScrollView className="flex-1 px-6 py-6 bg-[#f6f7f9]">
                {/* Title and Description */}
                <Text className="text-gray-800 text-lg font-poppinsSemiBold mb-2">
                    Outbound Calls - Leads
                </Text>
                <Text className="text-gray-600 text-sm font-poppinsMedium mb-6 leading-5">
                    Add the lead details here for the AI to process. These entries will guide the AI in making informed
                    and personalized interactions during calls.
                </Text>

                {/* Full Name */}
                <Text className="text-gray-800 text-base font-poppinsSemiBold mb-2">
                    Full Name
                </Text>
                <TextInput
                    className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-800 font-poppinsMedium mb-4"
                    placeholder="Enter name here"
                    placeholderTextColor="#9CA3AF"
                    value={fullName}
                    onChangeText={setFullName}
                />

                {/* Email */}
                <Text className="text-gray-800 text-base font-poppinsSemiBold mb-2">
                    Email
                </Text>
                <TextInput
                    className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-800 font-poppinsMedium mb-4"
                    placeholder="Type email here"
                    placeholderTextColor="#9CA3AF"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />

                {/* Phone Number */}
                <Text className="text-gray-800 text-base font-poppinsSemiBold mb-2">
                    Phone number
                </Text>
                <TextInput
                    className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-800 font-poppinsMedium mb-4"
                    placeholder="Enter number here"
                    placeholderTextColor="#9CA3AF"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                />

                {/* Company Name */}
                <Text className="text-gray-800 text-base font-poppinsSemiBold mb-2">
                    Company name
                </Text>
                <TextInput
                    className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-800 font-poppinsMedium mb-4"
                    placeholder="Type company name"
                    placeholderTextColor="#9CA3AF"
                    value={companyName}
                    onChangeText={setCompanyName}
                />

                {/* Instruction */}
                <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-gray-800 text-base font-poppinsSemiBold">
                        Instruction
                    </Text>
                    <TouchableOpacity>
                        <Text className="text-primary text-sm font-poppinsMedium underline">
                            Example instruction
                        </Text>
                    </TouchableOpacity>
                </View>
                <TextInput
                    className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-800 font-poppinsMedium mb-4 h-32"
                    placeholder="Type the script"
                    placeholderTextColor="#9CA3AF"
                    value={instruction}
                    onChangeText={setInstruction}
                    multiline
                    textAlignVertical="top"
                />

                {/* Info Section */}
                <View className="flex-row mb-6">
                    <View className="w-5 h-5 bg-gray-400 rounded-full items-center justify-center mr-3 mt-0.5">
                        <Text className="text-white text-xs font-poppinsSemiBold">i</Text>
                    </View>
                    <Text className="text-gray-500 text-sm font-poppinsMedium flex-1 leading-5">
                        This section allows you to guide the AI on how to interact during calls. Define goals, targets,
                        conversation topics, tone of voice, and behavior to ensure effective communication.
                    </Text>
                </View>

                {/* Scheduling Section */}
                <View className="flex-row items-center mb-4">
                    <Text className="text-gray-800 text-base font-poppinsSemiBold mr-2">
                        Scheduling
                    </Text>
                    <Text className="text-gray-400 text-sm font-poppinsMedium">
                        (Optional)
                    </Text>
                </View>

                {/* Date Range */}
                <Text className="text-gray-800 text-base font-poppinsSemiBold mb-2">
                    Date range
                </Text>
                <View
                    className="bg-white border border-gray-200 rounded-lg px-4 py-2 flex-row items-center justify-between mb-4">
                    <TextInput
                        className="text-gray-800 font-poppinsMedium flex-1"
                        placeholder="dd-mm-yy"
                        placeholderTextColor="#9CA3AF"
                        value={dateRange}
                        onChangeText={setDateRange}
                    />
                    <CalendarFold color={'#889baf'} size={22}/>
                </View>

                {/* Time Range */}
                <Text className="text-gray-800 text-base font-poppinsSemiBold mb-2">
                    Time range
                </Text>
                <View
                    className="bg-white border border-gray-200 rounded-lg px-4 py-2 flex-row items-center justify-between mb-8">
                    <TextInput
                        className="text-gray-800 font-poppinsMedium flex-1"
                        placeholder="07:30 Am to 08:30 Am"
                        placeholderTextColor="#9CA3AF"
                        value={timeRange}
                        onChangeText={setTimeRange}
                    />
                    <CalendarFold color={'#889baf'} size={22}/>
                </View>
                <View className="min-h-[100px] bg-transparent min-w-1"/>
            </ScrollView>

            {/* Submit Button */}
            <View className="">
                <TouchableOpacity
                    className="bg-teal-600 py-5"
                    onPress={() => {
                        setIsLoading(true)
                        let leadData = {
                            fullName: fullName,
                            email: email,
                            phone: phoneNumber,
                            company: companyName,
                            instruction: instruction,
                            schedule: {
                                date: "2024-07-01T00:00:00.000Z",
                                startTime: "17:00",
                                endTime: "18:00"
                            },
                            status: "new"
                        }
                        axios.put(`${BASE_URL}/leads/${lead?._id}`, leadData)
                            .then((res) => {
                                Toast.show({
                                    type: 'success',
                                    text1: `Lead data has been updated`,
                                    text2: `Updated lead - ${lead?.fullName}`,
                                    position: "top"
                                });
                                navigation.goBack()
                                // if (setTriggerFetch) {
                                //     setTriggerFetch(prev => prev+1)
                                // }
                            })
                            .catch((err) => {
                                Toast.show({
                                    type: 'error',
                                    text1: 'Failed to update lead!',
                                    text2: err.message || '',
                                    position: "top"
                                });
                            })
                            .finally(() => {
                                setIsLoading(false)
                            })
                            .finally(()=>{
                            })
                    }}
                >
                    {!isLoading ?
                    <Text className="text-white text-center text-lg font-poppinsSemiBold">Submit</Text>
                    : <ActivityIndicator color={'#FFF'} size={25} className={''}/>
                    }
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default OutboundCallsScreen;
