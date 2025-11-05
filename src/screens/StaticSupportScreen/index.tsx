import {useAppNavigation} from "../../common/navigationHelper.ts";
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {ChevronLeft} from "lucide-react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import StaticSection, {IStaticSectionInfo} from "./components/CustomStaticSection.tsx";
import {RouteProp, useRoute} from "@react-navigation/core";
import {useEffect, useState} from "react";

const aboutInfo: IStaticSectionInfo[] = [
    {
        title: "Bridging Alumni & Students",
        content:
            "AlumNex is a student-built platform that connects alumni and current students through genuine placement insights and mentorship. We believe the best career advice comes from real experiences. AlumNex turns scattered placement knowledge into a structured, searchable network that empowers students to make informed career choices."
    },
    {
        title: "Our Mission",
        content:
            "To make placement knowledge accessible to all by turning alumni experiences into a living resource that guides students in their career journey."
    },
    {
        title: "What We Offer",
        pointContent: [
            "Verified alumni profiles and company insights",
            "Real interview experiences and prep resources",
            "Direct mentorship connections",
            "Historical placement data and analytics",
            "A collaborative knowledge-sharing community"
        ]
    },
    {
        title: "Built by Students, for Students",
        content:
            "AlumNex began as a student initiative to make placement information more meaningful — transforming plain statistics into shared experiences, mentorship, and guidance."
    }
];

const helpSupportInfo: IStaticSectionInfo[] = [
    {
        title: "Getting Started - For Students",
        pointContent: [
            "Create Account – Register using your college email.",
            "Explore Alumni – Browse profiles by company, batch, or department.",
            "Read Experiences – Learn from real interview stories.",
            "Access Resources – Download study materials and guides.",
            "Connect – Reach out to alumni for mentorship."
        ]
    },
    {
        title: "Getting Started - For Alumni",
        pointContent: [
            "Update Profile – Keep your current role and company updated.",
            "Share Experience – Write about your recruitment journey.",
            "Upload Resources – Contribute materials that helped you.",
            "Mentor Students – Respond to connection requests.",
            "Stay Engaged – Help build the knowledge base."
        ]
    },
    {
        title: "Contact Support",
        pointContent: [
            "Technical Issues – Email: support@alumnex.college.edu",
            "Response Time – We aim to respond within 24–48 hours on working days."
        ]
    }
];

interface IStaticSupportScreenProps {
    sectionType: string
}

export default function StaticSupportScreen() {
    const route = useRoute<RouteProp<{ StaticSupportScreen: IStaticSupportScreenProps }, 'StaticSupportScreen'>>();
    const {sectionType} = route?.params;
    const navigation = useAppNavigation()
    const [infoData, setInfoData] = useState<IStaticSectionInfo[]>()

    useEffect(() => {
        setInfoData(sectionType === "About Us" ? aboutInfo : helpSupportInfo)
    }, [sectionType]);

    return (
        <SafeAreaView className="flex-1">
            <View className="flex flex-row items-center gap-4 bg-primary h-[65px] px-5">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={25} color={"#FFFFFF"}/>
                </TouchableOpacity>
                <Text className="font-poppinsLight text-white text-2xl">{sectionType}</Text>
            </View>

            <View className="bg-primary flex-1">
                <View className="flex-1 bg-white px-3 pt-2 rounded-t-[30px]">
                    <ScrollView className="pt-5">
                        {infoData &&
                            <StaticSection staticSectionInfo={infoData}/>
                        }
                        <View className="min-h-20"/>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )
}
