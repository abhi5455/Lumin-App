import type React from "react"
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    StatusBar,
    TouchableWithoutFeedback,
    Dimensions,
    TextInput
} from "react-native"
import {ChevronDown, X} from "lucide-react-native";
import {useState} from "react";

interface IAvailableNumbersModalProps {
    visible: boolean
    onClose: () => void
    setAvailableNumbersModalVisible: (visible: boolean) => void
}

const { height: screenHeight } = Dimensions.get("window")

export default function CheckAvailabilityModal({ visible, onClose, setAvailableNumbersModalVisible }: IAvailableNumbersModalProps) {
    const [selectedCountry, setSelectedCountry] = useState('United Kingdom')

    return (
        <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
            <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0.5)" />

            {/* Modal Backdrop */}
            <TouchableWithoutFeedback onPress={onClose}>
                <View className="flex-1 bg-black/50 justify-end">
                    <TouchableWithoutFeedback onPress={() => {}}>
                        <View className="bg-white rounded-t-3xl" style={{ height: screenHeight * 0.75 }}>
                            {/* Top indicator */}
                            <View className="items-center pt-4 pb-2">
                                <View className="w-12 h-1 bg-gray-400 rounded-full" />
                            </View>

                            {/* Header */}
                            <View className="flex-row items-center justify-between px-4 py-1 mb-4">
                                <Text className="text-black text-xl font-poppinsSemiBold">Agent Settings</Text>
                                <TouchableOpacity onPress={onClose} className="p-2">
                                    <X size={24} color="#4b5563" />
                                </TouchableOpacity>
                            </View>

                            {/* Content */}
                            <View className="flex-1 px-6 mt-3">
                                <View className="mb-4">
                                    <Text className="text-base font-poppinsMedium text-primary mb-2">
                                        Country
                                    </Text>
                                    <View className="relative">
                                        <TextInput
                                            value={selectedCountry}
                                            className="border border-gray-200 rounded-xl px-4 py-4 pr-12 text-base font-poppinsMedium text-black bg-white"
                                            placeholder="USA"
                                        />
                                        <TouchableOpacity className="absolute right-4 top-4">
                                            <ChevronDown />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                            {/* Pay Now Button */}
                            <View className="px-6 pb-6">
                                <TouchableOpacity className={`bg-primary py-4 rounded-lg`} onPress={() => {
                                    onClose()
                                    setAvailableNumbersModalVisible(true)
                                }}>
                                    <Text className={`text-white text-center text-lg font-poppinsSemiBold`}>Check Availability</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}
