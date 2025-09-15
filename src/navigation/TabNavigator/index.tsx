import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Dimensions, StyleSheet, View} from "react-native";
import AnimIcon from "../../common/AnimIcon.tsx";
import DashboardIcon from '../../assets/svg/DashboardIcon.svg'
import ConversationIcon from '../../assets/svg/ConversationIcon.svg'
import LeadsIcon from '../../assets/svg/LeadsIcon.svg'
import AgentIcon from '../../assets/svg/AgentIcon.svg'
import NumbersIcon from '../../assets/svg/NumbersIcon.svg'
import {useEffect, useState} from "react";
import {getFocusedRouteNameFromRoute} from "@react-navigation/native";
import DashboardScreen from "../../screens/DashboardScreen/page.tsx";

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
                    tabBarLabel: () => null,
                    tabBarIcon: ({focused, color}) => {
                        return (
                            <AnimIcon focused={focused} color={color}>
                                {focused ? (
                                    <View>
                                        <DashboardIcon/>
                                    </View>
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
                component={DashboardScreen}
                options={({route}) => ({
                    tabBarLabel: () => null,
                    tabBarIcon: ({focused, color}) => {
                        return (
                            <AnimIcon focused={focused} color={color}>
                                {focused ? (
                                    <View>
                                        <ConversationIcon/>
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
                component={DashboardScreen}
                options={({route}) => ({
                    tabBarLabel: () => null,
                    tabBarIcon: ({focused, color}) => {
                        return (
                            <AnimIcon focused={focused} color={color}>
                                {focused ? (
                                    <View>
                                        <LeadsIcon/>
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
                component={DashboardScreen}
                options={({route}) => ({
                    tabBarLabel: () => null,
                    tabBarIcon: ({focused, color}) => {
                        return (
                            <AnimIcon focused={focused} color={color}>
                                {focused ? (
                                    <View>
                                        <AgentIcon/>
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
                component={DashboardScreen}
                options={({route}) => ({
                    tabBarLabel: () => null,
                    tabBarIcon: ({focused, color}) => {
                        return (
                            <AnimIcon focused={focused} color={color}>
                                {focused ? (
                                    <View>
                                        <NumbersIcon/>
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
        paddingTop: 12,
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
