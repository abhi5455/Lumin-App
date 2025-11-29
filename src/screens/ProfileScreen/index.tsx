import {ScrollView, StatusBar, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {
    Building, Building2,
    ChevronRight,
    Edit,
    Edit3,
    FlameIcon,
    HelpCircle, Info,
    Lock, LogOut,
    Shield, Trash2,
    User,
    UserPlus
} from "lucide-react-native";
import {useAppNavigation} from "../../common/navigationHelper.ts";
import InstitutionModal from "./InstitutionModal.tsx";
import {useEffect, useState} from "react";
import {clearUserProfile} from "../../lib/userStorage.ts";

export default function ProfileScreen() {
    const navigation = useAppNavigation()
    const profileOptions = [
        {
            title: "My Profile",
            subtitle: "Manage your personal details",
            icon: <User size={20} color={"#006a63"}/>,
            action: () => {
                navigation.navigate("SectionNavigator", {
                    screen: "AlumniDetailsScreen",
                    params: {
                        alumnusId: "alumnus_1",
                        type: "myProfile"
                    }
                })
            },
        },
        {
            title: "My Contributions",
            subtitle: "See what you've shared",
            icon: <FlameIcon size={20} color={"#006a63"}/>,
            action: () => {
                navigation.navigate("SectionNavigator", {
                    screen: "ResourceScreen",
                    params: {
                        type: "myContributions"
                    }
                })
            },
        },
        {
            title: "Change Password",
            subtitle: "Update your account credentials",
            icon: <Lock size={20} color={"#006a63"}/>,
            action: () => console.log("Navigate to Change Password"),
        },
        // {
        //     title: "Create Alumni",
        //     subtitle: "Add a new alumni record",
        //     icon: <UserPlus size={20} color={"#006a63"}/>,
        //     action: () => console.log("Navigate to Create Alumni"),
        // },
        // {
        //     title: "Edit Alumni",
        //     subtitle: "Modify existing alumni details",
        //     icon: <Edit size={20} color={"#006a63"}/>,
        //     action: () => console.log("Navigate to Edit Alumni"),
        // },
        // {
        //     title: "Create Company",
        //     subtitle: "Register a new company profile",
        //     icon: <Building size={20} color={"#006a63"}/>,
        //     action: () => console.log("Navigate to Create Company"),
        // },
        // {
        //     title: "Edit Company",
        //     subtitle: "Update company information",
        //     icon: <Edit3 size={20} color={"#006a63"}/>,
        //     action: () => console.log("Navigate to Edit Company"),
        // },
        {
            title: "About Us",
            subtitle: "Learn more about our mission",
            icon: <Info size={20} color={"#006a63"}/>,
            action: () => {
                navigation.navigate("SectionNavigator", {
                    screen: "StaticSupportScreen",
                    params: {sectionType: "About Us"}
                })
            },
        },
        {
            title: "Privacy Policy",
            subtitle: "Learn how we protect your data",
            icon: <Shield size={20} color={"#006a63"}/>,
            action: () => {
                navigation.navigate("SectionNavigator", {
                    screen: "StaticSupportScreen",
                    params: {sectionType: "Privacy Policy"}
                })
            },
        },
        {
            title: "Help Center",
            subtitle: "Get support and find FAQs",
            icon: <HelpCircle size={20} color={"#006a63"}/>,
            action: () => {
                navigation.navigate("SectionNavigator", {
                    screen: "StaticSupportScreen",
                    params: {sectionType: "Help Center"}
                })
            },
        },
        {
            title: "Logout",
            subtitle: "Sign out from your account",
            icon: <LogOut size={20} color={"#006a63"}/>,
            action: () => {
                clearUserProfile()
                navigation.goBack()
                navigation.navigate("SplashScreen");
            },
        },
        {
            title: "Delete Account",
            subtitle: "Permanently remove your account",
            icon: <Trash2 size={20} color={"#006a63"}/>,
            action: () => console.log("Delete Account"),
        },
    ];

    const [isInstitutionModalVisible, setIsInstitutionModalVisible] = useState(false);

    useEffect(() => {
        StatusBar.setBarStyle('light-content')
        StatusBar.setBackgroundColor(isInstitutionModalVisible ? '#01584f' : '#00b19f')
    }, [isInstitutionModalVisible])

    return (
        <SafeAreaView className="flex-1">
            <View className="flex flex-row bg-primary h-[65px] justify-between items-center px-5">
                <Text className="font-poppinsLight text-white text-2xl">Profile</Text>
                <TouchableOpacity onPress={() => setIsInstitutionModalVisible(true)}>
                    <Building2 size={20} color={"#ffffff"} strokeWidth={1.5}/>
                </TouchableOpacity>
            </View>

            <View className="bg-primary flex-1">
                <ScrollView className="bg-white flex-1 rounded-t-[30px] px-4 flex py-4">
                    <View className="flex flex-col justify-center items-center gap-2 mb-2">
                        <View className="flex items-center justify-center bg-primary rounded-full h-20 w-20">
                            <Text className="text-white font-poppinsMedium text-lg">AB</Text>
                        </View>
                        <View className="flex flex-col justify-center items-center">
                            <Text className="font-poppinsMedium text-[18px]">Alice Brown</Text>
                            <Text className="font-poppinsLight text-gray-600">Software Engineer at
                                TechCorp</Text>
                        </View>
                    </View>
                    <View className="mt-5 flex-1 flex flex-col gap-5 self-stretch">
                        <View className="h-[1px] self-stretch bg-gray-100 mb-1"/>

                        {profileOptions?.map((item, index) => (
                            <TouchableOpacity
                                className="flex flex-row items-center justify-between border-b-[1px] border-gray-100 pb-5"
                                key={index}
                                onPress={item?.action}>
                                <View className="flex flex-row items-center gap-4">
                                    <View
                                        className="flex justify-center items-center self-start ml-2 bg-primary/10 w-[50px] h-[50px] rounded-full">
                                        {item?.icon}
                                    </View>
                                    <View className="">
                                        <Text className="font-poppinsMedium text-lg">{item?.title}</Text>
                                        <Text className="font-poppinsLight text-gray-600">{item?.subtitle}</Text>
                                    </View>
                                </View>
                                <ChevronRight size={21} color={"#006a63"}/>
                            </TouchableOpacity>
                        ))}
                        <View className="h-[85px]"/>
                    </View>
                </ScrollView>
            </View>

            <InstitutionModal visible={isInstitutionModalVisible} onClose={()=>setIsInstitutionModalVisible(false)}/>
        </SafeAreaView>
    )
}
