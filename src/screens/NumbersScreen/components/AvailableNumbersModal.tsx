import type React from "react"
import { useState } from "react"
import { View, Text, TouchableOpacity, Modal, StatusBar, TouchableWithoutFeedback, Dimensions } from "react-native"
import {X} from "lucide-react-native";

interface IAvailableNumbersModalProps {
    visible: boolean
    onClose: () => void
}

const { height: screenHeight } = Dimensions.get("window")

export default function AvailableNumbersModal({ visible, onClose }: IAvailableNumbersModalProps) {
    const [selectedNumber, setSelectedNumber] = useState<string>()

    const numbers = [
        { id: 1, number: "+1-987-654-3210", price: "$15/month" },
        { id: 2, number: "+1-987-654-3215", price: "$15/month" },
    ]

    const handlePayNow = () => {
        onClose()
    }

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
                                <Text className="text-black text-xl font-poppinsSemiBold">Available Numbers</Text>
                                <TouchableOpacity onPress={onClose} className="p-2">
                                    <X size={24} color="#4b5563" />
                                </TouchableOpacity>
                            </View>

                            {/* Content */}
                            <View className="flex-1 px-6 mt-3">

                                {/* Number Options */}
                                <View className="flex flex-col gap-4">
                                    {numbers.map((item, index) => (
                                        <TouchableOpacity
                                            key={item.id}
                                            onPress={() => setSelectedNumber(item.number)}
                                            className={`p-4 rounded-lg flex-row justify-between items-center ${
                                                selectedNumber === item.number
                                                    ? "bg-primary"
                                                    : "bg-gray-100 border border-gray-200"
                                            }`}
                                        >
                                            <Text
                                                className={`text-base font-poppinsMedium ${
                                                    selectedNumber === item.number ? "text-white" : "text-gray-600"
                                                }`}
                                            >
                                                {item.number}
                                            </Text>
                                            <Text
                                                className={`text-base font-poppinsMedium ${
                                                    selectedNumber === item.number ? "text-white" : "text-primary"
                                                }`}
                                            >
                                                {item.price}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                            {/* Pay Now Button */}
                            <View className="px-6 pb-6">
                                <TouchableOpacity className={`${selectedNumber ? "bg-primary" : "bg-gray-300"} py-4 rounded-lg`} onPress={handlePayNow} disabled={!selectedNumber} >
                                    <Text className={`text-white ${selectedNumber ? "text-white" : "text-gray-700"} text-center text-lg font-poppinsSemiBold`}>Pay now</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}
