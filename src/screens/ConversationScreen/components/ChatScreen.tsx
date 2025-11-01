import {SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect} from "react";
import BackIcon from '../../../assets/svg/BackIcon.svg'
import {useAppNavigation} from "../../../common/navigationHelper.ts";
import {RouteProp, useRoute} from "@react-navigation/core";
import axios from "axios";
import {BASE_URL} from "../../../utils/axios.ts";
import Toast from "react-native-toast-message";

interface IChatScreenParams {
    conversationID: string
}

export default function ChatScreen() {
    const route = useRoute<RouteProp<{ LeadInfoScreen: IChatScreenParams }, 'LeadInfoScreen'>>();
    const { conversationId } = route?.params;
    const navigation = useAppNavigation()

    useEffect(() => {
        axios.get(`${BASE_URL}/conversations/${conversationId}`)
            .then((res => {
                console.log("Conversation details ", res.data)
            }))
            .catch((err => {
                console.log("Error fetching conversation details ", err)
                Toast.show({
                    type: 'error',
                    text1: 'Something went wrong!',
                    text2: err.message || '',
                    position: "top"
                })
            }))
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            {/* Header */}
            <View className="bg-primary px-6 py-5">
                <View className="flex-row items-center">
                    <TouchableOpacity
                        className="mr-4"
                        onPress={() => navigation.goBack()}
                    >
                        <BackIcon/>
                    </TouchableOpacity>
                    <Text className="text-white text-lg font-poppinsSemiBold">Conversation chat</Text>
                </View>
            </View>

            <ScrollView className="flex-1 px-4 py-6 bg-[#f6f7f9]">
                <View className="flex gap-4">
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
                        {/*<View className="bg-primary p-4 rounded-tl-2xl rounded-bl-2xl rounded-br-2xl max-w-xs">*/}
                        <View className="bg-primary p-4 rounded-2xl rounded-tr-md max-w-xs">
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
                        <View className="bg-primary p-4 rounded-2xl rounded-tr-md max-w-xs">
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
                        <View className="bg-primary p-4 rounded-2xl rounded-tr-md max-w-xs">
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
