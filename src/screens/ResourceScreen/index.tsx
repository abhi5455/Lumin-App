import {StatusBar, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

export default function ResourceScreen() {

    return (
        <SafeAreaView className="flex-1">
            <StatusBar barStyle="light-content" backgroundColor={'#00b19f'}/>
            <View className="bg-primary h-[65px] justify-center px-5">
                <Text className="font-poppinsLight text-white text-2xl">Resources</Text>
            </View>

            <View className="bg-primary flex-1">
                <View className="bg-white flex-1 rounded-t-[30px] px-5 flex justify-center items-center">
                    <Text className="font-poppins text-primary text-xl">Coming Soooon!</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}
