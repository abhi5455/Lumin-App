import React, {useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import {ChevronDown, Info} from "lucide-react-native";
import Toast from "react-native-toast-message";
import axios from "axios";
import {BASE_URL} from "../../../test";
import {useAppNavigation} from "../../common/navigationHelper.ts";

interface IFormData{
    company: {
        name: string;
        address: string;
        state: string;
        country: string;
        zipCode: string;
        registrationNumber: string;
        businessCode: string;
        aboutCompany: string;
    };
    card: {
        name: string;
        number: string;
        exp_month: string;
        exp_year: string;
        cvv: string;
    };
    user: {
        name: string;
        designation: string;
    };
};

type NestedField =
    | 'company.name'
    | 'company.address'
    | 'company.state'
    | 'company.country'
    | 'company.zipCode'
    | 'company.registrationNumber'
    | 'company.businessCode'
    | 'company.aboutCompany'
    | 'card.name'
    | 'card.number'
    | 'card.exp_month'
    | 'card.exp_year'
    | 'card.cvv'
    | 'user.name'
    | 'user.designation';

const RegisterScreen: React.FC = () => {
    const navigation = useAppNavigation()
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<IFormData>({
        company: {
            name: '',
            address: '',
            state: '',
            country: '',
            zipCode: '',
            registrationNumber: '',
            businessCode: '',
            aboutCompany: '',
        },
        card: {
            name: '',
            number: '',
            exp_month: '',
            exp_year: '',
            cvv: '',
        },
        user: {
            name: '',
            designation: '',
        },
    });

    const updateFormData = (field: NestedField, value: string) => {
        const [section, key] = field.split('.') as [keyof FormData, string];

        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [key]: value,
            },
        }));
    };

    const handleNext = () => {
        if(currentStep === 1){
            if (!formData.user.name || !formData.user.designation) {
                Toast.show({
                    type: 'error',
                    text1: 'Invalid Data!',
                    text2: 'Fill required details',
                    position: "top"
                });
                return;
            }
        }
        else if (currentStep === 2) {
            if (!formData.company.name || !formData.company.address || !formData.company.state || !formData.company.country || !formData.company.zipCode) {
                Toast.show({
                    type: 'error',
                    text1: 'Invalid Data!',
                    text2: 'Fill required details',
                    position: "top"
                });
                return;
            }
        }
        else if (currentStep === 3) {
            if (!formData.company.registrationNumber || !formData.company.businessCode) {
                Toast.show({
                    type: 'error',
                    text1: 'Invalid Data!',
                    text2: 'Fill required details',
                    position: "top"
                });
                return;
            }
        }
        else if (currentStep === 4) {
            if (!formData.company.aboutCompany) {
                Toast.show({
                    type: 'error',
                    text1: 'Invalid Data!',
                    text2: 'Fill required details',
                    position: "top"
                });
                return;
            }
        }
        else if (currentStep === 5) {
            if (!formData.card.name || !formData.card.number || !formData.card.exp_month || !formData.card.exp_year || !formData.card.cvv) {
                Toast.show({
                    type: 'error',
                    text1: 'Invalid Data!',
                    text2: 'Fill required details',
                    position: "top"
                });
                return;
            }
        }

        if (currentStep < 5) {
            setCurrentStep(currentStep + 1);
        }
        else{
            axios.post(`${BASE_URL}/users/onboarding`, formData)
                .then(response => {
                    console.log('Registration successful:', response.data);
                    Toast.show({
                        type: 'success',
                        text1: 'Registration Successful!',
                        position: "top"
                    });
                    navigation.goBack()
                    navigation.navigate("TabNavigator");
                })
                .catch(error => {
                    console.error('Registration error:', error);
                    Toast.show({
                        type: 'error',
                        text1: 'Registration Failed!',
                        text2: 'Please try again later.',
                        position: "top"
                    });
                });
        }
    };

    const renderProgressBar = () => (
        <View className="flex-row gap-2 mb-8">
            {[1, 2, 3, 4, 5].map((step) => (
                <View
                    key={step}
                    className={`h-1 flex-1 rounded-full max-w-[35px] ${
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
                    Name
                </Text>
                <TextInput
                    value={formData.user.name}
                    onChangeText={(value) => updateFormData('user.name', value)}
                    className="border border-gray-200 rounded-xl px-4 py-4 text-base font-poppinsMedium text-black bg-white"
                    placeholder=""
                />
            </View>

            <View className="mb-4">
                <Text className="text-base font-poppinsMedium text-primary mb-2">
                    Designation
                </Text>
                <TextInput
                    value={formData.user.designation}
                    onChangeText={(value) => updateFormData('user.designation', value)}
                    className="border border-gray-200 rounded-xl px-4 py-4 text-base font-poppinsMedium text-black bg-white"
                    placeholder=""
                />
            </View>
        </View>
    );

    const renderStep2 = () => (
        <View>
            <View className="mb-4">
                <Text className="text-base font-poppinsMedium text-primary mb-2">
                    Company name
                </Text>
                <TextInput
                    value={formData.company.name}
                    onChangeText={(value) => updateFormData('company.name', value)}
                    className="border border-gray-200 rounded-xl px-4 py-4 text-base font-poppinsMedium text-black bg-white"
                    placeholder=""
                />
            </View>

            <View className="mb-4">
                <Text className="text-base font-poppinsMedium text-primary mb-2">
                    Company Address
                </Text>
                <TextInput
                    value={formData.company.address}
                    onChangeText={(value) => updateFormData('company.address', value)}
                    className="border border-gray-200 rounded-xl px-4 py-4 text-base font-poppinsMedium text-black bg-white"
                    placeholder=""
                />
            </View>

            <View className="mb-4">
                <Text className="text-base font-poppinsMedium text-primary mb-2">
                    State
                </Text>
                <TextInput
                    value={formData.company.state}
                    onChangeText={(value) => updateFormData('company.state', value)}
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
                        value={formData.company.country}
                        onChangeText={(value) => updateFormData('company.country', value)}
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
                    value={formData.company.zipCode}
                    onChangeText={(value) => updateFormData('company.zipCode', value)}
                    className="border border-gray-200 rounded-xl px-4 py-4 text-base font-poppinsMedium text-black bg-white"
                    placeholder=""
                    keyboardType="numeric"
                />
            </View>
        </View>
    );

    const renderStep3 = () => (
        <View>
            <View className="mb-4">
                <Text className="text-base font-poppinsMedium text-primary mb-2">
                    Registration Number
                </Text>
                <TextInput
                    value={formData.company.registrationNumber}
                    onChangeText={(value) => updateFormData('company.registrationNumber', value)}
                    className="border border-gray-200 rounded-xl px-4 py-4 text-base font-poppinsMedium text-black bg-white"
                    placeholder=""
                />
            </View>

            <View className="mb-4">
                <Text className="text-base font-poppinsMedium text-primary mb-2">
                    Business code
                </Text>
                <TextInput
                    value={formData.company.businessCode}
                    onChangeText={(value) => updateFormData('company.businessCode', value)}
                    className="border border-gray-200 rounded-xl px-4 py-4 text-base font-poppinsMedium text-black bg-white"
                    placeholder=""
                />
            </View>
        </View>
    );

    const renderStep4 = () => (
        <View>
            <View className="mb-4">
                <Text className="text-base font-poppinsMedium text-primary mb-2">
                    About Company
                </Text>
                <TextInput
                    value={formData.company.aboutCompany}
                    onChangeText={(value) => updateFormData('company.aboutCompany', value)}
                    className="border border-gray-200 rounded-xl px-4 py-4 text-base font-poppinsMedium text-black bg-white h-80"
                    placeholder=""
                    multiline
                    textAlignVertical="top"
                />
            </View>
        </View>
    );

    const renderStep5 = () => (
        <View>
            <View className="mb-4">
                <Text className="text-base font-poppinsMedium text-primary mb-2">
                    Cardholder name
                </Text>
                <TextInput
                    value={formData.card.name}
                    onChangeText={(value) => updateFormData('card.name', value)}
                    className="border border-gray-200 rounded-xl px-4 py-4 text-base font-poppinsMedium text-black bg-white"
                    placeholder=""
                />
            </View>

            <View className="mb-4">
                <Text className="text-base font-poppinsMedium text-primary mb-2">
                    Cardholder Number
                </Text>
                <TextInput
                    value={formData.card.number}
                    onChangeText={(value) => updateFormData('card.number', value)}
                    className="border border-gray-200 rounded-xl px-4 py-4 text-base font-poppinsMedium text-black bg-white"
                    placeholder=""
                />
            </View>

            <View className={'flex flex-row justify-between gap-4'}>
            <View className="w-[45%] mb-4">
                <Text className="text-base font-poppinsMedium text-primary mb-2">
                    Exp Month
                </Text>
                <TextInput
                    value={formData.card.exp_month}
                    onChangeText={(value) => updateFormData('card.exp_month', value)}
                    className="border border-gray-200 rounded-xl px-4 py-4 text-base font-poppinsMedium text-black bg-white"
                    placeholder=""
                    keyboardType="numeric"
                />
            </View>

            <View className="w-[45%] mb-4">
                <Text className="text-base font-poppinsMedium text-primary mb-2">
                    Exp Year
                </Text>
                <TextInput
                    value={formData.card.exp_year}
                    onChangeText={(value) => updateFormData('card.exp_year', value)}
                    className="border border-gray-200 rounded-xl px-4 py-4 text-base font-poppinsMedium text-black bg-white"
                    placeholder=""
                    keyboardType="numeric"
                />
            </View>
            </View>

            <View className="mb-4">
                <Text className="text-base font-poppinsMedium text-primary mb-2">
                    Cvv Number
                </Text>
                <TextInput
                    value={formData.card.cvv}
                    onChangeText={(value) => updateFormData('card.cvv', value)}
                    className="border border-gray-200 rounded-xl px-4 py-4 text-base font-poppinsMedium text-black bg-white"
                    placeholder=""
                    keyboardType="numeric"
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
                        Step {currentStep}/5
                    </Text>
                </View>

                {/* Progress Bar */}
                {renderProgressBar()}

                {/* Form Content */}
                <View className="mb-8">
                    {currentStep === 1 && renderStep1()}
                    {currentStep === 2 && renderStep2()}
                    {currentStep === 3 && renderStep3()}
                    {currentStep === 4 && renderStep4()}
                    {currentStep === 5 && renderStep5()}
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
