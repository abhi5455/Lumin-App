import {createNativeStackNavigator} from "@react-navigation/native-stack";
import WelcomeScreen from "../../screens/OnboardingScreens/WelcomeScreen.tsx";
import RegisterScreen from "../../screens/OnboardingScreens/RegisterScreen.tsx";
import AlumniDetailsScreen from "../../screens/AlumniScreen/AlumniDetailsScreen";

export default function SectionNavigator() {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="WelcomeScreen"
                options={{headerShown: false, gestureEnabled: false}}
                component={WelcomeScreen}
            />
            <Stack.Screen
                name="RegisterScreen"
                options={{headerShown: false, gestureEnabled: false}}
                component={RegisterScreen}
            />


            <Stack.Screen
                name="AlumniDetailsScreen"
                options={{headerShown: false, gestureEnabled: false}}
                component={AlumniDetailsScreen}
            />
        </Stack.Navigator>
    )
}
