import {ActivityIndicator, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {EllipsisVertical, Settings} from "lucide-react-native";
import MenuIcon from '../../assets/svg/MenuIcon.svg'
import FilterIcon from '../../assets/svg/FilterIcon.svg'
import PhoneTickIcon from '../../assets/svg/PhoneTickIcon.svg'
import React, {Fragment, useCallback, useRef, useState} from "react";
import FilterModal from "../ConversationScreen/components/FilterModal.tsx";
import {useAppNavigation} from "../../common/navigationHelper.ts";
import ActionModal from "./components/ActionModal.tsx";
import {useFocusEffect} from "@react-navigation/native";
import axios from "axios";
import {BASE_URL} from "../../../test";
import Toast from "react-native-toast-message";
import {ILead} from "../../types/leads.ts";

export default function LeadsScreen() {
    const navigation = useAppNavigation()
    const [filterModalVisible, setFilterModalVisible] = React.useState(false);
    const [actionModalVisible, setActionModalVisible] = React.useState(false);
    const [leads, setLeads] = useState<ILead[]>([])
    const [triggerFetch, setTriggerFetch] = useState<number>(0)
    const [selectedLead, setSelectedLead] = useState<ILead>()
    const [isLoading, setIsLoading] = useState(true)
    const isFirstLoad = useRef(true);

    useFocusEffect(
        useCallback(() => {
            if (isFirstLoad.current) {
                setIsLoading(true)
                isFirstLoad.current = false;
            }
            axios.get(`${BASE_URL}/leads`)
                .then((res) => {
                    console.log(res.data.data)
                    setLeads(res.data.data.leads)
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
                <Text className="text-black text-lg font-poppinsMedium">Existing Leads</Text>
                <TouchableOpacity className="bg-white" onPress={() => setFilterModalVisible(!filterModalVisible)}>
                    <FilterIcon/>
                </TouchableOpacity>
            </View>

            {/* Conversation List */}
            <ScrollView className="flex-1 flex px-4 bg-[#f6f7f9] pt-1">
                {!isLoading ?
                    <Fragment>
                        {leads.length > 0 ? (
                            leads.map((lead, index) => (
                                <View
                                    key={index}
                                    className="flex-row items-center justify-between py-4 px-3 mb-4 rounded-lg border-b bg-white border-gray-100">
                                    <View className="flex flex-row">
                                        <View
                                            className="w-12 h-12 bg-teal-600 rounded-full items-center justify-center mr-4">
                                            <Text className="text-white text-lg font-poppinsSemiBold">A</Text>
                                        </View>
                                        <View className="">
                                            <Text
                                                className="text-black text-base font-poppinsMedium">{lead?.fullName}</Text>
                                            <Text
                                                className="text-slate-400 text-sm font-poppinsMedium">{lead?.phone}</Text>
                                        </View>
                                        <View className="flex justify-center items-center mx-2 ml-3">
                                            <PhoneTickIcon/>
                                        </View>
                                    </View>
                                    <View className="px-2 py-1 border-[#4caf50] border-[1px] rounded-full">
                                        <Text className="text-[#4caf50] text-xs font-poppinsMedium">Scheduled</Text>
                                    </View>

                                    <TouchableOpacity className="mr-1" onPress={() => {
                                        setSelectedLead(lead)
                                        setActionModalVisible(!actionModalVisible)
                                    }}>
                                        <EllipsisVertical size={20}/>
                                    </TouchableOpacity>
                                </View>
                            ))
                        ) : (
                            // No leads section
                            <View className="flex-1 justify-center items-center py-32">
                                <View className="w-20 h-20 rounded-full items-center justify-center mb-0">
                                    <PhoneTickIcon width={32} height={32}/>
                                </View>
                                <Text className="text-gray-600 text-xl font-poppinsSemiBold mb-2">
                                    No Leads Found
                                </Text>
                                <Text className="text-gray-400 text-sm font-poppinsMedium text-center px-8 leading-6">
                                    You don't have any existing leads yet. Leads will appear here once added.
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
                                 screen: "OutboundCallsScreen",
                                 params: {
                                     lead: selectedLead
                                 }
                             });
                         }}
                         lead={selectedLead}
                         setTriggerFetch={setTriggerFetch}/>
        </SafeAreaView>
    )
}
