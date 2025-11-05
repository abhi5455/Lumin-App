import {ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Funnel, Search} from "lucide-react-native";
import CompanyCard from "./components/CompanyCard.tsx";
import {useEffect, useState} from "react";
import AlumniNCompanyFilterModal from "../AlumniScreen/components/AlumniNCompanyFilterModal.tsx";

export default function CompaniesScreen() {
    const [filterModalVisible, setFilterModalVisible] = useState(false);

    useEffect(() => {
        StatusBar.setBarStyle('light-content')
        console.log("Chanageinggg status Bar")
        StatusBar.setBackgroundColor(filterModalVisible ? '#01584f' : '#00b19f')
    }, [filterModalVisible])

    return (
        <SafeAreaView className="flex-1">
            <View className="bg-primary h-[65px] justify-center px-5">
                <Text className="font-poppinsLight text-white text-2xl">Recruited Companies</Text>
            </View>

            <View className="bg-primary flex-1">
                <View className="bg-white flex-1 rounded-t-[30px] px-5">
                    <View className="flex flex-row justify-between items-center my-4 gap-4">
                        <View
                            className="flex-1 flex flex-row justify-start items-center border border-gray-300 rounded-xl pr-4 pl-3 py-1 gap-1.5">
                            <Search size={20} color={"#999999"}/>
                            <TextInput
                                placeholder={"Search Company"} className="text-black flex-1"
                                placeholderTextColor={"#999999"}
                            />
                        </View>
                        <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
                            <Funnel size={22} color={"#999"} strokeWidth={'1.8px'}/>
                        </TouchableOpacity>
                    </View>
                    <ScrollView className="pt-2">

                        {[1, 2, 3, 4, 5].map((alumnus, index) => (
                            <View key={index} className="mb-5">
                                <CompanyCard/>
                            </View>
                        ))}

                        <View className="h-[100px]"/>
                    </ScrollView>
                </View>
            </View>

            <AlumniNCompanyFilterModal
                title={"Alumni Filter"}
                visible={filterModalVisible}
                onClose={() => {
                    setFilterModalVisible(false)
                }}
                type={'companies'}
            />
        </SafeAreaView>
    )
}
