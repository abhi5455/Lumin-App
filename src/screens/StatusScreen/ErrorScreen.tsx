import {Text, TouchableOpacity, View} from "react-native";
import ErrorSymbol from '../../assets/svg/ErrorSymbol.svg'
import {Info} from "lucide-react-native";
import React from "react";
import {useAppNavigation} from "../../common/navigationHelper.ts";

export default function ErrorScreen() {
    const navigation = useAppNavigation()
    return (
        <View className={'flex-1 bg-[#f6f7f9]'}>
            <View className={'flex-1 flex-col gap-2 justify-center items-center'}>
                <ErrorSymbol/>
                <Text className="text-black font-poppinsSemiBold text-[24px] mt-2">
                    Success!!!
                </Text>
                <Text className="text-gray-400 font-poppinsMedium text-md">
                    Your Action is Complete
                </Text>
                <View className="absolute bottom-14 flex flex-row items-center justify-start gap-2 ">
                    <Info color={'#9CA3AF'} size={20}/>
                    <Text className="text-gray-400 font-poppinsMedium text-xs text-start">
                        Your request has been processed successfully.{'\n'}You can now proceed with the next step.
                    </Text>
                </View>
            </View>
            <View className="">
                <TouchableOpacity
                    className="bg-primary py-5"
                    onPress={() => {
                        navigation.goBack()
                    }}>
                    <Text className="text-white text-center text-lg font-poppinsSemiBold">Close</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
