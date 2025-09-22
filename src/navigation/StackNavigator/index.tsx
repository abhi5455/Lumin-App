import {Fragment, useState} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SplashScreen from "../../screens/OnboardingScreens/SplashScreen.tsx";
import SectionNavigator from "../SectionNavigator";
import {AuthenticationStack} from "./AuthenticationStack.tsx";
import TabNavigator from "../TabNavigator";

export const StackNavigator = () => {
    const Stack = createNativeStackNavigator()
    // const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null);

    // useEffect(() => {
    //     (async () => {
    //         const signedIn = await checkIsSignedIn();
    //         setIsSignedIn(signedIn);
    //     })();
    // }, []);

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="SplashScreen"
                options={{headerShown: false, gestureEnabled: false}}
                component={SplashScreen}
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
            <Stack.Screen
                name="AuthenticationStack"
                options={{headerShown: false, gestureEnabled: false}}
                component={AuthenticationStack}
            />
            {/*<Stack.Screen*/}
            {/*    name="TabNavigator"*/}
            {/*    options={{headerShown: false, gestureEnabled: false}}*/}
            {/*    component={TabNavigator}*/}
            {/*/>*/}
            {/*{isSignedIn*/}
            {/*    ?*/}
            {/*<Fragment>*/}
                {/*<Stack.Screen*/}
                {/*    name="TabNavigator"*/}
                {/*    options={{headerShown: false, gestureEnabled: false}}*/}
                {/*    component={TabNavigator}*/}
                {/*/>*/}
            {/*    <Stack.Screen*/}
            {/*        name="SectionNavigator"*/}
            {/*        options={{headerShown: false, gestureEnabled: false}}*/}
            {/*        component={SectionNavigator}*/}
            {/*    />*/}
            {/*</Fragment>*/}
            {/*/!*:*!/*/}
            {/*<Stack.Screen*/}
            {/*    name="AuthenticationStack"*/}
            {/*    options={{headerShown: false, gestureEnabled: false}}*/}
            {/*    component={AuthenticationStack}*/}
            {/*/>*/}
            {/*/!*}*!/*/}
        </Stack.Navigator>
    )
}
