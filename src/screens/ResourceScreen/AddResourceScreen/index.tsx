import {ChevronDown, ChevronLeft, PlusIcon, X} from "lucide-react-native";
import {ActivityIndicator, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useAppNavigation} from "../../../common/navigationHelper.ts";
import {SafeAreaView} from "react-native-safe-area-context";
import React, {useEffect, useState} from "react";
import AddTagModal from "./components/AddTagModal.tsx";
import {ICompany} from "../../../types/typeCompany.ts";
import AttachCompanyModal from "./components/AttachCompanyModal.tsx";
import {companyService} from "../../../services/companyService.ts";
import {getUserProfile} from "../../../lib/userStorage.ts";
import Toast from "react-native-toast-message";
import {resourceService} from "../../../services/resourceService.ts";
import {RouteProp, useRoute} from "@react-navigation/core";
import {IResource} from "../../../types/type_resource.ts";

interface IAddResourceScreen {
    type?: "add" | "edit";
    resourceItem?: IResource;
}

export default function AddResourceScreen() {
    const route = useRoute<RouteProp<{ AddResourceScreen: IAddResourceScreen }, 'AddResourceScreen'>>();
    const {type, resourceItem} = route?.params ?? "add";
    const navigation = useAppNavigation();
    const [title, setTitle] = useState(resourceItem ? resourceItem.title : "");
    const [content, setContent] = useState(resourceItem ? resourceItem.content : "");
    const [tags, setTags] = useState<string[]>(resourceItem ? resourceItem.company_id ? resourceItem?.resourcekeywords.slice(1).map(item => item?.keyword) : resourceItem?.resourcekeywords.map(item => item?.keyword) : []);
    const [tagModalVisible, setTagModalVisible] = useState(false);
    const [attachedCompany, setAttachedCompany] = useState<ICompany | null>(resourceItem && resourceItem.company ? resourceItem.company : null);
    const [attachCompanyModalVisible, setAttachCompanyModalVisible] = useState(false);
    const [companies, setCompanies] = useState<ICompany[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        StatusBar.setBarStyle('light-content')
        StatusBar.setBackgroundColor(tagModalVisible ? '#01584f' : '#00b19f')
    }, [tagModalVisible])

    useEffect(() => {
        const userProfile = getUserProfile()
        companyService.getAllByCollegeId(userProfile?.college_id || '')
            .then(data => {
                setCompanies(data || [])
            })
            .catch(error => {
                console.log("Error fetching companies: ", error);
            })
    }, []);

    return (
        <SafeAreaView className="flex-1">
            <View className="flex flex-row items-center gap-4 bg-primary h-[65px] px-5">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={25} color={"#FFFFFF"}/>
                </TouchableOpacity>
                <Text
                    className="font-poppinsLight text-white text-2xl">{type === "edit" ? "Edit Resource" : "Add New Resource"}</Text>
            </View>

            <View className="bg-primary flex-1">
                <View className="bg-white flex-1 justify-between rounded-t-[30px] py-5 px-5">
                    <ScrollView className="flex flex-col">
                        {/*Title*/}
                        <View
                            className="relative flex flex-row justify-start items-center border border-gray-300 rounded-xl px-4 mb-5 mt-3">
                            <Text
                                className={`${title === "" ? 'hidden' : 'absolute'} top-[-10px] left-[7px] z-50 px-1 bg-white text-gray-300 font-poppinsMedium text-md ml-2`}>Title</Text>
                            <TextInput
                                placeholder={"Enter title"} className="text-black flex-1 h-[50px] text-lg"
                                placeholderTextColor={"#999999"}
                                value={title}
                                onChangeText={setTitle}
                            />
                        </View>

                        {/*Content*/}
                        <View
                            className="relative flex flex-row justify-start items-center border border-gray-300 rounded-xl px-4 mb-5 mt-1">
                            <Text
                                className={`${content === "" ? 'hidden' : 'absolute'} top-[-10px] left-[7px] z-50 px-1 bg-white text-gray-300 font-poppinsMedium text-md ml-2`}>Content</Text>
                            <TextInput
                                placeholder={"Enter content"}
                                className="text-black flex-1 h-[50px] text-lg min-h-[200px] align-top pt-4"
                                placeholderTextColor={"#999999"}
                                multiline={true}
                                value={content}
                                onChangeText={setContent}
                            />
                        </View>

                        {/*Tags*/}
                        <View className="relative flex flex-col gap-2 mb-4 mt-1">
                            <View
                                className="relative flex flex-col items-start border border-gray-300 rounded-xl px-4 py-2 pb-3 gap-4">
                                <Text
                                    className={`absolute top-[-10px] left-[7px] z-50 px-1 bg-white text-gray-300 font-poppinsMedium text-md ml-2`}>Tags {tags?.length}/3</Text>
                                {/*<Text className="text-black font-poppinsMedium text-md">Tags {tags?.length}/3</Text>*/}
                                <View className="flex flex-row justify-start items-center gap-3 flex-wrap mt-5">
                                    {tags?.map((tag, index) => (
                                        <View
                                            className="flex flex-row justify-start items-center bg-primary/10 gap-1 rounded-xl py-2 px-4"
                                            key={index}>
                                            <TouchableOpacity onPress={() => {
                                                setTags(prev => prev.filter(t => t !== tag))
                                            }}>
                                                <X size={16} color={'rgb(0 0 0 / 0.65)'}/>
                                            </TouchableOpacity>
                                            <Text
                                                className="text-[#006a63] font-poppinsMedium text-md ml-1">{tag}</Text>
                                        </View>
                                    ))}
                                    {tags.length < 3 &&
                                        <TouchableOpacity
                                            className="flex flex-row justify-start items-center gap-1 border border-dashed border-gray-300 rounded-xl py-2 px-4"
                                            onPress={() => {
                                                setTagModalVisible(true)
                                            }}>
                                            <PlusIcon size={20}/>
                                            <Text className="text-black font-poppinsMedium text-md">Add New</Text>
                                        </TouchableOpacity>
                                    }
                                </View>
                            </View>
                        </View>

                        {/*Company*/}
                        <TouchableOpacity className="relative flex flex-col gap-2 mb-4 mt-2" onPress={() => {
                            setAttachCompanyModalVisible(true)
                        }}>
                            <View
                                className="relative flex flex-col items-start border border-gray-300 rounded-xl px-4 py-2 pb-3 gap-4">
                                <Text
                                    className={`absolute top-[-10px] left-[7px] z-50 px-1 bg-white text-gray-300 font-poppins text-md ml-2`}>Attach
                                    with Company</Text>
                                {attachedCompany ?
                                    <View
                                        className="flex flex-row justify-between items-center w-full gap-3 flex-wrap mt-3 pr-">
                                        <Text
                                            className="text-primary font-poppinsMedium text-[15px]">{attachedCompany?.name}</Text>
                                        <ChevronDown size={20}/>
                                    </View>
                                    :
                                    <View
                                        className="flex flex-row justify-between items-center w-full gap-3 flex-wrap mt-3 pr-">
                                        <Text className="text-gray-400 font-poppins text-[15px]">No Company
                                            attached</Text>
                                        <ChevronDown size={20}/>
                                    </View>
                                }
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                    <View className="flex flex-row justify-center items-center gap-3 px-4 pt-3">
                        <TouchableOpacity
                            className="flex-1 bg-primary py-4 rounded-2xl items-center justify-center"
                            onPress={() => {
                                if (title.trim() === "" || content.trim() === "") {
                                    Toast.show({
                                        type: 'error',
                                        text1: 'Incomplete Data',
                                        text2: 'Please fill in all required fields(title and content).'
                                    });
                                    return;
                                }
                                if (tags.length === 0) {
                                    Toast.show({
                                        type: 'error',
                                        text1: 'No Tags Added',
                                        text2: 'Please add at least one tag to the resource.'
                                    });
                                    return;
                                }
                                setIsLoading(true);
                                setTags(prev => attachedCompany ? [...prev, attachedCompany.name] : [...prev]);
                                const userProfile = getUserProfile();
                                if (type === "edit" && resourceItem) {
                                    resourceService.update({
                                        id: resourceItem.id,
                                        created_at: resourceItem.created_at,
                                        uploaded_by_student_id: userProfile?.id || '',
                                        college_id: userProfile?.college_id || '',
                                        title: title.trim(),
                                        content: content.trim(),
                                        is_verified: true,
                                        company_id: attachedCompany ? attachedCompany.id : null,
                                        keywords: attachedCompany ? [attachedCompany?.name, ...tags] : tags,
                                    }).then(() => {
                                        setIsLoading(false);
                                        Toast.show({
                                            type: 'success',
                                            text1: 'Resource Updated',
                                            text2: 'Your contribution has been updated successfully.'
                                        });
                                        navigation.goBack();
                                    }).catch((error) => {
                                        setIsLoading(false);
                                        setTags(prev => attachedCompany ? prev.filter(t => t !== attachedCompany.name) : prev);
                                        console.log("Error editing resource: ", error);
                                        console.log("Payload: ", error.message)
                                        Toast.show({
                                            type: 'error',
                                            text1: 'Resource Updation Failed',
                                            text2: error.message || 'An error occurred while updating the resource.'
                                        });
                                    })
                                } else {
                                    resourceService.create({
                                        uploaded_by_student_id: userProfile?.id || '',
                                        college_id: userProfile?.college_id || '',
                                        title: title.trim(),
                                        content: content.trim(),
                                        is_verified: true,
                                        company_id: attachedCompany ? attachedCompany.id : null,
                                        keywords: attachedCompany ? [attachedCompany?.name, ...tags] : tags,
                                    }).then(() => {
                                        setIsLoading(false);
                                        Toast.show({
                                            type: 'success',
                                            text1: 'Resource Created',
                                            text2: 'Your contribution has been added successfully.'
                                        });
                                        navigation.goBack();
                                    }).catch((error) => {
                                        setIsLoading(false);
                                        setTags(prev => attachedCompany ? prev.filter(t => t !== attachedCompany.name) : prev);
                                        console.log("Error creating resource: ", error);
                                        console.log("Payload: ", error.message)
                                        Toast.show({
                                            type: 'error',
                                            text1: 'Resource Creation Failed',
                                            text2: error.message || 'An error occurred while creating the resource.'
                                        });
                                    })
                                }

                            }}>
                            {!isLoading ?
                                <Text
                                    className="text-white font-poppinsMedium text-lg">{type === "edit" ? "Save" : "Create"}</Text>
                                :
                                <ActivityIndicator color={'#FFF'} size={25} className={''}/>
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <AddTagModal visible={tagModalVisible}
                         onClose={() => {
                             setTagModalVisible(false)
                         }}
                         setTags={setTags}/>
            <AttachCompanyModal visible={attachCompanyModalVisible} onClose={() => {
                setAttachCompanyModalVisible(false)
            }} companies={companies} attachedCompany={attachedCompany} setAttachedCompany={setAttachedCompany}/>
        </SafeAreaView>
    )
}
