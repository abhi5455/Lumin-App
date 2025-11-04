import {ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Search} from "lucide-react-native";
import {useState} from "react";
import {IResourceItem, ResourceCard} from "./components/ResourceCard.tsx";

const companyFilters = [
    {id: 0, name: "All"},
    {id: 1, name: "Experiences"},
    {id: 2, name: "Microsoft"},
    {id: 3, name: "TCS"},
    {id: 4, name: "Infosys"},
    {id: 5, name: "Wipro"},
    {id: 6, name: "Google"},
    {id: 7, name: "Amazon"},
    {id: 8, name: "Accenture"},
    {id: 9, name: "IBM"},
    {id: 10, name: "Cognizant"},
];

export const resourceData: IResourceItem[] = [
    {
        id: 1,
        name: "Alice Brown",
        batch: "2024",
        timeAgo: "2d ago",
        tags: ["Experience", "Microsoft"],
        title: "Microsoft Interview Experience - SDE Role",
        content:
            "I attended the Microsoft interview for the Software Development Engineer position, and it was one of the most structured interview processes I’ve faced. The first round tested my problem-solving ability with questions on arrays and strings, while the second was purely focused on optimization and clean coding. In the final round, they evaluated design thinking through a real-world scenario on building scalable APIs. The interviewers were very encouraging and wanted to understand my reasoning rather than just correctness. It taught me to think aloud and communicate logic clearly."
    },
    {
        id: 2,
        name: "Adithya Menon",
        batch: "2023",
        timeAgo: "1w ago",
        tags: ["Experience", "Amazon"],
        title: "Amazon SDE Interview Journey",
        content:
            "The Amazon SDE process was intense and rewarding. It began with an online assessment that covered data structures, sorting algorithms, and problem optimization. The technical rounds were centered on scalability and system efficiency. I had to explain how to design a notification system for millions of users. The behavioral round was strictly aligned with Amazon’s leadership principles, where every answer had to reflect ownership and customer obsession. It pushed me to think from a product and system point of view rather than just a coding one."
    },
    {
        id: 3,
        name: "Neha Krishnan",
        batch: "2025",
        timeAgo: "5d ago",
        tags: ["Experience", "Google"],
        title: "Google On-Campus Interview Experience",
        content:
            "The Google interview process on campus was an amazing experience. The first round focused on algorithms — recursion, dynamic programming, and tree traversal problems. The second was about system design where I was asked to outline a URL shortener service. The discussion was very interactive, with interviewers prompting me to reason through edge cases and trade-offs. The final HR round emphasized creativity, teamwork, and how I deal with open-ended problems. I came out of it with a better appreciation for structured problem-solving and clear communication."
    },
    {
        id: 4,
        name: "Vivek Raj",
        batch: "2022",
        timeAgo: "3w ago",
        tags: ["Experience", "TCS"],
        title: "TCS Digital Interview Experience",
        content:
            "My TCS Digital interview was one of my earliest corporate interactions. The process began with an aptitude test covering logical and quantitative reasoning, followed by a coding round with two problems of moderate difficulty. The technical interview tested my knowledge of OOP, DBMS, and real-world applications of C programming. The HR round was conversational and focused on adaptability and willingness to learn new technologies. It was a good balance between technical depth and personality assessment — a great first exposure to corporate interviews."
    },
    {
        id: 5,
        name: "Lakshmi Suresh",
        batch: "2024",
        timeAgo: "4d ago",
        tags: ["Experience", "Infosys"],
        title: "Infosys System Engineer Role Interview",
        content:
            "The Infosys interview was more conceptual than purely technical. The first test included logical reasoning, verbal ability, and some easy coding questions. The technical round covered basic programming, database management, and object-oriented design. The interviewer asked me to explain my final-year project, focusing on my role in implementation. The HR discussion was pleasant and revolved around teamwork and communication. It was an excellent experience for understanding how large organizations assess overall potential rather than just technical expertise."
    }
];


export default function ResourceScreen() {
    const [selectedFilter, setSelectedFilter] = useState(0);

    return (
        <SafeAreaView className="flex-1">
            <StatusBar barStyle="light-content" backgroundColor={'#00b19f'}/>
            <View className="bg-primary h-[65px] justify-center px-5">
                <Text className="font-poppinsLight text-white text-2xl">Resources</Text>
            </View>

            <View className="bg-primary flex-1">
                <View className="bg-white flex-1 rounded-t-[30px] px-5 flex justify-start items-center">
                    <View className="flex flex-col items-start justify-start my-4 gap-4">
                        <View
                            className="flex flex-row justify-start items-center border border-gray-300 rounded-xl pr-4 pl-3 py-1 gap-1.5">
                            <Search size={20} color={"#999999"}/>
                            <TextInput
                                placeholder={"Search Resource"} className="text-black flex-1"
                                placeholderTextColor={"#999999"}
                            />
                        </View>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            className="max-h-[30px]"
                            contentContainerStyle={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 10,
                            }}
                        >
                            {companyFilters?.map((item, index) => (
                                <TouchableOpacity
                                    className={`${selectedFilter === item?.id ? 'bg-primary/10' : 'bg-gray-100'} py-1 rounded-xl px-3 self-baseline`}
                                    key={index}
                                    onPress={() => setSelectedFilter(item?.id)}>
                                    <Text
                                        className={`${selectedFilter === item?.id ? 'text-[#006a63]' : 'text-black/80'} font-poppins text-[13px]`}>{item?.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    <ScrollView className="flex-1 pt-2 w-full">
                        {resourceData.map((item, index) => (
                            <ResourceCard resourceItem={item} index={index}/>
                        ))}
                        <View className="h-[100px]"/>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )
}
