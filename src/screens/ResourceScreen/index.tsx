import {ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {ChevronLeft, PlusIcon, Search} from "lucide-react-native";
import {useCallback, useEffect, useRef, useState} from "react";
import {ResourceCard} from "./components/ResourceCard.tsx";
import {useAppNavigation} from "../../common/navigationHelper.ts";
import {RouteProp, useRoute} from "@react-navigation/core";
import {useFocusEffect} from "@react-navigation/native";
import {IStudent} from "../../types/type_student.ts";
import {getUserProfile} from "../../lib/userStorage.ts";
import {resourceService} from "../../services/resourceService.ts";
import {IResource} from "../../types/type_resource.ts";
import NoDataAvailSticker from "../../assets/svg/NoDataAvail.svg";
import {companyService} from "../../services/companyService.ts";
import {ICompany} from "../../types/typeCompany.ts";

interface IResourceScreenProps {
    type?: string
}

export default function ResourceScreen() {
    const route = useRoute<RouteProp<{ ResourceScreen: IResourceScreenProps }, 'ResourceScreen'>>();
    const {type} = route?.params ?? "resource";
    const navigation = useAppNavigation()
    const [selectedFilter, setSelectedFilter] = useState(0);
    const [resources, setResources] = useState<IResource[]>([])
    const [isLoading, setIsLoading] = useState(false);
    const isFirstLoad = useRef(true);
    const [companies, setCompanies] = useState<ICompany[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const [triggerRefetch, setTriggerRefetch] = useState(0);
    const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchValue);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchValue(searchValue);
        }, 400);

        return () => {
            clearTimeout(handler);
        };
    }, [searchValue]);

    useFocusEffect(
        useCallback(() => {
            if (isFirstLoad.current) {
                setIsLoading(true)
                isFirstLoad.current = false
            }
            const userProfile: IStudent = getUserProfile()
            if (type === 'myContributions') {
                resourceService.getAllByStudentId(userProfile?.id || '')
                    .then(data => {
                        console.log("Resource, ", data)
                        setResources(data)
                    })
                    .catch(error => {
                        console.log("Error fetching alumni data: ", error);
                    })
                    .finally(() => {
                        setSelectedFilter(0)
                        setIsLoading(false);
                    })
            } else {
                resourceService.getAllByCollegeId(userProfile?.college_id || '')
                    .then(data => {
                        console.log("Resource, ", data)
                        setResources(data)
                    })
                    .catch(error => {
                        console.log("Error fetching alumni data: ", error);
                    })
                    .finally(() => {
                        setSelectedFilter(0)
                        setIsLoading(false);
                    })
            }

            companyService.getAllByCollegeId(userProfile?.college_id || '')
                .then(data => {
                    setCompanies(data || [])
                })
                .catch(error => {
                    console.log("Error fetching companies: ", error);
                })
        }, [triggerRefetch])
    );

    useEffect(() => {
        if(type === 'myContributions')
            return;

        if (selectedFilter === 0) {
            // All
            const userProfile: IStudent = getUserProfile()
            resourceService.getAllByCollegeId(userProfile?.college_id || '', debouncedSearchValue)
                .then(data => {
                    setResources(data)
                })
                .catch(error => {
                    console.log("Error fetching alumni data: ", error);
                })
                .finally(() => {
                    setIsLoading(false);
                })
        } else if (selectedFilter === 1) {
            setSearchValue('Experiences');
        } else {
            const userProfile: IStudent = getUserProfile()
            console.log("Selected Company ID: ", selectedFilter, String(selectedFilter));
            resourceService.getAllByCollegeNCompanyId(userProfile?.college_id || '', String(selectedFilter), debouncedSearchValue)
                .then(data => {
                    setResources(data)
                })
                .catch(error => {
                    console.log("Error fetching alumni data: ", error);
                })
                .finally(() => {
                    setSearchValue('')
                    setIsLoading(false);
                })
        }
    }, [selectedFilter, debouncedSearchValue]);

    return (
        <SafeAreaView className="flex-1">
            <View className="flex flex-row justify-between items-center gap-4 bg-primary h-[65px] px-5 pr-8">
                <View className="flex flex-row items-center gap-4 bg-primary h-[65px]">
                    {(type && type === "myContributions") &&
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <ChevronLeft size={25} color={"#FFFFFF"}/>
                        </TouchableOpacity>
                    }
                    <Text
                        className="font-poppinsLight text-white text-2xl">{(type && type === "myContributions") ? "My Contributions" : "Resources"}</Text>
                </View>
                {(type && type === "myContributions") &&
                    <TouchableOpacity className="mt-[2px]" onPress={() => {
                        navigation.navigate("SectionNavigator", {
                            screen: "AddResourceScreen",
                        })
                    }}>
                        <PlusIcon size={22} color={"#FFFFFF"} strokeWidth={"1.7px"}/>
                    </TouchableOpacity>
                }
            </View>

            <View className="bg-primary flex-1">
                <View className="bg-white flex-1 rounded-t-[30px] px-5 flex justify-start items-center">
                    <View className="flex flex-col items-start justify-start my-4 gap-4">
                        <View
                            className="flex flex-row justify-start items-center border border-gray-300 rounded-xl pr-4 pl-3 py-1 gap-1.5">
                            <Search size={20} color={"#999999"}/>
                            <TextInput
                                placeholder={`Search by ${(type && type === "myContributions") ? '' : 'author or '}tag name`}
                                className="text-black flex-1"
                                placeholderTextColor={"#999999"}
                                value={searchValue}
                                onChangeText={setSearchValue}
                            />
                        </View>
                        {(type && type === "myContributions") ?
                            <></> :
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                className="max-h-[30px]"
                                contentContainerStyle={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 10,
                                }}
                            >
                                <TouchableOpacity
                                    className={`${selectedFilter === 0 ? 'bg-primary/10' : 'bg-gray-100'} py-1 rounded-xl px-3 self-baseline`}
                                    onPress={() => setSelectedFilter(0)}>
                                    <Text
                                        className={`${selectedFilter === 0 ? 'text-[#006a63]' : 'text-black/80'} font-poppins text-[13px]`}>All</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className={`${selectedFilter === 1 ? 'bg-primary/10' : 'bg-gray-100'} py-1 rounded-xl px-3 self-baseline`}
                                    onPress={() => setSelectedFilter(1)}>
                                    <Text
                                        className={`${selectedFilter === 1 ? 'text-[#006a63]' : 'text-black/80'} font-poppins text-[13px]`}>Experiences</Text>
                                </TouchableOpacity>
                                {companies?.map((item, index) => (
                                    <TouchableOpacity
                                        className={`${selectedFilter === item?.id ? 'bg-primary/10' : 'bg-gray-100'} py-1 rounded-xl px-3 self-baseline`}
                                        key={index}
                                        onPress={() => setSelectedFilter(item?.id)}>
                                        <Text
                                            className={`${selectedFilter === item?.id ? 'text-[#006a63]' : 'text-black/80'} font-poppins text-[13px]`}>{item?.name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        }
                    </View>

                    <ScrollView className="flex-1 pt-2 w-full">
                        {!isLoading ? resources.length === 0 ?
                                <View className="flex flex-1 flex-col justify-center items-center min-h-[50vh] gap-3">
                                    <NoDataAvailSticker/>
                                    <Text
                                        className="text-black/30 text-[15px] font-poppinsLight indent-8 text-justify px-3 mb-4 leading-6">
                                        No data available
                                    </Text>
                                </View>
                                : resources.map((item, index) => (
                                    <View key={index}>
                                        <ResourceCard resourceItem={item} type={type}
                                                      setTriggerRefetch={setTriggerRefetch}/>
                                    </View>
                                ))
                            :
                            <View>
                                <ActivityIndicator size={28} color="#00b19f" className="mt-8"/>
                            </View>
                        }
                        {(type && type === "myContributions") ?
                            <View className="h-[50px]"/>
                            :
                            <View className="h-[100px]"/>
                        }
                    </ScrollView>

                    {(type && type === "myContributions") ?
                        <></> :
                        <TouchableOpacity
                            className="bg-primary rounded-full h-14 w-14 absolute bottom-[85px] right-[30px] flex items-center justify-center z-50"
                            style={{
                                shadowColor: '#000',
                                shadowOffset: {width: 0, height: 4},
                                shadowOpacity: 0.3,
                                shadowRadius: 4.65,
                                elevation: 6,
                            }} onPress={() => {
                            navigation.navigate("SectionNavigator", {
                                screen: "AddResourceScreen",
                                params: {
                                    type: "add"
                                }
                            })
                        }}>
                            <PlusIcon size={20} color={'#FFFFFF'}/>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </SafeAreaView>
    )
}
