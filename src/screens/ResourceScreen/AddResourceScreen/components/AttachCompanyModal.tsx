import {Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback, TextInput, ScrollView} from "react-native";
import {useEffect, useState} from "react";
import {Delete, Trash, Trash2, X} from "lucide-react-native";
import {ICompany} from "../../../../types/typeCompany.ts";
import Toast from "react-native-toast-message";

interface FilterModalProps {
    visible: boolean;
    onClose: () => void;
    companies: ICompany[];
    attachedCompany: ICompany | null;
    setAttachedCompany: () => void;
}

export default function AttachCompanyModal({
                                               visible,
                                               onClose,
                                               companies,
                                               attachedCompany,
                                               setAttachedCompany
                                           }: FilterModalProps) {
    const [addedTag, setAddedTag] = useState<string>("");
    const [errorFlag, setErrorFlag] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState<ICompany | null>(attachedCompany);

    useEffect(() => {
        setErrorFlag(false)
    }, [addedTag]);

    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View className="flex-1 bg-black/50 justify-center items-center px-4">
                    <TouchableWithoutFeedback>
                        <View className="bg-white w-full rounded-[20px] pb-5 max-h-[50%]">
                            <TouchableOpacity className="flex flex-row justify-between items-center mb-4 px-7 mt-4"
                                              onPress={onClose}>
                                <Text className="font-poppinsMedium text-xl text-center">Attach with Company</Text>
                                <X size={20} color={"#999"} onPress={onClose}/>
                            </TouchableOpacity>
                            <ScrollView className={`flex flex-col rounded-xl px-3 mx-4`}>
                                <View
                                    className="flex flex-col gap-2.5 mb-4">
                                    {companies?.map((company => (
                                            <TouchableOpacity key={company.id} onPress={() => {
                                                setSelectedCompany(company);
                                            }}
                                                              className={`flex w-full justify-center ${selectedCompany === company ? "bg-primary/10 border-[#006a63]/30" : "border-gray-200"} border rounded-md p-2`}>
                                                <Text
                                                    className={`${selectedCompany === company ? "text-[#006a63]" : "text-black"} text-lg font-poppins px-1`}>{company.name}</Text>
                                            </TouchableOpacity>
                                        ))
                                    )}
                                    {/*<TextInput*/}
                                    {/*    placeholder={"Enter Tag Name"} className="text-black flex-1 h-[50px] text-lg"*/}
                                    {/*    placeholderTextColor={errorFlag ? "#f87171" : "#999999"}*/}
                                    {/*    value={addedTag}*/}
                                    {/*    onChangeText={setAddedTag}*/}
                                    {/*/>*/}
                                </View>
                            </ScrollView>

                            {/*<View*/}
                            {/*    className={`flex flex-row justify-start items-center border ${errorFlag ? 'border-red-400' : 'border-gray-300'} rounded-xl px-4 mx-4`}>*/}
                            {/*    <TextInput*/}
                            {/*        placeholder={"Enter Tag Name"} className="text-black flex-1 h-[50px] text-lg"*/}
                            {/*        placeholderTextColor={errorFlag ? "#f87171" : "#999999"}*/}
                            {/*        value={addedTag}*/}
                            {/*        onChangeText={setAddedTag}*/}
                            {/*    />*/}
                            {/*</View>*/}
                            <View className="flex flex-row justify-center items-center gap-3 px-5">
                                <TouchableOpacity
                                    className="flex w-[58px] flex-row justify-center items-center border border-gray-300 py-3 rounded-2xl"
                                    onPress={() => {
                                        setAttachedCompany(null)
                                        onClose();
                                    }}>
                                    {/*<Text className="text-gray-700 font-poppinsMedium text-lg">Cancel</Text>*/}
                                    <Trash2 size={20} color={'#dc2626'}/>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className="flex-1 bg-primary py-3 rounded-xl text-red-600"
                                    onPress={() => {
                                        if (!selectedCompany) {
                                            onClose();
                                            Toast.show({
                                                type: 'error',
                                                text1: 'No Company Selected',
                                                text2: 'Attach button has been clicked but no company was selected.',
                                            })
                                        }
                                        setAttachedCompany(selectedCompany as ICompany);
                                        onClose();
                                    }}
                                >
                                    <Text className="text-white font-poppinsMedium text-center text-lg">Attach</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}
