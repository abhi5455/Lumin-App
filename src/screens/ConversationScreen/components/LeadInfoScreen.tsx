import {SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {Phone, PhoneIncoming} from "lucide-react-native";
import React from "react";
import {useAppNavigation} from "../../../common/navigationHelper.ts";
import BackIcon from '../../../assets/svg/BackIcon.svg'
import {IConversation} from "../../../types/conversation.ts";
import {RouteProp, useRoute} from "@react-navigation/core";
import {differenceInMinutes, format, formatISO} from "date-fns";

interface ILeadInfoScreenPropsParams {
    conversation: IConversation
}

export default function LeadInfoScreen() {
    const route = useRoute<RouteProp<{ LeadInfoScreen: ILeadInfoScreenPropsParams }, 'LeadInfoScreen'>>();
    const { conversation } = route?.params;
    const navigation = useAppNavigation()

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
                    <Text className="text-white text-lg font-poppinsSemiBold">Lead Information</Text>
                </View>
            </View>

            <ScrollView className="flex-1 px-6 py-6">
                {/* Profile Section */}
                <View className="flex flex-row justify-between items-center mb-4 border-b-[1px] border-gray-200 pb-4">
                    <View className="flex flex-row">
                        <View className="w-12 h-12 bg-teal-600 rounded-full items-center justify-center mr-4">
                            <Text className="text-white text-lg font-poppinsSemiBold">A</Text>
                        </View>
                        <View className="">
                            <Text className="text-black text-base font-poppinsSemiBold">{conversation?.lead?.fullName}</Text>
                            <Text className="text-gray-500 text-sm font-poppinsMedium">{conversation?.lead?.phone}</Text>
                        </View>
                    </View>
                    <View className="px-2 py-1 border-[#4caf50] border-[1px] rounded-full">
                        <Text className="text-[#4caf50] text-xs font-poppinsMedium">{conversation?.status}</Text>
                    </View>
                </View>

                {/* Info Sections */}
                <View className="flex gap-5">
                    <View>
                        <Text className="text-gray-400 text-xs font-poppinsMedium uppercase tracking-wide mb-2">EMAIL</Text>
                        <Text className="text-black text-base font-poppinsMedium">{conversation?.lead?.email}</Text>
                    </View>

                    <View>
                        <Text className="text-gray-400 text-xs font-poppinsMedium uppercase tracking-wide mb-2">TIME</Text>
                        <Text className="text-black text-base font-poppinsMedium">{format(new Date(conversation?.startTime), "hh:mm a")} -  {format(new Date(conversation.endTime), "hh:mm a")}</Text>
                    </View>

                    <View>
                        <Text className="text-gray-400 text-xs font-poppinsMedium uppercase tracking-wide mb-2">DATE</Text>
                        <Text className="text-black text-base font-poppinsMedium">{format(new Date(conversation?.date), "dd-MM-yyyy")}</Text>
                    </View>

                    <View>
                        <Text className="text-gray-400 text-xs font-poppinsMedium uppercase tracking-wide mb-2">AGENT</Text>
                        <Text className="text-black text-base font-poppinsMedium">{conversation?.agent?.name}</Text>
                    </View>

                    <View>
                        <Text className="text-gray-400 text-xs font-poppinsMedium uppercase tracking-wide mb-2">DURATION</Text>
                        <Text className="text-black text-base font-poppinsMedium">{differenceInMinutes(new Date(conversation.endTime), new Date(conversation.startTime))} mins</Text>
                    </View>

                    <View>
                        <Text className="text-gray-400 text-xs font-poppinsMedium uppercase tracking-wide mb-2">CALL TYPE</Text>
                        <View className="flex flex-row items-center gap-2">
                            <PhoneIncoming size={20} color="#4caf50"/>
                            <Text className="text-black text-base font-poppinsMedium">{conversation?.callType}</Text>
                        </View>
                    </View>

                    <View>
                        <Text className="text-gray-400 text-xs font-poppinsMedium uppercase tracking-wide mb-2">CONVERSATION</Text>
                        <Text className="text-black text-base font-poppinsMedium leading-6">
                            Born and raised in Pennsylvania, Swift moved to Nashville, Tennessee, at the age of 14 to pursue a career in country music. She signed with the label Big Machine Records and became the youngest artist ever signed by the Sony/ATV Music publishing house.
                        </Text>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Button */}
            <View className="">
                <TouchableOpacity
                    className="bg-teal-600 py-5"
                    onPress={() => {
                        navigation.navigate("SectionNavigator", {
                            screen: "ChatScreen",
                        });
                    }}
                >
                    <Text className="text-white text-center text-lg font-poppinsSemiBold">View Conversation</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
