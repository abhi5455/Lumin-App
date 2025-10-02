import {ActivityIndicator, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {EllipsisVertical, PhoneIncoming, PlusCircle, Search, Settings} from "lucide-react-native";
import MenuIcon from '../../assets/svg/MenuIcon.svg'
import FilterIcon from '../../assets/svg/FilterIcon.svg'
import React, {Fragment, useCallback, useRef, useState} from "react";
import FilterModal from "../ConversationScreen/components/FilterModal.tsx";
import {useAppNavigation} from "../../common/navigationHelper.ts";
import ActionModal from "../LeadsScreen/components/ActionModal.tsx";
import {useFocusEffect} from "@react-navigation/native";
import axios from "axios";
import {BASE_URL} from "../../../test";
import Toast from "react-native-toast-message";
import {IAgent} from "../../types/agent.ts";

export default function AgentScreen() {
    const navigation = useAppNavigation()
    const [filterModalVisible, setFilterModalVisible] = React.useState(false);
    const [actionModalVisible, setActionModalVisible] = React.useState(false);
    const [triggerFetch, setTriggerFetch] = useState<number>(0)
    const [agents, setAgents] = useState<IAgent[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const isFirstLoad = useRef(true);

    useFocusEffect(
        useCallback(() => {
            if (isFirstLoad.current) {
                setIsLoading(true)
                isFirstLoad.current = false;
            }
            axios.get(`${BASE_URL}/agents`)
                .then((res) => {
                    console.log("Yay agents ", res.data.data)
                    setAgents(res.data.data.agents)
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

            <View
                className="flex-row items-center bg-white rounded-xl justify-between px-4 py-1 mt-4 mx-4 border-[1px] border-gray-100">
                <Search color={'#889baf'} size={20}/>
                <TextInput
                    placeholder="Search Agents"
                    placeholderTextColor={"#9ca3af"}
                    className="flex-1 px-3 py-2 pt-3 text-black ml-3 text-md font-poppinsMedium"
                />
            </View>

            {/* Recent Conversation Header */}
            <View className="flex-row items-center bg-[#f6f7f9] justify-between px-4 py-3">
                <Text className="text-slate-400 text-sm font-poppinsMedium">2 out of 5 agents created</Text>
                <View className="flex flex-row items-center gap-4">
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("SectionNavigator", {
                            screen: "AgentDetailsScreen",
                            params: {
                                screen: "CreateAgent",
                                agentData: 'test'
                            }
                        });
                    }}
                                      className="flex flex-row justify-center items-center gap-2 px-3 py-2 h-full bg-primary/80 rounded-lg">
                        <PlusCircle color={'#FFF'} size={15}/>
                        <Text className="text-sm font-poppinsMedium text-white">Add Agent</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-white" onPress={() => setFilterModalVisible(!filterModalVisible)}>
                        <FilterIcon/>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Conversation List */}
            <ScrollView className="flex-1 flex px-4 bg-[#f6f7f9] pt-1">
                {!isLoading ?
                    <Fragment>
                        {agents.length > 0 ? (
                            agents?.map((agent, index) => (
                                <View
                                    key={index}
                                    className="flex-row items-center justify-between py-4 px-3 mb-4 rounded-lg border-b bg-white border-gray-100">
                                    <View className="flex flex-row">
                                        <View
                                            className="w-12 h-12 bg-teal-600 rounded-full items-center justify-center mr-4">
                                            <Text className="text-white text-lg font-poppinsSemiBold">{agent?.name.slice(0,1).toUpperCase()}</Text>
                                        </View>
                                        <View className="">
                                            <Text className="text-black text-base font-poppinsMedium">{agent?.name}</Text>
                                            <Text
                                                className="text-slate-400 text-sm font-poppinsMedium">{agent?.number?.number}</Text>
                                        </View>
                                    </View>

                                    <TouchableOpacity className="mr-1"
                                                      onPress={() => setActionModalVisible(!actionModalVisible)}>
                                        <EllipsisVertical size={20}/>
                                    </TouchableOpacity>
                                </View>
                            ))
                        ) : (
                            // No agents section
                            <View className="flex-1 justify-center items-center py-32">
                                <Text className="text-gray-600 text-xl font-poppinsSemiBold mb-2">
                                    No Agents
                                </Text>
                                <Text className="text-gray-400 text-sm font-poppinsMedium text-center px-8 leading-6">
                                    No agents added. They'll appear here {'\n'}once available.
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

            {/* Action Modal */}
            <ActionModal visible={actionModalVisible} onClose={() => {
                setActionModalVisible(false)
            }} onApply={() => {
                setActionModalVisible(false)
            }}
                         viewAction={() => {
                             setActionModalVisible(false)
                             navigation.navigate("SectionNavigator", {
                                 screen: "AgentDetailsScreen",
                                 params: {
                                     screen: "EditAgent",
                                     agentData: 'test'
                                 }
                             });
                         }} />

        </SafeAreaView>
    )
}
