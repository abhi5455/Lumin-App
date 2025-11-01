import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    StatusBar,
    TouchableWithoutFeedback,
} from 'react-native';
import {Check, X} from 'lucide-react-native';

interface FilterModalProps {
    visible: boolean;
    onClose: () => void;
    onApply: () => void;
    from?: string
    setSelectedFilter: (filters: any) => void;
}

export default function FilterModal({visible, onClose, onApply, from, setSelectedFilter}: FilterModalProps) {
    const [filterStates, setFilterStates] = useState<any>({
        all: false,
        success: false,
        rejected: false,
        followUp: false,
    });

    const toggleFilter = (key: keyof typeof filterStates) => {
        setFilterStates(prev =>
            Object.fromEntries(
                Object.keys(prev).map(k => [k, k === key])
            ) as typeof filterStates
        );
    };

    const handleApply = () => {
        onApply();
        setSelectedFilter(
            Object.keys(filterStates)
                .find(key => filterStates[key])
                ?.replace(/([A-Z])/g, '-$1')
                .toLowerCase()
        );
        console.log(Object.keys(filterStates)
            .find(key => filterStates[key])
            ?.replace(/([A-Z])/g, '-$1')
            .toLowerCase())
        onClose();
    };

    const [labels, setLabels] = useState(Object.keys(filterStates));
    useEffect(() => {
        console.log("From in Filter Modal: ", from);
        if (from === 'LeadsScreen') {
            setFilterStates(
                {
                    all: false,
                    new: false,
                    contacted: false,
                    inProgress: false,
                    converted: false,
                    lost: false,
                }
            )
            setLabels(['all', 'new', 'contacted', 'inProgress', 'converted', 'lost']);
        }
    }, [from]);

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
                                <Text className="text-black text-xl font-poppinsSemiBold">Filter</Text>
                                <TouchableOpacity onPress={onClose} className="p-2">
                                    <X size={24} color="black"/>
                                </TouchableOpacity>
                            </View>

                            <View className="px-6 pb-8">
                                {/* Filter Options */}
                                <View className="space-y-6 mt-4">
                                    {labels?.map(((label, index) => (
                                    <TouchableOpacity
                                        className="flex-row items-center justify-between py-4"
                                        onPress={() => toggleFilter(label)}
                                        key={index}
                                    >
                                        <Text className="text-black text-lg font-poppinsMedium">{label}</Text>
                                        <View
                                            className={`w-6 h-6 border-2 rounded items-center justify-center ${filterStates[label] ? 'bg-teal-600 border-teal-600' : 'border-gray-300'}`}>
                                            {filterStates[label] && (
                                                <Check size={16} color="white"/>
                                            )}
                                        </View>
                                    </TouchableOpacity>
                                    )))}
                                </View>

                                {/* Apply Button */}
                                <View className="mt-8">
                                    <TouchableOpacity
                                        className="bg-teal-600 py-4 rounded-lg"
                                        onPress={handleApply}
                                    >
                                        <Text
                                            className="text-white text-center text-lg font-poppinsSemiBold">Apply</Text>
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
