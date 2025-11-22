import {Text, TouchableOpacity, View} from "react-native";
import {Calendar, ExternalLink, MapPin} from "lucide-react-native";
import {useAppNavigation} from "../../../common/navigationHelper.ts";
import {ICompany} from "../../../types/typeCompany.ts";

export default function CompanyCard({company}: { company: ICompany }) {
    const navigation = useAppNavigation()

    return (
        <View className="flex flex-col justify-center p-4 border border-gray-300 rounded-xl">
            <View className="flex flex-row items-center gap-4">
                <View className="flex items-center justify-center bg-primary rounded-xl h-14 w-14">
                    <Text
                        className="text-white font-poppinsMedium">{company?.name?.split(' ')?.map(n => n[0].toUpperCase())}</Text>
                </View>
                <View>
                    <Text className="font-poppinsMedium text-lg">{company?.name}</Text>
                    <Text className="font-poppinsLight text-gray-600">{company?.industry}</Text>
                </View>
            </View>
            <View className="flex flex-col mt-2 gap-1">
                <View className="flex flex-row justify-start items-center gap-2.5">
                    <MapPin size={20} color={"#999"}/>
                    <Text className="font-poppins text-black/70">{company?.location}</Text>
                </View>
                <View className="flex flex-row justify-start items-center gap-2.5">
                    <Calendar size={20} color={"#999"}/>
                    <Text className="font-poppins text-[#006a63]">Last Recruited {company?.last_recruited}</Text>
                </View>
            </View>
            <View className="flex flex-row justify-around items-center border-y-[1px] border-gray-100 py-2 mt-3">
                <View className="flex flex-col justify-between items-center">
                    <Text className="font-poppinsMedium text-[#DAA520] text-[16px]">{company?.total_hires}</Text>
                    <Text className="font-poppins text-black/70 text-[13px]">Total Hires</Text>
                </View>
                <View className="flex flex-col justify-between items-center">
                    <Text className="font-poppinsMedium text-[#DAA520] text-[16px]">{company?.avg_salary}</Text>
                    <Text className="font-poppins text-black/70 text-[13px]">Avg. Salary</Text>
                </View>
            </View>
            <View className="flex flex-row justify-start items-center flex-wrap gap-2 mt-3">
                <Text className="font-poppins text-black/70">Roles Offered:</Text>
                {company?.companyroles?.map((role, index) => (
                    <View className="bg-primary/10 py-1 rounded-lg w-max px-3" key={index}>
                        <Text className="text-[#006a63] font-poppinsMedium text-[11px]">{role?.role_name}</Text>
                    </View>
                ))}
            </View>
            <View className="flex flex-row gap-2">
                <TouchableOpacity
                    className="flex flex-1 flex-row justify-center items-center gap-2 mt-4 bg-primary py-2 rounded-xl"
                    onPress={() => {
                        navigation.navigate("SectionNavigator", {
                            screen: "CompanyDetailsScreen",
                            params: {
                                companyId: company?.id,
                                companyData: company
                            }
                        })
                    }}>
                    {/*<ExternalLink size={20} color={"#fff"}/>*/}
                    <Text className="text-white font-poppinsMedium text-[14px] ml-[2px] mt-[3px]">View Details</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
