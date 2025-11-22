import {ActivityIndicator, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Funnel, Search} from "lucide-react-native";
import AlumniCard from "./components/AlumniCard.tsx";
import AlumniNCompanyFilterModal from "./components/AlumniNCompanyFilterModal.tsx";
import {useCallback, useEffect, useState} from "react";
import {studentService} from "../../services/studentService.ts";
import {IStudent} from "../../types/type_student.ts";
import {useFocusEffect} from "@react-navigation/native";

export default function AlumniScreen() {
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [alumniList, setAlumniList] = useState<IStudent[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        StatusBar.setBarStyle('light-content')
        console.log("Chanageinggg status Bar")
        StatusBar.setBackgroundColor(filterModalVisible ? '#01584f' : '#00b19f')
    }, [filterModalVisible])

    useFocusEffect(
        useCallback(() => {
            setIsLoading(true);
            studentService.getAllAlumniByCollegeId('6ba00e19-69c8-4f0e-a4f9-525d9502deca')
                .then(data => {
                    console.log("Alumni Data: ", data);
                    setAlumniList(data || [])
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
                <Text className="font-poppinsLight text-white text-2xl">Alumni Network</Text>
            </View>

            <View className="bg-primary flex-1">
                <View className="bg-white flex-1 rounded-t-[30px] px-5">
                    <View className="flex flex-row justify-between items-center my-4 gap-4">
                        <View
                            className="flex-1 flex flex-row justify-start items-center border border-gray-300 rounded-xl pr-4 pl-3 py-1 gap-1.5">
                            <Search size={20} color={"#999999"}/>
                            <TextInput
                                placeholder={"Search Alumni"} className="text-black flex-1"
                                placeholderTextColor={"#999999"}
                            />
                        </View>
                        <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
                            <Funnel size={22} color={"#999"} strokeWidth={'1.8px'}/>
                        </TouchableOpacity>
                    </View>
                    <ScrollView className="pt-2">

                        {!isLoading ? alumniList.map((alumnus, index) => (
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
            />
        </SafeAreaView>
    )
}
