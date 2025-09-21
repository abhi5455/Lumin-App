import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Dimensions, StyleSheet, View, Text} from "react-native";
import AnimIcon from "../../common/AnimIcon.tsx";
import DashboardIcon from '../../assets/svg/DashboardIcon.svg'
import DashboardIconActive from '../../assets/svg/DashboardIconActive.svg'
import ConversationIcon from '../../assets/svg/ConversationIcon.svg'
import ConversationIconActive from '../../assets/svg/ConversationIconActive.svg'
import LeadsIcon from '../../assets/svg/LeadsIcon.svg'
import LeadsIconActive from '../../assets/svg/LeadsIconActive.svg'
import AgentIcon from '../../assets/svg/AgentIcon.svg'
import AgentIconActive from '../../assets/svg/AgentIconActive.svg'
import NumbersIcon from '../../assets/svg/NumbersIcon.svg'
import NumbersIconActive from '../../assets/svg/NumbersIconActive.svg'
import {useEffect, useState} from "react";
import {getFocusedRouteNameFromRoute} from "@react-navigation/native";
import DashboardScreen from "../../screens/DashboardScreen/page.tsx";
import ConversationScreen from "../../screens/ConversationScreen/page.tsx";
import LeadsScreen from "../../screens/LeadsScreen/page.tsx";
import AgentScreen from "../../screens/AgentScreen/page.tsx";
import NumbersScreen from "../../screens/NumbersScreen/page.tsx";

