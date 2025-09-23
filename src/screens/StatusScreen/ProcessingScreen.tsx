import {Text, TouchableOpacity, View} from "react-native";
import ProcessingSymbol from '../../assets/svg/ProcessingSymbol.svg'
import {Info} from "lucide-react-native";
import React from "react";
import {useAppNavigation} from "../../common/navigationHelper.ts";

export default function ProcessingScreen() {
    const navigation = useAppNavigation()
    return (
        <View className={'flex-1 bg-[#f6f7f9]'}>
            <View className={'flex-1 flex-col gap-2 justify-center items-center'}>
                <ProcessingSymbol/>
                <Text className="text-black font-poppinsSemiBold text-[24px] mt-2">
                    Processing...
                </Text>
                <Text className="text-gray-400 font-poppinsMedium text-md">
                    Your request is being handled
                </Text>
                <View className="absolute bottom-14 flex flex-row items-center justify-start gap-2 px-4">
                    <Info color={'#9CA3AF'} size={20}/>
                    <Text className="text-gray-400 font-poppinsMedium text-xs text-start">
                        This may take a few moments. You’ll be notified {'\n'}once it’s complete.
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
