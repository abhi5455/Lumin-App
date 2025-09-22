import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import {useAppNavigation} from "../../common/navigationHelper.ts";
import BackIcon from '../../assets/svg/BackIconBlack.svg'
import PersonIcon from '../../assets/svg/PersonIcon.svg'
import TransactionIcon from '../../assets/svg/TransactionIcon.svg'
import SubscriptionIcon from '../../assets/svg/SubscriptionIcon.svg'
import TOSIcon from '../../assets/svg/TOSIcon.svg'
import PrivacyIcon from '../../assets/svg/PrivacyIcon.svg'
import RefundIcon from '../../assets/svg/RefundIcon.svg'
import LogoutIcon from '../../assets/svg/LogoutIcon.svg'
import EnterpriseIcon from '../../assets/svg/EnterpriseIcon.svg'
import {ArrowRight} from "lucide-react-native";
import {storage} from "../../lib/storage.ts";

export default function AccountSettingsScreen(){
    const navigation = useAppNavigation();
    const menuItems = [
        { id: 1, title: 'My Account', icon: <PersonIcon/> , action: () => navigation.navigate('SectionNavigator', {screen: 'AccountInfoScreen'})},
        { id: 2, title: 'Transaction history', icon: <TransactionIcon/> },
        { id: 3, title: 'Subscription', icon: <SubscriptionIcon/>},
        { id: 4, title: 'Terms of service', icon: <TOSIcon/> },
        { id: 5, title: 'Privacy Policy', icon: <PrivacyIcon/> },
        { id: 6, title: 'Refund Policy', icon: <RefundIcon/> },
        { id: 7, title: 'Log Out', icon: <LogoutIcon/>, action: () => {
                // Clear auth token and navigate to Auth screen
                storage.set('authToken', '');
                navigation.goBack()
                navigation.goBack()
                navigation.navigate('AuthenticationStack', {screen: 'AuthScreen'});
            }},
    ];

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
                    <Text className="text-lg font-poppinsSemiBold">Account Settings</Text>
                </View>
            </View>

            <ScrollView className="flex-1 px-6">
                {/* Profile Section */}
                <View className="flex-row items-center justify-between py-5 border-y border-gray-100">
                    <View className="flex-row items-center">
                        <View className="w-12 h-12 bg-teal-600 rounded-full items-center justify-center mr-4">
                            <Text className="text-white text-lg font-poppinsSemiBold">A</Text>
                        </View>
                        <View>
                            <Text className="text-black text-lg font-poppinsSemiBold">Adam Smith</Text>
                            <Text className="text-gray-500 text-sm font-poppinsLight">Sony Pictures</Text>
                        </View>
                    </View>
                    <View className="flex flex-row justify-center items-center gap-2 bg-gray-800 rounded-lg px-3 py-2">
                        <EnterpriseIcon/>
                        <Text className="text-white text-sm font-poppinsMedium">Enterprise</Text>
                    </View>
                </View>

                {/* Menu Items */}
                <View className="py-4">
                    {menuItems.map((item, index) => (
                        <TouchableOpacity
                            key={item.id}
                            className="flex-row items-center justify-between py-4 border-b border-gray-50"
                            onPress={item?.action}
                        >
                            <View className="flex-row items-center">
                                <View className="flex items-center justify-center h-10 mr-4">
                                    {item.icon}
                                </View>
                                <Text className="text-black text-md font-poppinsMedium">{item.title}</Text>
                            </View>
                            <ArrowRight size={20} color="#9ca3af"/>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

