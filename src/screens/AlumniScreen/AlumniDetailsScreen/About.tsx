import {Text, View} from "react-native";
import {User} from "lucide-react-native";
import {IStudent} from "../../../types/type_student.ts";

export default function About({alumnus}: { alumnus: IStudent }) {
    return (
        <>
            <View
                className="flex flex-col justify-center border-[1px] bg-gray-100/35 border-[#006a63]/50 rounded-xl p-2 mx-5 mt-5">
                <View className="flex flex-row items-center gap-3">
                    <View
                        className="flex justify-center items-center self-start mt-2 ml-2 bg-primary/10 w-12 h-12 rounded-full">
                        <User size={19} color={"#006a63"}/>
                    </View>

                    <View className="flex-1">
                        <Text className="font-poppinsMedium text-lg">
                            About
                        </Text>
                    </View>
                </View>

                <Text className="text-black/80 text-[15px] font-poppins indent-8 text-justify px-3 mb-4 leading-6">
                    {'\u2003'}{'\u2003'}{'\u2003'}{alumnus?.about || "No about information available."}
                </Text>
            </View>
            <View className="min-h-[50px]"/>
        </>
    )
}
