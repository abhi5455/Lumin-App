import React, {useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Switch,
    Image,
} from 'react-native';
import BackIcon from "../../../assets/svg/BackIcon.svg";
import {useAppNavigation} from "../../../common/navigationHelper.ts";
import {CalendarFold, ChevronDown, Timer} from "lucide-react-native";

export default function AgentDetailsScreen() {
    const navigation = useAppNavigation()
    const [enableAgent, setEnableAgent] = useState(true);
    const [agentName, setAgentName] = useState('Chris');
    const [language, setLanguage] = useState('English');
    const [voice, setVoice] = useState('Male');
    const [role, setRole] = useState('Customer Support');
    const [accent, setAccent] = useState('Cheerful');
    const [phoneNumber, setPhoneNumber] = useState('+1 8523647');
    const [workingTime24Hr, setWorkingTime24Hr] = useState(true);
    const [workingTimeStart, setWorkingTimeStart] = useState('6:00 am');
    const [workingTimeEnd, setWorkingTimeEnd] = useState('12 am');
    const [trainingData, setTrainingData] = useState('');
    const [dateRange, setDateRange] = useState('');
    const [timeRange, setTimeRange] = useState('07:30 Am to 08:30 Am');

    return (
        <View className="flex-1 bg-gray-50">
            {/* Header */}
            <View className="bg-primary px-6 py-5">
                <View className="flex-row items-center">
                    <TouchableOpacity
                        className="mr-4"
                        onPress={() => navigation.goBack()}
                    >
                        <BackIcon/>
                    </TouchableOpacity>
                    <Text className="text-white text-lg font-poppinsSemiBold">Agent Details</Text>
                </View>
            </View>

            <ScrollView className="flex-1 px-5">
                {/* Profile Section */}
                <View className="flex flex-row justify-between items-center mb-4 pb-4 py-6">
                    <View className="flex flex-row">
                        <View className="w-12 h-12 bg-teal-600 rounded-full items-center justify-center mr-4">
                            <Text className="text-white text-lg font-poppinsSemiBold">A</Text>
                        </View>
                        <View className="">
                            <Text className="text-black text-base font-poppinsSemiBold">Adam</Text>
                            <Text className="text-gray-500 text-base font-poppinsMedium">A1007</Text>
                        </View>
                    </View>
                    <View className="flex flex-col justify-center items-center gap-2">
                        <Text className="text-slate-600 text-sm font-poppinsMedium mr-2">Enable Agent</Text>
                        <View className="bg-teal-600 rounded-full px-3 py-1">
                            <Text className="text-white text-xs font-poppinsSemiBold">ON</Text>
                        </View>
                    </View>
                </View>

                {/* Agent Name */}
                <View className="mb-6">
                    <Text className="text-black text-base font-poppinsSemiBold mb-2">Agent name</Text>
                    <TextInput
                        value={agentName}
                        onChangeText={setAgentName}
                        className="bg-white border border-gray-200 rounded-lg px-4 py-4 text-black font-poppinsMedium"
                        placeholder="Agent name"
                        placeholderTextColor="#9CA3AF"
                    />
                </View>

                {/* Language */}
                <View className="mb-6">
                    <Text className="text-black text-base font-poppinsSemiBold mb-2">Language</Text>
                    <TouchableOpacity
                        className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex-row justify-between items-center">
                        <Text className="text-gray-500 py-1 font-poppinsMedium">{language}</Text>
                        <ChevronDown color={'#889baf'}/>
                    </TouchableOpacity>
                </View>

                {/* Voice */}
                <View className="mb-6">
                    <Text className="text-black text-base font-poppinsSemiBold mb-2">Voice</Text>
                    <TouchableOpacity
                        className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex-row justify-between items-center">
                        <Text className="text-gray-500 py-1 font-poppinsMedium">{voice}</Text>
                        <ChevronDown color={'#889baf'}/>
                    </TouchableOpacity>
                </View>

                {/* Role/Designation */}
                <View className="mb-6">
                    <Text className="text-black text-base font-poppinsSemiBold mb-2">Role/Designation</Text>
                    <TextInput
                        value={role}
                        onChangeText={setRole}
                        className="bg-white border border-gray-200 rounded-lg px-4 py-4 text-gray-500 font-poppinsMedium"
                        placeholder="Role/Designation"
                        placeholderTextColor="#9CA3AF"
                    />
                </View>

                {/* Accent */}
                <View className="mb-6">
                    <Text className="text-black text-base font-poppinsSemiBold mb-2">Accent</Text>
                    <TouchableOpacity
                        className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex-row justify-between items-center">
                        <Text className="text-gray-500 py-1 font-poppinsMedium">{accent}</Text>
                        <ChevronDown color={'#889baf'}/>
                    </TouchableOpacity>
                </View>

                {/* Phone Numbers */}
                <View className="mb-4">
                    <Text className="text-black text-base font-poppinsSemiBold mb-2">Phone numbers</Text>
                    <TouchableOpacity
                        className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex-row justify-between items-center">
                        <View className="flex-row items-center">
                            <Text className="text-red-500 font-poppinsMedium mr-2">🇨🇦</Text>
                            <Text className="text-gray-500 py-1 font-poppinsMedium">+1 85236479</Text>
                        </View>
                        <ChevronDown color={'#889baf'}/>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity className="mb-6 self-end">
                    <Text className="text-teal-600 text-base font-poppinsMedium underline">Add another phone
                        number</Text>
                </TouchableOpacity>

                {/* Working Time */}
                <View className="mb-6">
                    <View className="flex-row items-center justify-between mb-2">
                        <Text className="text-black text-base font-poppinsSemiBold">Working Time</Text>
                        <View className="flex-row items-center">
                            <Text className="text-gray-500 text-base font-poppinsMedium mr-2">24 Hr</Text>
                            <View
                                className="w-5 h-5 bg-teal-600 rounded border-2 border-teal-600 items-center justify-center">
                                <Text className="text-white text-xs font-poppinsSemiBold">✓</Text>
                            </View>
                        </View>
                    </View>
                    <View
                        className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex-row justify-between items-center">
                        <Text className="text-gray-500 py-1 font-poppinsMedium">6:00 am to 12 am</Text>
                        <Timer color={'#889baf'} size={22}/>
                    </View>
                </View>

                {/* Training Data */}
                <View className="mb-4">
                    <Text className="text-black text-base font-poppinsSemiBold mb-2">Training data</Text>
                    <TextInput
                        value={trainingData}
                        onChangeText={setTrainingData}
                        className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-500 font-poppinsMedium h-32"
                        placeholder="Type data"
                        placeholderTextColor="#9CA3AF"
                        multiline
                        textAlignVertical="top"
                    />
                </View>

                <TouchableOpacity className="mb-6">
                    <Text className="text-teal-600 text-base font-poppinsMedium underline text-right">View Hint</Text>
                </TouchableOpacity>

                {/* Scheduling Section */}
                <View className="flex-row items-center mb-4">
                    <Text className="text-gray-800 text-lg font-poppinsSemiBold mr-2">
                        Scheduling
                    </Text>
                    <Text className="text-gray-400 text-base font-poppinsMedium">
                        (Optional)
                    </Text>
                </View>

                {/* Date Range */}
                <Text className="text-gray-800 text-base font-poppinsSemiBold mb-2">
                    Date range
                </Text>
                <View
                    className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex-row items-center justify-between mb-4">
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
                    className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex-row items-center justify-between mb-8">
                    <TextInput
                        className="text-gray-800 font-poppinsMedium flex-1"
                        placeholder="07:30 Am to 08:30 Am"
                        placeholderTextColor="#9CA3AF"
                        value={timeRange}
                        onChangeText={setTimeRange}
                    />
                    <CalendarFold color={'#889baf'} size={22}/>
                </View>
            </ScrollView>

            {/* Submit Button */}
            <View className="">
                <TouchableOpacity
                    className="bg-teal-600 py-5"
                >
                    <Text className="text-white text-center text-lg font-poppinsSemiBold">Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

