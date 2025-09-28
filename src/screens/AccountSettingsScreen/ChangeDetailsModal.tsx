import React, {useCallback, useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    Pressable, ActivityIndicator,
} from 'react-native';
import Toast from "react-native-toast-message";
import {useFocusEffect} from "@react-navigation/native";

interface IChangePasswordModalProps {
    isModalVisible: boolean;
    onClose: () => void;
    changeData: string;
    changeDataLabel: string;
}

export default function ChangeDetailsModal({isModalVisible, onClose, changeData, changeDataLabel}: IChangePasswordModalProps) {
    const [currentValue, setCurrentValue] = useState(changeData);
    const [isLoading, setIsLoading] = useState(false);
    console.log("xyz ", changeData, currentValue)

    useFocusEffect(
        useCallback(() => {
            console.log("Test ",changeData)
            setCurrentValue(changeData)
            console.log("Test Current ", currentValue)
        }, [])
    );


    return (
        <Modal
            visible={isModalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <Pressable
                className="flex-1 bg-black/50 justify-end"
                onPress={onClose}
            >
                <Pressable
                    className="bg-white rounded-t-3xl px-6 py-4"
                    onPress={(e) => e.stopPropagation()}
                >
                    {/* Modal Handle */}
                    <View className="items-center mb-6">
                        <View className="w-12 h-1 bg-gray-300 rounded-full"></View>
                    </View>

                    {/* Edit Field */}
                    <View className="mb-6">
                        <Text className="text-black text-base font-poppinsSemiBold mb-3">{changeDataLabel.split(".").pop()?.replace(/^\w/, (c) => c.toUpperCase()) ?? ""}</Text>
                        <TextInput
                            value={currentValue}
                            onChangeText={setCurrentValue}
                            className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-4 text-black font-poppinsMedium text-base"
                            placeholder="Enter current value"
                            placeholderTextColor="#9CA3AF"
                            secureTextEntry={false}
                        />
                    </View>

                    {/* Save Button */}
                    <TouchableOpacity
                        className="bg-primary rounded-lg py-4 mb-4"
                        onPress={() => {
                            setIsLoading(true);
                            Toast.show({
                                type: 'error',
                                text1: 'Error',
                                text2: 'Something went wrong',
                            })
                            onClose()
                            setIsLoading(false)
                        }}
                    >
                        {!isLoading ?
                            <Text className="text-white text-center text-lg font-poppinsSemiBold">Save data</Text>
                            :
                            <ActivityIndicator color={'#FFF'} size={25} className={''}/>
                        }
                    </TouchableOpacity>
                </Pressable>
            </Pressable>
        </Modal>
    );
};
