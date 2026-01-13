import {ActivityIndicator, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {RouteProp, useRoute} from "@react-navigation/core";
import React, {useEffect, useState} from "react";
import {
    ChevronLeft,
    Edit,
    Edit2,
    Edit3,
    Github,
    Globe,
    Linkedin,
    Mail, Pencil,
    Phone,
    SaveIcon,
    Twitter
} from "lucide-react-native";
import {useAppNavigation} from "../../../common/navigationHelper.ts";
import About from "./About.tsx";
import Education from "./Education.tsx";
import Experience from "./Experience.tsx";
import {IStudent} from "../../../types/type_student.ts";
import {openURL} from "../../../lib/openUrl.ts";
import Toast from "react-native-toast-message";
import EditSocialModal from "./EditSocialModal.tsx";

interface EditProfileScreenProps {
    alumnusData?: IStudent;
}

export default function EditProfileScreen() {
    const route = useRoute<RouteProp<{ EditProfileScreen: EditProfileScreenProps }, 'EditProfileScreen'>>();
    const {alumnusData} = route?.params;
    const navigation = useAppNavigation();
    const [activeTab, setActiveTab] = useState<'about' | 'education' | 'experience'>('about');
    const [alumnus, setAlumnus] = useState<IStudent>(alumnusData || null);
    const [isLoading, setIsLoading] = useState(!alumnusData);
    const baseCollege = alumnus?.studenteducation?.find(e => e.is_base_college);
    const currentCompany = alumnus?.rstudentcompany?.find(c => c.is_current);

    const [editSocialModalVisible, setEditSocialModalVisible] = useState(false);
    const [editLabel, setEditLabel] = useState('')

    function updateAlumnus(label, data){
        setAlumnus(prev=>({
            ...prev,
            [label]: data
        }))
    }


    return (
        <SafeAreaView className="flex-1">
            <View className="flex flex-row justify-between items-center gap-4 bg-primary h-[65px] px-5 pr-8">
                <View className="flex flex-row items-center gap-4 bg-primary h-[65px]">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ChevronLeft size={25} color={"#FFFFFF"}/>
                    </TouchableOpacity>
                    <Text
                        className="font-poppinsLight text-white text-2xl">Edit Profile</Text>
                </View>

                <TouchableOpacity className="mt-[2px]" onPress={() => {
                    console.log("Aluni Data ", alumnus)
                }}>
                    {/*<Text className="font-poppinsLight text-white text-xl">save</Text>*/}
                    <SaveIcon size={20} color={"#FFFFFF"} strokeWidth={"1.7px"}/>
                </TouchableOpacity>
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
                                            setEditLabel('linkedin_url')
                                            setEditSocialModalVisible(true)
                                        }}>
                                        <View className="absolute top-[-4px] right-[-4px] bg-white rounded-full">
                                            <Pencil size={12} color={"#6b7280"} strokeWidth={"2"}/>
                                        </View>
                                        <Linkedin size={19} color={"#006a63"} strokeWidth={"1.7"}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        className="flex justify-center items-center bg-[#f0f6fc]/50  w-12 h-12 rounded-lg border-[1px] border-[#6b7280]/30"
                                        onPress={() => {
                                            setEditLabel('github_url')
                                            setEditSocialModalVisible(true)
                                        }}>
                                        <View className="absolute top-[-4px] right-[-4px] bg-white rounded-full">
                                            <Pencil size={12} color={"#6b7280"} strokeWidth={"2"}/>
                                        </View>
                                        <Github size={19} color={"#006a63"} strokeWidth={"1.7"}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        className="flex justify-center items-center bg-[#f0f6fc]/50  w-12 h-12 rounded-lg border-[1px] border-[#6b7280]/30"
                                        onPress={() => {
                                            setEditLabel('portfolio_url')
                                            setEditSocialModalVisible(true)
                                        }}>
                                        <View className="absolute top-[-4px] right-[-4px] bg-white rounded-full">
                                            <Pencil size={12} color={"#6b7280"} strokeWidth={"2"}/>
                                        </View>
                                        <Globe size={19} color={"#006a63"} strokeWidth={"1.7"}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        className="flex justify-center items-center bg-[#f0f6fc]/50  w-12 h-12 rounded-lg border-[1px] border-[#6b7280]/30"
                                        onPress={() => {
                                            setEditLabel('phone')
                                            setEditSocialModalVisible(true)
                                        }}>
                                        <View className="absolute top-[-4px] right-[-4px] bg-white rounded-full">
                                            <Pencil size={12} color={"#6b7280"} strokeWidth={"2"}/>
                                        </View>
                                        <Phone size={19} color={"#006a63"} strokeWidth={"1.7"}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        className="flex justify-center items-center bg-[#f0f6fc]/50  w-12 h-12 rounded-lg border-[1px] border-[#6b7280]/30"
                                        onPress={() => {
                                            setEditLabel('twitter_url')
                                            setEditSocialModalVisible(true)
                                        }}>
                                        <View className="absolute top-[-4px] right-[-4px] bg-white rounded-full">
                                            <Pencil size={12} color={"#6b7280"} strokeWidth={"2"}/>
                                        </View>
                                        <Twitter size={19} color={"#006a63"} strokeWidth={"1.7"}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        className="flex justify-center items-center bg-[#f0f6fc]/50  w-12 h-12 rounded-lg border-[1px] border-[#6b7280]/30"
                                        onPress={() => {
                                            setEditLabel('email')
                                            setEditSocialModalVisible(true)
                                        }}>
                                        <View className="absolute top-[-4px] right-[-4px] bg-white rounded-full">
                                            <Pencil size={12} color={"#6b7280"} strokeWidth={"2"}/>
                                        </View>
                                        <Mail size={19} color={"#006a63"} strokeWidth={"1.7"}/>
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
                                    <About alumnus={alumnus} updateAlumnus={updateAlumnus}/>
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

            <EditSocialModal visible={editSocialModalVisible} onClose={()=>(setEditSocialModalVisible(false))} updateAlumnus={updateAlumnus} editLabel={editLabel}
            alumnus={alumnus}/>
        </SafeAreaView>
    )
}
