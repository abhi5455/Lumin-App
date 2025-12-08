import {Text, TextInput, View} from "react-native";
import {Pencil, User} from "lucide-react-native";
import {IStudent} from "../../../types/type_student.ts";
import React, {useEffect} from "react";

export default function About({alumnus, updateAlumnus}: { alumnus: IStudent, updateAlumnus: () => void }) {
    const [aboutText, setAboutText] = React.useState(alumnus?.about || "");

    useEffect(() => {
        updateAlumnus('about', aboutText);
    }, [aboutText]);

    return (
        <>
            <View
                className="flex flex-col justify-center border-[1px] bg-gray-100/35 border-[#006a63]/50 rounded-xl p-2 mx-5 mt-5">
                <View className="flex flex-row items-center gap-3">
                    <View
                        className="flex justify-center items-center self-start mt-2 ml-2 bg-primary/10 w-12 h-12 rounded-full">
                        <User size={19} color={"#006a63"}/>
                    </View>

                    <View className="flex-1">
                        <Text className="font-poppinsMedium text-lg">
                            About
                        </Text>
                    </View>
                </View>

                <View
                    className="relative flex flex-row justify-start items-start bg-white border-[1px] border-gray-200 rounded-xl px-4 min-h-[100px] mt-3">
                    <View className="absolute top-[-2px] right-[-2px] bg-white rounded-full">
                        <Pencil size={12} color={"#6b7280"} strokeWidth={"2"}/>
                    </View>
                    <TextInput
                        placeholder={"Say about you"}
                        className="text-black flex-1 text-lg font-poppinsLight mt-1 -mb-1"
                        multiline={true}
                        placeholderTextColor={"#999999"}
                        value={aboutText}
                        onChangeText={setAboutText}
                    />
                </View>
            </View>
            <View className="min-h-[50px]"/>
        </>
    )
}
