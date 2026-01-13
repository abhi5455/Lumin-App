import {ActivityIndicator, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Funnel, Search} from "lucide-react-native";
import AlumniCard from "./components/AlumniCard.tsx";
import AlumniNCompanyFilterModal from "./components/AlumniNCompanyFilterModal.tsx";
import {useCallback, useEffect, useRef, useState} from "react";
import {studentService} from "../../services/studentService.ts";
import {IStudent} from "../../types/type_student.ts";
import {useFocusEffect} from "@react-navigation/native";
import NoDataAvailSticker from "../../assets/svg/NoDataAvail.svg";
import {getUserProfile} from "../../lib/userStorage.ts";
import {RouteProp, useRoute} from "@react-navigation/core";
import {companyService} from "../../services/companyService.ts";
import {ICompany} from "../../types/typeCompany.ts";
import {collegeService} from "../../services/collegeService.ts";
import {IDepartment} from "../../types/type_college.ts";

interface IAlumniScreenProps {
    collegeId: string
}

export default function AlumniScreen() {
    const route = useRoute<RouteProp<{ ResourceScreen: IAlumniScreenProps }, 'AlumniScreen'>>();
    const {collegeId} = route?.params ?? "";
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [alumniList, setAlumniList] = useState<IStudent[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const isFirstLoad = useRef(true);
    const [filterOptions, setFilterOptions] = useState<typeof filterOptions>();
    const [companies, setCompanies] = useState<ICompany[]>([]);
    const [departments, setDepartments] = useState<IDepartment[]>([]);
    const [searchValue, setSearchValue] = useState("");
    const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchValue);

    function onApplyFilters(filters: any) {
        setFilterOptions(filters);
    }

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchValue(searchValue);
        }, 400);

        return () => {
            clearTimeout(handler);
        };
    }, [searchValue]);

    useEffect(() => {
        StatusBar.setBarStyle('light-content')
        StatusBar.setBackgroundColor(filterModalVisible ? '#01584f' : '#00b19f')
    }, [filterModalVisible])

    const prevFilterOptionsRef = useRef(filterOptions);

    useFocusEffect(
        useCallback(() => {
            console.log("Fetching alumni data with filters: ", filterOptions);
            if (isFirstLoad.current) {
                setIsLoading(true)
                isFirstLoad.current = false
            }

            if (JSON.stringify(prevFilterOptionsRef.current) !== JSON.stringify(filterOptions)) {
                setIsLoading(true);
                prevFilterOptionsRef.current = filterOptions;
            }

            const userProfile: IStudent = getUserProfile()
            studentService.getAllAlumniByCollegeId(userProfile?.college_id || collegeId, filterOptions, debouncedSearchValue)
                .then(data => {
                    setAlumniList(data || [])
                })
                .catch(error => {
                    console.log("Error fetching alumni data: ", error);
                })
                .finally(() => {
                    setIsLoading(false);
                })

            console.log("Search ", searchValue)

            companyService.getAllByCollegeId(userProfile?.college_id || '')
                .then(data => {
                    setCompanies(data || [])
                })
                .catch(error => {
                    console.log("Error fetching companies: ", error);
                })

            collegeService.getAllDepartmentsByCollegeId(userProfile?.college_id || '')
                .then(data => {
                    setDepartments(data || [])
                })
                .catch(error => {
                    console.log("Error fetching departments: ", error);
                });
        }, [filterOptions, debouncedSearchValue])
    );

    console.log("Companies, ", companies);

    return (
        <SafeAreaView className="flex-1">
            <View className="bg-primary h-[65px] justify-center px-5">
                <Text className="font-poppinsLight text-white text-2xl">Alumni Network</Text>
            </View>

            <View className="bg-primary flex-1">
                <View className="bg-white flex-1 rounded-t-[30px] px-5">
                    <View className="flex flex-row justify-between items-center my-4 gap-4">
                        <View
                            className="flex-1 flex flex-row justify-start items-center border border-gray-300 rounded-xl pr-4 pl-3 py-[2px] gap-1.5">
                            <Search size={18} color={"#999999"}/>
                            <TextInput
                                placeholder={"Search Alumni"} className="text-black flex-1 font-poppins -mb-1"
                                placeholderTextColor={"#999999"}
                                value={searchValue}
                                onChangeText={setSearchValue}
                            />
                        </View>
                        <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
                            {filterOptions && Object.entries(filterOptions).length > 0 &&
                                <View
                                    className="bg-red-600 rounded-full absolute top-[-7px] right-[-7px] h-5 w-5 flex justify-center items-center z-10">
                                    <Text className="font-poppinsMedium text-white text-xs">
                                        {Object.entries(filterOptions).reduce((acc, [, items]) => {
                                            return acc + items.length;
                                        }, 0)}
                                    </Text>
                                </View>
                            }
                            <Funnel size={22} color={"#999"} strokeWidth={'1.8px'}/>
                        </TouchableOpacity>
                    </View>
                    <ScrollView className="pt-2">

                        {!isLoading ? alumniList.length === 0 ?
                                <View className="flex flex-1 flex-col justify-center items-center min-h-[50vh] gap-3">
                                    <NoDataAvailSticker/>
                                    <Text
                                        className="text-black/30 text-[15px] font-poppinsLight indent-8 text-justify px-3 mb-4 leading-6">
                                        No data available
                                    </Text>
                                </View>
                                : alumniList.map((alumnus, index) => (
                                    <View key={index} className="mb-5">
                                        <AlumniCard alumnus={alumnus}/>
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
                title={"Alumni Filters"}
                visible={filterModalVisible}
                onClose={() => {
                    setFilterModalVisible(false)
                }}
                type={'alumni'}
                onApplyFilters={onApplyFilters}
                companies={companies}
                departments={departments}
            />
        </SafeAreaView>
    )
}
