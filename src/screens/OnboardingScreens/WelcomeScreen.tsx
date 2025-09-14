import React, {useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView, StatusBar,
} from 'react-native';
import {ArrowRight} from "lucide-react-native";
import Earth from '../../assets/svg/Earth.svg';

const WelcomeScreen = () => {
    const [counter, setCounter] = useState(1);

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar barStyle={"dark-content"} backgroundColor="#FFF"/>
            <View className="flex-1 px-6 py-8">
                <View className="flex-1 justify-center items-center">
                    <View className="mb-16 items-center mt-24">
                        <Earth width={280} height={280}/>
                    </View>

                    <View className="items-center mb-12">
                        <Text className="text-3xl font-bold text-black mb-6">
                            {counter === 1 && 'Welcome to'}
                            {counter === 2 && 'Smart Call Automation'}
                            {counter === 3 && 'Personalized Solutions'}
                        </Text>
                        <Text className="text-base text-gray-500 text-center leading-6 px-4">
                            {counter === 1 && 'Experience seamless customer interactions\nwith our AI-driven voice agents.'}
                            {counter === 2 && 'Effortlessly handle queries, schedule \nmeetings, and provide 24/7 support.'}
                            {counter === 3 && 'Customize workflows, optimize performance,\nand enhance your business growth.'}
                        </Text>
                    </View>

                    {/* Pagination Dots */}
                    <View className="flex-row items-center justify-center mb-16">
                        <View className={`w-2 h-2 rounded-full ${counter === 1 ? 'bg-primary' : 'bg-gray-300'} mx-1`}/>
                        <View className={`w-2 h-2 rounded-full ${counter === 2 ? 'bg-primary' : 'bg-gray-300'} mx-1`}/>
                        <View className={`w-2 h-2 rounded-full ${counter === 3 ? 'bg-primary' : 'bg-gray-300'} mx-1`}/>
                    </View>
                </View>

                <View className="pb-8">
                    <TouchableOpacity className="bg-primary rounded-2xl py-4 px-6 flex-row items-center justify-center"
                    onPress={() => {
                        if(counter < 3) {
                            setCounter(prev=> prev + 1);
                        }
                        else{
                            // Navigate to main app screen or login screen
                        }
                        console.log(counter);
                    }}>
                        <Text className="text-white text-lg font-semibold mr-2">
                            Next
                        </Text>
                        <ArrowRight size={20} color={'#FFF'}/>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default WelcomeScreen;
