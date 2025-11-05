import {Modal, View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback} from "react-native";
import {Building2, CalendarDays, Funnel, GraduationCap, X} from "lucide-react-native";
import {useState} from "react";

interface FilterModalProps {
    visible: boolean;
    title?: string;
    onClose: () => void;
    type: "alumni" | "companies";
}

const CompanyFilterOptions = {
    Department: [
        {id: 1, label: "B.Tech - CSE", selected: false},
        {id: 2, label: "B.Tech - ECE", selected: false},
        {id: 3, label: "B.Tech - ME", selected: false},
        {id: 4, label: "B.Tech - Civil", selected: false},
        {id: 5, label: "B.Tech - RAI", selected: false},
        {id: 6, label: "B.Tech - EEE", selected: false},
        {id: 7, label: "MCA", selected: false},
        {id: 8, label: "M.Tech - CSE", selected: false},
        {id: 9, label: "M.Tech - ECE", selected: false},
        {id: 10, label: "M.Tech - ME", selected: false},
        {id: 11, label: "M.Tech - Civil", selected: false},
        {id: 12, label: "M.Tech - EEE", selected: false},
    ],
    Package: [
        {id: 1, label: "1-5 LPA", selected: false},
        {id: 2, label: "5-10 LPA", selected: false},
        {id: 3, label: "10-15 LPA", selected: false},
        {id: 4, label: "15-20 LPA", selected: false},
        {id: 5, label: "20-30 LPA", selected: false},
        {id: 6, label: "30-50 LPA", selected: false},
        {id: 7, label: "50+ LPA", selected: false},
    ],
    RecruitedYear: [
        {id: 1, label: "2025", selected: false},
        {id: 2, label: "2024", selected: false},
        {id: 3, label: "2023", selected: false},
        {id: 4, label: "2022", selected: false},
        {id: 5, label: "2021", selected: false},
        {id: 6, label: "2020", selected: false},
        {id: 7, label: "2019", selected: false},
        {id: 8, label: "2018", selected: false},
        {id: 9, label: "2017", selected: false},
        {id: 10, label: "2016", selected: false},
        {id: 11, label: "2015", selected: false},
        {id: 12, label: "2014", selected: false},
        {id: 13, label: "2013", selected: false},
        {id: 14, label: "2012", selected: false},
        {id: 15, label: "2011", selected: false},
        {id: 16, label: "2010", selected: false},
    ],
};

const alumniFilterOptions = {
    GraduationYears: [
        {id: 1, label: "2025", selected: false},
        {id: 2, label: "2024", selected: false},
        {id: 3, label: "2023", selected: false},
        {id: 4, label: "2022", selected: false},
        {id: 5, label: "2021", selected: false},
        {id: 6, label: "2020", selected: false},
    ],
    Degrees: [
        {id: 1, label: "B.Tech - CSE", selected: false},
        {id: 2, label: "B.Tech - ECE", selected: false},
        {id: 3, label: "B.Tech - ME", selected: false},
        {id: 4, label: "MCA", selected: false},
        {id: 5, label: "M.Tech - CSE", selected: false},
    ],
    Companies: [
        {id: 1, label: "Google", selected: false},
        {id: 2, label: "Microsoft", selected: false},
        {id: 3, label: "Amazon", selected: false},
        {id: 4, label: "Infosys", selected: false},
        {id: 5, label: "TCS", selected: false},
        {id: 6, label: "Wipro", selected: false},
    ],
};

export default function AlumniNCompanyFilterModal({visible, title, onClose, type}: FilterModalProps) {

    const [filterOptions, setFilterOptions] = useState<typeof filterOptions>(type === "alumni" ? alumniFilterOptions : CompanyFilterOptions);

    return (
        <Modal
            transparent
            visible={visible}
            animationType="slide"
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View className="flex-1 bg-black/50 justify-end items-center">
                    <TouchableWithoutFeedback>
                        <View className="bg-white w-full max-h-[70%] rounded-t-[20px] p-5"
                              onStartShouldSetResponder={() => true}>
                            {/* Header */}
                            <View className="flex flex-row justify-between items-center mb-4">
                                <Text className="font-poppinsMedium text-xl">{title}</Text>
                                <TouchableOpacity onPress={onClose}>
                                    <X size={20} color={'#6b7280'}/>
                                </TouchableOpacity>
                            </View>

                            <ScrollView className="mb-4 px-3">
                                {Object.entries(filterOptions)?.map(([groupName, filterItems]) => (
                                    <View key={groupName} className="mb-4">
                                        <View className="flex flex-row items-center gap-2">
                                            {groupName === "GraduationYears" ?
                                                <CalendarDays size={20} color={'#DAA520'} strokeWidth={'1px'}/>
                                                : groupName === "Degrees" ?
                                                    <GraduationCap size={20} color={'#DAA520'} strokeWidth={'1px'}/>
                                                    : groupName === "Companies" ?
                                                        <Building2 size={20} color={'#DAA520'} strokeWidth={'1px'}/>
                                                        : <Funnel size={20} color={'#DAA520'} strokeWidth={'1px'}/>
                                            }
                                            <Text
                                                className="font-poppinsLight text-xl text-[#DAA520]">{groupName}</Text>
                                        </View>
                                        {filterItems?.map((item, index) => (
                                            <TouchableOpacity className="flex flex-row items-center my-3 px-3"
                                                              key={index}
                                                              onPress={() => {
                                                                  setFilterOptions((prev) => ({
                                                                          ...prev,
                                                                          [groupName]: prev[groupName].map((d) => (
                                                                              d.id === item.id ? {
                                                                                  ...d,
                                                                                  selected: !d.selected
                                                                              } : d
                                                                          ))
                                                                      }
                                                                  ))
                                                              }}>
                                                <View
                                                    className={`w-5 h-5 rounded border items-center justify-center mr-3 ${
                                                        item?.selected ? "bg-primary border-primary" : " border-primary"
                                                    }`}
                                                >
                                                    {item?.selected && (
                                                        <Text
                                                            className="text-white text-xs font-poppinsSemiBold">✓</Text>
                                                    )}
                                                </View>
                                                <Text
                                                    className="font-poppins text-gray-700 text-lg">{item?.label}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                ))}
                            </ScrollView>

                            <View className="flex flex-row justify-center items-center gap-3">
                                <TouchableOpacity
                                    className="flex flex-1 flex-row justify-center items-center border border-gray-300 py-3 rounded-xl"
                                    onPress={() => {
                                        onClose();
                                    }}>
                                    <Text className="text-gray-700 font-poppinsMedium text-lg">Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className="flex-1 bg-primary py-3 rounded-xl items-center justify-center"
                                    onPress={() => {
                                        onClose();
                                    }}>
                                    <Text className="text-white font-poppinsMedium text-lg">Apply Filters</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}
