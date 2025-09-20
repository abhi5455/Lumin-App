import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    StatusBar,
    TouchableWithoutFeedback,
} from 'react-native';
import {useAppNavigation} from "../../../common/navigationHelper.ts";

interface FilterModalProps {
    visible: boolean;
    onClose: () => void;
    onApply: () => void;
}

export default function ActionModal({ visible, onClose, onApply }: FilterModalProps) {
    const navigation = useAppNavigation();
    const [filterStates, setFilterStates] = useState({
        all: false,
        success: false,
        rejected: false,
        followUp: false,
    });

    const toggleFilter = (key: keyof typeof filterStates) => {
        setFilterStates(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleApply = () => {
        onApply();
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <StatusBar barStyle="dark-content" backgroundColor="rgba(0,0,0,0.5)" />

            {/* Modal Backdrop */}
            <TouchableWithoutFeedback onPress={onClose}>
                <View className="flex-1 bg-black/50 justify-end">
                    <TouchableWithoutFeedback onPress={() => {}}>
                        <View className="bg-white rounded-t-3xl">
                            {/* Top indicator */}
                            <View className="items-center pt-4 pb-2">
                                <View className="w-12 h-1 bg-gray-400 rounded-full" />
                            </View>

                            <View className="px-6 pb-8">
                                {/* View or Edit Button */}
                                <View className="mt-8">
                                    <TouchableOpacity
                                        className="bg-teal-600 py-4 rounded-lg"
                                        onPress={() => {
                                            onClose()
                                            navigation.navigate("SectionNavigator", {
                                                screen: "OutboundCallsScreen",
                                            });
                                        }}
                                    >
                                        <Text className="text-white text-center text-lg font-poppinsSemiBold">View or Edit</Text>
                                    </TouchableOpacity>
                                </View>

                                {/* Delete Button */}
                                <View className="mt-5">
                                    <TouchableOpacity
                                        className="border-[1px] border-red-600 py-4 rounded-lg"
                                        onPress={handleApply}
                                    >
                                        <Text className="text-red-500 text-center text-lg font-poppinsSemiBold">Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};
