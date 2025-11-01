import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    StatusBar,
    TouchableWithoutFeedback,
} from 'react-native';
import {Trash2} from 'lucide-react-native';
import {IPhoneNumber} from "../../../types/numbers.ts";
import {countryToFlag} from "../../../lib/countryToFlag.ts";

interface IViewDetailsModalProps {
    visible: boolean;
    onClose: () => void;
    onApply: () => void;
    number: IPhoneNumber
}

export default function ViewDetailsModal({visible, onClose, onApply, number}: IViewDetailsModalProps) {

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <StatusBar barStyle="dark-content" backgroundColor="rgba(0,0,0,0.5)"/>

            {/* Modal Backdrop */}
            <TouchableWithoutFeedback onPress={onClose}>
                <View className="flex-1 bg-black/50 justify-end">
                    <TouchableWithoutFeedback onPress={() => {
                    }}>
                        <View className="bg-white rounded-t-3xl">
                            {/* Top indicator */}
                            <View className="items-center pt-4 pb-2">
                                <View className="w-12 h-1 bg-gray-400 rounded-full"/>
                            </View>

                            {/* Header with close button */}
                            <View className="flex-row items-center justify-between px-6 py-2">
                                <Text className="text-black text-xl font-poppinsSemiBold">Number Details</Text>
                                <TouchableOpacity onPress={onClose} className="p-2">
                                    <Trash2 size={24} color="#b91c1c"/>
                                </TouchableOpacity>
                            </View>

                            <View className="flex flex-row justify-between items-center gap-2 px-6 pb-8 mt-4">
                                {/* Filter Options */}
                                <View className="flex flex-row gap-2 items-center">
                                    <Text
                                        className="text-red-500 font-poppinsMedium mr-2">{countryToFlag(number?.country)}</Text>
                                    <Text className="font-poppinsMedium text-black text-base">
                                        {number?.number}
                                    </Text>
                                </View>
                                <Text className="font-poppinsMedium text-primary text-base">
                                    ${number?.monthlyCost}/month
                                </Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};
