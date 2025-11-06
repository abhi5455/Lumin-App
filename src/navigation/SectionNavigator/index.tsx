import {createNativeStackNavigator} from "@react-navigation/native-stack";
import AlumniDetailsScreen from "../../screens/AlumniScreen/AlumniDetailsScreen";
import CompanyDetailsScreen from "../../screens/CompaniesScreen/CompanyDetailsScreen";
import AddResourceScreen from "../../screens/ResourceScreen/AddResourceScreen";
import StaticSupportScreen from "../../screens/StaticSupportScreen";
import ResourceScreen from "../../screens/ResourceScreen";

export default function SectionNavigator() {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator>
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
                name="ResourceScreen"
                options={{headerShown: false, gestureEnabled: false}}
                component={ResourceScreen}
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
