import {ActivityIndicator, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import React from "react";

interface ConfirmModalProps {
    visible: boolean;
    onClose: () => void;
    title: string;
    action: () => void;
    loading: boolean;
}

export default function ConfirmationModal({visible, onClose, title, action, loading = false}: ConfirmModalProps) {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View className="flex-1 bg-black/50 justify-center px-5">
                    <TouchableWithoutFeedback onPress={() => {
                    }}>
                        <View className="bg-white rounded-3xl overflow-hidden p-5 py-6 flex flex-col gap-5">
                            <Text className="text-[18px] text-black text-left font-poppins pl-2">
                                {title}</Text>
                            <View className="flex flex-row justify-center items-center gap-4">
                                <TouchableOpacity
                                    className="bg-gray-300 py-3 rounded-xl flex flex-1 justify-center items-center"
                                    onPress={() => {
                                        onClose()
                                    }}
                                    disabled={loading ? loading : false}>
                                    <Text className="text-lg font-poppins text-gray-700 text-center">
                                        Close
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className="bg-primary py-3 rounded-xl flex flex-1 justify-center items-center"
                                    onPress={() => {
                                        action()
                                    }}
                                    disabled={loading ? loading : false}>
                                    {!loading ?
                                        <Text className="text-lg font-poppins text-white text-center">
                                            Confirm
                                        </Text>
                                        :
                                        <ActivityIndicator color={'#FFF'} size={25} className={''}/>
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}
