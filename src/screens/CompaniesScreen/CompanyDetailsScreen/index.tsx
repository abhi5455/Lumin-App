import {ActivityIndicator, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {RouteProp, useRoute} from "@react-navigation/core";
import {useEffect, useState} from "react";
import {ChevronLeft, Globe, Linkedin, Mail, MapPin, Twitter} from "lucide-react-native";
import {useAppNavigation} from "../../../common/navigationHelper.ts";
import GlassDoorIcon from "../../../assets/svg/appIcons/GlassDoorIcon.svg";
import About from "./About.tsx";
import Analytics from "./Analytics.tsx";
import Process from "./Process.tsx";
import {ICompany} from "../../../types/typeCompany.ts";
import {companyService} from "../../../services/companyService.ts";
import {openURL} from "../../../lib/openUrl.ts";
import Toast from "react-native-toast-message";

interface CompanyDetailsScreenProps {
    companyId: string;
    companyData?: ICompany
}

export default function CompanyDetailsScreen() {
    const route = useRoute<RouteProp<{ CompanyDetailsScreen: CompanyDetailsScreenProps }, 'CompanyDetailsScreen'>>();
    const {companyId, companyData} = route?.params;
    const navigation = useAppNavigation();
    const [activeTab, setActiveTab] = useState<'about' | 'analytics' | 'process'>('about');
    const [company, setCompany] = useState<ICompany>(companyData || null);
    const [isLoading, setIsLoading] = useState(!companyData);

    useEffect(() => {
        if (!companyData) {
            companyService.getById(companyId)
                .then(data => {
                    setCompany(data as ICompany);
                })
                .catch(error => {
                    console.log("Error fetching alumnus data: ", error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, []);

    return (
        <SafeAreaView className="flex-1">
            <View className="flex flex-row items-center gap-4 bg-primary h-[65px] px-5">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={25} color={"#FFFFFF"}/>
                </TouchableOpacity>
                <Text className="font-poppinsLight text-white text-2xl">Company Details</Text>
            </View>

            <View className="bg-primary flex-1">
                <View className="bg-white flex-1 rounded-t-[30px]">
                    {/*Profile Card*/}
                    {!isLoading ?
                        <>
                            <View className="flex flex-col justify-center py-4 px-8 mt-1">
                                <View className="flex flex-row items-center gap-4">
                                    <View
                                        className="flex items-center justify-center bg-primary rounded-full h-20 w-20">
                                        <Text
                                            className="text-white font-poppinsMedium text-lg">{company?.name?.split(' ')?.map(n => n[0].toUpperCase())}</Text>
                                    </View>
                                    <View>
                                        <Text className="font-poppinsMedium text-[17px] mt-2">{company?.name}</Text>
                                        <Text className="font-poppinsLight text-gray-600">{company?.industry}</Text>
                                        <View className="flex flex-row justify-start items-center gap-2 ml-[-3px]">
                                            <MapPin size={18} color={"rgb(0 0 0 / 0.7)"}/>
                                            <Text className="font-poppins text-black/80">{company?.location}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View className="flex flex-row justify-start mt-3 gap-4">
                                    <TouchableOpacity
                                        className="flex justify-center items-center bg-[#f0f6fc]/50  w-12 h-12 rounded-lg border-[1px] border-[#6b7280]/30"
                                        onPress={() => {
                                            if (company?.linkedin_url) {
                                                openURL(company?.linkedin_url)
                                            } else {
                                                Toast.show({
                                                        type: "missing",
                                                        text1: "LinkedIn Profile not available!",
                                                        position: "top"
                                                    }
                                                )
                                            }
                                        }}>
                                        <Linkedin size={19} color={"#006a63"} strokeWidth={"1.7"}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        className="flex justify-center items-center bg-[#f0f6fc]/50  w-12 h-12 rounded-lg border-[1px] border-[#6b7280]/30"
                                        onPress={() => {
                                            if (company?.portfolio_url) {
                                                openURL(company?.portfolio_url)
                                            } else {
                                                Toast.show({
                                                        type: "missing",
                                                        text1: "Official Website not available!",
                                                        position: "top"
                                                    }
                                                )
                                            }
                                        }}>
                                        <Globe size={19} color={"#006a63"} strokeWidth={"1.7"}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        className="flex justify-center items-center bg-[#f0f6fc]/50  w-12 h-12 rounded-lg border-[1px] border-[#6b7280]/30"
                                        onPress={() => {
                                            if (company?.twitter_url) {
                                                openURL(company?.twitter_url)
                                            } else {
                                                Toast.show({
                                                        type: "missing",
                                                        text1: "X Profile not available!",
                                                        position: "top"
                                                    }
                                                )
                                            }
                                        }}>
                                        <Twitter size={19} color={"#006a63"} strokeWidth={"1.7"}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        className="flex justify-center items-center bg-[#f0f6fc]/50  w-12 h-12 rounded-lg border-[1px] border-[#6b7280]/30"
                                        onPress={() => {
                                            if (company?.email) {
                                                openURL(`mailto:${company?.email}`)
                                            } else {
                                                Toast.show({
                                                        type: "missing",
                                                        text1: "MailId not available!",
                                                        text2: "The user has not provided yet.",
                                                        position: "top"
                                                    }
                                                )
                                            }
                                        }}>
                                        <Mail size={19} color={"#006a63"} strokeWidth={"1.7"}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        className="flex justify-center items-center bg-[#f0f6fc]/50  w-12 h-12 rounded-lg border-[1px] border-[#6b7280]/30"
                                        onPress={() => {
                                            if (!company?.glassdoor_url) {
                                                openURL(company?.glassdoor_url)
                                            } else {
                                                Toast.show({
                                                        type: "missing",
                                                        text1: "Glassdoor review not available!",
                                                        position: "top"
                                                    }
                                                )
                                            }
                                        }}>
                                        <GlassDoorIcon size={19}/>
                                    </TouchableOpacity>
                                </View>
                                <View className="flex flex-row justify-center gap-2">
                                    <TouchableOpacity
                                        className="flex flex-1 flex-row justify-center items-center gap-2 mt-4 bg-primary py-2 rounded-xl"
                                        onPress={() => {
                                            if (!company?.glassdoor_url) {
                                                openURL(company?.glassdoor_url)
                                            } else {
                                                Toast.show({
                                                        type: "missing",
                                                        text1: "Review not available!",
                                                        position: "top"
                                                    }
                                                )
                                            }
                                        }}>
                                        <Text className="text-white font-poppinsMedium text-[14px]">View Review</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View className="flex flex-row justify-between border-b border-gray-100 mx-4">
                                <TouchableOpacity
                                    className={`flex-1 justify-center items-center px-2 pt-2 pb-1 ${activeTab === 'about' && 'border-b border-primary'}`}
                                    onPress={() => {
                                        setActiveTab('about')
                                    }}>
                                    <Text className="font-poppins text-lg">About</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className={`flex-1 justify-center items-center px-2 pt-2 pb-1 ${activeTab === 'analytics' && 'border-b border-primary'}`}
                                    onPress={() => {
                                        setActiveTab('analytics')
                                    }}>
                                    <Text className="font-poppins text-lg">Analytics</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className={`flex-1 justify-center items-center px-2 pt-2 pb-1 ${activeTab === 'process' && 'border-b border-primary'}`}
                                    onPress={() => {
                                        setActiveTab('process')
                                    }}>
                                    <Text className="font-poppins text-lg">Process</Text>
                                </TouchableOpacity>
                            </View>

                            <ScrollView>
                                {activeTab === 'about' ?
                                    <About company={company}/>
                                    : activeTab === 'analytics' ?
                                        <Analytics company={company}/>
                                        : <Process company={company}/>
                                }
                            </ScrollView>
                        </>

                        :
                        <View>
                            <ActivityIndicator size={30} color="#00b19f" className="mt-[7vh]"/>
                        </View>
                    }
                </View>
            </View>
        </SafeAreaView>
    )
}
