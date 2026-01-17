import { Text, View } from "react-native"
import { User } from "lucide-react-native"
import type { ICompany } from "../../../types/typeCompany.ts"

export default function About({ company }: { company: ICompany }) {

    return (
        <>
            <View className="flex flex-col justify-center gap-2 border-[1px] bg-gray-100/35 border-[#006a63]/50 rounded-xl p-2 mx-5 mt-5">
                <View className="flex flex-row items-start w-full gap-4 mt-2">
                    <View className="flex justify-center items-center self-start ml-2 bg-primary/10 w-[45px] h-[45px] rounded-full">
                        <User size={19} color={"#006a63"} />
                    </View>
                    <View className="">
                        <Text className="font-poppinsMedium text-lg">About</Text>
                        <Text className="font-poppinsLight text-gray-600 text-[13px]">Know about company</Text>
                    </View>
                </View>

                {/*<View className="flex flex-row items-center gap-3">*/}
                {/*    <View*/}
                {/*        className="flex justify-center items-center self-start mt-2 ml-2 bg-primary/10 w-12 h-12 rounded-full">*/}
                {/*        <User size={19} color={"#006a63"}/>*/}
                {/*    </View>*/}
                {/*    <View className="flex-1 gap-0 mt-1.5">*/}
                {/*        <Text className="font-poppinsMedium text-lg">*/}
                {/*            About*/}
                {/*        </Text>*/}
                {/*        <Text className="text-gray-400 text-[11px] font-poppins text-justify -mt-[2px]">*/}
                {/*            Know about company*/}
                {/*        </Text>*/}
                {/*    </View>*/}
                {/*</View>*/}

                <Text className="text-black/80 text-[15px] font-poppins indent-8 text-justify px-3 mb-4 leading-6">
                    {company?.overview || "No about information available."}
                </Text>
            </View>
            <View className="min-h-[50px]" />
        </>
    )
}
