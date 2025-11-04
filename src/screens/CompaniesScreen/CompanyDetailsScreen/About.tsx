import {Text, View} from "react-native";
import {HandCoins, Handshake, History, TrendingUp, User} from "lucide-react-native";

export default function About() {
    return (
        <>
            <View
                className="flex flex-col justify-center gap-2 border-[1px] bg-gray-100/35 border-primary rounded-xl p-2 mx-5 mt-5">
                <View className="flex flex-row items-center gap-3">
                    <View
                        className="flex justify-center items-center self-start mt-2 ml-2 bg-[#DAA520]/10 w-12 h-12 rounded-full">
                        <User size={19} color={"#DAA520"}/>
                    </View>
                    <View className="flex-1">
                        <Text className="font-poppinsMedium text-lg">
                            About
                        </Text>
                    </View>
                </View>

                <Text className="text-black/80 text-[15px] font-poppins indent-8 text-justify px-3 mb-4 leading-6">
                    {'\u2003'}{'\u2003'}{'\u2003'}TCS (Tata Consultancy Services) is a global leader in IT services,
                    consulting, and business solutions. Founded in 1968 as part of the Tata Group, it has become one of
                    the largest technology companies in the world. TCS provides end-to-end digital transformation
                    services across industries, including banking, healthcare, retail, and manufacturing, leveraging
                    cutting-edge technologies like AI, cloud, and automation to help clients achieve business
                    excellence.
                </Text>
            </View>

            <View
                className="flex flex-row justify-center gap-2 border-[1px] bg-gray-100/35 border-primary rounded-xl p-2 mx-5 mt-5 pb-3">
                <View
                    className="flex justify-center items-center self-start mt-2 ml-2 bg-[#DAA520]/10 w-12 h-12 rounded-full">
                    <TrendingUp size={19} color={"#DAA520"}/>
                </View>
                <View className="flex-1 flex-row items-center gap-5 pr-10">
                    <Text className="font-poppinsMedium text-lg">
                        Total Hires:
                    </Text>
                    <Text className="font-poppinsMedium text-lg text-[#006a63]">
                        40
                    </Text>
                </View>
            </View>
            <View
                className="flex flex-row justify-center gap-2 border-[1px] bg-gray-100/35 border-primary rounded-xl p-2 mx-5 mt-5 pb-3">
                <View
                    className="flex justify-center items-center self-start mt-2 ml-2 bg-[#DAA520]/10 w-12 h-12 rounded-full">
                    <HandCoins size={19} color={"#DAA520"}/>
                </View>
                <View className="flex-1 flex-row items-center gap-5 pr-10">
                    <Text className="font-poppinsMedium text-lg">
                        Average Salary:
                    </Text>
                    <Text className="font-poppinsMedium text-lg text-[#006a63]">
                        12 LPA
                    </Text>
                </View>
            </View>
            <View
                className="flex flex-row justify-center gap-2 border-[1px] bg-gray-100/35 border-primary rounded-xl p-2 mx-5 mt-5 pb-3">
                <View
                    className="flex justify-center items-center self-start mt-2 ml-2 bg-[#DAA520]/10 w-12 h-12 rounded-full">
                    <History size={19} color={"#DAA520"}/>
                </View>
                <View className="flex-1 flex-row items-center gap-5 pr-10">
                    <Text className="font-poppinsMedium text-lg">
                        Last Recruited:
                    </Text>
                    <Text className="font-poppinsMedium text-lg text-[#006a63]">
                        2024
                    </Text>
                </View>
            </View>
            <View
                className="flex flex-row justify-center gap-2 border-[1px] bg-gray-100/35 border-primary rounded-xl p-2 mx-5 mt-5 pb-3">
                <View
                    className="flex justify-center items-center self-start mt-2 ml-2 bg-[#DAA520]/10 w-12 h-12 rounded-full">
                    <Handshake size={19} color={"#DAA520"}/>
                </View>
                <View className="flex-1 flex-row items-center gap-5 pr-10">
                    <Text className="font-poppinsMedium text-lg">
                        Service Agreement:
                    </Text>
                    <Text className="font-poppinsMedium text-lg text-[#006a63]">
                        2 yrs
                    </Text>
                </View>
            </View>

            <View className="min-h-[50px]"/>
        </>
    )
}
