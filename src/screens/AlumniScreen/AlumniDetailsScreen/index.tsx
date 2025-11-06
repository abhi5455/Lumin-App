import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {RouteProp, useRoute} from "@react-navigation/core";
import {useEffect, useState} from "react";
import {ChevronLeft, Edit3, Github, Globe, Linkedin, Mail, Phone, Twitter} from "lucide-react-native";
import {useAppNavigation} from "../../../common/navigationHelper.ts";
import About from "./About.tsx";
import Education from "./Education.tsx";
import Experience from "./Experience.tsx";

interface AlumniDetailsScreenProps {
    alumnusId: string;
    type: "alumnus" | "myProfile";
}

export default function AlumniDetailsScreen() {
    const route = useRoute<RouteProp<{ AlumniDetailsScreen: AlumniDetailsScreenProps }, 'AlumniDetailsScreen'>>();
    const {alumnusId, type} = route?.params;
    const navigation = useAppNavigation()
    const [activeTab, setActiveTab] = useState<'about' | 'education' | 'experience'>('about')

    useEffect(() => {
        console.log("Alumnus ID:", alumnusId);
    }, []);

    return (
        <SafeAreaView className="flex-1">
            <View className="flex flex-row justify-between items-center gap-4 bg-primary h-[65px] px-5 pr-8">
                <View className="flex flex-row items-center gap-4 bg-primary h-[65px]">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ChevronLeft size={25} color={"#FFFFFF"}/>
                    </TouchableOpacity>
                    <Text
                        className="font-poppinsLight text-white text-2xl">{type === "myProfile" ? "My Profile" : "Alumnus Details"}</Text>
                </View>
                {type === "myProfile" &&
                    <TouchableOpacity className="mt-[2px]">
                        <Edit3 size={20} color={"#FFFFFF"} strokeWidth={"1.7px"}/>
                    </TouchableOpacity>
                }
            </View>

            <View className="bg-primary flex-1">
                <View className="bg-white flex-1 rounded-t-[30px]">
                    {/*Profile Card*/}
                    {/*<View className="flex flex-col justify-center p-4 border border-gray-300 rounded-xl">*/}
                    <View className="flex flex-col justify-center py-4 px-8 mt-1">
                        <View className="flex flex-row items-center gap-4">
                            <View className="flex items-center justify-center bg-primary rounded-full h-20 w-20">
                                <Text className="text-white font-poppinsMedium text-lg">AB</Text>
                            </View>
                            <View>
                                <Text className="font-poppinsMedium text-[17px] mt-2">Alice Brown</Text>
                                <Text className="font-poppinsLight text-gray-600">Software Engineer at
                                    TechCorp</Text>
                                <Text className="text-black/80 font-poppins">Batch of 2017</Text>
                            </View>
                        </View>
                        <View className="flex flex-row justify-start mt-3 gap-4">
                            <TouchableOpacity
                                className="flex justify-center items-center bg-[#f0f6fc]/50  w-12 h-12 rounded-lg border-[1px] border-[#6b7280]/30">
                                <Linkedin size={19} color={"#006a63"} strokeWidth={"1.7"}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="flex justify-center items-center bg-[#f0f6fc]/50  w-12 h-12 rounded-lg border-[1px] border-[#6b7280]/30">
                                <Github size={19} color={"#006a63"} strokeWidth={"1.7"}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="flex justify-center items-center bg-[#f0f6fc]/50  w-12 h-12 rounded-lg border-[1px] border-[#6b7280]/30">
                                <Globe size={19} color={"#006a63"} strokeWidth={"1.7"}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="flex justify-center items-center bg-[#f0f6fc]/50  w-12 h-12 rounded-lg border-[1px] border-[#6b7280]/30">
                                <Phone size={19} color={"#006a63"} strokeWidth={"1.7"}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="flex justify-center items-center bg-[#f0f6fc]/50  w-12 h-12 rounded-lg border-[1px] border-[#6b7280]/30">
                                <Twitter size={19} color={"#006a63"} strokeWidth={"1.7"}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="flex justify-center items-center bg-[#f0f6fc]/50  w-12 h-12 rounded-lg border-[1px] border-[#6b7280]/30">
                                <Mail size={19} color={"#006a63"} strokeWidth={"1.7"}/>
                            </TouchableOpacity>
                        </View>
                        {type === "alumnus" &&
                            <View className="flex flex-row gap-2">
                                <TouchableOpacity
                                    className="flex flex-1 flex-row justify-center items-center gap-2 mt-4 bg-primary py-2 rounded-xl"
                                    onPress={() => {
                                    }}>
                                    {/*<ChevronUpCircle size={21} color={"#FFF"}/>*/}
                                    <Text className="text-white font-poppinsMedium text-[14px]">Message</Text>
                                </TouchableOpacity>
                            </View>
                        }
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
                                setActiveTab('education')
                            }}>
                            <Text className="font-poppins text-lg">Education</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className={`flex-1 justify-center items-center px-2 pt-2 pb-1 ${activeTab === 'experience' && 'border-b border-primary'}`}
                            onPress={() => {
                                setActiveTab('experience')
                            }}>
                            <Text className="font-poppins text-lg">Experience</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView>
                        {activeTab === 'about' ?
                            <About/>
                            : activeTab === 'education' ?
                                <Education/>
                                : <Experience/>
                        }
                    </ScrollView>

                </View>
            </View>
        </SafeAreaView>
    )
}
