import {ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Search} from "lucide-react-native";
import {useState} from "react";

const companyFilters = [
    {id: 0, name: "All"},
    {id: 1, name: "Experience"},
    {id: 2, name: "Microsoft"},
    {id: 3, name: "TCS"},
    {id: 4, name: "Infosys"},
    {id: 5, name: "Wipro"},
    {id: 6, name: "Google"},
    {id: 7, name: "Amazon"},
    {id: 8, name: "Accenture"},
    {id: 9, name: "IBM"},
    {id: 10, name: "Cognizant"},
    {id: 11, name: "Capgemini"},
];


export default function ResourceScreen() {
    const [selectedFilter, setSelectedFilter] = useState(0);

    return (
        <SafeAreaView className="flex-1">
            <StatusBar barStyle="light-content" backgroundColor={'#00b19f'}/>
            <View className="bg-primary h-[65px] justify-center px-5">
                <Text className="font-poppinsLight text-white text-2xl">Resources</Text>
            </View>

            <View className="bg-primary flex-1">
                <View className="bg-white flex-1 rounded-t-[30px] px-5 flex justify-start items-center">
                    <View className="flex flex-col items-start justify-start my-4 gap-4">
                        <View
                            className="flex flex-row justify-start items-center border border-gray-300 rounded-xl pr-4 pl-3 py-1 gap-1.5">
                            <Search size={20} color={"#999999"}/>
                            <TextInput
                                placeholder={"Search Resource"} className="text-black flex-1"
                                placeholderTextColor={"#999999"}
                            />
                        </View>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 10,
                            }}
                        >
                            {companyFilters?.map((item, index) => (
                                <TouchableOpacity
                                    className={`${selectedFilter === item?.id ? 'bg-primary/10' : 'bg-gray-100'} py-1 rounded-xl px-3 self-baseline`}
                                    key={index}
                                    onPress={() => setSelectedFilter(item?.id)}>
                                    <Text
                                        className={`${selectedFilter === item?.id ? 'text-[#006a63]' : 'text-black/80'} font-poppins text-[13px]`}>{item?.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    <ScrollView className="flex-1 pt-2 w-full bg-yellow-300">
                        <View className="h-[100px] bg-red-600"/>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )
}
