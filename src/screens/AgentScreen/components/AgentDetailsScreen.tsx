"use client"

import {useState, useEffect} from "react"
import {View, Text, TextInput, TouchableOpacity, ScrollView, Switch} from "react-native"
import BackIcon from "../../../assets/svg/BackIcon.svg"
import {useAppNavigation} from "../../../common/navigationHelper.ts"
import {CalendarFold, ChevronDown, Timer} from "lucide-react-native"
import WorkingHoursModal from "./WorkingHoursModal.tsx"
import CommonPickerModal from "./CommonPickerModal.tsx"
import axios from "axios"
import {BASE_URL} from "../../../../test"
import Toast from "react-native-toast-message"
import DatepickerModal from "./DatePickerModal.tsx";
import {useRoute} from "@react-navigation/core";

type PickerType = "language" | "voice" | "accent" | "phone"

function minutesTo12hLabel(total: number) {
    const h24 = Math.floor(total / 60)
    const m = total % 60
    const ampm = h24 >= 12 ? "pm" : "am"
    const h12 = h24 % 12 === 0 ? 12 : h24 % 12
    const mm = m.toString().padStart(2, "0")
    return `${h12}:${mm} ${ampm}`
}

function fmtDDMMYY(d?: Date | null) {
    if (!d) return ""
    const dd = String(d.getDate()).padStart(2, "0")
    const mm = String(d.getMonth() + 1).padStart(2, "0")
    const yy = String(d.getFullYear()).slice(-2)
    return `${dd}-${mm}-${yy}`
}

