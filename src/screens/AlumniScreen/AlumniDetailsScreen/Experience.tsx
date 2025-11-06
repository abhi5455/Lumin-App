import {Text, View} from "react-native";

export default function Experience() {
    return (
        <View className="flex flex-col justify-center px-5 mt-5 gap-4">
            <View className="flex flex-row items-center gap-3">
                <View className="flex flex-col items-center gap-2 my-2">
                    <View className="h-[12px] w-[12px] bg-primary rounded-full"/>
                    <View className="flex-1 w-[1.5px] bg-primary rounded-full"/>
                </View>
                <View
                    className="flex flex-1 flex-col justify-center bg-gray-100/35 p-2 border-[1px] border-[#006a63]/50 rounded-xl px-5">
                    <Text className="font-poppinsMedium text-[13px] text-[#006a63]">
                        2025
                    </Text>
                    <Text className="font-poppins text-black text-lg">Software Engineer</Text>
                    <Text className="font-poppins text-[#DAA520]">TechCorp</Text>
                </View>
            </View>
            <View className="flex flex-row items-center gap-3">
                <View className="flex flex-col items-center gap-2 my-2">
                    <View className="h-[12px] w-[12px] bg-primary rounded-full"/>
                    <View className="flex-1 w-[1.5px] bg-primary rounded-full"/>
                </View>
                <View
                    className="flex flex-1 flex-col justify-center bg-gray-100/35 p-2 border-[1px] border-[#006a63]/50 rounded-xl px-5">
                    <Text className="font-poppinsMedium text-[13px] text-[#006a63]">
                        2025
                    </Text>
                    <Text className="font-poppins text-black text-lg">Software Engineer</Text>
                    <Text className="font-poppins text-[#DAA520]">TechCorp</Text>
                </View>
            </View>
            <View className="min-h-[50px]"/>
        </View>
    )
}
