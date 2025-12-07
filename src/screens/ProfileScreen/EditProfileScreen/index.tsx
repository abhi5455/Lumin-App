import {Text, TouchableOpacity, View} from "react-native";
import {ChevronLeft} from "lucide-react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useAppNavigation} from "../../../common/navigationHelper.ts";
import {IStudent} from "../../../types/type_student.ts";
import {RouteProp, useRoute} from "@react-navigation/core";

interface EditProfileScreenProps {
    alumnusData?: IStudent;
}

export default function EditProfileScreen(){
    const route = useRoute<RouteProp<{ EditProfileScreen: EditProfileScreenProps }, 'EditProfileScreen'>>();
    const {alumnusData} = route?.params;
    const navigation = useAppNavigation()

    return(
        <SafeAreaView className="flex-1">
            <View className="flex flex-row justify-between items-center gap-4 bg-primary h-[65px] px-5 pr-8">
                <View className="flex flex-row items-center gap-4 bg-primary h-[65px]">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ChevronLeft size={25} color={"#FFFFFF"}/>
                    </TouchableOpacity>
                    <Text
                        className="font-poppinsLight text-white text-2xl">Edit Profile</Text>
                </View>
            </View>

            <View className="bg-primary flex-1">
                <View className="bg-white flex-1 rounded-t-[30px]">
                </View>
            </View>
        </SafeAreaView>
    )
}
