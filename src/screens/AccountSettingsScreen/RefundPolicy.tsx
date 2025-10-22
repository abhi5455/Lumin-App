import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import BackIcon from "../../assets/svg/BackIconBlack.svg";
import React from "react";
import {useAppNavigation} from "../../common/navigationHelper.ts";

export default function RefundPolicy() {
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
                        <Text className="text-lg font-semibold text-primary">1. Refund Eligibility</Text>
                        <Text className="text-base text-gray-600 leading-6">
                            Convogents offers refunds for subscription plans within 30 days of purchase if you are not satisfied with
                            our service. To be eligible for a refund, you must request it within this 30-day window from the date of
                            your initial purchase.
                        </Text>
                    </View>

                    {/* Section 2 */}
                    <View className="gap-2">
                        <Text className="text-lg font-semibold text-primary">2. How to Request a Refund</Text>
                        <Text className="text-base text-gray-600 leading-6">
                            To request a refund, please contact our support team at support@convogents.com with your account details
                            and reason for the refund request. Our team will review your request and respond within 5 business days.
                        </Text>
                    </View>

                    {/* Section 3 */}
                    <View className="gap-2">
                        <Text className="text-lg font-semibold text-primary">3. Refund Processing</Text>
                        <Text className="text-base text-gray-600 leading-6">
                            Once your refund request is approved, the refund will be processed to your original payment method. Please
                            allow 5-10 business days for the refund to appear in your account, depending on your financial
                            institution.
                        </Text>
                    </View>

                    {/* Section 4 */}
                    <View className="gap-2">
                        <Text className="text-lg font-semibold text-primary">4. Non-Refundable Items</Text>
                        <Text className="text-base text-gray-600 leading-6">The following are non-refundable:</Text>
                        <View className="gap-2 mt-2 ml-4">
                            <Text className="text-base text-gray-600">• Purchases made more than 30 days ago</Text>
                            <Text className="text-base text-gray-600">• Subscription renewals after the initial billing period</Text>
                            <Text className="text-base text-gray-600">• Add-on services or premium features already utilized</Text>
                            <Text className="text-base text-gray-600">• Refunds requested due to user error or misunderstanding</Text>
                        </View>
                    </View>

                    {/* Section 5 */}
                    <View className="gap-2">
                        <Text className="text-lg font-semibold text-primary">5. Subscription Cancellation</Text>
                        <Text className="text-base text-gray-600 leading-6">
                            You can cancel your subscription at any time through your account settings. Upon cancellation, you will
                            retain access to your subscription until the end of your current billing period. No refunds will be issued
                            for partial months.
                        </Text>
                    </View>

                    {/* Section 6 */}
                    <View className="gap-2">
                        <Text className="text-lg font-semibold text-primary">6. Exceptions and Special Cases</Text>
                        <Text className="text-base text-gray-600 leading-6">
                            Convogents reserves the right to make exceptions to this refund policy on a case-by-case basis. If you
                            believe your situation warrants an exception, please contact our support team with detailed information
                            about your case.
                        </Text>
                    </View>

                    {/* Section 7 */}
                    <View className="gap-2">
                        <Text className="text-lg font-semibold text-primary">7. Billing Issues</Text>
                        <Text className="text-base text-gray-600 leading-6">
                            If you notice any unauthorized charges or billing errors, please contact us immediately at
                            support@convogents.com. We will investigate and resolve billing disputes promptly.
                        </Text>
                    </View>

                    {/* Section 8 */}
                    <View className="gap-2">
                        <Text className="text-lg font-semibold text-primary">8. Changes to Refund Policy</Text>
                        <Text className="text-base text-gray-600 leading-6">
                            Convogents reserves the right to modify this refund policy at any time. Changes will be effective
                            immediately upon posting to the platform. Your continued use of the service constitutes acceptance of the
                            updated policy.
                        </Text>
                    </View>

                    {/* Section 9 */}
                    <View className="gap-2 pb-6 mb-10">
                        <Text className="text-lg font-semibold text-primary">9. Contact Support</Text>
                        <Text className="text-base text-gray-600 leading-6">
                            For any questions regarding our refund policy or to initiate a refund request, please reach out to our
                            support team at support@convogents.com or call +1-800-CONVOGENTS. We're here to help!
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
