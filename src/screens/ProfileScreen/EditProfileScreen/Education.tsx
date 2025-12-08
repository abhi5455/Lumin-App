import {Text, View} from "react-native";
import {GraduationCap} from "lucide-react-native";
import {IStudent} from "../../../types/type_student.ts";

export default function Education({alumnus}: { alumnus: IStudent }) {
    return (
        <View className="flex flex-col justify-center px-5 mt-5 gap-4">
            {alumnus?.studenteducation?.map((item, index) => (
                <View className="border-[1px] bg-gray-100/35 border-[#006a63]/50 rounded-xl p-2" key={index}>
                    <View className="flex flex-row items-center gap-3">
                        <View
                            className="flex justify-center items-center self-start mt-2 ml-2 bg-primary/10 w-12 h-12 rounded-full">
                            <GraduationCap size={19} color={"#006a63"}/>
                        </View>

                        <View className="flex-1">
                            <Text className="font-poppinsMedium text-[15px] mt-2">
                                {item?.institution}
                            </Text>
                            <Text className="font-poppins text-[#006a63]">
                                {item?.degree_type} in {item?.field_of_study}
                            </Text>
                        </View>
                    </View>
                    <View
                        className="flex flex-row items-center justify-between border-t-[1px] border-[#006a63]/10 mt-2 pt-2 px-3">
                        <View className="flex flex-col justify-center">
                            <Text className="font-poppins text-md text-black/40">
                                Marks:
                            </Text>
                            <Text className="font-poppinsMedium text-md text-[#006a63]">
                                {item?.marks_percent}%
                            </Text>
                        </View>
                        <View className="flex flex-col justify-center items-end">
                            <Text className="font-poppins text-md text-black/40">
                                Period:
                            </Text>
                            <Text className="font-poppinsMedium text-[13px] text-[#006a63]">
                                {item?.start_year}-{item?.end_year}
                            </Text>
                        </View>
                    </View>
                </View>
            ))}
            <View className="min-h-[50px]"/>
        </View>
    );
}
