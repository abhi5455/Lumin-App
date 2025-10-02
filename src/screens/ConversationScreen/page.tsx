import {ActivityIndicator, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {PhoneIncoming, Settings} from "lucide-react-native";
import MenuIcon from '../../assets/svg/MenuIcon.svg'
import FilterIcon from '../../assets/svg/FilterIcon.svg'
import React, {Fragment, useCallback, useRef, useState} from "react";
import {useAppNavigation} from "../../common/navigationHelper.ts";
import FilterModal from "./components/FilterModal.tsx";
import {useFocusEffect} from "@react-navigation/native";
import axios from "axios";
import {BASE_URL} from "../../../test";
import Toast from "react-native-toast-message";
import {IConversation} from "../../types/conversation.ts";
import PhoneTickIcon from "../../assets/svg/PhoneTickIcon.svg";

export default function ConversationScreen() {
    const navigation = useAppNavigation()
    const [filterModalVisible, setFilterModalVisible] = React.useState(false);
    const [conversations, setConversations] = useState<IConversation[]>([])
    const [triggerFetch, setTriggerFetch] = useState<number>(0)
    const [isLoading, setIsLoading] = useState(true)
    const isFirstLoad = useRef(true);

    useFocusEffect(
        useCallback(() => {
            if (isFirstLoad.current) {
                setIsLoading(true)
                isFirstLoad.current = false;
            }
            axios.get(`${BASE_URL}/conversations`)
                .then((res) => {
                    console.log("Yay convo ", res.data.data)
                    setConversations(res.data.data.conversations)
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
        }, [triggerFetch, navigation])
    );

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
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("SectionNavigator", {
                            screen: "AccountSettingsScreen",
                        });
                    }}>
                    <Settings size={24} color="#374151"/>
                </TouchableOpacity>
            </View>

            {/* Recent Conversation Header */}
            <View className="flex-row items-center bg-[#f6f7f9] justify-between px-4 py-3">
                <Text className="text-black text-lg font-poppinsMedium">Recent Conversation</Text>
                <TouchableOpacity className="bg-white" onPress={() => setFilterModalVisible(!filterModalVisible)}>
                    <FilterIcon/>
                </TouchableOpacity>
            </View>

            {/* Conversation List */}
            <ScrollView className="flex-1 flex px-4 bg-[#f6f7f9] pt-1">
                {!isLoading ?
                    <Fragment>
                        {conversations.length > 0 ? (
                            conversations?.map((conversation, index) => (
                                <TouchableOpacity
                                    key={index}
                                    className="flex-row items-center justify-between py-4 px-3 mb-4 rounded-lg border-b bg-white border-gray-100"
                                    onPress={() => {
                                        navigation.navigate("SectionNavigator", {
                                            screen: "LeadInfoScreen",
                                            params: {
                                                conversation: conversation
                                            }
                                        });
                                    }}
                                >
                                    <View className="flex flex-row">
                                        <View
                                            className="w-12 h-12 bg-teal-600 rounded-full items-center justify-center mr-4">
                                            <Text className="text-white text-lg font-poppinsSemiBold">{conversation?.lead?.fullName.slice(0,1).toUpperCase()}</Text>
                                        </View>
                                        <View className="">
                                            <Text
                                                className="text-black text-base font-poppinsMedium">{conversation?.lead?.fullName}</Text>
                                            <Text
                                                className="text-slate-400 text-sm font-poppinsMedium">{conversation?.lead?.phone}</Text>
                                        </View>
                                        <View className="flex justify-center items-center mx-2 ml-3">
                                            <PhoneIncoming size={20} color="#4caf50"/>
                                        </View>
                                    </View>
                                    <View className="px-2 py-1 border-[#4caf50] border-[1px] rounded-full">
                                        <Text
                                            className="text-[#4caf50] text-xs font-poppinsMedium">{conversation?.status}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))
                        ) : (
                            // No Coversations section
                            <View className="flex-1 justify-center items-center py-32">
                                <View className="w-20 h-20 rounded-full items-center justify-center mb-0 text-[#F6F7F9]">
                                    <PhoneIncoming size={28} color={'#4caf50'}/>
                                </View>
                                <Text className="text-gray-600 text-xl font-poppinsSemiBold mb-2">
                                    No Conversations
                                </Text>
                                <Text className="text-gray-400 text-sm font-poppinsMedium text-center px-8 leading-6">
                                    You don’t have any conversations yet.
                                    They’ll appear here once available.
                                </Text>
                            </View>
                        )}
                    </Fragment>
                    :
                    <View className="py-[50px]">
                        <ActivityIndicator color={'#178671'} size={30} className={''}/>
                    </View>
                }
                <View className="min-h-[150px] bg-transparent min-w-1"/>
            </ScrollView>

            {/* Filter Modal */}
            <FilterModal visible={filterModalVisible} onClose={() => {
                setFilterModalVisible(false)
            }} onApply={() => {
                setFilterModalVisible(false)
            }}/>
        </SafeAreaView>
    )
}
