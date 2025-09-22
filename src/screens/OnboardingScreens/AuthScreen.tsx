import React, {useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView, ActivityIndicator, StatusBar,
} from 'react-native';
import GoogleIcon from '../../assets/svg/Google.svg'
import AppleIcon from '../../assets/svg/apple.svg'
import {Eye, EyeOff} from "lucide-react-native";
import {useAppNavigation} from "../../common/navigationHelper.ts";
import Toast from "react-native-toast-message";
import axios from "axios";
import {storage} from "../../lib/storage.ts";
import {BASE_URL} from "../../../test";

// import Config from "react-native-config";

interface ValidationRule {
    text: string;
    isValid: boolean;
}

function handleLogin(email: string, password: string, setIsLoading: (loading: boolean) => void, navigation?: any) {
    if (!email || !password) {
        Toast.show({
            type: 'error',
            text1: 'Invalid Credentials!',
            text2: 'Fill required details',
            position: "top"
        });
        return;
    }
    // console.log("Logging", Config.BASE_URL);
    setIsLoading(true)
    axios.post(`${BASE_URL}/login`, {email: email, password: password})
        .then(res => {
            Toast.show({
                type: 'success',
                text1: 'Login Successful!',
                text2: 'Welcome back!',
                position: "top"
            });
            storage.set('authToken', res.data.data);
            navigation.goBack();
            navigation.goBack();
            navigation.navigate("TabNavigator");
        })
        .catch(err => {
            Toast.show({
                type: 'error',
                text1: 'Login Failed!',
                text2: err.response?.data?.message || 'An error occurred during login.',
                position: "top"
            });
        })
        .finally(() => {
            setIsLoading(false);
        });
}

function handleSignUp(name: string, email: string, password: string, setIsLoading: (loading: boolean) => void, navigation?: any) {
    if (!name || !email || !password) {
        Toast.show({
            type: 'error',
            text1: 'Invalid Credentials!',
            text2: 'Fill required details',
            position: "top"
        });
        return;
    }
    // console.log("Logging", Config.BASE_URL);
    setIsLoading(true)
    axios.post(`${BASE_URL}/register`, {name: name, email: email, password: password})
        .then(res => {
            Toast.show({
                type: 'success',
                text1: 'Signup Successful!',
                text2: 'User registered!',
                position: "top"
            });
            storage.set('authToken', res.data.data);
            navigation.goBack();
            navigation.goBack();
            // navigation.navigate("TabNavigator");

            navigation.navigate("SectionNavigator", {
                screen: "RegisterScreen",
            });
        })
        .catch(err => {
            Toast.show({
                type: 'error',
                text1: 'Signup Failed!',
                text2: err.response?.data?.message || 'An error occurred during login.',
                position: "top"
            });
        })
        .finally(() => {
            setIsLoading(false);
        });
}

