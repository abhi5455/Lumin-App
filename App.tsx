import './global.css';
import React from 'react';
import {Text, View} from 'react-native';
import SplashScreen from "./src/screens/OnboardingScreens/SplashScreen.tsx";

function App() {
    return (
        <View className="flex-1">
            <SplashScreen/>
        </View>
    );
}

export default App;
