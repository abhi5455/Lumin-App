import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import BackIcon from "../../assets/svg/BackIconBlack.svg";
import React from "react";
import {useAppNavigation} from "../../common/navigationHelper.ts";

export default function PrivacyPolicy() {
    const navigation = useAppNavigation();

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
                    <Text className="text-lg font-poppinsSemiBold">Refund Policy</Text>
                </View>
            </View>

            {/* Content */}
            <ScrollView className="flex-1 px-5 pb-6 pt-4">
                <View className="gap-6">
                    {/* Section 1 */}
                    <View className="gap-2">
                        <Text className="text-lg font-semibold text-primary">1. Introduction</Text>
                        <Text className="text-base text-gray-600 leading-6">
                            Convogents ("we", "us", "our", or "Company") operates the Convogents platform. This page informs you of
                            our policies regarding the collection, use, and disclosure of personal data when you use our service and
                            the choices you have associated with that data.
                        </Text>
                    </View>

                    {/* Section 2 */}
                    <View className="gap-2">
                        <Text className="text-lg font-semibold text-primary">2. Information Collection and Use</Text>
                        <Text className="text-base text-gray-600 leading-6">
                            We collect several different types of information for various purposes to provide and improve our service
                            to you.
                        </Text>
                        <View className="gap-3 mt-2">
                            <View className="gap-1">
                                <Text className="font-semibold text-primary">Personal Data:</Text>
                                <Text className="text-base text-gray-600 ml-2">
                                    Email address, first name and last name, phone number, address, state, province, ZIP/postal code,
                                    city, cookies and usage data
                                </Text>
                            </View>
                            <View className="gap-1">
                                <Text className="font-semibold text-primary">Usage Data:</Text>
                                <Text className="text-base text-gray-600 ml-2">
                                    Pages visited, time and date of visit, time spent on pages, and other diagnostic data
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Section 3 */}
                    <View className="gap-2">
                        <Text className="text-lg font-semibold text-primary">3. Use of Data</Text>
                        <Text className="text-base text-gray-600 leading-6">
                            Convogents uses the collected data for various purposes:
                        </Text>
                        <View className="gap-2 mt-2 ml-4">
                            <Text className="text-base text-gray-600">• To provide and maintain our service</Text>
                            <Text className="text-base text-gray-600">• To notify you about changes to our service</Text>
                            <Text className="text-base text-gray-600">
                                • To allow you to participate in interactive features of our service
                            </Text>
                            <Text className="text-base text-gray-600">• To provide customer support</Text>
                            <Text className="text-base text-gray-600">
                                • To gather analysis or valuable information so we can improve our service
                            </Text>
                            <Text className="text-base text-gray-600">• To monitor the usage of our service</Text>
                        </View>
                    </View>

                    {/* Section 4 */}
                    <View className="gap-2">
                        <Text className="text-lg font-semibold text-primary">4. Security of Data</Text>
                        <Text className="text-base text-gray-600 leading-6">
                            The security of your data is important to us but remember that no method of transmission over the Internet
                            or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to
                            protect your personal data, we cannot guarantee its absolute security.
                        </Text>
                    </View>

                    {/* Section 5 */}
                    <View className="gap-2">
                        <Text className="text-lg font-semibold text-primary">5. Changes to This Privacy Policy</Text>
                        <Text className="text-base text-gray-600 leading-6">
                            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                            Privacy Policy on this page and updating the "effective date" at the top of this Privacy Policy.
                        </Text>
                    </View>

                    {/* Section 6 */}
                    <View className="gap-2">
                        <Text className="text-lg font-semibold text-primary">6. Contact Us</Text>
                        <Text className="text-base text-gray-600 leading-6">
                            If you have any questions about this Privacy Policy, please contact us at support@convogents.com or
                            through our contact form on the platform.
                        </Text>
                    </View>

                    {/* Section 7 */}
                    <View className="gap-2">
                        <Text className="text-lg font-semibold text-primary">7. Your Rights</Text>
                        <Text className="text-base text-gray-600 leading-6">
                            You have the right to access, update, or delete the information we have on you. Whenever made possible,
                            you can access, update, or request deletion of your personal data directly within your account settings.
                            If you are unable to perform these actions yourself, please contact us to assist you.
                        </Text>
                    </View>

                    {/* Section 8 */}
                    <View className="gap-2 pb-6 mb-10">
                        <Text className="text-lg font-semibold text-primary">8. Data Retention</Text>
                        <Text className="text-base text-gray-600 leading-6">
                            Convogents will retain your personal data only for as long as necessary for the purposes set out in this
                            Privacy Policy. We will retain and use your personal data to the extent necessary to comply with our legal
                            obligations.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
