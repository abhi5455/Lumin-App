import {Image, Modal, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import InstitutionImage from "../../assets/svg/Institution.svg";
import {MapPin, XIcon} from "lucide-react-native";
import {getUserProfile} from "../../lib/userStorage.ts";
import {IStudent} from "../../types/type_student.ts";

interface InstitutionModalProps {
    visible: boolean;
    onClose: () => void;
}

export default function InstitutionModal({visible, onClose}: InstitutionModalProps) {
    const userProfile: IStudent = getUserProfile()

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            {/* Backdrop - tapping here closes modal */}
            <TouchableWithoutFeedback onPress={onClose}>
                <View className="flex-1 bg-black/50 justify-center px-5">

                    {/* Content area - tapping here does nothing, allows scrolling */}
                    <TouchableWithoutFeedback onPress={() => {
                    }}>
                        <View className="bg-white rounded-3xl max-h-[70%] overflow-hidden">
                            <ScrollView
                                className="px-5 py-6 bg-primary/5d"
                                showsVerticalScrollIndicator={true}
                                horizontal={false}
                            >
                                <TouchableOpacity className="w-full flex-row justify-end items-center mb-[-15px]"
                                                  onPress={onClose}>
                                    <XIcon color={'#4b5563'} size={21}/>
                                </TouchableOpacity>
                                <View className="w-full flex items-center mb-[2px]">
                                    {/*<InstitutionImage fill="#00b19f" width={200} height={200}/>*/}
                                    <Image source={require('../../assets/png/InstitutionBuilding.png')} style={{ width: 150, height: 150 }} />
                                </View>
                                <Text className="text-2xl font-bold mb-2 text-gray-900 text-center font-poppinsMedium">
                                    {userProfile?.college?.name}
                                </Text>
                                <View className="flex flex-row justify-center items-center gap-2 mb-1">
                                    <MapPin size={20} color={"#DAA520"} strokeWidth={1.5}/>
                                    <Text className="font-poppins text-[#DAA520]">
                                        {userProfile?.college?.location}
                                    </Text>
                                </View>
                                <Text className="text-base font-poppins text-gray-700 mb-4 text-center">
                                    {userProfile?.college?.about}
                                </Text>
                            </ScrollView>
                        </View>
                    </TouchableWithoutFeedback>

                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}
