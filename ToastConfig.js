import React from "react";
import {BaseToast, ErrorToast} from "react-native-toast-message";

export const toastConfig = {
    success: (props) => (
        <BaseToast
            {...props}
            style={{
                borderLeftColor: "#22c55e",
                borderRadius: 10,
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
                borderRadius: 10,
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
    info: (props) => (
        <BaseToast
            {...props}
            style={{
                borderLeftColor: "#3b82f6",
                borderRadius: 10,
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
    missing: (props) => (
        <BaseToast
            {...props}
            style={{
                borderLeftColor: "#f97316", // orange-500 (warning)
                backgroundColor: "#fff7ed", // soft orange background
                borderRadius: 10,
            }}
            text1Style={{
                fontSize: 14,
                fontFamily: "Poppins-SemiBold",
                marginBottom: 5,
                color: "#7c2d12", // dark-orange for title
            }}
            text2Style={{
                fontSize: 11,
                fontFamily: "Poppins-Medium",
                color: "#9a3412",
            }}
        />
    ),

};
