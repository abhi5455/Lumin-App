import React from "react";
import {BaseToast, ErrorToast} from "react-native-toast-message";

export const toastConfig = {
    success: (props) => (
        <BaseToast
            {...props}
            style={{
                borderLeftColor: "#22c55e"
            }}
            text1Style={{
                fontSize: 14,
                fontFamily: 'Poppins-SemiBold',
                marginBottom: 5
            }}
            text2Style={{
                fontSize: 12,
                fontFamily: 'Poppins-Medium',
            }}
        />
    ),
    error: (props) => (
        <ErrorToast
            {...props}
            style={{
                borderLeftColor: "#FF0000",
            }}
            text1Style={{
                fontSize: 14,
                fontFamily: 'Poppins-SemiBold',
                marginBottom: 5
            }}
            text2Style={{
                fontSize: 11,
                fontFamily: 'Poppins-Medium',
            }}
        />
    ),
};
