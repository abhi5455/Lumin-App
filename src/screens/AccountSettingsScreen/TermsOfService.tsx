import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import BackIcon from "../../assets/svg/BackIconBlack.svg";
import React from "react";
import {useAppNavigation} from "../../common/navigationHelper.ts";

export default function TermsOfServices() {
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
                    <Text className="text-lg font-poppinsSemiBold">Terms of Services</Text>
                </View>
            </View>

            {/* Content */}
            <ScrollView className="flex-1 px-5 pb-6 pt-4">
                <View className="gap-6">
                    {/* Section 1 */}
                    <View className="gap-2">
                        <Text className="text-lg font-semibold text-primary">1. Acceptance of Terms</Text>
                        <Text className="text-base text-gray-600 leading-6">
                            By accessing and using the Convogents platform, you accept and agree to be bound by the terms and
                            provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                        </Text>
                    </View>

                    {/* Section 2 */}
                    <View className="gap-2">
                        <Text className="text-lg font-semibold text-primary">2. Use License</Text>
                        <Text className="text-base text-gray-600 leading-6">
                            Permission is granted to temporarily download one copy of the materials (information or software) on
                            Convogents for personal, non-commercial transitory viewing only. This is the grant of a license, not a
                            transfer of title, and under this license you may not:
                        </Text>
                        <View className="gap-2 mt-2 ml-4">
                            <Text className="text-base text-gray-600">• Modifying or copying the materials</Text>
                            <Text className="text-base text-gray-600">
                                • Using the materials for any commercial purpose or for any public display
                            </Text>
                            <Text className="text-base text-gray-600">
                                • Attempting to decompile or reverse engineer any software contained on the platform
                            </Text>
                            <Text className="text-base text-gray-600">
                                • Removing any copyright or other proprietary notations from the materials
                            </Text>
                        </View>
                    </View>

                    {/* Section 3 */}
                    <View className="gap-2">
                        <Text className="text-lg font-semibold text-primary">3. Disclaimer</Text>
                        <Text className="text-base text-gray-600 leading-6">
                            The materials on Convogents are provided on an 'as is' basis. Convogents makes no warranties, expressed or
                            implied, and hereby disclaims and negates all other warranties including, without limitation, implied
                            warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of
                            intellectual property or other violation of rights.
                        </Text>
                    </View>

                    {/* Section 4 */}
                    <View className="gap-2">
                        <Text className="text-lg font-semibold text-primary">4. Limitations</Text>
                        <Text className="text-base text-gray-600 leading-6">
                            In no event shall Convogents or its suppliers be liable for any damages (including, without limitation,
                            damages for loss of data or profit, or due to business interruption) arising out of the use or inability
                            to use the materials on Convogents.
                        </Text>
                    </View>

                    {/* Section 5 */}
                    <View className="gap-2">
                        <Text className="text-lg font-semibold text-primary">5. Accuracy of Materials</Text>
                        <Text className="text-base text-gray-600 leading-6">
                            The materials appearing on Convogents could include technical, typographical, or photographic errors.
                            Convogents does not warrant that any of the materials on the platform are accurate, complete, or current.
                            Convogents may make changes to the materials contained on the platform at any time without notice.
                        </Text>
                    </View>

                    {/* Section 6 */}
                    <View className="gap-2">
                        <Text className="text-lg font-semibold text-primary">6. Links</Text>
                        <Text className="text-base text-gray-600 leading-6">
                            Convogents has not reviewed all of the sites linked to its website and is not responsible for the contents
                            of any such linked site. The inclusion of any link does not imply endorsement by Convogents of the site.
                            Use of any such linked website is at the user's own risk.
                        </Text>
                    </View>

                    {/* Section 7 */}
                    <View className="gap-2">
                        <Text className="text-lg font-semibold text-primary">7. Modifications</Text>
                        <Text className="text-base text-gray-600 leading-6">
                            Convogents may revise these terms of service for the platform at any time without notice. By using this
                            platform, you are agreeing to be bound by the then current version of these terms of service.
                        </Text>
                    </View>

                    {/* Section 8 */}
                    <View className="gap-2 pb-6 mb-10">
                        <Text className="text-lg font-semibold text-primary">8. Governing Law</Text>
                        <Text className="text-base text-gray-600 leading-6">
                            These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction
                            in which Convogents operates, and you irrevocably submit to the exclusive jurisdiction of the courts in
                            that location.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