export default function TabNavigator() {
    const Tab = createBottomTabNavigator()

    function getOrientation() {
        const {width, height} = Dimensions.get('window');
        return width > height ? 'landscape' : 'portrait';
    }

    const [orientation, setOrientation] = useState(getOrientation());
    console.log("orientation", orientation);
    useEffect(() => {
        const handleOrientationChange = () => {
            setOrientation(getOrientation());
        };

        const subscription = Dimensions.addEventListener(
            "change",
            handleOrientationChange
        );

        return () => {
            // subscription?.remove();
        };
    }, []);
    const isTabBarVisible = (route: any) => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName == "CreateTestScreen") {
            return "none";
        } else {
            return "flex";
        }
    };

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: true,
                tabBarStyle: styles.tabBar,
                tabBarHideOnKeyboard: true,
            }}
        >
            <Tab.Screen
                name="DashboardScreen"
                component={DashboardScreen}
                options={({route}) => ({
                    tabBarLabel: ({focused}) => (
                        <Text
                            style={
                                focused
                                    ? [
                                        styles.activeLabel,
                                        {
                                            top: orientation == "landscape" ? 28 : 1,
                                            right: orientation == "landscape" ? 16 : 0,
                                            color: "#178671",
                                        },
                                    ]
                                    : [
                                        styles.inActiveLabel,
                                        {
                                            top: orientation == "landscape" ? 28 : 1,
                                            right: orientation == "landscape" ? 16 : 0,
                                            color: "#889baf",
                                        },
                                    ]
                            }
                        >
                            Dashboard
                        </Text>
                    ),
                    tabBarIcon: ({focused, color}) => {
                        return (
                            <AnimIcon focused={focused} color={color}>
                                {focused ? (
                                    <DashboardIconActive/>
                                ) : (
                                    <DashboardIcon/>
                                )}
                            </AnimIcon>
                        );
                    },
                    tabBarStyle: {
                        ...styles.tabBar,
                        display: isTabBarVisible(route),
                    },
                })}
            />
            <Tab.Screen
                name="ConversationScreen"
                component={ConversationScreen}
                options={({route}) => ({
                    tabBarLabel: ({focused}) => (
                        <Text
                            style={
                                focused
                                    ? [
                                        styles.activeLabel,
                                        {
                                            top: orientation == "landscape" ? 28 : 1,
                                            right: orientation == "landscape" ? 16 : 0,
                                            color: "#178671",
                                            width: 85,
                                            textAlign: "center",
                                        },
                                    ]
                                    : [
                                        styles.inActiveLabel,
                                        {
                                            top: orientation == "landscape" ? 28 : 1,
                                            right: orientation == "landscape" ? 16 : 0,
                                            color: "#889baf",
                                            width: 85,
                                            textAlign: "center",
                                        },
                                    ]
                            }
                        >
                            Conversation
                        </Text>
                    ),
                    tabBarIcon: ({focused, color}) => {
                        return (
                            <AnimIcon focused={focused} color={color}>
                                {focused ? (
                                    <View>
                                        <ConversationIconActive/>
                                    </View>
                                ) : (
                                    <ConversationIcon/>
                                )}
                            </AnimIcon>
                        );
                    },
                    tabBarStyle: {
                        ...styles.tabBar,
                        display: isTabBarVisible(route),
                    },
                })}
            />
            <Tab.Screen
                name="LeadsScreen"
                component={LeadsScreen}
                options={({route}) => ({
                    tabBarLabel: ({focused}) => (
                        <Text
                            style={
                                focused
                                    ? [
                                        styles.activeLabel,
                                        {
                                            top: orientation == "landscape" ? 28 : 1,
                                            right: orientation == "landscape" ? 16 : 0,
                                            color: "#178671",
                                        },
                                    ]
                                    : [
                                        styles.inActiveLabel,
                                        {
                                            top: orientation == "landscape" ? 28 : 1,
                                            right: orientation == "landscape" ? 16 : 0,
                                            color: "#889baf",
                                        },
                                    ]
                            }
                        >
                            Leads
                        </Text>
                    ),
                    tabBarIcon: ({focused, color}) => {
                        return (
                            <AnimIcon focused={focused} color={color}>
                                {focused ? (
                                    <View>
                                        <LeadsIconActive/>
                                    </View>
                                ) : (
                                    <LeadsIcon/>
                                )}
                            </AnimIcon>
                        );
                    },
                    tabBarStyle: {
                        ...styles.tabBar,
                        display: isTabBarVisible(route),
                    },
                })}
            />
            <Tab.Screen
                name="AgentScreen"
                component={AgentScreen}
                options={({route}) => ({
                    tabBarLabel: ({focused}) => (
                        <Text
                            style={
                                focused
                                    ? [
                                        styles.activeLabel,
                                        {
                                            top: orientation == "landscape" ? 28 : 1,
                                            right: orientation == "landscape" ? 16 : 0,
                                            color: "#178671",
                                        },
                                    ]
                                    : [
                                        styles.inActiveLabel,
                                        {
                                            top: orientation == "landscape" ? 28 : 1,
                                            right: orientation == "landscape" ? 16 : 0,
                                            color: "#889baf",
                                        },
                                    ]
                            }
                        >
                            Agent
                        </Text>
                    ),
                    tabBarIcon: ({focused, color}) => {
                        return (
                            <AnimIcon focused={focused} color={color}>
                                {focused ? (
                                    <View>
                                        <AgentIconActive/>
                                    </View>
                                ) : (
                                    <AgentIcon/>
                                )}
                            </AnimIcon>
                        );
                    },
                    tabBarStyle: {
                        ...styles.tabBar,
                        display: isTabBarVisible(route),
                    },
                })}
            />
            <Tab.Screen
                name="NumbersScreen"
                component={NumbersScreen}
                options={({route}) => ({
                    tabBarLabel: ({focused}) => (
                        <Text
                            style={
                                focused
                                    ? [
                                        styles.activeLabel,
                                        {
                                            top: orientation == "landscape" ? 28 : 1,
                                            right: orientation == "landscape" ? 16 : 0,
                                            color: "#178671",
                                        },
                                    ]
                                    : [
                                        styles.inActiveLabel,
                                        {
                                            top: orientation == "landscape" ? 28 : 1,
                                            right: orientation == "landscape" ? 16 : 0,
                                            color: "#889baf",
                                        },
                                    ]
                            }
                        >
                            Numbers
                        </Text>
                    ),
                    tabBarIcon: ({focused, color}) => {
                        return (
                            <AnimIcon focused={focused} color={color}>
                                {focused ? (
                                    <View>
                                        <NumbersIconActive/>
                                    </View>
                                ) : (
                                    <NumbersIcon/>
                                )}
                            </AnimIcon>
                        );
                    },
                    tabBarStyle: {
                        ...styles.tabBar,
                        display: isTabBarVisible(route),
                    },
                })}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#FFFFFF',
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        paddingTop: 5,
        paddingHorizontal: 10,
        height: 65,
        position: "absolute",
    },
    activeLabel: {
        fontFamily: "Poppins-Medium",
        color: "#6C737F",
        fontSize: 10,
        lineHeight: 13.13,
        // top: responsiveSize(-10),
        borderWidth: 0,
    },
    inActiveLabel: {
        fontFamily: "Poppins-Medium",
        color: "#FFF",
        fontSize: 10,
        lineHeight: 13.13,
        top: -10,
    },
    activeWrapper: {
        borderWidth: 0,
        backgroundColor: "#FFF2E6",
        borderRadius: 100,
        width: 70,
        alignItems: "center",
        justifyContent: "center",
        height: 50,
    },
});
