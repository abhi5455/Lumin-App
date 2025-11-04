import {Text, View} from "react-native";
import {GraduationCap} from "lucide-react-native";

export default function Analytics() {
    return (
        <View className="flex flex-col justify-center px-5 mt-5 gap-4">
            {[1, 2, 3].map((item, index) => (
                <View className="border-[1px] bg-gray-100/35 border-primary rounded-xl p-2" key={index}>
                    <View className="flex flex-row items-center gap-3">
                        <View
                            className="flex justify-center items-center self-start mt-2 ml-2 bg-[#DAA520]/10 w-12 h-12 rounded-full">
                            <GraduationCap size={19} color={"#DAA520"}/>
                        </View>

                        <View className="flex-1">
                            <Text className="font-poppinsMedium text-[15px] mt-2">
                                Rajiv Gandhi Institute of Technology, Kottayam
                            </Text>
                            <Text className="font-poppins text-[#006a63]">
                                B.Tech in CSE
                            </Text>
                        </View>
                    </View>
                    <View
                        className="flex flex-row items-center justify-between border-t-[1px] border-primary/20 mt-2 pt-2 px-3">
                        <View className="flex flex-col justify-center">
                            <Text className="font-poppins text-md text-black/40">
                                Marks:
                            </Text>
                            <Text className="font-poppinsMedium text-md text-[#006a63]">
                                95.5%
                            </Text>
                        </View>
                        <View className="flex flex-col justify-center items-end">
                            <Text className="font-poppins text-md text-black/40">
                                Period:
                            </Text>
                            <Text className="font-poppinsMedium text-[13px] text-[#006a63]">
                                2022-2026
                            </Text>
                        </View>
                    </View>
                </View>
            ))}
            <View className="min-h-[50px]"/>
        </View>
    );
}
