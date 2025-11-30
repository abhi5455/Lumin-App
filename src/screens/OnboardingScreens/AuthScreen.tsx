import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator, StatusBar, Keyboard,
} from 'react-native';
import {Eye, EyeOff} from "lucide-react-native";
import {useAppNavigation} from "../../common/navigationHelper.ts";
import Toast from "react-native-toast-message";
import {SafeAreaView} from "react-native-safe-area-context";
import {supabase} from "../../lib/supabaseClient.ts";
import {fetchUserProfile} from "../../lib/userStorage.ts";

async function handleLogin(identifier: string, password: string, setIsLoading: (loading: boolean) => void, navigation?: any) {
    Keyboard.dismiss();
    setIsLoading(true)
    try {
        let authEmail = identifier;
        let studentData = null;

        // Check if identifier is an admission number or email
        if (!identifier.includes('@')) {
            // It's an admission number, fetch the auth_email
            const {data: student, error} = await supabase
                .from('student')
                .select('auth_email, email')
                .eq('admission_number', identifier)
                .maybeSingle();

            if (error || !student) {
                Toast.show({
                    type: 'error',
                    text1: 'Login Failed!',
                    text2: error?.message || 'Invalid admission number',
                    position: "top"
                });
                console.log("Error ", error)
                return {success: false, error: 'Invalid admission number'};
            }

            authEmail = student?.auth_email;
            studentData = student;
        } else {
            // Check if it's the actual email (contact email)
            const {data: student, error} = await supabase
                .from('student')
                .select('auth_email, email')
                .eq('email', identifier)
                .maybeSingle();

            if (student && !error) {
                authEmail = student.auth_email;
                studentData = student;
            } else {
                // It might be the auth_email directly
                const {data: studentByAuth, error: authError} = await supabase
                    .from('student')
                    .select('auth_email, email')
                    .eq('auth_email', identifier)
                    .maybeSingle();

                if (studentByAuth && !authError) {
                    authEmail = studentByAuth?.auth_email;
                    studentData = studentByAuth;
                }
            }
        }

        // Login with auth_email and password
        const {data: authData, error: authError} = await supabase.auth.signInWithPassword({
            email: authEmail,
            password: password
        });

        if (authError) {
            Toast.show({
                type: 'error',
                text1: 'Login Failed!',
                text2: authError?.message || 'Invalid credentials',
                position: "top"
            });
            return {success: false, error: 'Invalid credentials'};
        }

        // Fetch complete student data
        const {data: student, error: studentError} = await supabase
            .from('student')
            .select('*')
            .eq('id', authData.user.id)
            .maybeSingle();

        if (studentError || !student) {
            await supabase.auth.signOut();
            Toast.show({
                type: 'error',
                text1: 'Login Failed!',
                text2: 'Not authorized as student',
                position: "top"
            });
            return {success: false, error: 'Not authorized as student'};
        }

        console.log("Return ", authData.user, "Student ", student, student.id)
        Toast.show({
            type: 'success',
            text1: 'Login Success',
            text2: 'Dive in and experience everything Lumin offers.',
            position: "top"
        });
        await fetchUserProfile(student?.id)
        navigation.goBack()
        navigation.navigate("TabNavigator", {
            screen: "AlumniScreen",
            params: {
                collegeId: student?.college_id
            }
        });

        return {
            success: true,
            user: authData.user,
            student: student
        };

    } catch (error) {
        console.error('Login error:', error);
        Toast.show({
            type: 'error',
            text1: 'Login Failed!',
            text2: error.response?.data?.message || 'An error occurred during login.',
            position: "top"
        });
        return {success: false, error: error.message};
    } finally {
        setIsLoading(false)
    }
}

const AuthScreen: React.FC = () => {
    const navigation = useAppNavigation()
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [validationError, setValidationError] = useState(false)

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        StatusBar.setBarStyle('dark-content')
        StatusBar.setBackgroundColor('#fff')
    }, [])

    useEffect(() => {
        setValidationError(false)
    }, [identifier, password]);

    return (
        <SafeAreaView className="flex-1">
            {/*<View className="bg-primary h-[65px] justify-center px-5">*/}
            {/*    <Text className="font-poppinsLight text-white text-2xl">Sign in</Text>*/}
            {/*</View>*/}

            <View className="bg-white flex-1">
                <View className="bg-white flex-1 rounded-t-[30px] px-6 flex justify-center pb-10">
                    <View className="flex justify-center items-center mb-14">
                        <Text className="text-[36px] text-primary font-poppinsLight self-center">
                            Lumin
                        </Text>
                        <Text className="text-sm text-primary font-poppinsLight mt-[-10px]">
                            - Experience Meets Ambition -
                        </Text>
                    </View>

                    <View className="mb-5">
                        <Text
                            className={`text-base font-poppins mb-2 ${validationError && identifier === '' ? 'text-red-400' : 'text-primary'}`}>
                            Admission Number
                        </Text>
                        <TextInput
                            value={identifier}
                            onChangeText={setIdentifier}
                            className={`${validationError && identifier === '' ? 'border-red-400' : 'border-gray-200'} border rounded-xl px-4 py-4 pt-5 text-base font-poppins text-gray-800 bg-white`}
                            placeholder="Enter admission number"
                            placeholderTextColor={'#889baf'}
                            keyboardType="email-address"
                        />
                    </View>

                    <View className="mb-7">
                        <Text
                            className={`text-base font-poppins text-primary mb-2  ${validationError && password === '' ? 'text-red-400' : 'text-primary'}`}>Password</Text>
                        <View className="relative">
                            <TextInput
                                value={password}
                                onChangeText={(text) => {
                                    setPassword(text);
                                }}
                                secureTextEntry={!showPassword}
                                className={`${validationError && password === '' ? 'border-red-400' : 'border-gray-200'} border rounded-xl px-4 py-4 pt-5 pr-12 text-base font-poppins text-gray-800 bg-white`}
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
                                          if (identifier.trim() === '' || password.trim() === '') {
                                              if (identifier.trim() === '') {
                                                  setIdentifier('')
                                              }
                                              if (password.trim() === '') {
                                                  setPassword('')
                                              }
                                              setValidationError(true)
                                              Toast.show({
                                                  type: 'error',
                                                  text1: "Insufficient data!",
                                                  text2: "Fill all required fields"
                                              })
                                              return
                                          }
                                          handleLogin(identifier, password, setIsLoading, navigation);
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
