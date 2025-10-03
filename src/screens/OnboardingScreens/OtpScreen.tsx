import {ActivityIndicator, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import {useAppNavigation} from "../../common/navigationHelper.ts";
import axios from "axios";
import Toast from "react-native-toast-message";
import {BASE_URL} from "../../utils/axios.ts";

export default function OtpScreen() {
    const [isLoading, setIsLoading] = useState(false)
    const [isVerifying, setIsVerifying] = useState(false)
    const [isResendingOtp, setIsResendingOtp] = useState(false)
    const navigation = useAppNavigation()

    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const inputRefs = useRef<Array<TextInput | null>>([])

    const handleInputChange = (text: string, index: number) => {
        const val = text.replace(/\D/g, '').slice(-1)

        setOtp(prev => {
            const next = [...prev]
            next[index] = val
            return next
        })

        // move forward when a digit is entered
        if (val && index < otp.length - 1) {
            inputRefs.current[index + 1]?.focus()
        }

        // if the field becomes empty (user deleted), move back
        if (!val && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    useEffect(() => {
        setIsLoading(true)
        Toast.show({
            type: 'info',
            text1: 'Sending OTP...',
            text2: 'Please wait while we send the OTP to your email.',
            position: "top"
        })
        axios.post(`${BASE_URL}/users/send-otp`)
            .then(res => {
                console.log('OTP: ', res.data?.data?.otp);
                Toast.show({
                    type: 'success',
                    text1: 'OTP Sent!',
                    text2: `Please check your email for the OTP. ${res.data?.data?.otp}`,
                    position: "top"
                });
            })
            .catch(err => {
                if(err.response?.data?.message === "Profile already verified"){
                    navigation.goBack()
                    return
                }
                Toast.show({
                    type: 'error',
                    text1: 'OTP Sending Failed!',
                    text2: err.response?.data?.message || 'An error occurred while sending OTP.',
                    position: "top"
                });
            })
            .finally(() => setIsLoading(false))
    }, []);

    return (
        <ScrollView className="flex-1 bg-white">
            <StatusBar barStyle={"dark-content"} backgroundColor="#FFF"/>
            <View className="px-6 pt-16 pb-8">
                {/* Header */}
                <Text className="text-3xl font-poppinsBold text-gray-900 text-center mb-4">
                    Verification
                </Text>

                <Text className="text-base font-poppinsMedium text-gray-400 text-center mb-8 leading-6">
                    Secure your account with OTP verification.
                </Text>

                <Text className="text-black text-lg font-poppinsSemiBold mb-8 text-center">
                    Enter OTP
                </Text>

                {/* OTP input */}
                <View className="flex-row justify-around items-center mb-8 gap-5">
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            className="flex-1 max-w-16 h-16 border border-primary rounded-lg text-black text-xl font-poppinsMedium"
                            value={digit}
                            onChangeText={(value) => handleInputChange(value, index)}
                            onKeyPress={({nativeEvent}) => {
                                if (nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
                                    // if already empty and backspace pressed, go back
                                    inputRefs.current[index - 1]?.focus()
                                }
                            }}
                            keyboardType="number-pad"
                            maxLength={1}
                            textAlign="center"
                            autoFocus={index === 0}
                            textContentType="oneTimeCode"
                            placeholder=""
                            placeholderTextColor="#9CA3AF"
                        />
                    ))}
                </View>

                {/* Verify OTP Button */}
                <TouchableOpacity className="bg-primary rounded-xl py-4 mb-6"
                                  disabled={isLoading || isVerifying}
                                  onPress={() => {
                                      setIsVerifying(true)
                                      axios.post(`${BASE_URL}/users/verify-otp`, {
                                          otp: otp.join('')
                                      }).then(res => {
                                          Toast.show({
                                              type: 'success',
                                              text1: 'OTP Verified!',
                                              text2: 'Your OTP has been successfully verified.',
                                              position: "top"
                                          })
                                          navigation.navigate("SectionNavigator", {
                                              screen: "RegisterScreen",
                                          });
                                      }).catch(err => {
                                          Toast.show({
                                              type: 'error',
                                              text1: 'OTP Verification Failed!',
                                              text2: err.response?.data?.message || 'An error occurred during OTP verification.',
                                              position: "top"
                                          })
                                      })
                                          .finally(() => setIsVerifying(false))
                                  }}>
                    {!isVerifying ?
                        <Text className="text-lg font-poppinsSemiBold text-white text-center">
                            Verify OTP
                        </Text>
                        :
                        <ActivityIndicator color={'#FFF'} size={25}/>
                    }
                </TouchableOpacity>

                {/* Resend OTP Button */}
                <TouchableOpacity className="border-primary border-[1px] rounded-xl py-4 mb-6"
                                  disabled={isLoading || isResendingOtp}
                                  onPress={() => {
                                      setIsResendingOtp(true)
                                      axios.post(`${BASE_URL}/users/send-otp`)
                                          .then(res => {
                                              Toast.show({
                                                  type: 'success',
                                                  text1: 'OTP Sent!',
                                                  text2: `Please check your email for the OTP. ${res.data?.data?.otp}`,
                                                  position: "top"
                                              });
                                          })
                                          .catch(err => {
                                              Toast.show({
                                                  type: 'error',
                                                  text1: 'OTP Sending Failed!',
                                                  text2: err.response?.data?.message || 'An error occurred while sending OTP.',
                                                  position: "top"
                                              });
                                          })
                                          .finally(() => setIsResendingOtp(false));
                                  }}>
                    {!isResendingOtp ?
                        <Text className="text-lg font-poppinsSemiBold text-primary text-center">
                            Resend OTP
                        </Text>
                        :
                        <ActivityIndicator color={'#178671'} size={25}/>
                    }
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}
