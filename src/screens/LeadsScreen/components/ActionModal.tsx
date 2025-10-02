import React, {useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    StatusBar,
    TouchableWithoutFeedback, ActivityIndicator,
} from 'react-native';
import axios from "axios";
import {BASE_URL} from "../../../../test";
import Toast from "react-native-toast-message";
import {ILead} from "../../../types/leads.ts";

interface ActionModalProps {
    visible: boolean;
    onClose: () => void;
    viewAction: () => void;
    lead: ILead | undefined
    setTriggerFetch?: (value: (prev) => any) => void
}

export default function ActionModal({visible, onClose, viewAction, lead, setTriggerFetch}: ActionModalProps) {
    const [isLoading, setIsLoading] = useState(false)

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

                            <View className="px-6 pb-8">
                                {/* View or Edit Button */}
                                <View className="mt-8">
                                    <TouchableOpacity
                                        className="bg-teal-600 py-4 rounded-lg"
                                        onPress={() => {
                                            viewAction()
                                        }}
                                        disabled={isLoading}
                                    >
                                        <Text className="text-white text-center text-lg font-poppinsSemiBold">View or
                                            Edit</Text>
                                    </TouchableOpacity>
                                </View>

                                {/* Delete Button */}
                                <View className="mt-5">
                                    <TouchableOpacity
                                        className="border-[1px] border-red-600 py-4 rounded-lg"
                                        disabled={isLoading}
                                        onPress={() => {
                                            setIsLoading(true)
                                            axios.delete(`${BASE_URL}/leads/${lead?._id}`)
                                                .then((res) => {
                                                    Toast.show({
                                                        type: 'success',
                                                        text1: 'Lead has been deleted',
                                                        position: "top"
                                                    });
                                                    if (setTriggerFetch) {
                                                        setTriggerFetch(prev => prev + 1)
                                                    }
                                                })
                                                .catch((err) => {
                                                    Toast.show({
                                                        type: 'error',
                                                        text1: 'Failed to delete lead!',
                                                        text2: err.message || '',
                                                        position: "top"
                                                    });
                                                })
                                                .finally(() => {
                                                    setIsLoading(false)
                                                })
                                                .finally(() => {
                                                    onClose()
                                                })
                                        }}
                                    >
                                        {!isLoading ?
                                            <Text
                                                className="text-red-500 text-center text-lg font-poppinsSemiBold">Delete</Text>
                                            : <ActivityIndicator color={'#ef4444'} size={25} className={''}/>
                                        }
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
