import {Modal, View, Text, TouchableOpacity, Pressable} from "react-native";
import {X} from "lucide-react-native";
import {useState} from "react";

interface FilterModalProps {
    visible: boolean;
    title?: string;
    onClose: () => void;
}

export default function AlumniFilterModal({visible, title, onClose}: FilterModalProps) {

    const [filterOptions, setFilterOptions] = useState<typeof filterOptions>({
        graduationYears: [
            {id: 1, label: "2025", selected: false},
            {id: 2, label: "2024", selected: false},
            {id: 3, label: "2023", selected: false},
            {id: 4, label: "2022", selected: false},
            {id: 5, label: "2021", selected: false},
            {id: 6, label: "2020", selected: false},
        ],
        degrees: [
            {id: 1, label: "B.Tech - CSE", selected: false},
            {id: 2, label: "B.Tech - ECE", selected: false},
            {id: 3, label: "B.Tech - ME", selected: false},
            {id: 4, label: "MCA", selected: false},
            {id: 5, label: "M.Tech - CSE", selected: false},
        ],
        companies: [
            {id: 1, label: "Google", selected: false},
            {id: 2, label: "Microsoft", selected: false},
            {id: 3, label: "Amazon", selected: false},
            {id: 4, label: "Infosys", selected: false},
            {id: 5, label: "TCS", selected: false},
            {id: 6, label: "Wipro", selected: false},
        ],
    });

    return (
        <Modal
            transparent
            visible={visible}
            animationType="slide"
        >
            <Pressable className="flex-1 bg-black/50 justify-end items-center" onPress={onClose}>
                <View className="bg-white w-full rounded-t-2xl p-5"
                      onStartShouldSetResponder={() => true}>
                    {/* Header */}
                    <View className="flex flex-row justify-between items-center mb-4">
                        <Text className="font-poppinsMedium text-xl">{title}</Text>
                        <TouchableOpacity onPress={onClose}>
                            <X size={20} color={'#6b7280'}/>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text className="font-poppinsMedium text-xl mb-2">Degree</Text>
                        {filterOptions?.degrees?.map((degree, index) => (
                            <TouchableOpacity className="flex flex-row items-center my-3 px-3" key={index}
                                              onPress={() => {
                                              }}>
                                <View
                                    className={`w-5 h-5 rounded border items-center justify-center mr-3 ${
                                        degree?.selected ? "bg-teal-600 border-teal-600" : "border-gray-300"
                                    }`}
                                >
                                    {degree?.selected && (
                                        <Text className="text-white text-xs font-poppinsSemiBold">✓</Text>
                                    )}
                                </View>
                                <Text className="font-poppins text-gray-700 text-lg">{degree?.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </Pressable>
        </Modal>
    )
}
