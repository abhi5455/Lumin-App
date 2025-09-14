import {StatusBar, Text, View} from "react-native";
import {useEffect} from "react";
import {useAppNavigation} from "../../common/navigationHelper.ts";

export default function SplashScreen() {
    const navigation = useAppNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            // Replace 'WelcomeScreen' with the actual name of your welcome screen
            // navigation.goBack()
            navigation.navigate("WelcomeScreen");
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

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
