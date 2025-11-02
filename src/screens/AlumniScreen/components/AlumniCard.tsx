import {Text, TouchableOpacity, View} from "react-native";
import {Linkedin, Mail} from "lucide-react-native";

export default function AlumniCard(){
    return(
        <View className="flex flex-col justify-center p-4 border border-gray-300 rounded-xl">
            <View className="flex flex-row items-center gap-4">
                <View className="flex items-center justify-center bg-primary rounded-full h-14 w-14">
                    <Text className="text-white font-poppinsMedium">AB</Text>
                </View>
                <View>
                    <Text className="font-poppinsMedium text-lg">Alice Brown</Text>
                    <Text className="font-poppinsLight text-gray-600">Software Engineer at
                        TechCorp</Text>
                </View>
            </View>
            <View className="flex flex-col gap-1 mt-2">
                <Text>Company: TechCorp{"\n"}</Text>
                <Text className="text-primary font-poppinsMedium">Batch of 2017</Text>
                <View className="flex flex-row justify-start items-center gap-2">
                    <Text>Education:</Text>
                    <View className="bg-primary/20 py-1 rounded-xl w-max mt-1 px-3">
                        <Text className="text-primary font-poppinsMedium">B.Tech CSE</Text>
                    </View>
                </View>
            </View>
            <View className="flex flex-row gap-2">
                <TouchableOpacity
                    className="flex flex-1 flex-row justify-center items-center gap-2 mt-4 bg-primary py-2 rounded-xl">
                    <Linkedin size={20} color={"#FFF"}/>
                    <Text className="text-white font-poppinsMedium text-[14px]">Connect</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="flex flex-1 flex-row justify-center items-center gap-2 mt-4 border border-gray-300 py-2 rounded-xl">
                    <Mail size={20} color={"#374151"}/>
                    <Text className="text-gray-700 font-poppinsMedium text-[14px]">Message</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
