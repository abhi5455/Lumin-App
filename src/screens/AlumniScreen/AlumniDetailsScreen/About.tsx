import {Text, View} from "react-native";
import {GraduationCap, User} from "lucide-react-native";

export default function About() {
    return (
        <>
            {/*<View className="flex flex-col justify-center px-5 mt-5 gap-2">*/}
            {/*    <View className="flex flex-row items-center gap-1">*/}
            {/*        <View*/}
            {/*            className="flex justify-center items-center bg-[#DAA520]/10 w-12 h-12 rounded-full">*/}
            {/*            <User size={19} color={"#DAA520"}/>*/}
            {/*        </View>*/}
            {/*        <Text className="font-poppins text-xl"> About</Text>*/}
            {/*    </View>*/}
            {/*    <Text className="text-lg font-poppins indent-8 text-justify px-1">*/}
            {/*        {'\u2003'}{'\u2003'}{'\u2003'}Passionate software engineer with expertise in full-stack development,*/}
            {/*        cloud architecture, and machine*/}
            {/*        learning. Currently working at Microsoft on Azure services, focusing on scalable distributed systems*/}
            {/*        and*/}
            {/*        developer tools. Strong advocate for clean code, test-driven development, and continuous learning.*/}
            {/*    </Text>*/}
            {/*    <View className="min-h-[50px]"/>*/}
            {/*</View>*/}
            <View className="flex flex-col justify-center gap-2 border-[1px] bg-gray-100/35 border-primary rounded-xl p-2 mx-5 mt-5">
                <View className="flex flex-row items-center gap-3">
                    <View
                        className="flex justify-center items-center self-start mt-2 ml-2 bg-[#DAA520]/10 w-12 h-12 rounded-full">
                        <User size={19} color={"#DAA520"}/>
                    </View>

                    <View className="flex-1">
                        <Text className="font-poppinsMedium text-lg">
                            About
                        </Text>
                    </View>
                </View>

                <Text className="text-black/80 text-[15px] font-poppins indent-8 text-justify px-3 mb-4 leading-6">
                    {'\u2003'}{'\u2003'}{'\u2003'}Passionate software engineer with expertise in full-stack development,
                    cloud architecture, and machine
                    learning. Currently working at Microsoft on Azure services, focusing on scalable distributed systems
                    and
                    developer tools. Strong advocate for clean code, test-driven development, and continuous learning.
                </Text>
            </View>
            <View className="min-h-[50px]"/>
        </>
    )
}
