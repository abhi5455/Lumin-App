import React, {useCallback, useRef, useState} from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import {Check, ChevronLeft} from "lucide-react-native";
import {useAppNavigation} from "../../common/navigationHelper.ts";
import {useFocusEffect} from "@react-navigation/native";
import axios from "axios";
import {BASE_URL} from "../../utils/axios.ts";
import Toast from "react-native-toast-message";

export default function SubscriptionScreen() {
    const navigation = useAppNavigation()
    const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
    const [isLoading, setIsLoading] = useState(true)
    const isFirstLoad = useRef(true);

    useFocusEffect(
        useCallback(() => {
            if (isFirstLoad.current) {
                setIsLoading(true)
                isFirstLoad.current = false;
            }
            axios.get(`${BASE_URL}/subscription`)
                .then((res) => {
                    console.log("Subscribe ",res.data)
                })
                .catch((err) => {
                    Toast.show({
                        type: 'error',
                        text1: 'Something went wrong!',
                        text2: err.message || '',
                        position: "top"
                    });
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }, [navigation])
    );

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1 px-5 pt-4">
                {/* Header */}
                <View className="flex-row items-center justify-between mb-6">
                    <TouchableOpacity className="flex items-center justify-center p-1 border border-[#889baf] rounded-xl"
                    onPress={() => navigation.goBack()}>
                        <ChevronLeft size={22} color="#889baf" />
                    </TouchableOpacity>

                    <View className="flex-row bg-gray-100 rounded-lg p-1">
                        <TouchableOpacity
                            className={`px-6 py-2 rounded-md ${selectedPlan === 'monthly' ? 'bg-white shadow-sm' : ''}`}
                            onPress={() => setSelectedPlan('monthly')}
                        >
                            <Text className={`font-poppinsMedium ${selectedPlan === 'monthly' ? 'text-black' : 'text-gray-600'}`}>
                                Monthly
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className={`px-6 py-2 rounded-md ${selectedPlan === 'yearly' ? 'bg-white shadow-sm' : ''}`}
                            // onPress={() => setSelectedPlan('yearly')}
                        >
                            <Text className={`font-poppinsMedium ${selectedPlan === 'yearly' ? 'text-black' : 'text-gray-600'}`}>
                                Yearly
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Pricing Cards */}
                <View className="flex gap-5 mb-8">
                    {/* Starter Plan */}
                    <View className="border-[1.25px] border-primary rounded-xl p-4 bg-white">
                        <View className="flex-row justify-between items-center">
                            <Text className="text-black text-lg font-poppinsSemiBold">Starter</Text>
                            <Text className="text-gray-400 text-base font-poppinsMedium">$9.98 per month</Text>
                        </View>
                    </View>

                    {/* Professional Plan */}
                    <View className="bg-primary rounded-xl p-4 relative">
                        <View className="absolute top-3 right-3 bg-[#182a42] rounded-md px-3 py-1">
                            <Text className="text-white text-xs font-poppinsMedium">50% off</Text>
                        </View>
                        <View className="flex-row justify-between items-center">
                            <View>
                                <Text className="text-white text-lg font-poppinsSemiBold">Professional</Text>
                                <View className="flex-row items-center mt-1">
                                    <Text className="text-white text-sm font-poppinsMedium line-through mr-2">$9.98</Text>
                                    <Text className="text-white text-sm font-poppinsMedium">$8.98</Text>
                                </View>
                            </View>
                            <Text className="text-white text-base font-poppinsMedium mt-7">$9.98 per month</Text>
                        </View>
                    </View>

                    {/* Enterprise Plan */}
                    <View className="border-[1.25px] border-primary rounded-xl p-4 bg-white">
                        <View className="flex-row justify-between items-center">
                            <Text className="text-black text-lg font-poppinsSemiBold">Enterprise</Text>
                            <Text className="text-gray-400 text-base font-poppinsMedium">$9.98 per month</Text>
                        </View>
                    </View>
                </View>

                {/* Features Section */}
                <View className="mb-8 px-1">
                    <Text className="text-black text-2xl font-poppinsSemiBold mb-6 leading-8">
                        Boost your productivity with upto 50% off
                    </Text>

                    <View className="flex flex-col gap-3">
                        {/* Feature 1 */}
                        <View className="flex-row items-start">
                            <View className="p-1 bg-[#b6d7d2] rounded-md items-center justify-center mr-3 mt-0.5">
                                <Check color={'#178671'} size={20}/>
                            </View>
                            <Text className="text-gray-700 text-base font-poppinsMedium flex-1 leading-6">
                                Scale your outreach with seamless AI-driven conversations.
                            </Text>
                        </View>

                        {/* Feature 2 */}
                        <View className="flex-row items-start">
                            <View className="p-1 bg-[#b6d7d2] rounded-md items-center justify-center mr-3 mt-0.5">
                                <Check color={'#178671'} size={20}/>
                            </View>
                            <Text className="text-gray-700 text-base font-poppinsMedium flex-1 leading-6">
                                Unused minutes roll over to the next month.
                            </Text>
                        </View>

                        {/* Feature 3 */}
                        <View className="flex-row items-start">
                            <View className="p-1 bg-[#b6d7d2] rounded-md items-center justify-center mr-3 mt-0.5">
                                <Check color={'#178671'} size={20}/>
                            </View>
                            <Text className="text-gray-700 text-base font-poppinsMedium flex-1 leading-6">
                                Get 24/7 assistance and faster response time.
                            </Text>
                        </View>

                        {/* Feature 4 */}
                        <View className="flex-row items-start">
                            <View className="p-1 bg-[#b6d7d2] rounded-md items-center justify-center mr-3 mt-0.5">
                                <Check color={'#178671'} size={20}/>
                            </View>
                            <Text className="text-gray-700 text-base font-poppinsMedium flex-1 leading-6">
                                Gain deep insights into call performance and customer interactions.
                            </Text>
                        </View>

                        {/* Feature 5 */}
                        <View className="flex-row items-start">
                            <View className="p-1 bg-[#b6d7d2] rounded-md items-center justify-center mr-3 mt-0.5">
                                <Check color={'#178671'} size={20}/>
                            </View>
                            <Text className="text-gray-700 text-base font-poppinsMedium flex-1 leading-6">
                                Unlock additional agents to handle calls efficiently.
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Subscribe Button */}
                <TouchableOpacity className="bg-primary rounded-xl py-4 items-center mb-8">
                    <Text className="text-white text-lg font-poppinsSemiBold">Subscribe</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};
