import {Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";

interface ConfirmModalProps {
    visible: boolean;
    onClose: () => void;
    action: () => void
}

export default function ConfirmationModal({visible, onClose, action}: ConfirmModalProps) {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            {/* Backdrop - tapping here closes modal */}
            <TouchableWithoutFeedback onPress={onClose}>
                <View className="flex-1 bg-black/50 justify-center px-5">

                    {/* Content area - tapping here does nothing, allows scrolling */}
                    <TouchableWithoutFeedback onPress={() => {
                    }}>
                        <View className="bg-white rounded-3xl overflow-hidden p-5 py-7 flex flex-col gap-7">
                            <Text className="text-[20px] text-black text-left font-poppins pl-2">
                                Are you sure you want to {`\n`}sign out?</Text>
                            <View className="flex flex-row justify-center items-center gap-4">
                                <TouchableOpacity
                                    className="bg-gray-300 py-3 rounded-xl flex flex-1 justify-center items-center"
                                    onPress={() => {
                                        onClose()
                                    }}>
                                    <Text className="text-lg font-poppins text-gray-700 text-center">
                                        Close
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className="bg-primary py-3 rounded-xl flex flex-1 justify-center items-center"
                                    onPress={() => {
                                        action()
                                    }}>
                                    <Text className="text-lg font-poppins text-white text-center">
                                        Confirm
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}
