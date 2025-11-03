import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Dimensions, StyleSheet, View, Text} from "react-native";
import AnimIcon from "../../common/AnimIcon.tsx";
import ProfileIcon from '../../assets/svg/ProfileIcon.svg'
import ProfileIconActive from '../../assets/svg/ProfileIconActive.svg'
import ResourceIcon from '../../assets/svg/ResourceIcon.svg'
import ResourceIconActive from '../../assets/svg/ResourceIconActive.svg'
import CompanyIcon from '../../assets/svg/CompanyIcon.svg'
import CompanyIconActive from '../../assets/svg/CompanyIconActive.svg'
import AlumniIcon from '../../assets/svg/AlumniIcon.svg'
import AlumniIconActive from '../../assets/svg/AlumniIconActive.svg'
import {useEffect, useState} from "react";
import {getFocusedRouteNameFromRoute} from "@react-navigation/native";
import AlumniScreen from "../../screens/AlumniScreen";

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
                component={AlumniScreen}
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
                            Alumni
                        </Text>
                    ),
                    tabBarIcon: ({focused, color}) => {
                        return (
                            <AnimIcon focused={focused} color={color}>
                                {focused ? (
                                    <AlumniIconActive/>
                                ) : (
                                    <AlumniIcon/>
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
                component={AlumniScreen}
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
                            Companies
                        </Text>
                    ),
                    tabBarIcon: ({focused, color}) => {
                        return (
                            <AnimIcon focused={focused} color={color}>
                                {focused ? (
                                    <View>
                                        <CompanyIconActive/>
                                    </View>
                                ) : (
                                    <CompanyIcon/>
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
                component={AlumniScreen}
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
                            Resources
                        </Text>
                    ),
                    tabBarIcon: ({focused, color}) => {
                        return (
                            <AnimIcon focused={focused} color={color}>
                                {focused ? (
                                    <View>
                                        <ResourceIconActive/>
                                    </View>
                                ) : (
                                    <ResourceIcon/>
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
                component={AlumniScreen}
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
                            Profile
                        </Text>
                    ),
                    tabBarIcon: ({focused, color}) => {
                        return (
                            <AnimIcon focused={focused} color={color}>
                                {focused ? (
                                    <View>
                                        <ProfileIconActive/>
                                    </View>
                                ) : (
                                    <ProfileIcon/>
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
