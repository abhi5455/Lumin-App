import {ScrollView, StatusBar, Text, View} from "react-native";

export default function AlumniScreen(){

    return(
        <View>
            <StatusBar barStyle="light-content" backgroundColor={'#00b19f'}/>
            <View className="bg-primary h-[70px] justify-center px-5">
                <Text className="font-poppinsLight text-white text-2xl">Alumni Network</Text>
            </View>

            <View className="bg-primary">
                <ScrollView className="bg-white rounded-t-[30px] px-5 pt-5">
                    <Text>Haaiii Hellooo</Text>
                </ScrollView>
            </View>

        </View>
    )
}
