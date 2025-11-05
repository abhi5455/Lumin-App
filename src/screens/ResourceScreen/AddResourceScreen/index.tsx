import {ChevronLeft, PlusIcon, X} from "lucide-react-native";
import {ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useAppNavigation} from "../../../common/navigationHelper.ts";
import {SafeAreaView} from "react-native-safe-area-context";
import {useEffect, useState} from "react";
import AddTagModal from "./components/AddTagModal.tsx";

export default function AddResourceScreen() {
    const navigation = useAppNavigation()
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [tags, setTags] = useState<string[]>([])
    const [tagModalVisible, setTagModalVisible] = useState(false)

    useEffect(() => {
        StatusBar.setBarStyle('light-content')
        StatusBar.setBackgroundColor(tagModalVisible ? '#01584f' : '#00b19f')
    }, [tagModalVisible])

    return (
        <SafeAreaView className="flex-1">
            <View className="flex flex-row items-center gap-4 bg-primary h-[65px] px-5">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={25} color={"#FFFFFF"}/>
                </TouchableOpacity>
                <Text className="font-poppinsLight text-white text-2xl">Add New Resource</Text>
            </View>

            <View className="bg-primary flex-1">
                <View className="bg-white flex-1 justify-between rounded-t-[30px] py-5 px-5">
                    <ScrollView className="flex flex-col">
                        {/*Title*/}
                        <View
                            className="relative flex flex-row justify-start items-center border border-gray-300 rounded-xl px-4 mb-5 mt-3">
                            <Text
                                className={`${title === "" ? 'hidden' : 'absolute'} top-[-10px] left-[7px] z-50 px-1 bg-white text-gray-300 font-poppinsMedium text-md ml-2`}>Title</Text>
                            <TextInput
                                placeholder={"Enter title"} className="text-black flex-1 h-[50px] text-lg"
                                placeholderTextColor={"#999999"}
                                value={title}
                                onChangeText={setTitle}
                            />
                        </View>

                        {/*Content*/}
                        <View
                            className="relative flex flex-row justify-start items-center border border-gray-300 rounded-xl px-4 mb-5 mt-1">
                            <Text
                                className={`${content === "" ? 'hidden' : 'absolute'} top-[-10px] left-[7px] z-50 px-1 bg-white text-gray-300 font-poppinsMedium text-md ml-2`}>Content</Text>
                            <TextInput
                                placeholder={"Enter content"}
                                className="text-black flex-1 h-[50px] text-lg min-h-[200px] align-top pt-4"
                                placeholderTextColor={"#999999"}
                                multiline={true}
                                value={content}
                                onChangeText={setContent}
                            />
                        </View>

                        {/*Tags*/}
                        <View className="relative flex flex-col gap-2 mb-4 mt-1">
                            <View
                                className="relative flex flex-col items-start border border-gray-300 rounded-xl px-4 py-2 pb-3 gap-4">
                                <Text
                                    className={`absolute top-[-10px] left-[7px] z-50 px-1 bg-white text-gray-300 font-poppinsMedium text-md ml-2`}>Tags {tags?.length}/3</Text>
                                {/*<Text className="text-black font-poppinsMedium text-md">Tags {tags?.length}/3</Text>*/}
                                <View className="flex flex-row justify-start items-center gap-3 flex-wrap mt-5">
                                    {tags?.map((tag, index) => (
                                        <View
                                            className="flex flex-row justify-start items-center bg-primary/10 gap-1 rounded-xl py-2 px-4"
                                            key={index}>
                                            <TouchableOpacity onPress={() => {
                                                setTags(prev => prev.filter(t => t !== tag))
                                            }}>
                                                <X size={19} color={'rgb(0 0 0 / 0.65)'}/>
                                            </TouchableOpacity>
                                            <Text className="text-[#006a63] font-poppinsMedium text-md">{tag}</Text>
                                        </View>
                                    ))}
                                    {tags.length < 3 &&
                                        <TouchableOpacity
                                            className="flex flex-row justify-start items-center gap-1 border border-dashed border-gray-300 rounded-xl py-2 px-4"
                                            onPress={() => {
                                                setTagModalVisible(true)
                                            }}>
                                            <PlusIcon size={20}/>
                                            <Text className="text-black font-poppinsMedium text-md">Add New</Text>
                                        </TouchableOpacity>
                                    }
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    <View className="flex flex-row justify-center items-center gap-3 px-4 pt-3">
                        <TouchableOpacity
                            className="flex-1 bg-primary py-4 rounded-2xl items-center justify-center"
                            onPress={() => {
                            }}>
                            <Text className="text-white font-poppinsMedium text-lg">Create</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <AddTagModal visible={tagModalVisible}
                         onClose={() => {
                             setTagModalVisible(false)
                         }}
                         setTags={setTags}/>
        </SafeAreaView>
    )
}
