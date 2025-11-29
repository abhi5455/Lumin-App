import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SplashScreen from "../../screens/OnboardingScreens/SplashScreen.tsx";
import SectionNavigator from "../SectionNavigator";
import TabNavigator from "../TabNavigator";
import {useMMKVBoolean} from "react-native-mmkv";
import AuthScreen from "../../screens/OnboardingScreens/AuthScreen.tsx";

export const StackNavigator = () => {
    const Stack = createNativeStackNavigator()
    const [isSignedIn, setIsSignedIn] = useMMKVBoolean('isSignedIn');

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="SplashScreen"
                options={{headerShown: false, gestureEnabled: false}}
                component={SplashScreen}
            />
            <Stack.Screen
                name="AuthScreen"
                options={{headerShown: false, gestureEnabled: false}}
                component={AuthScreen}
            />
            <Stack.Screen
                name="TabNavigator"
                options={{headerShown: false, gestureEnabled: false}}
                component={TabNavigator}
            />
            <Stack.Screen
                name="SectionNavigator"
                options={{headerShown: false, gestureEnabled: false}}
                component={SectionNavigator}
            />
        </Stack.Navigator>
    )
}
