import {createNativeStackNavigator} from "@react-navigation/native-stack";
import WelcomeScreen from "../../screens/OnboardingScreens/WelcomeScreen.tsx";
import RegisterScreen from "../../screens/OnboardingScreens/RegisterScreen.tsx";
import AlumniDetailsScreen from "../../screens/AlumniScreen/AlumniDetailsScreen";
import CompanyDetailsScreen from "../../screens/CompaniesScreen/CompanyDetailsScreen";
import AddResourceScreen from "../../screens/ResourceScreen/AddResourceScreen";
import StaticSupportScreen from "../../screens/StaticSupportScreen";

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
            <Stack.Screen
                name="CompanyDetailsScreen"
                options={{headerShown: false, gestureEnabled: false}}
                component={CompanyDetailsScreen}
            />

            <Stack.Screen
                name="AddResourceScreen"
                options={{headerShown: false, gestureEnabled: false}}
                component={AddResourceScreen}
            />

            <Stack.Screen
                name="StaticSupportScreen"
                options={{headerShown: false, gestureEnabled: false}}
                component={StaticSupportScreen}
            />
        </Stack.Navigator>
    )
}
