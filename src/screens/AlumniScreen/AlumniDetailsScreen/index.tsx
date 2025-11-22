import {ActivityIndicator, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {RouteProp, useRoute} from "@react-navigation/core";
import {useEffect, useState} from "react";
import {ChevronLeft, Edit3, Github, Globe, Linkedin, Mail, Phone, Twitter} from "lucide-react-native";
import {useAppNavigation} from "../../../common/navigationHelper.ts";
import About from "./About.tsx";
import Education from "./Education.tsx";
import Experience from "./Experience.tsx";
import {studentService} from "../../../services/studentService.ts";
import {IStudent} from "../../../types/type_student.ts";
import {openURL} from "../../../lib/openUrl.ts";
import Toast from "react-native-toast-message";

interface AlumniDetailsScreenProps {
    alumnusId: string;
    type: "alumnus" | "myProfile";
    alumnusData?: IStudent;
}

export default function AlumniDetailsScreen() {
    const route = useRoute<RouteProp<{ AlumniDetailsScreen: AlumniDetailsScreenProps }, 'AlumniDetailsScreen'>>();
    const {alumnusId, type, alumnusData} = route?.params;
    const navigation = useAppNavigation();
    const [activeTab, setActiveTab] = useState<'about' | 'education' | 'experience'>('about');
    const [alumnus, setAlumnus] = useState<IStudent>(alumnusData || null);
    const [isLoading, setIsLoading] = useState(!alumnusData);
    const baseCollege = alumnus?.studenteducation?.find(e => e.is_base_college);
    const currentCompany = alumnus?.rstudentcompany?.find(c => c.is_current);

    useEffect(() => {
        if (!alumnusData) {
            studentService.getById(alumnusId)
                .then(data => {
                    setAlumnus(data);
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
                    {!isLoading ?
                        <>
                            <View className="flex flex-col justify-center py-4 px-8 mt-1">
                                <View className="flex flex-row items-center gap-4">
                                    <View
                                        className="flex items-center justify-center bg-primary rounded-full h-20 w-20">
                                        <Text
                                            className="text-white font-poppinsMedium text-lg">{alumnus?.name.split(" ")?.map(n => n[0].toUpperCase()).join('')}</Text>
                                    </View>
                                    <View>
                                        <Text className="font-poppinsMedium text-[17px] mt-2">{alumnus?.name}</Text>
                                        <Text
                                            className="font-poppinsLight text-gray-600">{currentCompany?.position}</Text>
                                        <Text className="text-black/80 font-poppins">Batch
                                            of {baseCollege?.end_year}</Text>
                                    </View>
                                </View>
                                <View className="flex flex-row justify-start mt-3 gap-4">
                                    <TouchableOpacity
                                        className="flex justify-center items-center bg-[#f0f6fc]/50  w-12 h-12 rounded-lg border-[1px] border-[#6b7280]/30"
                                        onPress={() => {
                                            if (alumnus?.linkedin_url) {
                                                openURL(alumnus?.linkedin_url)
                                            } else {
                                                Toast.show({
                                                        type: "missing",
                                                        text1: "LinkedIn Profile not available!",
                                                        text2: "The user has not provided yet.",
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
                                            if (alumnus?.github_url) {
                                                openURL(alumnus?.github_url)
                                            } else {
                                                Toast.show({
                                                        type: "missing",
                                                        text1: "Github Profile not available!",
                                                        text2: "The user has not provided yet.",
                                                        position: "top"
                                                    }
                                                )
                                            }
                                        }}>
                                        <Github size={19} color={"#006a63"} strokeWidth={"1.7"}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        className="flex justify-center items-center bg-[#f0f6fc]/50  w-12 h-12 rounded-lg border-[1px] border-[#6b7280]/30"
                                        onPress={() => {
                                            if (alumnus?.portfolio_url) {
                                                openURL(alumnus?.portfolio_url)
                                            } else {
                                                Toast.show({
                                                        type: "missing",
                                                        text1: "Portfolio link not available!",
                                                        text2: "The user has not provided yet.",
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
                                            if (alumnus?.phone) {
                                                openURL(`tel:${alumnus?.phone}`)
                                            } else {
                                                Toast.show({
                                                        type: "missing",
                                                        text1: "Phone number not available!",
                                                        text2: "The user has not provided yet.",
                                                        position: "top"
                                                    }
                                                )
                                            }
                                        }}>
                                        <Phone size={19} color={"#006a63"} strokeWidth={"1.7"}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        className="flex justify-center items-center bg-[#f0f6fc]/50  w-12 h-12 rounded-lg border-[1px] border-[#6b7280]/30"
                                        onPress={() => {
                                            if (alumnus?.twitter_url) {
                                                openURL(alumnus?.twitter_url)
                                            } else {
                                                Toast.show({
                                                        type: "missing",
                                                        text1: "X Profile not available!",
                                                        text2: "The user has not provided yet.",
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
                                            if (alumnus?.email) {
                                                openURL(`mailto:${alumnus?.email}`)
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
                                </View>
                                {type === "alumnus" &&
                                    <View className="flex flex-row gap-2">
                                        <TouchableOpacity
                                            className="flex flex-1 flex-row justify-center items-center gap-2 mt-4 bg-primary py-2 rounded-xl"
                                            onPress={() => {
                                                if (alumnus?.email) {
                                                    openURL(`mailto:${alumnus?.email}`)
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
                                    <About alumnus={alumnus}/>
                                    : activeTab === 'education' ?
                                        <Education alumnus={alumnus}/>
                                        : <Experience alumnus={alumnus}/>
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
