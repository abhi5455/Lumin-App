import React, {useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    Pressable,
} from 'react-native';

interface IChangePasswordModalProps {
    isModalVisible: boolean;
    onClose: () => void;
}

export default function ChangePasswordModal({isModalVisible, onClose}: IChangePasswordModalProps) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleSavePassword = () => {
        // Handle password save logic here
        console.log('Password saved');
        onClose();
    };

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
                        onPress={handleSavePassword}
                    >
                        <Text className="text-white text-center text-lg font-poppinsSemiBold">Save Password</Text>
                    </TouchableOpacity>
                </Pressable>
            </Pressable>
        </Modal>
    );
};
