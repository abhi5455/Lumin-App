import React, {useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import PencilIcon from '../../assets/svg/PencilIcon.svg'
import BackIcon from "../../assets/svg/BackIconBlack.svg";
import {useAppNavigation} from "../../common/navigationHelper.ts";
import ChangePasswordModal from "./ChangePasswordModal.tsx";
import {IUserProfile} from "../../types/profile.ts";
import {getUserProfile} from "../../lib/userStorage.ts";
import {format} from "date-fns";

export default function AccountInfoScreen() {
    const navigation = useAppNavigation();
    const [userProfile, setUserProfile] = useState<IUserProfile | undefined>(getUserProfile());
    const [isChangePasswordModalVisible, setIsChangePasswordModalVisible] = useState(false);

    return (
        <View className="flex-1 bg-white">
            {/* Header */}
            <View className="bg-white px-6 py-5">
                <View className="flex-row items-center">
                    <TouchableOpacity
                        className="mr-4 text-black"
                        onPress={() => navigation.goBack()}
                    >
                        <BackIcon color={'#000'}/>
                    </TouchableOpacity>
                    <Text className="text-lg font-poppinsSemiBold">Account Information</Text>
                </View>
            </View>

            <ScrollView className="flex-1 px-6">
                {/* Profile Section */}
                <View className="flex items-center justify-center pb-6 border-b border-gray-100">
                    <View className="w-24 h-24 bg-teal-600 rounded-full items-center justify-center">
                        <Text className="text-white text-4xl font-poppinsSemiBold">{userProfile?.name.slice(0,1).toUpperCase()}</Text>
                    </View>
                    <Text className="text-black text-xl font-poppinsSemiBold mt-2">{userProfile?.name}</Text>
                    <Text className="text-gray-400 text-sm font-poppinsMedium">{userProfile?.company?.name}</Text>
                </View>

                {/* Personal Information */}
                <View className="py-6">
                    {/* Email */}
                    <View className="mb-6">
                        <Text
                            className="text-gray-400 text-xs font-poppinsMedium uppercase tracking-wide mb-2">EMAIL</Text>
                        <View className="flex-row items-center justify-between">
                            <Text className="text-black text-base font-poppinsMedium">{userProfile?.email}</Text>
                            <TouchableOpacity>
                                <PencilIcon/>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Mobile */}
                    <View className="mb-6">
                        <Text
                            className="text-gray-400 text-xs font-poppinsMedium uppercase tracking-wide mb-2">MOBILE</Text>
                        <View className="flex-row items-center justify-between">
                            <Text className="text-black text-base font-poppinsMedium">+912545788</Text>
                            <TouchableOpacity>
                                <PencilIcon/>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Designation */}
                    <View className="mb-6">
                        <Text
                            className="text-gray-400 text-xs font-poppinsMedium uppercase tracking-wide mb-2">DESIGNATION</Text>
                        <View className="flex-row items-center justify-between">
                            <Text className="text-black text-base font-poppinsMedium">{userProfile?.designation}</Text>
                            <TouchableOpacity>
                                <PencilIcon/>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Date */}
                    <View className="mb-8">
                        <Text
                            className="text-gray-400 text-xs font-poppinsMedium uppercase tracking-wide mb-2">DATE</Text>
                        <View className="flex-row items-center justify-between">
                            <Text className="text-black text-base font-poppinsMedium">{format(new Date(userProfile?.createdAt || ''), "dd-MM-yyyy")}</Text>
                            <TouchableOpacity>
                                <PencilIcon/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Billing Address Section */}
                <View className="py-4">
                    <Text className="text-black text-lg font-poppinsSemiBold mb-6">Billing Address</Text>

                    {/* Recipient Name */}
                    <View className="mb-6">
                        <Text className="text-gray-400 text-xs font-poppinsMedium uppercase tracking-wide mb-2">RECIPIENT
                            NAME</Text>
                        <View className="flex-row items-center justify-between">
                            <Text className="text-black text-base font-poppinsMedium">{userProfile?.name}</Text>
                            <TouchableOpacity>
                                <PencilIcon/>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Address Line 1 */}
                    <View className="mb-6">
                        <Text className="text-gray-400 text-xs font-poppinsMedium uppercase tracking-wide mb-2">ADDRESS
                            LINE 1</Text>
                        <View className="flex-row items-center justify-between">
                            <Text className="text-black text-base font-poppinsMedium">{userProfile?.company?.address}</Text>
                            <TouchableOpacity>
                                <PencilIcon/>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Address Line 2 */}
                    <View className="mb-6">
                        <Text className="text-gray-400 text-xs font-poppinsMedium uppercase tracking-wide mb-2">ADDRESS
                            LINE 2</Text>
                        <View className="flex-row items-center justify-between">
                            <Text className="text-black text-base font-poppinsMedium">Apt 4B</Text>
                            <TouchableOpacity>
                                <PencilIcon/>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Pin Code */}
                    <View className="mb-6">
                        <Text className="text-gray-400 text-xs font-poppinsMedium uppercase tracking-wide mb-2">PIN
                            CODE/ZIP CODE</Text>
                        <View className="flex-row items-center justify-between">
                            <Text className="text-black text-base font-poppinsMedium">{userProfile?.company?.zipCode}</Text>
                            <TouchableOpacity>
                                <PencilIcon/>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* State */}
                    <View className="mb-8">
                        <Text
                            className="text-gray-400 text-xs font-poppinsMedium uppercase tracking-wide mb-2">STATE</Text>
                        <View className="flex-row items-center justify-between">
                            <Text className="text-black text-base font-poppinsMedium">{userProfile?.company?.state}</Text>
                            <TouchableOpacity>
                                <PencilIcon/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Change Password Button */}
            <TouchableOpacity className="bg-primary mx-6 mb-8 mt-1 py-4 rounded-xl"
            onPress={() => setIsChangePasswordModalVisible(true)}>
                <Text className="text-white text-center text-lg font-poppinsSemiBold">Change Password</Text>
            </TouchableOpacity>

            <ChangePasswordModal isModalVisible={isChangePasswordModalVisible} onClose={ ()=> setIsChangePasswordModalVisible(false)}/>
        </View>
    );
};
