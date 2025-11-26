import {Modal, ScrollView, Text, TouchableWithoutFeedback, View} from "react-native";
import InstitutionImage from "../../assets/svg/Institution.svg";

interface InstitutionModalProps {
    visible: boolean;
    onClose: () => void;
}

export default function InstitutionModal({visible, onClose}: InstitutionModalProps) {
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
                    <TouchableWithoutFeedback onPress={() => {}}>
                        <View className="bg-white rounded-3xl max-h-[70%] overflow-hidden">
                            <ScrollView
                                className="px-5 py-6"
                                showsVerticalScrollIndicator={true}
                                horizontal={false}
                            >
                                <View className="w-full flex items-center max-h-[165px]">
                                    <InstitutionImage fill="#006a63" width={200} height={200}/>

                                </View>
                                <Text className="text-2xl font-bold mb-3 text-gray-900 text-center font-poppinsMedium">
                                    Deccan College of Engineering
                                </Text>

                                <Text className="text-base font-poppins text-gray-700 mb-4 text-center">
                                    Deccan College of Engineering is a premier technical institution established in 1995, offering undergraduate and postgraduate programs in various engineering disciplines. With a strong focus on academic excellence, industry partnerships, and holistic development, the college has consistently produced top-tier engineering talent for leading companies worldwide.
                                </Text>
                            </ScrollView>
                        </View>
                    </TouchableWithoutFeedback>

                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}
