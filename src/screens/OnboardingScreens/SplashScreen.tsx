import {StatusBar, Text, View} from "react-native";

export default function SplashScreen() {
    return (
        <>
            <StatusBar barStyle={"light-content"} backgroundColor="#178671"/>
            <View className="flex-1 items-center justify-center bg-[#178671]">
                <Text className="text-2xl font-bold text-white">
                    Convogents
                </Text>
            </View>
        </>
    )
}
