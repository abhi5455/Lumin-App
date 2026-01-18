import {ActivityIndicator, ScrollView, StatusBar, Text, TouchableOpacity, View} from "react-native";
import {ChevronLeft, EllipsisVertical, Pencil, Trash2} from "lucide-react-native";
import {IResource} from "../../../types/type_resource.ts";
import {formatDistanceToNow} from "date-fns";
import {useAppNavigation} from "../../../common/navigationHelper.ts";
import {Menu} from "react-native-material-menu";
import {useCallback, useEffect, useRef, useState} from "react";
import {getUserProfile} from "../../../lib/userStorage.ts";
import ConfirmationModal from "../../ProfileScreen/ConfirmationModal.tsx";
import {resourceService} from "../../../services/resourceService.ts";
import {RouteProp, useRoute} from "@react-navigation/core";
import {SafeAreaView} from "react-native-safe-area-context";
import {useFocusEffect} from "@react-navigation/native";
import Toast from "react-native-toast-message";

interface IResourceDetailsScreenProps {
    resourceItem: IResource;
}

export function ResourceDetailsScreen() {
    const navigation = useAppNavigation();
    const route = useRoute<RouteProp<{ ViewResourceScreen: IResourceDetailsScreenProps }, 'ViewResourceScreen'>>();
    const {resourceItem} = route?.params;
    const userProfile = getUserProfile();
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [resourceData, setResourceData] = useState<IResource>(resourceItem)
    const [isLoading, setIsLoading] = useState(false)
    const isFirstLoad = useRef(true);

    const [deleting, setDeleting] = useState(false);
    const [deleteConfirmModalVisible, setDeleteConfirmModalVisible] = useState(false);

    useEffect(() => {
        StatusBar.setBarStyle('light-content')
        StatusBar.setBackgroundColor(deleteConfirmModalVisible ? '#01584f' : '#00b19f')
    }, [deleteConfirmModalVisible])

    useFocusEffect(
        useCallback(() => {
            if (!isFirstLoad.current) {
                setIsLoading(true)
                isFirstLoad.current = false
            }
            resourceService.getById(resourceItem?.id)
                .then(data => {
                    setResourceData(data)
                })
                .catch(error => {
                    console.log("Error fetching companies: ", error);
                })
                .finally(() => {
                    setIsLoading(false)
                    isFirstLoad.current = false;
                })
        }, [])
    );

    return (
        <SafeAreaView className="flex-1">
            <View className="flex flex-row items-center justify-between gap-4 bg-primary h-[65px] px-5">
                <View className="flex flex-row items-center justify-between gap-1">
                    <TouchableOpacity onPress={() => navigation.goBack()} className="py-2 pr-3">
                        <ChevronLeft size={25} color={"#FFFFFF"}/>
                    </TouchableOpacity>
                    <Text className="font-poppinsLight text-white text-2xl">Resource Details</Text>
                </View>
                {userProfile.id === resourceData?.student?.id &&
                    <View>
                        <Menu
                            visible={isMenuVisible}
                            anchor={
                                <TouchableOpacity onPress={() => setIsMenuVisible(true)} disabled={isLoading}>
                                    <EllipsisVertical size={20} color={"#FFFFFF"}/>
                                </TouchableOpacity>
                            }
                            onRequestClose={() => setIsMenuVisible(false)}
                            style={{borderRadius: 7}}
                        >
                            <View className="flex flex-col min-h-fit pl-1 pr-2 py-1 rounded-xl">
                                <TouchableOpacity onPress={() => {
                                    setIsMenuVisible(false);
                                    navigation.navigate("SectionNavigator", {
                                        screen: "AddResourceScreen",
                                        params: {
                                            type: "edit",
                                            resourceItem: resourceData,
                                        }
                                    })
                                }} className="px-3 py-2 max-h-10">
                                    <View className="flex flex-row items-center justify-start gap-2">
                                        <Pencil size={14} color={"#374151"}/>
                                        <Text className="font-poppins text-black text-[15px]">
                                            Edit
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    setIsMenuVisible(false);
                                    setDeleteConfirmModalVisible(true);
                                }} className="px-3 py-2 max-h-10">
                                    <View className="flex flex-row items-center justify-start gap-2 text-red-600">
                                        <Trash2 size={14} color={"#dc2626"}/>
                                        <Text className="font-poppins text-black text-[15px]">
                                            Delete
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </Menu>
                    </View>
                }
            </View>

            <View className="bg-primary flex-1">
                <ScrollView className="bg-white flex-1 rounded-t-[30px]">
                    {!isLoading ?
                        <View
                            className="flex flex-col justify-start gap-2.5 border-b-[1px] border-gray-100 pb-4 mb-4 mx-4 mt-5">
                            <View className="flex flex-row items-start justify-between gap-4">
                                <TouchableOpacity className="flex flex-row items-center gap-4" onPress={() => {
                                    navigation.navigate("SectionNavigator", {
                                        screen: "AlumniDetailsScreen",
                                        params: {
                                            alumnusId: resourceData?.student?.id,
                                            type: userProfile.id === resourceData?.student?.id ? "myProfile" : "alumnus",
                                        }
                                    })
                                }}>
                                    <View
                                        className="flex items-center justify-center bg-primary rounded-full h-14 w-14">
                                        <Text
                                            className="text-white font-poppinsMedium">{resourceData?.student?.name?.slice(0, 1).toUpperCase() + resourceData?.student?.name?.split(' ')[1]?.slice(0, 1).toUpperCase()}</Text>
                                    </View>
                                    <View>
                                        <Text
                                            className="font-poppinsMedium text-lg">{resourceData?.student?.name}</Text>
                                        <Text className="font-poppinsLight text-gray-600">Batch
                                            of {resourceData?.student?.graduate_year}</Text>
                                    </View>
                                </TouchableOpacity>
                                <View className={`flex flex-col items-end gap-2 "mt-1"}`}>
                                    <Text
                                        className="font-poppins text-gray-500 text-[13px]">{formatDistanceToNow(new Date(new Date(resourceData?.updated_at || '').getTime() + 5.5 * 60 * 60 * 1000), { addSuffix: true })}</Text>
                                </View>
                            </View>
                            <View className="flex flex-row flex-wrap justify-start items-center gap-2">
                                {resourceData?.resourcekeywords?.map((tag, tagIndex) => (
                                    <View className="bg-primary/10 py-1 rounded-xl w-max px-3" key={tagIndex}>
                                        <Text className="text-[#006a63] font-poppins text-[13px]">{tag?.keyword}</Text>
                                    </View>
                                ))}
                            </View>
                            <View className="">
                                <Text className="font-poppins text-[17px]">{resourceData?.title}</Text>
                                <Text className="font-poppinsLight text-gray-700 mt-1 text-[15px]">
                                    {resourceData?.content}
                                </Text>
                            </View>
                        </View>
                        :
                        <View>
                            <ActivityIndicator size={30} color="#00b19f" className="mt-[4vh]"/>
                        </View>
                    }
                </ScrollView>
            </View>
            <ConfirmationModal visible={deleteConfirmModalVisible}
                               onClose={() => setDeleteConfirmModalVisible(false)}
                // title={`This will completely remove the post. Are you sure you want to delete it?`}
                               title={`You're about to permanently delete this post. Do you want to continue?`}
                               action={() => {
                                   setDeleting(true);
                                   resourceService.delete(resourceItem.id)
                                       .then(() => {
                                           navigation.goBack()
                                           Toast.show({
                                               type: 'success',
                                               text1: 'Resource deleted successfully',
                                           });
                                       })
                                       .catch((error) => {
                                           Toast.show({
                                               type: 'error',
                                               text1: 'Failed to delete resource',
                                               text2: error.message,
                                           });
                                       })
                                       .finally(() => {
                                           setDeleting(false);
                                           setDeleteConfirmModalVisible(false);
                                       });
                               }}
                               loading={deleting}/>
        </SafeAreaView>
    );
}
