import {StatusBar, Text, View, Animated} from "react-native";
import {useCallback, useRef, useEffect} from "react";
import {useAppNavigation} from "../../common/navigationHelper.ts";
import {storage} from "../../lib/storage.ts";
import {useFocusEffect} from "@react-navigation/native";

export default function SplashScreen() {
    const navigation = useAppNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1300,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 4,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    useFocusEffect(
        useCallback(() => {
            const authToken = storage.getString('authToken');
            const timer = setTimeout(() => {
                navigation.navigate("TabNavigator");
            }, 1000);
            return () => clearTimeout(timer);
        }, [navigation])
    );

    return (
        <>
            <StatusBar barStyle={"dark-content"} backgroundColor="#ffffff"/>
            <View className="flex-1 items-center justify-center bg-white">
                <Animated.View
                    style={{
                        opacity: fadeAnim,
                        transform: [{scale: scaleAnim}],
                        alignContent: 'center',
                    }}
                >
                    <Text className="text-[36px] text-primary font-poppinsLight self-center">
                        Lumin
                    </Text>
                    <Text className="text-sm text-primary font-poppinsLight mt-[-10px]">
                        - Experience Meets Ambition -
                    </Text>
                </Animated.View>
            </View>
        </>
    );
}
