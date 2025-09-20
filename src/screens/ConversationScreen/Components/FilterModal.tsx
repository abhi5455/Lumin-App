import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    StatusBar,
    TouchableWithoutFeedback,
} from 'react-native';
import { Check, X } from 'lucide-react-native';

interface FilterModalProps {
    visible: boolean;
    onClose: () => void;
    onApply: () => void;
}

export default function FilterModal({ visible, onClose, onApply }: FilterModalProps) {
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

                            {/* Header with close button */}
                            <View className="flex-row items-center justify-between px-6 py-2">
                                <Text className="text-black text-xl font-poppinsSemiBold">Filter</Text>
                                <TouchableOpacity onPress={onClose} className="p-2">
                                    <X size={24} color="black" />
                                </TouchableOpacity>
                            </View>

                            <View className="px-6 pb-8">
                                {/* Filter Options */}
                                <View className="space-y-6 mt-4">
                                    <TouchableOpacity
                                        className="flex-row items-center justify-between py-4"
                                        onPress={() => toggleFilter('all')}
                                    >
                                        <Text className="text-black text-lg font-poppinsMedium">All</Text>
                                        <View className={`w-6 h-6 border-2 rounded items-center justify-center ${filterStates.all ? 'bg-teal-600 border-teal-600' : 'border-gray-300'}`}>
                                            {filterStates.all && (
                                                <Check size={16} color="white" />
                                            )}
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        className="flex-row items-center justify-between py-4"
                                        onPress={() => toggleFilter('success')}
                                    >
                                        <Text className="text-black text-lg font-poppinsMedium">Success</Text>
                                        <View className={`w-6 h-6 border-2 rounded items-center justify-center ${filterStates.success ? 'bg-teal-600 border-teal-600' : 'border-gray-300'}`}>
                                            {filterStates.success && (
                                                <Check size={16} color="white" />
                                            )}
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        className="flex-row items-center justify-between py-4"
                                        onPress={() => toggleFilter('rejected')}
                                    >
                                        <Text className="text-black text-lg font-poppinsMedium">Rejected</Text>
                                        <View className={`w-6 h-6 border-2 rounded items-center justify-center ${filterStates.rejected ? 'bg-teal-600 border-teal-600' : 'border-gray-300'}`}>
                                            {filterStates.rejected && (
                                                <Check size={16} color="white" />
                                            )}
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        className="flex-row items-center justify-between py-4"
                                        onPress={() => toggleFilter('followUp')}
                                    >
                                        <Text className="text-black text-lg font-poppinsMedium">Follow-Up Required</Text>
                                        <View className={`w-6 h-6 border-2 rounded items-center justify-center ${filterStates.followUp ? 'bg-teal-600 border-teal-600' : 'border-gray-300'}`}>
                                            {filterStates.followUp && (
                                                <Check size={16} color="white" />
                                            )}
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                {/* Apply Button */}
                                <View className="mt-8">
                                    <TouchableOpacity
                                        className="bg-teal-600 py-4 rounded-lg"
                                        onPress={handleApply}
                                    >
                                        <Text className="text-white text-center text-lg font-poppinsSemiBold">Apply</Text>
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
