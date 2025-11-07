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
            "Lumin is a student-built platform that connects alumni and current students through genuine placement insights and mentorship. We believe the best career advice comes from real experiences. Lumin turns scattered placement knowledge into a structured, searchable network that empowers students to make informed career choices."
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
            "Lumin began as a student initiative to make placement information more meaningful — transforming plain statistics into shared experiences, mentorship, and guidance."
    }
];

const helpSupportInfo: IStaticSectionInfo[] = [
    {
        title: "Getting Started – Students",
        pointContent: [
            "Sign up using your college email.",
            "Browse alumni profiles by company, batch, or department.",
            "Read authentic interview experiences.",
            "Download study materials and guides.",
            "Connect with alumni for mentorship and advice."
        ]
    },
    {
        title: "Getting Started – Alumni",
        pointContent: [
            "Keep your profile updated with current role and company.",
            "Share your recruitment journey to help students.",
            "Upload resources that guided your preparation.",
            "Respond to mentorship requests from students.",
            "Stay active to contribute to the knowledge base."
        ]
    },
    {
        title: "Contact Support",
        pointContent: [
            "Technical issues – Email support@lumin.college.edu",
            "Response time – 24–48 hours on working days."
        ]
    }
];

const privacyPolicyInfo: IStaticSectionInfo[] = [
    {
        title: "Information We Collect",
        pointContent: [
            "Account information: Name, email, batch, department, college ID, profile photo, bio, current company and role (for alumni).",
            "Usage data: Companies you search, resources you download, alumni profiles you view, and app interactions.",
            "User-generated content: Interview experiences you share, resources you upload, messages sent through the platform."
        ]
    },
    {
        title: "How We Use Your Information",
        pointContent: [
            "Provide services: Display profiles, connect with mentors, show personalized company and placement insights.",
            "Improve the platform: Analyze usage patterns, generate placement statistics and trends, identify popular companies and resources.",
            "Ensure security: Verify alumni, prevent fake profiles, and maintain platform integrity."
        ]
    },
    {
        title: "Information Sharing",
        pointContent: [
            "Shared with: College placement cell for verification and moderation, other verified users based on privacy settings.",
            "Not shared: Contact information with third parties, personal data with advertisers, individual usage patterns outside the college."
        ]
    },
    {
        title: "Privacy Controls",
        pointContent: [
            "Delete your experiences and uploaded resources.",
            "Request full account deletion."
        ]
    },
    {
        title: "Data Retention",
        pointContent: [
            "Active accounts: Data is retained while your account is active.",
            "Deleted accounts: Personal data removed within 30 days.",
            "Alumni contributions may be retained anonymously for community benefit."
        ]
    },
    {
        title: "Student Data Protection",
        content: "We are committed to protecting student information. Data is used only for educational and career guidance within the college community."
    },
    {
        title: "Third-Party Services",
        content: "We use Supabase for data storage and authentication. Their privacy policy applies to data they handle on our behalf."
    },
    {
        title: "Your Rights",
        pointContent: [
            "Access and correct your personal data.",
            "Request deletion of your data.",
            "Export your data.",
        ]
    },
    {
        title: "Changes to Policy",
        content: "Users will be notified of significant privacy policy changes through in-app announcements."
    },
    {
        title: "Contact",
        content: "For privacy concerns or data requests, contact your college placement cell or use the in-app Help feature."
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
        setInfoData(sectionType === "About Us" ? aboutInfo : sectionType === "Help Center" ? helpSupportInfo : privacyPolicyInfo)
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
