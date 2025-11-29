import {ActivityIndicator, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Funnel, Search} from "lucide-react-native";
import CompanyCard from "./components/CompanyCard.tsx";
import {useCallback, useEffect, useRef, useState} from "react";
import AlumniNCompanyFilterModal from "../AlumniScreen/components/AlumniNCompanyFilterModal.tsx";
import {useFocusEffect} from "@react-navigation/native";
import {companyService} from "../../services/companyService.ts";
import NoDataAvailSticker from "../../assets/svg/NoDataAvail.svg"
import {ICompany} from "../../types/typeCompany.ts";
import {getUserProfile} from "../../lib/userStorage.ts";
import {IStudent} from "../../types/type_student.ts";

export default function CompaniesScreen() {
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [companyList, setCompanyList] = useState<ICompany[]>([])
    const [isLoading, setIsLoading] = useState(false);
    const isFirstLoad = useRef(true)

    useEffect(() => {
        StatusBar.setBarStyle('light-content')
        StatusBar.setBackgroundColor(filterModalVisible ? '#01584f' : '#00b19f')
    }, [filterModalVisible])

    useFocusEffect(
        useCallback(() => {
            if (isFirstLoad.current) {
                setIsLoading(true)
                isFirstLoad.current = false
            }
            const userProfile: IStudent = getUserProfile()
            companyService.getAllByCollegeId(userProfile?.college_id || '')
                .then(data => {
                    setCompanyList(data || [])
                })
                .catch(error => {
                    console.log("Error fetching alumni data: ", error);
                })
                .finally(() => {
                    setIsLoading(false);
                })
        }, [])
    );

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

                        {!isLoading ? companyList.length === 0 ?
                                <View className="flex flex-1 flex-col justify-center items-center min-h-[50vh] gap-3">
                                    <NoDataAvailSticker/>
                                    <Text
                                        className="text-black/30 text-[15px] font-poppinsLight indent-8 text-justify px-3 mb-4 leading-6">
                                        No data available
                                    </Text>
                                </View>
                                : companyList.map((company, index) => (
                                    <View key={index} className="mb-5">
                                        <CompanyCard company={company}/>
                                    </View>
                                ))
                            :
                            <View>
                                <ActivityIndicator size={28} color="#00b19f" className="mt-8"/>
                            </View>
                        }

                        <View className="h-[100px]"/>
                    </ScrollView>
                </View>
            </View>

            <AlumniNCompanyFilterModal
                title={"Company Filters"}
                visible={filterModalVisible}
                onClose={() => {
                    setFilterModalVisible(false)
                }}
                type={'companies'}
            />
        </SafeAreaView>
    )
}
