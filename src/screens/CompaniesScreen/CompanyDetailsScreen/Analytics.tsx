import {Text, View} from "react-native";
import {PieChart} from "lucide-react-native";

export default function Analytics() {
    return (
        <View className="flex flex-col justify-center px-5 mt-5 gap-4">
            <View
                className="flex flex-col justify-center gap-2 border-[1px] bg-gray-100/35 border-primary rounded-xl p-2 mx-5 mt-5">
                <View className="flex flex-row items-center gap-3">
                    <View
                        className="flex justify-center items-center self-start mt-2 ml-2 bg-[#DAA520]/10 w-12 h-12 rounded-full">
                        <PieChart size={19} color={"#DAA520"}/>
                    </View>
                    <View className="flex-1">
                        <Text className="font-poppinsMedium text-lg">
                            Department Distribution
                        </Text>
                    </View>
                </View>
            </View>
            <View className="min-h-[50px]"/>
        </View>
    );
}