export default function AgentDetailsScreen() {
    const route = useRoute();
    const {screen, agentData} = route.params as {
        screen: string;
        agentData: string;
    };
    console.log("Hii ", screen)
    const navigation = useAppNavigation()
    const [enableAgent, setEnableAgent] = useState(true)
    const [agentName, setAgentName] = useState("")
    const [language, setLanguage] = useState("")
    const [voice, setVoice] = useState("")
    const [role, setRole] = useState("")
    const [accent, setAccent] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("+1 8523647")
    const [trainingData, setTrainingData] = useState("")

    const [pickerVisible, setPickerVisible] = useState(false)
    const [pickerType, setPickerType] = useState<PickerType | null>(null)
    const [hoursVisible, setHoursVisible] = useState(false)

    const [workingHours, setWorkingHours] = useState<{ from: number; to: number }>({from: 540, to: 1020})

    const [languageId, setLanguageId] = useState<string>("")
    const [voiceId, setVoiceId] = useState<string>("")
    const [accentId, setAccentId] = useState<string>("")
    const [numberId, setNumberId] = useState<string>("")

    const [dateModalVisible, setDateModalVisible] = useState(false)
    const [dateFrom, setDateFrom] = useState<Date | null>(null)
    const [dateTo, setDateTo] = useState<Date | null>(null)

    const [schedHoursVisible, setSchedHoursVisible] = useState(false)
    const [schedulingTime, setSchedulingTime] = useState<{ from: number; to: number }>({from: 600, to: 900})

    const openPicker = (type: PickerType) => {
        setPickerType(type)
        setPickerVisible(true)
    }

    const handlePickerSelect = (opt: { label: string; value: string }) => {
        if (!pickerType) return
        if (pickerType === "language") {
            setLanguage(opt.label)
            setLanguageId(opt.value)
        }
        if (pickerType === "voice") {
            setVoice(opt.label)
            setVoiceId(opt.value)
        }
        if (pickerType === "accent") {
            setAccent(opt.label)
            setAccentId(opt.value)
        }
        if (pickerType === "phone") {
            setPhoneNumber(opt.label)
            setNumberId(opt.value)
        }
    }

    return (
        <View className="flex-1 bg-gray-50">
            {/* Header */}
            <View className="bg-primary px-6 py-5">
                <View className="flex-row items-center">
                    <TouchableOpacity className="mr-4" onPress={() => navigation.goBack()}>
                        <BackIcon/>
                    </TouchableOpacity>
                    <Text className="text-white text-lg font-poppinsSemiBold">Agent Details</Text>
                </View>
            </View>

            <ScrollView className="flex-1 px-5">
                {/* Profile Section */}
                {screen === 'EditAgent' &&
                    <View className="flex flex-row justify-between items-center pb-4 py-6">
                        <View className="flex flex-row">
                            <View className="w-12 h-12 bg-teal-600 rounded-full items-center justify-center mr-4">
                                <Text className="text-white text-lg font-poppinsSemiBold">A</Text>
                            </View>
                            <View className="">
                                <Text className="text-black text-base font-poppinsSemiBold">Adam</Text>
                                <Text className="text-gray-500 text-base font-poppinsMedium">A1007</Text>
                            </View>
                        </View>
                        <View className="flex flex-col justify-center items-center gap-1">
                            <Text className="text-slate-600 text-sm font-poppinsMedium mr-2">Enable Agent</Text>
                            <Switch
                                value={enableAgent}
                                onValueChange={setEnableAgent}
                                trackColor={{false: "#767577", true: "#d1d5db"}}
                                thumbColor={enableAgent ? "#178671" : "#f4f3f4"}
                            />
                        </View>
                    </View>
                }

                {/* Agent Name */}
                <View className="mb-6">
                    <Text className="text-black text-base font-poppinsSemiBold mt-4 mb-2">Agent name</Text>
                    <TextInput
                        value={agentName}
                        onChangeText={setAgentName}
                        className="bg-white border border-gray-200 rounded-lg px-4 py-4 text-black font-poppinsMedium"
                        placeholder="Agent name"
                        placeholderTextColor="#9CA3AF"
                    />
                </View>

                {/* Language */}
                <View className="mb-6">
                    <Text className="text-black text-base font-poppinsSemiBold mb-2">Language</Text>
                    <TouchableOpacity
                        className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex-row justify-between items-center"
                        onPress={() => openPicker("language")}
                    >
                        <Text className="text-gray-500 py-1 font-poppinsMedium">{language}</Text>
                        <ChevronDown color={"#889baf"}/>
                    </TouchableOpacity>
                </View>

                {/* Voice */}
                <View className="mb-6">
                    <Text className="text-black text-base font-poppinsSemiBold mb-2">Voice</Text>
                    <TouchableOpacity
                        className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex-row justify-between items-center"
                        onPress={() => openPicker("voice")}
                    >
                        <Text className="text-gray-500 py-1 font-poppinsMedium">{voice}</Text>
                        <ChevronDown color={"#889baf"}/>
                    </TouchableOpacity>
                </View>

                {/* Role/Designation */}
                <View className="mb-6">
                    <Text className="text-black text-base font-poppinsSemiBold mb-2">Role/Designation</Text>
                    <TextInput
                        value={role}
                        onChangeText={setRole}
                        className="bg-white border border-gray-200 rounded-lg px-4 py-4 text-gray-500 font-poppinsMedium"
                        placeholder="Role/Designation"
                        placeholderTextColor="#9CA3AF"
                    />
                </View>

                {/* Accent */}
                <View className="mb-6">
                    <Text className="text-black text-base font-poppinsSemiBold mb-2">Accent</Text>
                    <TouchableOpacity
                        className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex-row justify-between items-center"
                        onPress={() => openPicker("accent")}
                    >
                        <Text className="text-gray-500 py-1 font-poppinsMedium">{accent}</Text>
                        <ChevronDown color={"#889baf"}/>
                    </TouchableOpacity>
                </View>

                {/* Phone Numbers */}
                <View className="mb-4">
                    <Text className="text-black text-base font-poppinsSemiBold mb-2">Phone numbers</Text>
                    <TouchableOpacity
                        className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex-row justify-between items-center"
                        onPress={() => openPicker("phone")}
                    >
                        <View className="flex-row items-center">
                            <Text className="text-red-500 font-poppinsMedium mr-2">🇨🇦</Text>
                            <Text className="text-gray-500 py-1 font-poppinsMedium">{phoneNumber}</Text>
                        </View>
                        <ChevronDown color={"#889baf"}/>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity className="mb-6 self-end">
                    <Text className="text-teal-600 text-base font-poppinsMedium underline">Add another phone
                        number</Text>
                </TouchableOpacity>

                {/* Working Time */}
                <View className="mb-6">
                    <View className="flex-row items-center justify-between mb-2">
                        <Text className="text-black text-base font-poppinsSemiBold">Working Time</Text>
                        <View className="flex-row items-center">
                            <Text className="text-gray-500 text-base font-poppinsMedium mr-2">24 Hr</Text>
                            <View
                                className="w-5 h-5 bg-teal-600 rounded border-2 border-teal-600 items-center justify-center">
                                <Text className="text-white text-xs font-poppinsSemiBold">✓</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => setHoursVisible(true)}
                        className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex-row justify-between items-center"
                    >
                        <Text className="text-gray-500 py-1 font-poppinsMedium">
                            {minutesTo12hLabel(workingHours.from)} to {minutesTo12hLabel(workingHours.to)}
                        </Text>
                        <Timer color={"#889baf"} size={22}/>
                    </TouchableOpacity>
                </View>

                {/* Training Data */}
                <View className="mb-4">
                    <Text className="text-black text-base font-poppinsSemiBold mb-2">Training data</Text>
                    <TextInput
                        value={trainingData}
                        onChangeText={setTrainingData}
                        className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-500 font-poppinsMedium h-32"
                        placeholder="Type data"
                        placeholderTextColor="#9CA3AF"
                        multiline
                        textAlignVertical="top"
                    />
                </View>

                <TouchableOpacity className="mb-6">
                    <Text className="text-teal-600 text-base font-poppinsMedium underline text-right">View Hint</Text>
                </TouchableOpacity>

                {/* Scheduling Section */}
                <View className="flex-row items-center mb-4">
                    <Text className="text-gray-800 text-base font-poppinsSemiBold mr-2">Scheduling</Text>
                    <Text className="text-gray-400 text-sm font-poppinsMedium">(Optional)</Text>
                </View>

                {/* Date Range */}
                <Text className="text-gray-800 text-base font-poppinsSemiBold mb-2">Date range</Text>
                <TouchableOpacity
                    className="bg-white border border-gray-200 rounded-lg px-4 py-4 flex-row items-center justify-between mb-4"
                    onPress={() => setDateModalVisible(true)}
                    activeOpacity={0.8}
                >
                    <Text className="text-gray-800 font-poppinsMedium flex-1">
                        {dateFrom && dateTo ? `${fmtDDMMYY(dateFrom)} to ${fmtDDMMYY(dateTo)}` : "from date — to date"}
                    </Text>
                    <CalendarFold color={"#889baf"} size={22}/>
                </TouchableOpacity>

                {/* Time Range */}
                <Text className="text-gray-800 text-base font-poppinsSemiBold mb-2">Time range</Text>
                <TouchableOpacity
                    className="bg-white border border-gray-200 rounded-lg px-4 py-4 flex-row items-center justify-between mb-8"
                    onPress={() => setSchedHoursVisible(true)}
                    activeOpacity={0.8}
                >
                    <Text className="text-gray-800 font-poppinsMedium flex-1">
                        {`${minutesTo12hLabel(schedulingTime.from)} to ${minutesTo12hLabel(schedulingTime.to)}`}
                    </Text>
                    <CalendarFold color={"#889baf"} size={22}/>
                </TouchableOpacity>
                <View className="min-h-[100px] bg-transparent min-w-1"/>
            </ScrollView>

            {/* Submit Button */}
            <View className="absolute bottom-0 left-0 right-0">
                <TouchableOpacity
                    className="bg-teal-600 py-5"
                    onPress={() => {
                        function startOfDay(d: Date) {
                            const x = new Date(d)
                            x.setHours(0, 0, 0, 0)
                            return x
                        }

                        function endOfDay(d: Date) {
                            const x = new Date(d)
                            x.setHours(23, 59, 59, 0)
                            return x
                        }

                        if(!agentName || !languageId || !voiceId || !role || !accentId || !workingHours.from || !workingHours.from || !numberId ) {
                            Toast.show({
                                type: 'error',
                                text1: 'Invalid Data!',
                                text2: 'Fill all required details',
                                position: "top"
                            });
                            return
                        }

                        const payload = {
                            name: agentName || "Alice",
                            language: languageId || "68d64c7312ffa8e986951972",
                            voice: voiceId || "68d64c7312ffa8e98695197d",
                            role: role || "Support",
                            accent: accentId || "68d64c7312ffa8e986951980",
                            number: numberId || "507f1f77bcf86cd799439011",
                            workingHours: {
                                from: workingHours.from,
                                to: workingHours.to,
                            },
                            context: trainingData || "General inquiries",
                            scheduling: {
                                date:
                                    dateFrom && dateTo
                                        ? {
                                            from: startOfDay(dateFrom).toISOString(),
                                            to: endOfDay(dateTo).toISOString(),
                                        }
                                        : undefined,
                                time: {
                                    from: schedulingTime.from,
                                    to: schedulingTime.to,
                                },
                            },
                        }
                        console.log("Agent ", payload)

                        axios
                            .post(`${BASE_URL}/agents`, payload)
                            .then((res) => {
                                console.log("Created agent ", res.data)
                            })
                            .catch((err) => {
                                Toast.show({
                                    type: "error",
                                    text1: "Something went wrong",
                                    text2: err.message,
                                })
                            })
                    }}
                >
                    <Text className="text-white text-center text-lg font-poppinsSemiBold">Submit</Text>
                </TouchableOpacity>
            </View>

            {/* Modals */}
            <CommonPickerModal
                visible={pickerVisible}
                type={(pickerType as any) || "language"}
                selectedValue={
                    pickerType === "language"
                        ? language
                        : pickerType === "voice"
                            ? voice
                            : pickerType === "accent"
                                ? accent
                                : pickerType === "phone"
                                    ? phoneNumber
                                    : undefined
                }
                onSelect={handlePickerSelect}
                onClose={() => {
                    setPickerVisible(false)
                    setPickerType(null)
                }}
            />

            <WorkingHoursModal
                visible={hoursVisible}
                initialFrom={workingHours.from}
                initialTo={workingHours.to}
                onClose={() => setHoursVisible(false)}
                onSave={({from, to}) => setWorkingHours({from, to})}
            />

            <DatepickerModal
                visible={dateModalVisible}
                initialFrom={dateFrom || undefined}
                initialTo={dateTo || undefined}
                onClose={() => setDateModalVisible(false)}
                onSave={({from, to}) => {
                    setDateFrom(from)
                    setDateTo(to)
                }}
            />

            <WorkingHoursModal
                visible={schedHoursVisible}
                initialFrom={schedulingTime.from}
                initialTo={schedulingTime.to}
                onClose={() => setSchedHoursVisible(false)}
                onSave={({from, to}) => setSchedulingTime({from, to})}
            />
        </View>
    )
}
