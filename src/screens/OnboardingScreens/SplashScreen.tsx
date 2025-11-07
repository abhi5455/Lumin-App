import {StatusBar, Text, View} from "react-native";
import {useCallback} from "react";
import {useAppNavigation} from "../../common/navigationHelper.ts";
import {storage} from "../../lib/storage.ts";
import {useFocusEffect} from "@react-navigation/native";

export default function SplashScreen() {
    const navigation = useAppNavigation();

    useFocusEffect(
        useCallback(() => {
            const authToken = storage.getString('authToken');
            const timer = setTimeout(() => {
                // if (!authToken || authToken === '') {
                //     navigation.navigate("SectionNavigator", {
                //         screen: "WelcomeScreen",
                //     });
                //     return;
                // }
                navigation.navigate("TabNavigator");

            }, 2000);

            return () => clearTimeout(timer);
        }, [navigation])
    );

    return (
        <>
            <StatusBar barStyle={"dark-content"} backgroundColor="#ffffff"/>
            <View className="flex-1 items-center justify-center bg-white">
                <Text className="text-[36px] text-primary font-poppinsLight">
                    Lumin
                </Text>
                <Text className="text-sm text-primary font-poppinsLight mt-[-10px]">
                    - Experience Meets Ambition -
                </Text>
            </View>
        </>
    )
}