const AuthScreen: React.FC = () => {
    const navigation = useAppNavigation()
    const [isSignUp, setIsSignUp] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [showValidation, setShowValidation] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const validatePassword = (password: string): ValidationRule[] => {
        return [
            {
                text: '*At least 8 characters.',
                isValid: password.length >= 8,
            },
            {
                text: '*At least one uppercase letter.',
                isValid: /[A-Z]/.test(password),
            },
            {
                text: '*At least one lowercase letter',
                isValid: /[a-z]/.test(password),
            },
            {
                text: '*At least one digit.',
                isValid: /\d/.test(password),
            },
            {
                text: '*At least one special character (e.g., @, #, $, %).',
                isValid: /[!@#$%^&*(),.?":{}|<>]/.test(password),
            },
            {
                text: '*Password should not contain spaces.',
                isValid: !/\s/.test(password),
            },
        ];
    };

    const validationRules = validatePassword(password);

    return (
        <ScrollView className="flex-1 bg-white">
            <StatusBar barStyle={"dark-content"} backgroundColor="#FFF"/>
            <View className="px-6 pt-16 pb-8">
                {/* Header */}
                <Text className="text-3xl font-poppinsBold text-gray-900 text-center mb-4">
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </Text>

                <Text className="text-base font-poppinsMedium text-gray-400 text-center mb-8 leading-6">
                    Customize workflows, optimize performance,{'\n'}and enhance your business growth.
                </Text>

                {/* Social Login Buttons */}
                <View className="flex-row gap-4 mb-6">
                    <TouchableOpacity
                        className="flex-1 gap-2 bg-gray-100 rounded-xl py-4 px-4 flex-row items-center justify-center">
                        <GoogleIcon/>
                        <Text className="text-base font-poppinsMedium text-gray-600">Google</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="flex-1 gap-2 bg-gray-100 rounded-xl py-4 px-4 flex-row items-center justify-center">
                        <AppleIcon/>
                        <Text className="text-base font-poppinsMedium text-gray-600">Apple Id</Text>
                    </TouchableOpacity>
                </View>

                {/* Divider */}
                <View className="flex-row items-center mb-6">
                    <View className="flex-1 h-px bg-gray-300"/>
                    <Text className="mx-4 text-base font-poppinsMedium text-gray-500">Or</Text>
                    <View className="flex-1 h-px bg-gray-300"/>
                </View>

                {/* Form Fields */}
                {isSignUp && (
                    <View className="mb-4">
                        <Text className="text-base font-poppinsMedium text-primary mb-2">Name</Text>
                        <TextInput
                            value={name}
                            onChangeText={setName}
                            className="border border-gray-200 rounded-xl px-4 py-4 text-base font-poppinsMedium text-gray-800 bg-white"
                            placeholder=""
                        />
                    </View>
                )}

                <View className="mb-4">
                    <Text className="text-base font-poppinsMedium text-primary mb-2">
                        Email/Phone Number
                    </Text>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        className="border border-gray-200 rounded-xl px-4 py-4 text-base font-poppinsMedium text-gray-800 bg-white"
                        placeholder=""
                        keyboardType="email-address"
                    />
                </View>

                <View className="mb-4">
                    <Text className="text-base font-poppinsMedium text-primary mb-2">Password</Text>
                    <View className="relative">
                        <TextInput
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text);
                                if (isSignUp) {
                                    setShowValidation(text.length > 0);
                                }
                            }}
                            secureTextEntry={!showPassword}
                            className="border border-gray-200 rounded-xl px-4 py-4 pr-12 text-base font-poppinsMedium text-gray-800 bg-white"
                            placeholder=""
                        />
                        <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-4 text-gray-400"
                        >
                            {showPassword ? <Eye color={'#889baf'} size={22}/> : <EyeOff color={'#889baf'} size={22}/>}
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Password Validation */}
                {isSignUp && showValidation && (
                    <View className="mb-4">
                        {validationRules.map((rule, index) => (
                            <Text
                                key={index}
                                className={`text-sm font-poppinsMedium mb-1 ${
                                    rule.isValid ? 'text-green-600' : 'text-red-500'
                                }`}
                            >
                                {rule.text}
                            </Text>
                        ))}
                    </View>
                )}

                {/* Forgot Password */}
                {!isSignUp && (
                    <TouchableOpacity className="mb-6">
                        <Text className="text-base font-poppinsMedium text-gray-400 text-right">
                            Forgot Password ?
                        </Text>
                    </TouchableOpacity>
                )}

                {/* Terms Checkbox (Sign Up only) */}
                {isSignUp && (
                    <View className="flex-row items-start mb-6">
                        <TouchableOpacity
                            onPress={() => setAgreeToTerms(!agreeToTerms)}
                            className="mr-3 mt-1"
                        >
                            <View
                                className={`w-5 h-5 border-2 rounded ${agreeToTerms ? 'bg-primary border-teal-600' : 'border-gray-300'}`}>
                                {agreeToTerms && (
                                    <Text className="text-white text-xs text-center">✓</Text>
                                )}
                            </View>
                        </TouchableOpacity>
                        <View className="flex-1">
                            <Text className="text-sm font-poppinsMedium text-gray-600 leading-5">
                                I'm agree to the{' '}
                                <Text className="text-primary">Terms of Service</Text>
                                {' '}and{' '}
                                <Text className="text-primary">Privacy Policy</Text>
                            </Text>
                        </View>
                    </View>
                )}

                {/* Submit Button */}
                <TouchableOpacity className="bg-primary rounded-xl py-4 mb-6"
                                  onPress={() => {
                                      if (isSignUp && !agreeToTerms) {
                                          Toast.show({
                                              type: 'error',
                                              text1: 'Terms Not Accepted!',
                                              text2: 'You must agree to the terms and conditions to proceed.',
                                              position: "top"
                                          });
                                          return;
                                      }
                                      else if (isSignUp) {
                                          handleSignUp(name, email, password, setIsLoading, navigation);
                                      }
                                      else {
                                          handleLogin(email, password, setIsLoading, navigation);
                                      }
                                  }}>

                    {!isLoading ?
                        <Text className="text-lg font-poppinsSemiBold text-white text-center">
                            {isSignUp ? 'Create Account' : 'Sign in'}
                        </Text>
                        :
                        <ActivityIndicator color={'#FFF'} size={25} className={''}/>
                    }
                </TouchableOpacity>

                {/* Switch Auth Mode */}
                <View className="flex-row items-center justify-start">
                    <Text className="text-base font-poppinsMedium text-gray-600">
                        Do you have account?{' '}
                    </Text>
                    <TouchableOpacity onPress={() => {
                        setIsSignUp(!isSignUp)
                    }}>
                        <Text className="text-base font-poppinsMedium text-primary">
                            {isSignUp ? 'Sign In' : 'Sign Up'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default AuthScreen;
