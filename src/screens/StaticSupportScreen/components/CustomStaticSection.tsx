import {Fragment} from "react";
import {Text, View} from "react-native";

export interface IStaticSectionInfo {
    title: string;
    content?: string;
    pointContent?: string[];
    subContent?: string[];
}

export default function CustomStaticSection({staticSectionInfo}: { staticSectionInfo: IStaticSectionInfo[] }) {
    return (
        <Fragment>
            {staticSectionInfo?.map((info, index) => (
                <View className="flex flex-col justify-center px-2 gap-1 mb-1" key={index}>
                    <Text
                        className="font-poppins text-[18px] text-[#006a63] mb-[-2px]">{info?.title}</Text>
                    {info?.content &&
                        <Text className="font-poppinsLight text-gray-700 text-[15px]">{info?.content}</Text>
                    }
                    <View className="flex flex-col justify-center pl-2">
                        {info?.pointContent && info?.pointContent.map((point, pointIndex) => (
                            <View className="flex flex-row items-start gap-2 pr-5" key={pointIndex}>
                                <View className="bg-[#006a63] w-[8px] h-[8px] rounded-full mt-2"/>
                                <Text className="font-poppinsLight text-gray-700 text-[15px]">{point}</Text>
                            </View>
                        ))}
                    </View>
                    <View className="flex flex-col justify-center pl-4">
                        {info?.subContent && info?.subContent.map((point, pointIndex) => (
                            <View className="flex flex-row items-start gap-2 pr-5" key={pointIndex}>
                                <View className="bg-gray-400 w-[6px] h-[6px] rounded-full mt-2"/>
                                <Text className="font-poppinsLight text-gray-700 text-[14px]">{point}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            ))}
        </Fragment>
    )
}
