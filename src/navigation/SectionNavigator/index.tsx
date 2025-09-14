import {createNativeStackNavigator} from "@react-navigation/native-stack";
import WelcomeScreen from "../../screens/OnboardingScreens/WelcomeScreen.tsx";
import AuthScreen from "../../screens/OnboardingScreens/AuthScreen.tsx";

export default function SectionNavigator(){
    const Stack = createNativeStackNavigator()
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="WelcomeScreen"
                options={{headerShown: false, gestureEnabled: false}}
                component={WelcomeScreen}
            />
            <Stack.Screen
                name="AuthScreen"
                options={{headerShown: false, gestureEnabled: false}}
                component={AuthScreen}
            />
        </Stack.Navigator>
    )
}
