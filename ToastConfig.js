import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Toast, { BaseToast, ErrorToast, InfoToast } from 'react-native-toast-message';

// Toast Configuration with Poppins font and bottom positioning
export const toastConfig = {
    // Success Toast
    success: (props) => (
        <BaseToast
            {...props}
            style={{
                borderLeftColor: '#28a745',
                backgroundColor: '#ffffff',
                borderWidth: 1,
                borderColor: '#28a745',
                borderRadius: 12,
                height: 70,
                width: '90%',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.15,
                shadowRadius: 3.84,
                elevation: 5,
            }}
            contentContainerStyle={{
                paddingHorizontal: 15,
                flex: 1,
                justifyContent: 'center',
            }}
            text1Style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#155724',
                fontFamily: 'Poppins-SemiBold',
            }}
            text2Style={{
                fontSize: 13,
                color: '#6c757d',
                fontFamily: 'Poppins-Regular',
                lineHeight: 18,
            }}
            text1NumberOfLines={1}
            text2NumberOfLines={2}
        />
    ),

    // Error Toast
    error: (props) => (
        <ErrorToast
            {...props}
            style={{
                borderLeftColor: '#dc3545',
                backgroundColor: '#ffffff',
                // borderWidth: 1,
                borderColor: '#dc3545',
                // borderRadius: 12,
                height: 70,
                width: '90%',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.15,
                shadowRadius: 3.84,
                elevation: 5,
            }}
            contentContainerStyle={{
                paddingHorizontal: 15,
                flex: 1,
                justifyContent: 'center',
            }}
            text1Style={{
                fontSize: 12,
                fontWeight: '600',
                color: '#721c24',
                fontFamily: 'Poppins-SemiBold',
            }}
            text2Style={{
                fontSize: 10,
                color: '#6c757d',
                fontFamily: 'Poppins-Regular',
                lineHeight: 18,
            }}
            text1NumberOfLines={1}
            text2NumberOfLines={2}
        />
    ),

    // Info Toast
    info: (props) => (
        <InfoToast
            {...props}
            style={{
                borderLeftColor: '#17a2b8',
                backgroundColor: '#ffffff',
                borderWidth: 1,
                borderColor: '#17a2b8',
                borderRadius: 12,
                height: 70,
                width: '90%',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.15,
                shadowRadius: 3.84,
                elevation: 5,
            }}
            contentContainerStyle={{
                paddingHorizontal: 15,
                flex: 1,
                justifyContent: 'center',
            }}
            text1Style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#0c5460',
                fontFamily: 'Poppins-SemiBold',
            }}
            text2Style={{
                fontSize: 13,
                color: '#6c757d',
                fontFamily: 'Poppins-Regular',
                lineHeight: 18,
            }}
            text1NumberOfLines={1}
            text2NumberOfLines={2}
        />
    ),

    // Warning Toast (Custom)
    warning: ({ text1, text2, onPress, ...rest }) => (
        <TouchableOpacity
            style={{
                height: 70,
                width: '90%',
                backgroundColor: '#ffffff',
                borderRadius: 12,
                borderLeftColor: '#ffc107',
                borderLeftWidth: 6,
                borderWidth: 1,
                borderColor: '#ffc107',
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 15,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.15,
                shadowRadius: 3.84,
                elevation: 5,
            }}
            onPress={onPress}
        >
            <View style={{
                width: 35,
                height: 35,
                borderRadius: 17.5,
                backgroundColor: '#ffc107',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 12,
            }}>
                <Text style={{
                    color: '#856404',
                    fontSize: 16,
                    fontWeight: 'bold',
                    fontFamily: 'Poppins-Bold',
                }}>⚠</Text>
            </View>

            <View style={{ flex: 1 }}>
                <Text style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#856404',
                    fontFamily: 'Poppins-SemiBold',
                }}>
                    {text1}
                </Text>
                {text2 && (
                    <Text style={{
                        fontSize: 13,
                        color: '#6c757d',
                        fontFamily: 'Poppins-Regular',
                        marginTop: 2,
                        lineHeight: 18,
                    }}>
                        {text2}
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    ),

    // Custom Action Toast
    actionToast: ({ text1, text2, actionText = 'Action', onActionPress, onPress, ...rest }) => (
        <View style={{
            height: 80,
            width: '90%',
            backgroundColor: '#ffffff',
            borderRadius: 12,
            borderLeftColor: '#6f42c1',
            borderLeftWidth: 6,
            borderWidth: 1,
            borderColor: '#6f42c1',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 15,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 3.84,
            elevation: 5,
        }}>
            <View style={{ flex: 1 }}>
                <Text style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#495464',
                    fontFamily: 'Poppins-SemiBold',
                }}>
                    {text1}
                </Text>
                {text2 && (
                    <Text style={{
                        fontSize: 13,
                        color: '#6c757d',
                        fontFamily: 'Poppins-Regular',
                        marginTop: 2,
                        lineHeight: 18,
                    }}>
                        {text2}
                    </Text>
                )}
            </View>

            <TouchableOpacity
                style={{
                    backgroundColor: '#6f42c1',
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 20,
                    marginLeft: 10,
                }}
                onPress={onActionPress}
            >
                <Text style={{
                    color: '#ffffff',
                    fontSize: 12,
                    fontWeight: '600',
                    fontFamily: 'Poppins-SemiBold',
                }}>
                    {actionText}
                </Text>
            </TouchableOpacity>
        </View>
    ),
};

