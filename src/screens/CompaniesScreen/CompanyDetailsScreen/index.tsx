import {ScrollView, StatusBar, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {RouteProp, useRoute} from "@react-navigation/core";
import {useEffect, useState} from "react";
import {ChevronLeft, Github, Globe, Linkedin, Mail, MapPin, Phone, Twitter} from "lucide-react-native";
import {useAppNavigation} from "../../../common/navigationHelper.ts";
import GlassDoorIcon from "../../../assets/svg/appIcons/GlassDoorIcon.svg";
import About from "./About.tsx";
import Analytics from "./Analytics.tsx";
import Process from "./Process.tsx";

interface CompanyDetailsScreenProps {
    companyId: string;
}

export default function CompanyDetailsScreen() {
    const route = useRoute<RouteProp<{ CompanyDetailsScreen: CompanyDetailsScreenProps }, 'CompanyDetailsScreen'>>();
    const {companyId} = route?.params;
    const navigation = useAppNavigation()
    const [activeTab, setActiveTab] = useState<'about' | 'analytics' | 'process'>('about')

    useEffect(() => {
        console.log("Alumnus ID:", companyId);
    }, []);

    return (
        <SafeAreaProvider className="flex-1">
            <StatusBar barStyle="light-content" backgroundColor={'#00b19f'}/>
            <View className="flex flex-row items-center gap-4 bg-primary h-[65px] px-5">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={25} color={"#FFFFFF"}/>
                </TouchableOpacity>
                <Text className="font-poppinsLight text-white text-2xl">Company Details</Text>
            </View>

            <View className="bg-primary flex-1">
                <View className="bg-white flex-1 rounded-t-[30px]">
                    {/*Profile Card*/}
                    <View className="flex flex-col justify-center py-4 px-8 mt-1">
                        <View className="flex flex-row items-center gap-4">
                            <View className="flex items-center justify-center bg-primary rounded-full h-20 w-20">
                                <Text className="text-white font-poppinsMedium text-lg">TCS</Text>
                            </View>
                            <View>
                                <Text className="font-poppinsMedium text-[17px] mt-2">Tata Consultancy Services</Text>
                                <Text className="font-poppinsLight text-gray-600">IT Services</Text>
                                <View className="flex flex-row justify-start items-center gap-2 ml-[-3px]">
                                    <MapPin size={18} color={"rgb(0 0 0 / 0.7)"}/>
                                    <Text className="font-poppins text-black/80">Kochi, Kerala</Text>
                                </View>
                            </View>
                        </View>
                        <View className="flex flex-row justify-start mt-3 gap-4">
                            <TouchableOpacity
                                className="flex justify-center items-center bg-[#f0f6fc]/50  w-12 h-12 rounded-lg border-[1px] border-[#6b7280]/30">
                                <Linkedin size={19} color={"#006a63"} strokeWidth={"1.7"}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="flex justify-center items-center bg-[#f0f6fc]/50  w-12 h-12 rounded-lg border-[1px] border-[#6b7280]/30">
                                <Globe size={19} color={"#006a63"} strokeWidth={"1.7"}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="flex justify-center items-center bg-[#f0f6fc]/50  w-12 h-12 rounded-lg border-[1px] border-[#6b7280]/30">
                                <Twitter size={19} color={"#006a63"} strokeWidth={"1.7"}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="flex justify-center items-center bg-[#f0f6fc]/50  w-12 h-12 rounded-lg border-[1px] border-[#6b7280]/30">
                                <Mail size={19} color={"#006a63"} strokeWidth={"1.7"}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="flex justify-center items-center bg-[#f0f6fc]/50  w-12 h-12 rounded-lg border-[1px] border-[#6b7280]/30">
                                <GlassDoorIcon size={19}/>
                            </TouchableOpacity>
                        </View>
                        <View className="flex flex-row justify-center gap-2">
                            <TouchableOpacity
                                className="flex flex-1 flex-row justify-center items-center gap-2 mt-4 bg-primary py-2 rounded-xl"
                                onPress={() => {
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
                            className={`flex-1 justify-center items-center px-2 pt-2 pb-1 ${activeTab === 'education' && 'border-b border-primary'}`}
                            onPress={() => {
                                setActiveTab('analytics')
                            }}>
                            <Text className="font-poppins text-lg">Analytics</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className={`flex-1 justify-center items-center px-2 pt-2 pb-1 ${activeTab === 'experience' && 'border-b border-primary'}`}
                            onPress={() => {
                                setActiveTab('process')
                            }}>
                            <Text className="font-poppins text-lg">Process</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView>
                        {activeTab === 'about' ?
                            <About/>
                            : activeTab === 'analytics' ?
                                <Analytics/>
                                : <Process/>
                        }
                    </ScrollView>

                </View>
            </View>
        </SafeAreaProvider>
    )
}
