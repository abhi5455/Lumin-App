import React, {useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    Pressable, ActivityIndicator,
} from 'react-native';
import Toast from "react-native-toast-message";
import {BASE_URL} from "../../../test";
import axios from "axios";

interface IChangePasswordModalProps {
    isModalVisible: boolean;
    onClose: () => void;
}

export default function ChangePasswordModal({isModalVisible, onClose}: IChangePasswordModalProps) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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

                    {/* Current Password */}
                    <View className="mb-6">
                        <Text className="text-black text-base font-poppinsSemiBold mb-3">Current Password</Text>
                        <TextInput
                            value={currentPassword}
                            onChangeText={setCurrentPassword}
                            className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-4 text-black font-poppinsMedium text-base"
                            placeholder="Enter current password"
                            placeholderTextColor="#9CA3AF"
                            secureTextEntry={false}
                        />
                    </View>

                    {/* New Password */}
                    <View className="mb-8">
                        <Text className="text-black text-base font-poppinsSemiBold mb-3">New Password</Text>
                        <TextInput
                            value={newPassword}
                            onChangeText={setNewPassword}
                            className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-4 text-black font-poppinsMedium text-base"
                            placeholder="Enter new password"
                            placeholderTextColor="#9CA3AF"
                            secureTextEntry={true}
                        />
                    </View>

                    {/* Save Button */}
                    <TouchableOpacity
                        className="bg-primary rounded-lg py-4 mb-4"
                        onPress={() => {
                            if (!currentPassword || !newPassword) {
                                Toast.show({
                                    type: 'error',
                                    text1: 'Error',
                                    text2: 'Please fill in all fields',
                                });
                                return;
                            }
                            setIsLoading(true);
                            axios.post(`${BASE_URL}/users/change-password`, {
                                new_password: newPassword,
                                old_password: currentPassword
                            })
                                .then((res) => {
                                    Toast.show({
                                        type: 'success',
                                        text1: 'Success',
                                        text2: 'Password changed successfully',
                                    });
                                    setCurrentPassword('');
                                    setNewPassword('');
                                    onClose();
                                }).catch((err) => {
                                Toast.show({
                                    type: 'error',
                                    text1: 'Error',
                                    text2: err.response?.data?.message || 'Something went wrong',
                                })
                            })
                                .finally(() => {
                                    setIsLoading(false);
                                    onClose()
                                })
                        }}
                    >
                        {!isLoading ?
                            <Text className="text-white text-center text-lg font-poppinsSemiBold">Save Password</Text>
                            :
                            <ActivityIndicator color={'#FFF'} size={25} className={''}/>
                        }
                    </TouchableOpacity>
                </Pressable>
            </Pressable>
        </Modal>
    );
};
