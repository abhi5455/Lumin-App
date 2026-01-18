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
            "Lumin is a student-built platform designed to connect alumni and current students through genuine placement insights and mentorship. We believe that the best career advice comes from shared experiences, which is why we have created a space where this knowledge can be easily accessed."
    },
    {
        title: "Our Mission",
        content:
            "Our mission is to make placement knowledge accessible to all by transforming individual alumni experiences into a collective resource that guides students on their career journey."
    },
    {
        title: "What We Offer",
        pointContent: [
            "Verified alumni profiles and detailed company insights.",
            "Authentic interview experiences and preparation resources.",
            "Opportunities for direct mentorship and networking.",
            "Access to historical placement data and analytics.",
            "A collaborative community for sharing knowledge."
        ]
    },
    {
        title: "Built by Students, for Students",
        content:
            "Lumin started as a student-led initiative aimed at making placement information more meaningful. We are dedicated to transforming statistics into a dynamic resource of shared experiences, mentorship, and guidance."
    }
];

const helpSupportInfo: IStaticSectionInfo[] = [
    {
        title: "Getting Started – Students",
        pointContent: [
            "Sign up using your college email to get started.",
            "Browse alumni profiles by company, batch, or department.",
            "Explore authentic interview experiences and insights.",
            "Download study materials and preparation guides.",
            "Connect with alumni for mentorship and career advice."
        ]
    },
    {
        title: "Getting Started – Alumni",
        pointContent: [
            "Keep your profile updated with your current role and company.",
            "Share your recruitment journey to guide students.",
            "Upload helpful resources that aided your preparation.",
            "Respond to mentorship requests from students.",
            "Stay active to contribute to our growing knowledge base."
        ]
    },
    {
        title: "Account Management",
        pointContent: [
            "How do I create an account? Sign up using your official college email ID on the login screen.",
            "How do I reset my password? Use the 'Forgot Password' link on the login screen and follow the instructions.",
            "How can I update my profile information? Navigate to the 'Profile' section and select 'Edit Profile' to make changes."
        ]
    },
    {
        title: "Data & Privacy",
        pointContent: [
            "Is my personal data secure? Yes, we use Supabase for secure data storage and authentication. Refer to our Privacy Policy for details.",
            "How can I delete my account? You can initiate account deletion from the 'Settings' menu within your profile.",
            "Can I export my data? Yes, data export options are available in your profile settings."
        ]
    },
    {
        title: "App Functionality",
        pointContent: [
            "How do I search for alumni? Use the search bar in the 'Alumni' section and filter by company, batch, or department.",
            "Where can I find interview experiences? Visit the 'Resources' section for a collection of interview experiences and study materials.",
            "How do I connect with a mentor? You can send mentorship requests directly from an alumni's profile page."
        ]
    },
    {
        title: "Contact Support",
        pointContent: [
            "For technical issues, please email us at abhiramashok1062004@gmail.com.",
        ]
    }
];

const privacyPolicyInfo: IStaticSectionInfo[] = [
    {
        title: "Information We Collect",
        pointContent: [
            "Account Information: Name, email, batch, department, college ID, profile photo, bio, and current company/role (for alumni).",
            "Usage Data: Companies you search for, resources you access, alumni profiles you view, and interactions within the app.",
            "User-Generated Content: Interview experiences, uploaded resources, and messages sent through the platform."
        ]
    },
    {
        title: "How We Use Your Information",
        pointContent: [
            "To Provide Services: Display relevant profiles, facilitate mentorship connections, and offer personalized company and placement insights.",
            "To Improve the Platform: Analyze usage patterns to enhance features, generate placement statistics, and identify popular resources.",
            "To Ensure Security: Verify user authenticity, prevent fraudulent activities, and maintain the integrity of the platform."
        ]
    },
    {
        title: "Information Sharing",
        pointContent: [
            "With Your College: Information is shared with the placement cell for verification and moderation purposes.",
            "With Other Users: Verified users can view your profile based on your privacy settings.",
            "Not Shared: We do not share your contact information with third parties or advertisers."
        ]
    },
    {
        title: "Your Privacy Controls",
        pointContent: [
            "You can delete your shared experiences and uploaded resources at any time.",
            "You may request a full account deletion, which will remove your personal data from our active databases."
        ],
        subContent: [
            "To delete your account, go to Profile > Settings > Delete Account.",
            "Deleted content cannot be recovered."
        ]
    },
    {
        title: "Data Retention",
        pointContent: [
            "Active Accounts: Your data is retained as long as your account is active.",
            "Deleted Accounts: Personal data is removed within 30 days of account deletion.",
            "Anonymized Contributions: Alumni contributions may be retained anonymously to benefit the community."
        ]
    },
    {
        title: "Student Data Protection",
        content: "We are committed to protecting student information. All data is used strictly for educational and career guidance purposes within the college community."
    },
    {
        title: "Third-Party Services",
        content: "We use Supabase for secure data storage and authentication. Their privacy policy governs the data they handle on our behalf."
    },
    {
        title: "Your Rights",
        pointContent: [
            "You have the right to access and correct your personal information.",
            "You can request the deletion or export of your data at any time."
        ]
    },
    {
        title: "Policy Changes",
        content: "Users will be notified of any significant changes to this privacy policy through in-app announcements."
    },
    {
        title: "Contact Us",
        content: "For any privacy-related concerns or data requests, please contact your college placement cell or use the in-app Help feature."
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
            <View className="flex flex-row items-center gap-1 bg-primary h-[65px] px-5">
                <TouchableOpacity onPress={() => navigation.goBack()} className="py-2 pr-3">
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
