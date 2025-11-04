import {ScrollView, StatusBar, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {
    Building,
    ChevronRight,
    Edit,
    Edit3,
    FileText,
    HelpCircle,
    Lock, LogOut,
    Shield, Trash2,
    User,
    UserPlus
} from "lucide-react-native";

const profileOptions = [
    {
        title: "My Profile",
        subtitle: "View and update your personal details",
        icon: <User size={19} color={"#DAA520"}/>,
        action: () => console.log("Navigate to My Profile"),
    },
    {
        title: "Change Password",
        subtitle: "Update your account credentials",
        icon: <Lock size={19} color={"#DAA520"}/>,
        action: () => console.log("Navigate to Change Password"),
    },
    {
        title: "Help Center",
        subtitle: "Get support and find FAQs",
        icon: <HelpCircle size={19} color={"#DAA520"}/>,
        action: () => console.log("Navigate to Help Center"),
    },
    {
        title: "Terms & Conditions",
        subtitle: "Read the app’s usage policies",
        icon: <FileText size={19} color={"#DAA520"}/>,
        action: () => console.log("Navigate to Terms & Conditions"),
    },
    {
        title: "Privacy Policy",
        subtitle: "Understand how we protect your data",
        icon: <Shield size={19} color={"#DAA520"}/>,
        action: () => console.log("Navigate to Privacy Policy"),
    },
    {
        title: "Create Alumni",
        subtitle: "Add a new alumni record",
        icon: <UserPlus size={19} color={"#DAA520"}/>,
        action: () => console.log("Navigate to Create Alumni"),
    },
    {
        title: "Edit Alumni",
        subtitle: "Modify existing alumni details",
        icon: <Edit size={19} color={"#DAA520"}/>,
        action: () => console.log("Navigate to Edit Alumni"),
    },
    {
        title: "Create Company",
        subtitle: "Register a new company profile",
        icon: <Building size={19} color={"#DAA520"}/>,
        action: () => console.log("Navigate to Create Company"),
    },
    {
        title: "Edit Company",
        subtitle: "Update company information",
        icon: <Edit3 size={19} color={"#DAA520"}/>,
        action: () => console.log("Navigate to Edit Company"),
    },

    // ——— Account Actions ———
    {
        title: "Logout",
        subtitle: "Sign out from your account",
        icon: <LogOut size={19} color={"#DAA520"}/>,
        action: () => console.log("Logout User"),
    },
    {
        title: "Delete Account",
        subtitle: "Permanently remove your account",
        icon: <Trash2 size={19} color={"#DAA520"}/>,
        action: () => console.log("Delete Account"),
    },
];


export default function ProfileScreen() {

    return (
        <SafeAreaView className="flex-1">
            <StatusBar barStyle="light-content" backgroundColor={'#00b19f'}/>
            <View className="bg-primary h-[65px] justify-center px-5">
                <Text className="font-poppinsLight text-white text-2xl">Profile</Text>
            </View>

            <View className="bg-primary flex-1">
                <View className="bg-white flex-1 rounded-t-[30px] px-4 flex justify-start items-center py-4">
                    <View className="flex flex-col justify-center items-center gap-2 mb-2">
                        <View className="flex items-center justify-center bg-primary rounded-full h-20 w-20">
                            <Text className="text-white font-poppinsMedium">AB</Text>
                        </View>
                        <View className="flex flex-col justify-center items-center">
                            <Text className="font-poppinsMedium text-[18px]">Alice Brown</Text>
                            <Text className="font-poppinsLight text-gray-600">Software Engineer at
                                TechCorp</Text>
                        </View>
                    </View>
                    <ScrollView className="mt-5 flex-1 flex flex-col gap-5 self-stretch">
                        <View className="h-[1px] self-stretch bg-gray-100 mb-5"/>
                        {profileOptions?.map((item, index) => (
                            <TouchableOpacity
                                className="flex flex-row items-center justify-between border-b-[1px] border-gray-100 pb-5 mb-5"
                                key={index}
                                onPress={item?.action}>
                                <View className="flex flex-row items-center gap-4">
                                    <View
                                        className="flex justify-center items-center self-start mt-2 ml-2 bg-[#DAA520]/10 w-12 h-12 rounded-full">
                                        {item?.icon}
                                    </View>
                                    <View className="">
                                        <Text className="font-poppinsMedium text-lg">{item?.title}</Text>
                                        <Text className="font-poppinsLight text-gray-600">{item?.subtitle}</Text>
                                    </View>
                                </View>
                                <ChevronRight size={19} color={"#DAA520"}/>
                            </TouchableOpacity>
                        ))}
                        <View className="h-[100px]"/>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )
}
