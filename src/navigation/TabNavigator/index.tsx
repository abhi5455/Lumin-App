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
import CompaniesScreen from "../../screens/CompaniesScreen";
import ResourceScreen from "../../screens/ResourceScreen";
import ProfileScreen from "../../screens/ProfileScreen";

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
                name="AlumniScreen"
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
                                            color: "#00796E",
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
                                    <View className="bg-primary/10 p-1 px-3 rounded-2xl">
                                        <AlumniIconActive/>
                                    </View>
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
                name="CompaniesScreen"
                component={CompaniesScreen}
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
                                            color: "#00796E",
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
                                    <View className="bg-primary/10 p-1 px-3 rounded-2xl">
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
                name="ResourceScreen"
                component={ResourceScreen}
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
                                            color: "#00796E",
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
                                    <View className="bg-primary/10 p-1 px-3 rounded-2xl">
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
                name="ProfileScreen"
                component={ProfileScreen}
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
                                            color: "#00796E",
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
                                    <View className="bg-primary/10 p-1 px-3 rounded-2xl">
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
        borderTopWidth: 0.5,
        borderTopColor: '#D1D5DBB3',
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
        // backgroundColor: "#00B19F1A",
        paddingHorizontal: 7,
        paddingVertical: 2,
        borderRadius: 50,
        borderWidth: 0,
    },
    inActiveLabel: {
        fontFamily: "Poppins-Medium",
        color: "#FFF",
        fontSize: 10,
        lineHeight: 13.13,
        top: -10,
        marginTop: 1.8
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
