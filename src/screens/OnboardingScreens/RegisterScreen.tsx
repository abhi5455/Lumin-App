import React, {useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import {ChevronDown, Info} from "lucide-react-native";

interface FormData {
    companyName: string;
    companyAddress: string;
    state: string;
    country: string;
    pinCode: string;
    registrationNumber: string;
    businessCode: string;
    aboutCompany: string;
}

const RegisterScreen: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        companyName: '',
        companyAddress: '',
        state: '',
        country: '',
        pinCode: '',
        registrationNumber: '',
        businessCode: '',
        aboutCompany: '',
    });

    const updateFormData = (field: keyof FormData, value: string) => {
        setFormData(prev => ({...prev, [field]: value}));
    };

    const handleNext = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }
    };

    const renderProgressBar = () => (
        <View className="flex-row gap-2 mb-8">
            {[1, 2, 3].map((step) => (
                <View
                    key={step}
                    className={`h-1 flex-1 rounded-full max-w-[50px] ${
                        step <= currentStep ? 'bg-primary' : 'bg-gray-300'
                    }`}
                />
            ))}
        </View>
    );

    const renderStep1 = () => (
        <View>
            <View className="mb-4">
                <Text className="text-base font-poppinsMedium text-primary mb-2">
                    Company name
                </Text>
                <TextInput
                    value={formData.companyName}
                    onChangeText={(value) => updateFormData('companyName', value)}
                    className="border border-gray-200 rounded-xl px-4 py-4 text-base font-poppinsMedium text-black bg-white"
                    placeholder=""
                />
            </View>

            <View className="mb-4">
                <Text className="text-base font-poppinsMedium text-primary mb-2">
                    Company Address
                </Text>
                <TextInput
                    value={formData.companyAddress}
                    onChangeText={(value) => updateFormData('companyAddress', value)}
                    className="border border-gray-200 rounded-xl px-4 py-4 text-base font-poppinsMedium text-black bg-white"
                    placeholder=""
                />
            </View>

            <View className="mb-4">
                <Text className="text-base font-poppinsMedium text-primary mb-2">
                    State
                </Text>
                <TextInput
                    value={formData.state}
                    onChangeText={(value) => updateFormData('state', value)}
                    className="border border-gray-200 rounded-xl px-4 py-4 text-base font-poppinsMedium text-black bg-white"
                    placeholder=""
                />
            </View>

            <View className="mb-4">
                <Text className="text-base font-poppinsMedium text-primary mb-2">
                    Country
                </Text>
                <View className="relative">
                    <TextInput
                        value={formData.country}
                        onChangeText={(value) => updateFormData('country', value)}
                        className="border border-gray-200 rounded-xl px-4 py-4 pr-12 text-base font-poppinsMedium text-black bg-white"
                        placeholder=""
                    />
                    <TouchableOpacity className="absolute right-4 top-4">
                        <ChevronDown />
                    </TouchableOpacity>
                </View>
            </View>

            <View className="mb-4">
                <Text className="text-base font-poppinsMedium text-primary mb-2">
                    Pin or Zip code
                </Text>
                <TextInput
                    value={formData.pinCode}
                    onChangeText={(value) => updateFormData('pinCode', value)}
                    className="border border-gray-200 rounded-xl px-4 py-4 text-base font-poppinsMedium text-black bg-white"
                    placeholder=""
                    keyboardType="numeric"
                />
            </View>
        </View>
    );

    const renderStep2 = () => (
        <View>
            <View className="mb-4">
                <Text className="text-base font-poppinsMedium text-primary mb-2">
                    Registration Number
                </Text>
                <TextInput
                    value={formData.registrationNumber}
                    onChangeText={(value) => updateFormData('registrationNumber', value)}
                    className="border border-gray-200 rounded-xl px-4 py-4 text-base font-poppinsMedium text-black bg-white"
                    placeholder=""
                />
            </View>

            <View className="mb-4">
                <Text className="text-base font-poppinsMedium text-primary mb-2">
                    Business code
                </Text>
                <TextInput
                    value={formData.businessCode}
                    onChangeText={(value) => updateFormData('businessCode', value)}
                    className="border border-gray-200 rounded-xl px-4 py-4 text-base font-poppinsMedium text-black bg-white"
                    placeholder=""
                />
            </View>
        </View>
    );

    const renderStep3 = () => (
        <View>
            <View className="mb-4">
                <Text className="text-base font-poppinsMedium text-primary mb-2">
                    About Company
                </Text>
                <TextInput
                    value={formData.aboutCompany}
                    onChangeText={(value) => updateFormData('aboutCompany', value)}
                    className="border border-gray-200 rounded-xl px-4 py-4 text-base font-poppinsMedium text-black bg-white h-80"
                    placeholder=""
                    multiline
                    textAlignVertical="top"
                />
            </View>
        </View>
    );

    return (
        <ScrollView className="flex-1 bg-white">
            <View className="px-6 pt-8 pb-8">
                {/* Header */}
                <View className="flex-row justify-between items-center mb-6">
                    <Text className="text-2xl font-poppinsSemiBold text-black">
                        Let's get started
                    </Text>
                    <Text className="text-base font-poppinsMedium text-gray-400">
                        Step {currentStep}/3
                    </Text>
                </View>

                {/* Progress Bar */}
                {renderProgressBar()}

                {/* Form Content */}
                <View className="mb-8">
                    {currentStep === 1 && renderStep1()}
                    {currentStep === 2 && renderStep2()}
                    {currentStep === 3 && renderStep3()}
                </View>

                {/* Info Text */}
                <View className="flex-row items-start mb-8 gap-3">
                    <Info color={'#9CA3AF'} size={20}/>
                    <Text className="flex-1 text-sm font-poppinsMedium text-gray-400 leading-5">
                        By default this address will be used as the billing address and you can change this later from
                        the account settings.
                    </Text>
                </View>

                {/* Submit Button */}
                <TouchableOpacity
                    onPress={handleNext}
                    className="bg-primary rounded-xl py-4"
                >
                    <Text className="text-lg font-poppinsSemiBold text-white text-center">
                        Submit
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default RegisterScreen;
