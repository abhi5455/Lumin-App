import {Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback, TextInput} from "react-native";
import {useEffect, useState} from "react";
import {X} from "lucide-react-native";
import {IStudent} from "../../../types/type_student.ts";

interface FilterModalProps {
    visible: boolean;
    onClose: () => void;
    alumnus: IStudent,
    updateAlumnus: () => void;
    editLabel: string;
}

export default function EditSocialModal({visible, onClose, alumnus, updateAlumnus, editLabel}: FilterModalProps) {
    const [url, setUrl] = useState(alumnus?.[editLabel] || "");
    const [errorFlag, setErrorFlag] = useState(false);

    useEffect(() => {
        setUrl(alumnus?.[editLabel] || "");
    }, [alumnus, editLabel]);

    console.log(alumnus, alumnus?.[editLabel], "Hello")

    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View className="flex-1 bg-black/50 justify-center items-center px-4">
                    <TouchableWithoutFeedback>
                        <View className="bg-white w-full rounded-[20px] pb-5">
                            <View className="flex flex-row justify-between items-center mb-4 px-7 mt-4">
                                <Text className="font-poppinsMedium text-xl text-center">Update {editLabel === "phone" ? "Phone number" : editLabel === "email" ? "Email Id" : `${editLabel.split('_')[0].replace(/^./, c => c.toUpperCase())} URL`}</Text>
                                <X size={20} color={"#999"} onPress={onClose}/>
                            </View>
                            <View
                                className={`flex flex-row justify-start items-center border ${errorFlag ? 'border-red-400' : 'border-gray-300'} rounded-xl px-4 mx-4`}>
                                <TextInput
                                    placeholder={`Enter ${editLabel}`} className="text-black flex-1 h-[50px] text-lg"
                                    placeholderTextColor={errorFlag ? "#f87171" : "#999999"}
                                    value={url}
                                    onChangeText={setUrl}
                                    keyboardType={editLabel === "phone" ? "phone-pad" : "default"}
                                />
                            </View>
                            <TouchableOpacity
                                className="bg-primary mx-5 mt-4 py-3 rounded-xl"
                                onPress={() => {
                                    updateAlumnus(editLabel, url)
                                    onClose();
                                }}
                            >
                                <Text className="text-white font-poppinsMedium text-center text-lg">Update</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}