// Default configuration for bottom positioning
export const defaultToastConfig = {
    position: 'bottom',
    bottomOffset: 100,
    visibilityTime: 4000,
    autoHide: true,
    swipeable: true,
    topOffset: 60,
};

// Utility functions for showing different toast types
export const showSuccessToast = (text1, text2 = '') => {
    Toast.show({
        type: 'success',
        text1,
        text2,
        ...defaultToastConfig,
    });
};

export const showErrorToast = (text1, text2 = '') => {
    Toast.show({
        type: 'error',
        text1,
        text2,
        ...defaultToastConfig,
    });
};

export const showInfoToast = (text1, text2 = '') => {
    Toast.show({
        type: 'info',
        text1,
        text2,
        ...defaultToastConfig,
    });
};

export const showWarningToast = (text1, text2 = '', onPress = null) => {
    Toast.show({
        type: 'warning',
        text1,
        text2,
        onPress,
        ...defaultToastConfig,
    });
};

export const showActionToast = (text1, text2 = '', actionText = 'Action', onActionPress = null) => {
    Toast.show({
        type: 'actionToast',
        text1,
        text2,
        actionText,
        onActionPress,
        ...defaultToastConfig,
    });
};

// Custom toast with icon
export const showCustomToast = (text1, text2 = '', icon = '✓', backgroundColor = '#28a745') => {
    Toast.show({
        type: 'customIcon',
        text1,
        text2,
        icon,
        backgroundColor,
        ...defaultToastConfig,
    });
};

// Add custom icon toast to config
toastConfig.customIcon = ({ text1, text2, icon = '✓', backgroundColor = '#28a745', ...rest }) => (
    <View style={{
        height: 70,
        width: '90%',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        borderLeftColor: backgroundColor,
        borderLeftWidth: 6,
        borderWidth: 1,
        borderColor: backgroundColor,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 5,
    }}>
        <View style={{
            width: 35,
            height: 35,
            borderRadius: 17.5,
            backgroundColor: backgroundColor,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 12,
        }}>
            <Text style={{
                color: '#ffffff',
                fontSize: 16,
                fontFamily: 'Poppins-Bold',
            }}>
                {icon}
            </Text>
        </View>

        <View style={{ flex: 1 }}>
            <Text style={{
                fontSize: 15,
                fontWeight: '600',
                color: '#495464',
                fontFamily: 'Poppins-SemiBold',
            }}>
                {text1}
            </Text>
            {text2 && (
                <Text style={{
                    fontSize: 13,
                    color: '#6c757d',
                    fontFamily: 'Poppins-Regular',
                    marginTop: 2,
                    lineHeight: 18,
                }}>
                    {text2}
                </Text>
            )}
        </View>
    </View>
);
