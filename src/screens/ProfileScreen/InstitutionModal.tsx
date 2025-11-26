import {Image, Modal, Pressable, ScrollView, Text, TouchableWithoutFeedback, View} from "react-native";
import InstitutionImage from '../../assets/svg/Institution.svg';

interface InstitutionModalProps {
    visible: boolean;
    onClose: () => void;
}

export default function InstitutionModal({visible, onClose}: InstitutionModalProps) {

    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
        >
            <Pressable
                className="flex-1 bg-black/50 justify-center px-5"
                onPress={onClose}
            >
                <Pressable
                    className="bg-white rounded-3xl py-4 min-h-[70%] max-h-[70%]"
                    onPress={(e) => e.stopPropagation()}
                >
                        <ScrollView>
                            <View className="flex flex-col items-center bg-white w-full rounded-[25px] p-4">
                            {/*<InstitutionImage/>*/}
                            {/*<Image src={'../../assets/svg/Institution.svg'}/>*/}
                            <Text className="font-poppinsMedium text-xl text-center">Deccan College of Engineering</Text>
                            <Text className="font-poppinsLight text-lg overflow-scroll text-center">{'\u2003'}{'\u2003'}{'\u2003'}Deccan College of Engineering is a premier
                                technical institution established in 1995, offering undergraduate and postgraduate
                                programs in various engineering disciplines. With a strong focus on academic excellence,
                                industry partnerships, and holistic development, the college has consistently produced
                                top-tier engineering talent for leading companies worldwide.Deccan College of Engineering is a premier
                                technical institution established in 1995, offering undergraduate and postgraduate
                                programs in various engineering disciplines. With a strong focus on academic excellence,
                                industry partnerships, and holistic development, the college has consistently produced
                                top-tier engineering talent for leading companies worldwide.Deccan College of Engineering is a premier
                                technical institution established in 1995, offering undergraduate and postgraduate
                                programs in various engineering disciplines. With a strong focus on academic excellence,
                                industry partnerships, and holistic development, the college has consistently produced
                                top-tier engineering talent for leading companies worldwide.Deccan College of Engineering is a premier
                                technical institution established in 1995, offering undergraduate and postgraduate
                                programs in various engineering disciplines. With a strong focus on academic excellence,
                                industry partnerships, and holistic development, the college has consistently produced
                                top-tier engineering talent for leading companies worldwide.Deccan College of Engineering is a premier
                                technical institution established in 1995, offering undergraduate and postgraduate
                                programs in various engineering disciplines. With a strong focus on academic excellence,
                                industry partnerships, and holistic development, the college has consistently produced
                                top-tier engineering talent for leading companies worldwide.</Text>
                            </View>
                        </ScrollView>
                    </Pressable>
            </Pressable>
        </Modal>
    )
}
