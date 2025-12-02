import {Text, TouchableOpacity, View} from "react-native";
import {EllipsisVertical} from "lucide-react-native";
import {IResource} from "../../../types/type_resource.ts";
import {formatDistanceToNow} from "date-fns";
import {useAppNavigation} from "../../../common/navigationHelper.ts";

export interface IResourceItem {
    id: number;
    name: string;
    batch: string;
    timeAgo: string;
    tags: string[];
    title: string;
    content: string;
}

interface ResourceCardProps {
    resourceItem: IResource;
    type: string
}

export function ResourceCard({resourceItem, type}: ResourceCardProps) {
    const navigation = useAppNavigation();
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const userProfile = getUserProfile();

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
                        <TouchableOpacity>
                            <EllipsisVertical size={18} color={"#374151"}/>
                        </TouchableOpacity>
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
            <View className="mt-[-2px]a">
                <Text className="font-poppins text-[17px]">{resourceItem?.title}</Text>
                <Text className="font-poppinsLight text-gray-700 mt-1 text-[15px]">{resourceItem?.content}</Text>
            </View>
        </View>
    );
}
