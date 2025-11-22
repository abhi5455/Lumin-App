import {Text, TouchableOpacity, View} from "react-native";
import MailIcon from "../../../assets/svg/appIcons/mailIcon.svg";
import {ChevronUpCircle} from "lucide-react-native";
import {useAppNavigation} from "../../../common/navigationHelper.ts";
import {IStudent} from "../../../types/type_student.ts";

export default function AlumniCard({alumnus}: { alumnus: IStudent }) {
    const navigation = useAppNavigation()
    const baseCollege = alumnus?.studenteducation?.find(e => e.is_base_college);
    const currentCompany = alumnus?.rstudentcompany?.find(c => c.is_current);

    return (
        <View className="flex flex-col justify-center p-4 border border-gray-300 rounded-xl">
            <View className="flex flex-row items-center gap-4">
                <View className="flex items-center justify-center bg-primary rounded-full h-14 w-14">
                    <Text className="text-white font-poppinsMedium">AB</Text>
                </View>
                <View>
                    <Text className="font-poppinsMedium text-lg">{alumnus?.name}</Text>
                    <Text className="font-poppinsLight text-gray-600">{currentCompany?.position}</Text>
                </View>
            </View>
            <View className="flex flex-col mt-2 gap-1">
                <View className="flex flex-row justify-start items-center gap-2.5">
                    <Text className="font-poppins text-black/70">Company:</Text>
                    <TouchableOpacity>
                        <Text className="font-poppins text-[#DAA520]">{currentCompany?.company?.name}</Text>
                    </TouchableOpacity>
                </View>
                <Text className="text-primary font-poppins">Batch of {baseCollege?.end_year}</Text>
                <View className="flex flex-row flex-wrap items-center gap-2">
                    <Text className="font-poppins text-black/70">Education:</Text>
                    <View className="bg-primary/10 py-1 rounded-xl px-3 flex max-w-[75%]">
                        <Text className="text-[#006a63] font-poppinsMedium text-[13px] flex-shrink">
                            {baseCollege?.degree_type} in {baseCollege?.field_of_study}
                        </Text>
                    </View>
                </View>

            </View>
            <View className="flex flex-row gap-2">
                <TouchableOpacity
                    className="flex flex-1 flex-row justify-center items-center gap-2 mt-4 bg-primary py-2 rounded-xl"
                    onPress={() => {
                        navigation.navigate("SectionNavigator", {
                            screen: "AlumniDetailsScreen",
                            params: {
                                alumnusId: "alumnus_1",
                                type: "alumnus"
                            }
                        })
                    }}>
                    <ChevronUpCircle size={21} color={"#FFF"}/>
                    <Text className="text-white font-poppinsMedium text-[14px]">View</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="flex flex-1 flex-row justify-center items-center gap-2 mt-4 border border-gray-300 py-2 rounded-xl">
                    <MailIcon/>
                    <Text className="text-gray-700 font-poppinsMedium text-[14px]">Message</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
