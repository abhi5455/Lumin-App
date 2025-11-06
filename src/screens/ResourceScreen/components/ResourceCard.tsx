import {Text, TouchableOpacity, View} from "react-native";
import {EllipsisVertical} from "lucide-react-native";

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
    resourceItem: IResourceItem;
    type: string
}

export function ResourceCard({resourceItem, type}: ResourceCardProps) {
    console.log("Type ", type)
    return (
        <View
            className="flex flex-col justify-start gap-4 border-b-[1px] border-gray-100 pb-4 mb-4">
            <View className="flex flex-row items-start justify-between gap-4">
                <View className="flex flex-row items-center gap-4">
                    <View
                        className="flex items-center justify-center bg-primary rounded-full h-14 w-14">
                        <Text
                            className="text-white font-poppinsMedium">{resourceItem?.name.slice(0, 1).toUpperCase() + resourceItem?.name?.split(' ')[1]?.slice(0, 1).toUpperCase()}</Text>
                    </View>
                    <View>
                        <Text className="font-poppinsMedium text-lg">{resourceItem?.name}</Text>
                        <Text className="font-poppinsLight text-gray-600">Batch of {resourceItem?.batch}</Text>
                    </View>
                </View>
                <View className={`flex flex-col items-end gap-2 ${type !== "myContributions" && "mt-1"}`}>
                    {type === "myContributions" &&
                        <TouchableOpacity>
                            <EllipsisVertical size={18} color={"#374151"}/>
                        </TouchableOpacity>
                    }
                    <Text className="font-poppins text-gray-500 text-[13px]">{resourceItem?.timeAgo}</Text>
                </View>
            </View>
            <View className="flex flex-row flex-wrap justify-start items-center gap-2">
                {resourceItem?.tags.map((tag, tagIndex) => (
                    <View className="bg-primary/10 py-1 rounded-xl w-max px-3" key={tagIndex}>
                        <Text className="text-[#006a63] font-poppins text-[13px]">{tag}</Text>
                    </View>
                ))}
            </View>
            <View>
                <Text className="font-poppins text-lg">{resourceItem?.title}</Text>
                <Text className="font-poppinsLight text-gray-700 mt-1">{resourceItem?.content}</Text>
            </View>
        </View>
    );
}
