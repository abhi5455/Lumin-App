import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, SafeAreaView, ActivityIndicator} from 'react-native';
import {Check, ChevronLeft} from "lucide-react-native";
import {useAppNavigation} from "../../common/navigationHelper.ts";
import {useFocusEffect} from "@react-navigation/native";
import axios from "axios";
import {BASE_URL} from "../../utils/axios.ts";
import Toast from "react-native-toast-message";
import {ISubscriptionPlan} from "../../types/subscription.ts";
import getCurrencySymbol from "../../lib/currencyToSymbol.ts";
import {openURL} from "../../lib/openUrl.ts";

export default function SubscriptionScreen() {
    const navigation = useAppNavigation()
    const [subscriptionPlans, setSubscriptionPlans] = useState<ISubscriptionPlan[]>([])
    const [selectedPlan, setSelectedPlan] = useState<ISubscriptionPlan>();
    const [selectedBillingCycle, setSelectedBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
    const [isLoading, setIsLoading] = useState(true)
    const [subscribeProcessing, setSubscribeProcessing] = useState(false)
    const isFirstLoad = useRef(true);

    useFocusEffect(
        useCallback(() => {
            if (isFirstLoad.current) {
                setIsLoading(true)
                isFirstLoad.current = false;
            }
            axios.get(`${BASE_URL}/subscription/plans`)
                .then((res) => {
                    console.log("Subscribe ", res.data.data)
                    const plans = res.data.data || [];
                    setSubscriptionPlans(plans);
                    if (plans.length > 0) {
                        setSelectedPlan(plans[0]);
                    }
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
        }, [])
    );

    const [subscribePlan, setSubscribePlan] = useState("")
    useEffect(() => {
        if (selectedBillingCycle === 'monthly')
            setSubscribePlan(selectedPlan?.monthly_polar_product_id || "")
        else
            setSubscribePlan(selectedPlan?.yearly_polar_product_id || "")
    }, [selectedPlan, selectedBillingCycle]);

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1 px-5 pt-4">
                {/* Header */}
                <View className="flex-row items-center justify-between mb-6">
                    <TouchableOpacity
                        className="flex items-center justify-center p-1 border border-[#889baf] rounded-xl"
                        onPress={() => navigation.goBack()}
                    >
                        <ChevronLeft size={22} color="#889baf"/>
                    </TouchableOpacity>

                    <View className="flex-row bg-gray-100 rounded-lg p-1">
                        <TouchableOpacity
                            className={`px-6 py-2 rounded-md ${selectedBillingCycle === 'monthly' ? 'bg-white shadow-sm' : ''}`}
                            onPress={() => setSelectedBillingCycle('monthly')}
                        >
                            <Text
                                className={`font-poppinsMedium ${selectedBillingCycle === 'monthly' ? 'text-black' : 'text-gray-600'}`}>
                                Monthly
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="px-6 py-2 rounded-md"
                            style={selectedBillingCycle === 'yearly' ? {backgroundColor: 'white'} : {}}
                            onPress={() => setSelectedBillingCycle('yearly')}
                        >
                            <Text
                                className={`font-poppinsMedium ${selectedBillingCycle === 'yearly' ? 'text-black' : 'text-gray-600'}`}>
                                Yearly
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {!isLoading ?
                    <>

                        {/* Pricing Cards */}
                            <View className="flex gap-5 mb-8 mt-3">
                                {/* Plans */}
                                {subscriptionPlans.map((plan) => (
                                    <TouchableOpacity
                                        className={`border-[1.25px] border-primary ${selectedPlan === plan ? 'bg-primary' : 'bg-white'} rounded-xl p-4`}
                                        key={plan._id}
                                        onPress={() => setSelectedPlan(plan)}>
                                        <View className="flex-row justify-between items-center">
                                            <Text
                                                className={`${selectedPlan === plan ? 'text-white' : 'text-black'} text-lg font-poppinsSemiBold`}>{plan?.title}</Text>
                                            <Text
                                                className={`${selectedPlan === plan ? 'text-white' : 'text-gray-400'} text-base font-poppinsMedium`}>
                                                {selectedBillingCycle === 'monthly'
                                                    ? `${getCurrencySymbol(plan?.currency || '')}${plan?.price_monthly || 0} per month`
                                                    : `${getCurrencySymbol(plan?.currency || '')}${plan?.price_yearly || 0} per year`}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>

                        {/* Features Section */}
                            <View className="mb-8 px-1">
                                <Text className="text-black text-2xl font-poppinsSemiBold mb-6 leading-8">
                                    Boost your productivity
                                </Text>

                                <View className="flex flex-col gap-3">
                                    {/* Features */}
                                    {selectedPlan?.benefits?.map((benefit, index) => (
                                        <View className="flex-row items-start" key={index}>
                                            <View
                                                className="p-1 bg-[#b6d7d2] rounded-md items-center justify-center mr-3 mt-0.5">
                                                <Check color={'#178671'} size={20}/>
                                            </View>
                                            <Text
                                                className="text-gray-700 text-base font-poppinsMedium flex-1 leading-6">
                                                {benefit}
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                            </View>


                    </> :
                    <View className="py-[200px]">
                        <ActivityIndicator color={'#178671'} size={40} className={''}/>
                    </View>
                }
            </ScrollView>
            {/* Subscribe Button */}
            <TouchableOpacity className="bg-primary rounded-xl py-4 mx-5 items-center mb-8"
                              onPress={() => {
                                  setSubscribeProcessing(true);
                                  axios.post(`${BASE_URL}/subscribe/${selectedPlan?._id}`, {
                                      billing_cycle: selectedBillingCycle
                                  })
                                      .then((res => {
                                          console.log("Subscribe return ", res.data.data)
                                          console.log("URL ", res.data.data.checkoutUrl)
                                          if (res.data.data.checkoutUrl) {
                                              openURL(res.data.data.checkoutUrl)
                                          }
                                      }))
                                      .catch((err => {
                                          Toast.show({
                                              type: 'error',
                                              text1: 'Something went wrong!',
                                              text2: err.message || '',
                                              position: "top"
                                          })
                                      }))
                                      .finally(() => {
                                          setSubscribeProcessing(false);
                                      })
                              }}>
                {!subscribeProcessing ?
                    <Text className="text-white text-lg font-poppinsSemiBold">Subscribe</Text>
                    :
                    <View>
                        <ActivityIndicator color={'#FFFFFF'} size={25} className={''}/>
                    </View>
                }
            </TouchableOpacity>
        </SafeAreaView>
    );
};
