import {createNativeStackNavigator} from "@react-navigation/native-stack";
import AuthScreen from "../../screens/OnboardingScreens/AuthScreen.tsx";
import OtpScreen from "../../screens/OnboardingScreens/OtpScreen.tsx";

export const AuthenticationStack = () => {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="AuthScreen"
                options={{headerShown: false, gestureEnabled: false}}
                component={AuthScreen}
            />
            <Stack.Screen
                name="OtpScreen"
                options={{headerShown: false, gestureEnabled: false}}
                component={OtpScreen}
            />
        </Stack.Navigator>
    )
}
