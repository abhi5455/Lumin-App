import {Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback, TextInput} from "react-native";
import {useEffect, useState} from "react";
import {X} from "lucide-react-native";

interface FilterModalProps {
    visible: boolean;
    onClose: () => void;
    setTags: (tags: string[]) => void;
}

export default function AddTagModal({visible, onClose, setTags}: FilterModalProps) {
    const [addedTag, setAddedTag] = useState<string>("");
    const [errorFlag, setErrorFlag] = useState(false);

    useEffect(() => {
        setErrorFlag(false)
    }, [addedTag]);

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
                                <Text className="font-poppinsMedium text-xl text-center">Add Tags</Text>
                                <X size={20} color={"#999"} onPress={onClose}/>
                            </View>
                            <View
                                className={`flex flex-row justify-start items-center border ${errorFlag ? 'border-red-400' : 'border-gray-300'} rounded-xl px-4 mx-4`}>
                                <TextInput
                                    placeholder={"Enter Tag Name"} className="text-black flex-1 h-[50px] text-lg"
                                    placeholderTextColor={errorFlag ? "#f87171" : "#999999"}
                                    value={addedTag}
                                    onChangeText={setAddedTag}
                                />
                            </View>
                            <TouchableOpacity
                                className="bg-primary mx-5 mt-4 py-3 rounded-xl"
                                onPress={() => {
                                    if (addedTag.trim() === "") {
                                        setErrorFlag(true);
                                        setAddedTag("");
                                        return;
                                    }
                                    // @ts-ignore
                                    setTags(prev => [...prev, addedTag.trim()]);
                                    setAddedTag("");
                                    onClose();
                                }}
                            >
                                <Text className="text-white font-poppinsMedium text-center text-lg">Add Tag</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}
