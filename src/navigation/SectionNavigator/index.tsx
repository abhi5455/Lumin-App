import {createNativeStackNavigator} from "@react-navigation/native-stack";
import WelcomeScreen from "../../screens/OnboardingScreens/WelcomeScreen.tsx";
import RegisterScreen from "../../screens/OnboardingScreens/RegisterScreen.tsx";
import LeadInfoScreen from "../../screens/ConversationScreen/components/LeadInfoScreen.tsx";
import ChatScreen from "../../screens/ConversationScreen/components/ChatScreen.tsx";
import OutboundCallsScreen from "../../screens/LeadsScreen/components/OutboundCallsScreen.tsx";
import AgentDetailsScreen from "../../screens/AgentScreen/components/AgentDetailsScreen.tsx";
import AccountSettingsScreen from "../../screens/AccountSettingsScreen/page.tsx";
import AccountInfoScreen from "../../screens/AccountSettingsScreen/AccountInfoScreen.tsx";

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


            <Stack.Screen
                name="OutboundCallsScreen"
                options={{headerShown: false, gestureEnabled: false}}
                component={OutboundCallsScreen}
            />

            <Stack.Screen
                name="AgentDetailsScreen"
                options={{headerShown: false, gestureEnabled: false}}
                component={AgentDetailsScreen}
            />

            <Stack.Screen
                name="AccountSettingsScreen"
                options={{headerShown: false, gestureEnabled: false}}
                component={AccountSettingsScreen}
            />
            <Stack.Screen
                name="AccountInfoScreen"
                options={{headerShown: false, gestureEnabled: false}}
                component={AccountInfoScreen}
            />
        </Stack.Navigator>
    )
}
