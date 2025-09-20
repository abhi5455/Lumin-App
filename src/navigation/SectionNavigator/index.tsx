import {createNativeStackNavigator} from "@react-navigation/native-stack";
import WelcomeScreen from "../../screens/OnboardingScreens/WelcomeScreen.tsx";
import RegisterScreen from "../../screens/OnboardingScreens/RegisterScreen.tsx";
import LeadInfoScreen from "../../screens/ConversationScreen/Components/LeadInfoScreen.tsx";
import ChatScreen from "../../screens/ConversationScreen/Components/ChatScreen.tsx";

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
                name="RegisterScreen"
                options={{headerShown: false, gestureEnabled: false}}
                component={RegisterScreen}
            />

            <Stack.Screen
                name="LeadInfoScreen"
                options={{headerShown: false, gestureEnabled: false}}
                component={LeadInfoScreen}
            />
            <Stack.Screen
                name="ChatScreen"
                options={{headerShown: false, gestureEnabled: false}}
                component={ChatScreen}
            />
        </Stack.Navigator>
    )
}
