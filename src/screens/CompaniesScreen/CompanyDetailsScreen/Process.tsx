import {Text, View} from "react-native";
import {Wrench} from "lucide-react-native";

const recruitmentProcesses = [
    {
        stage: "Online Assessment",
        details: "Aptitude test followed by 2-3 DSA coding problems.",
    },
    {
        stage: "Technical Interviews",
        details:
            "Covers DSA, OOP, DBMS, OS, and basic system design for senior roles, along with live coding.",
    },
    {
        stage: "Managerial Round",
        details:
            "Focuses on projects, problem-solving, teamwork, and evaluating trade-offs.",
    },
    {
        stage: "HR Round",
        details:
            "Assesses cultural fit, motivation ('Why Microsoft?'), career goals, and behavioral questions.",
    },
];


export default function Process() {
    return (
        <>
            <View
                className="flex flex-col justify-center gap-2 border-[1px] bg-gray-100/35 border-[#006a63]/50 rounded-xl p-2 mx-5 mt-5">
                <View className="flex flex-row items-center gap-3">
                    <View
                        className="flex justify-center items-center self-start mt-2 ml-2 bg-primary/10 w-12 h-12 rounded-full">
                        <Wrench size={19} color={"#006a63"}/>
                    </View>
                    <View className="flex-1">
                        <Text className="font-poppinsMedium text-lg">
                            Recruitment Process
                        </Text>
                    </View>
                </View>

                <Text className="text-black/80 text-[15px] font-poppins indent-8 text-justify px-3 mb-4 leading-6">
                    {'\u2003'}{'\u2003'}{'\u2003'}TCS recruits from campuses through a well-defined, multi-stage process
                    focused on assessing both technical proficiency and workplace readiness. The selection process
                    typically begins with an aptitude-based online test that evaluates quantitative ability, logical
                    reasoning, and verbal skills, followed by coding and technical interviews. Emphasis is placed on
                    problem-solving, clarity of thought, and foundational programming knowledge rather than deep
                    specialization. The final HR round assesses communication, adaptability, and cultural alignment with
                    TCS’s values of learning, teamwork, and long-term growth within the organization.
                </Text>

                <View className="flex flex-col items-center gap-3 mb-5">
                    {recruitmentProcesses?.map((item, index) => (
                        <View className="flex flex-row items-center gap-1 mx-5" key={index}>
                            <View className="flex flex-col items-center gap-2">
                                <View
                                    className="flex justify-center items-center h-[20px] w-[20px] bg-primary rounded-full">
                                    <Text className="font-poppins text-white text-xs">{index + 1}</Text>
                                </View>
                                <View className="flex-1 w-[1.5px] bg-primary rounded-full"/>
                            </View>
                            <View
                                className="flex flex-1 flex-col justify-center pl-4">
                                <Text className="font-poppins text-black text-lg">{item?.stage}</Text>
                                <Text className="font-poppins text-[#DAA520]">{item?.details}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </View>

            <View className="min-h-[40px]"/>
        </>
    )
}
