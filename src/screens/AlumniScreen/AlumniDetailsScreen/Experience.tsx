import {View} from "react-native";
import {User} from "lucide-react-native";

export default function Experience(){
    return(
        <View className="flex flex-col justify-center px-5 mt-5 gap-2">
            <View className="border border-gray-300">
                <View
                    className="flex justify-center items-center bg-[#DAA520]/10 w-12 h-12 rounded-full">
                    <User size={19} color={"#DAA520"}/>
                </View>
            </View>
            <View className="min-h-[50px]"/>
        </View>
    )
}
