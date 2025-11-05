import {Modal, View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback} from "react-native";
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
    const [selectedGroup, setSelectedGroup] = useState<string | null>(type === "alumni" ? Object.keys(alumniFilterOptions)[0] : Object.keys(CompanyFilterOptions)[0]);

    return (
        <Modal
            transparent
            visible={visible}
            animationType="slide"
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View className="flex-1 bg-black/50 justify-end items-center">
                    <TouchableWithoutFeedback>
                        <View className="bg-white w-full min-h-[71%] max-h-[71%] rounded-t-[25px] pb-5">
                            {/* Header */}
                            <View className="bg-gray-200/75 w-[50px] h-[5px] self-center rounded-full mt-2 mb-[12px]"/>
                            <View className="flex flex-row justify-between items-center mb-4 px-5">
                                <Text className="font-poppinsMedium text-[20px]">{title}</Text>
                                <TouchableOpacity onPress={() => {
                                    filterOptions && setFilterOptions((prev) => {
                                        const resetOptions = {} as typeof prev;
                                        Object.entries(prev).forEach(([groupName, filterItems]) => {
                                            resetOptions[groupName] = filterItems.map((item) => ({
                                                ...item,
                                                selected: false
                                            }));
                                        });
                                        return resetOptions;
                                    });
                                }}>
                                    <Text className="font-poppins text-red-500 text-lg">clear</Text>
                                </TouchableOpacity>
                            </View>
                            <View className="flex flex-row min-h-[80%] max-h-[80%] pb-5">
                                <ScrollView
                                    className="bg-gray-100/75 rounded-r-3xl min-w-[50%] max-w-[52%]">
                                    <View>
                                        {Object.entries(filterOptions)?.map(([groupName, filterItems]) => (
                                            <TouchableOpacity
                                                className={`flex flex-row items-center gap-3 pr-3 pl-2 py-2 ${selectedGroup === groupName ? 'bg-primary/10' : 'bg-transparent'} border-b-[1px] border-gray-200/50`}
                                                onPress={() => setSelectedGroup(groupName)} key={groupName}>
                                                <View
                                                    className={`${selectedGroup === groupName ? 'bg-[#006a63]' : 'bg-gray-50'} w-2 h-full rounded-full`}/>
                                                <Text
                                                    className={`font-poppins ${selectedGroup === groupName ? 'text-[#006a63]' : 'text-black'} text-[15px] py-1`}>{groupName}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </ScrollView>
                                <ScrollView className="px-3 my-2">
                                    {selectedGroup && filterOptions[selectedGroup]?.map((item, index) => (
                                        <TouchableOpacity className="flex flex-row items-center my-3 px-3"
                                                          key={index}
                                                          onPress={() => {
                                                              setFilterOptions((prev) => ({
                                                                      ...prev,
                                                                      [selectedGroup]: prev[selectedGroup].map((d) =>
                                                                          d.id === item.id ? {
                                                                              ...d,
                                                                              selected: !d.selected
                                                                          } : d
                                                                      )
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
                                </ScrollView>
                            </View>

                            <View className="flex flex-row justify-center items-center gap-3 px-5">
                                <TouchableOpacity
                                    className="flex flex-1 flex-row justify-center items-center border border-gray-300 py-3 rounded-2xl"
                                    onPress={() => {
                                        onClose();
                                    }}>
                                    <Text className="text-gray-700 font-poppinsMedium text-lg">Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className="flex-1 bg-primary py-3 rounded-2xl items-center justify-center"
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
