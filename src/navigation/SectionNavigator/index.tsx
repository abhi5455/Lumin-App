import {createNativeStackNavigator} from "@react-navigation/native-stack";
import WelcomeScreen from "../../screens/OnboardingScreens/WelcomeScreen.tsx";
import RegisterScreen from "../../screens/OnboardingScreens/RegisterScreen.tsx";
import LeadInfoScreen from "../../screens/ConversationScreen/components/LeadInfoScreen.tsx";
import ChatScreen from "../../screens/ConversationScreen/components/ChatScreen.tsx";
import OutboundCallsScreen from "../../screens/LeadsScreen/components/OutboundCallsScreen.tsx";
import AgentDetailsScreen from "../../screens/AgentScreen/components/AgentDetailsScreen.tsx";
import AccountSettingsScreen from "../../screens/AccountSettingsScreen/page.tsx";
import AccountInfoScreen from "../../screens/AccountSettingsScreen/AccountInfoScreen.tsx";
import SubscriptionScreen from "../../screens/SubscriptionScreen/page.tsx";
import SuccessScreen from "../../screens/StatusScreen/SuccessScreen.tsx";
import ProcessingScreen from "../../screens/StatusScreen/ProcessingScreen.tsx";
import ErrorScreen from "../../screens/StatusScreen/ErrorScreen.tsx";
import TermsOfServices from "../../screens/AccountSettingsScreen/TermsOfService.tsx";
import RefundPolicy from "../../screens/AccountSettingsScreen/RefundPolicy.tsx";
import PrivacyPolicy from "../../screens/AccountSettingsScreen/PrivacyPolicy.tsx";

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

            <Stack.Screen
                name="NumbersScreen"
                options={{headerShown: false, gestureEnabled: false}}
                component={AccountInfoScreen}
            />

            <Stack.Screen
                name="SubscriptionScreen"
                options={{headerShown: false, gestureEnabled: false}}
                component={SubscriptionScreen}
            />


            <Stack.Screen
                name="SuccessScreen"
                options={{headerShown: false, gestureEnabled: false}}
                component={SuccessScreen}
            />
            <Stack.Screen
                name="ProcessingScreen"
                options={{headerShown: false, gestureEnabled: false}}
                component={ProcessingScreen}
            />
            <Stack.Screen
                name="ErrorScreen"
                options={{headerShown: false, gestureEnabled: false}}
                component={ErrorScreen}
            />


            <Stack.Screen
                name="TermsOfServices"
                options={{headerShown: false, gestureEnabled: false}}
                component={TermsOfServices}
            />
            <Stack.Screen
                name="RefundPolicy"
                options={{headerShown: false, gestureEnabled: false}}
                component={RefundPolicy}
            />
            <Stack.Screen
                name="PrivacyPolicy"
                options={{headerShown: false, gestureEnabled: false}}
                component={PrivacyPolicy}
            />
        </Stack.Navigator>
    )
}
