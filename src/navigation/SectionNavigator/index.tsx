import {createNativeStackNavigator} from "@react-navigation/native-stack";
import WelcomeScreen from "../../screens/OnboardingScreens/WelcomeScreen.tsx";

export default function SectionNavigator(){
    const Stack = createNativeStackNavigator()
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="WelcomeScreen"
                options={{headerShown: false, gestureEnabled: false}}
                component={WelcomeScreen}
            />
        </Stack.Navigator>
    )
}
