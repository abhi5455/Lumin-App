import {StatusBar, Text, TouchableOpacity, View} from "react-native";
import {EllipsisVertical, Pencil, Trash2} from "lucide-react-native";
import {IResource} from "../../../types/type_resource.ts";
import {formatDistanceToNow} from "date-fns";
import {useAppNavigation} from "../../../common/navigationHelper.ts";
import {Menu} from "react-native-material-menu";
import {useEffect, useState} from "react";
import {getUserProfile} from "../../../lib/userStorage.ts";
import ConfirmationModal from "../../ProfileScreen/ConfirmationModal.tsx";
import {resourceService} from "../../../services/resourceService.ts";
import Toast from "react-native-toast-message";

interface ResourceCardProps {
    resourceItem: IResource;
    type: string;
    setTriggerRefetch: () => void;
}

export function ResourceCard({resourceItem, type, setTriggerRefetch}: ResourceCardProps) {
    const navigation = useAppNavigation();
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [deleteConfirmModalVisible, setDeleteConfirmModalVisible] = useState(false);
    const userProfile = getUserProfile();

    useEffect(() => {
        StatusBar.setBarStyle('light-content')
        StatusBar.setBackgroundColor(deleteConfirmModalVisible ? '#01584f' : '#00b19f')
    }, [deleteConfirmModalVisible])

    const [isTruncated, setIsTruncated] = useState(false);
    const [measured, setMeasured] = useState(false);

    return (
        <View
            className="flex flex-col justify-start gap-2.5 border-b-[1px] border-gray-100 pb-4 mb-4">
            <View className="flex flex-row items-start justify-between gap-4">
                <TouchableOpacity className="flex flex-row items-center gap-4" onPress={() => {
                    navigation.navigate("SectionNavigator", {
                        screen: "AlumniDetailsScreen",
                        params: {
                            alumnusId: resourceItem?.student?.id,
                            type: userProfile.id === resourceItem?.student?.id ? "myProfile" : "alumnus",
                        }
                    })
                }}>
                    <View
                        className="flex items-center justify-center bg-primary rounded-full h-14 w-14">
                        <Text
                            className="text-white font-poppinsMedium">{resourceItem?.student?.name?.slice(0, 1).toUpperCase() + resourceItem?.student?.name?.split(' ')[1]?.slice(0, 1).toUpperCase()}</Text>
                    </View>
                    <View>
                        <Text className="font-poppinsMedium text-lg">{resourceItem?.student?.name}</Text>
                        <Text className="font-poppinsLight text-gray-600">Batch
                            of {resourceItem?.student?.graduate_year}</Text>
                    </View>
                </TouchableOpacity>
                <View className={`flex flex-col items-end gap-2 ${type !== "myContributions" && "mt-1"}`}>
                    {type === "myContributions" &&
                        <View>
                            <Menu
                                visible={isMenuVisible}
                                anchor={
                                    <TouchableOpacity onPress={() => setIsMenuVisible(true)}>
                                        <EllipsisVertical size={18} color={"#374151"}/>
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
                                                resourceItem: resourceItem,
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
                    <Text
                        className="font-poppins text-gray-500 text-[13px]">{formatDistanceToNow(new Date(resourceItem?.created_at || ''), {addSuffix: true})}</Text>
                </View>
            </View>
            <View className="flex flex-row flex-wrap justify-start items-center gap-2">
                {resourceItem?.resourcekeywords?.map((tag, tagIndex) => (
                    <View className="bg-primary/10 py-1 rounded-xl w-max px-3" key={tagIndex}>
                        <Text className="text-[#006a63] font-poppins text-[13px]">{tag?.keyword}</Text>
                    </View>
                ))}
            </View>
            <TouchableOpacity className="" onPress={()=>{
                navigation.navigate("SectionNavigator", {
                    screen: "ResourceDetailsScreen",
                    params: {
                        resourceItem: resourceItem,
                    }
                })
            }}
            disabled={!isTruncated}>
                <Text className="font-poppins text-[17px]">{resourceItem?.title}</Text>
                <Text className="font-poppinsLight text-gray-700 mt-1 text-[15px]"
                      numberOfLines={measured ? 11 : undefined}
                      onTextLayout={(e) => {
                          if (!measured) {
                              setIsTruncated(e.nativeEvent.lines.length > 11);
                              setMeasured(true);
                          }
                      }}>
                    {resourceItem?.content}
                </Text>
                {isTruncated &&
                    <TouchableOpacity onPress={()=>{
                        navigation.navigate("SectionNavigator", {
                            screen: "ResourceDetailsScreen",
                            params: {
                                resourceItem: resourceItem,
                            }
                        })
                    }}>
                        <Text className="font-poppins text-gray-800 text-[15px]">Read More...</Text>
                    </TouchableOpacity>
                }
            </TouchableOpacity>

            <ConfirmationModal visible={deleteConfirmModalVisible}
                               onClose={() => setDeleteConfirmModalVisible(false)}
                // title={`This will completely remove the post. Are you sure you want to delete it?`}
                               title={`You're about to permanently delete this post. Do you want to continue?`}
                               action={() => {
                                   setDeleting(true);
                                   resourceService.delete(resourceItem.id)
                                       .then(() => {
                                           setTriggerRefetch(prev => prev + 1);
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
        </View>
    );
}
