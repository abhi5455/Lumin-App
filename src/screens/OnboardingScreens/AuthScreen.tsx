import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator, StatusBar,
} from 'react-native';
import {Eye, EyeOff} from "lucide-react-native";
import {useAppNavigation} from "../../common/navigationHelper.ts";
import Toast from "react-native-toast-message";
import axios from "axios";
import {storage} from "../../lib/storage.ts";
import {fetchUserProfile} from "../../lib/userStorage.ts";
import {BASE_URL} from "../../utils/axios.ts";
import {SafeAreaView} from "react-native-safe-area-context";

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
    setIsLoading(true)
    axios.post(`${BASE_URL}/login`, {email: email, password: password})
        .then(async res => {
            Toast.show({
                type: 'success',
                text1: 'Login Successful!',
                text2: 'Welcome back!',
                position: "top"
            });
            storage.set('authToken', res.data.data);
            await fetchUserProfile()
            navigation.goBack();
            navigation.goBack();
            navigation.navigate("TabNavigator", {
                screen: "DashboardScreen",
                params: {from: "SignInScreen"}
            });
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

const AuthScreen: React.FC = () => {
    const navigation = useAppNavigation()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showValidation, setShowValidation] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        StatusBar.setBarStyle('dark-content')
        StatusBar.setBackgroundColor('#fff')
    }, [])

    return (
        <SafeAreaView className="flex-1">
            {/*<View className="bg-primary h-[65px] justify-center px-5">*/}
            {/*    <Text className="font-poppinsLight text-white text-2xl">Sign in</Text>*/}
            {/*</View>*/}

            <View className="bg-white flex-1">
                <View className="bg-white flex-1 rounded-t-[30px] px-6 flex justify-center pb-10">
                    <View className="flex justify-center items-center mb-12">
                        <Text className="text-[36px] text-primary font-poppinsLight self-center">
                            Lumin
                        </Text>
                        <Text className="text-sm text-primary font-poppinsLight mt-[-10px]">
                            - Experience Meets Ambition -
                        </Text>
                    </View>

                    <View className="mb-5">
                        <Text className="text-base font-poppins text-primary mb-2">
                            Email Id
                        </Text>
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            className="border border-gray-200 rounded-xl px-4 py-4 pt-5 text-base font-poppins text-gray-800 bg-white"
                            placeholder="Enter Email address"
                            placeholderTextColor={'#889baf'}
                            keyboardType="email-address"
                        />
                    </View>

                    <View className="mb-5">
                        <Text className="text-base font-poppins text-primary mb-2">Password</Text>
                        <View className="relative">
                            <TextInput
                                value={password}
                                onChangeText={(text) => {
                                    setPassword(text);
                                }}
                                secureTextEntry={!showPassword}
                                className="border border-gray-200 rounded-xl px-4 py-4 pt-5 pr-12 text-base font-poppins text-gray-800 bg-white"
                                placeholder="Enter password"
                                placeholderTextColor={'#889baf'}
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-4 text-gray-400"
                            >
                                {showPassword ? <Eye color={'#889baf'} size={22}/> :
                                    <EyeOff color={'#889baf'} size={22}/>}
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Submit Button */}
                    <TouchableOpacity className="bg-primary rounded-xl py-4 mb-6"
                                      onPress={() => {
                                          handleLogin(email, password, setIsLoading, navigation);
                                      }}>
                        {!isLoading ?
                            <Text className="text-lg font-poppinsSemiBold text-white text-center">
                                Sign in
                            </Text>
                            :
                            <ActivityIndicator color={'#FFF'} size={25} className={''}/>
                        }
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default AuthScreen;
