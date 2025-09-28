"use client"

import { useEffect, useMemo, useState } from "react"
import { Modal, View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native"
import axios from "axios"
import { BASE_URL } from "../../../../test"
import Toast from "react-native-toast-message"

type PickerType = "language" | "voice" | "accent" | "phone"
type Option = { label: string; value: string }

interface CommonPickerModalProps {
    visible: boolean
    type: PickerType
    title?: string
    selectedValue?: string
    onClose: () => void
    onSelect: (option: Option) => void
}

export default function CommonPickerModal({
                                              visible,
                                              type,
                                              title,
                                              selectedValue,
                                              onClose,
                                              onSelect,
                                          }: CommonPickerModalProps) {
    const [loading, setLoading] = useState(false)
    const [options, setOptions] = useState<Option[]>([])
    const [error, setError] = useState<string | null>(null)

    const resolvedTitle = useMemo(() => {
        if (title) return title
        const t = type.charAt(0).toUpperCase() + type.slice(1)
        return `Select ${t === "Phone" ? "Phone Number" : t}`
    }, [title, type])

    useEffect(() => {
        let mounted = true

        async function load() {
            setLoading(true)
            setOptions([])
            setError(null)
            try {
                if (type === "language") {
                    axios
                        .get(`${BASE_URL}/languages`)
                        .then((res) => {
                            const data = res.data?.data?.languages?.map((item: any) => ({
                                label: item.lang,
                                value: item._id,
                            }))
                            setOptions(data)
                        })
                        .catch((err) => {
                            Toast.show({
                                type: "error",
                                text1: "Failed to fetch languages",
                                text2: err.message,
                            })
                            setError(err.message)
                        })
                } else if (type === "voice") {
                    axios
                        .get(`${BASE_URL}/voices`)
                        .then((res) => {
                            console.log("Test ", res.data)
                            const data = res.data?.data?.voices?.map((item: any) => ({
                                label: item.voice,
                                value: item._id,
                            }))
                            setOptions(data)
                        })
                        .catch((err) => {
                            Toast.show({
                                type: "error",
                                text1: "Failed to fetch voices",
                                text2: err.message,
                            })
                            setError(err.message)
                        })
                } else if (type === "accent") {
                    axios
                        .get(`${BASE_URL}/accents`)
                        .then((res) => {
                            console.log("Test ", res.data)
                            const data = res.data?.data?.accents?.map((item: any) => ({
                                label: item.accent,
                                value: item._id,
                            }))
                            setOptions(data)
                        })
                        .catch((err) => {
                            Toast.show({
                                type: "error",
                                text1: "Failed to fetch voices",
                                text2: err.message,
                            })
                            setError(err.message)
                        })
                } else if (type === "phone") {
                    axios
                        .get(`${BASE_URL}/numbers/all`)
                        .then((res) => {
                            // Attempt to normalize typical API shape; adjust if backend differs
                            const list = res?.data?.data?.numbers || res?.data?.data || res?.data || []
                            const data = (list as any[]).map((item: any) => ({
                                label: item.label || item.display || item.number || item.phone || String(item?.e164 || ""),
                                value: item._id || item.id || item.value || item.number || String(item?.e164 || ""),
                            }))
                            setOptions(data)
                        })
                        .catch((err) => {
                            Toast.show({
                                type: "error",
                                text1: "Failed to fetch phone numbers",
                                text2: err.message,
                            })
                            setError(err.message)
                        })
                }
                console.log(options)
            } catch (e) {
                if (mounted) setError("Failed to load options")
            } finally {
                if (mounted) setLoading(false)
            }
        }

        if (visible) load()
        return () => {
            mounted = false
        }
    }, [visible, type])

    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <View className="flex-1">
                {/* Overlay */}
                <TouchableOpacity activeOpacity={1} onPress={onClose} className="absolute inset-0 bg-black/50" />
                {/* Centered Card */}
                <View className="flex-1 items-center justify-center px-6">
                    <View className="w-full max-w-[560px] rounded-2xl bg-white p-5">
                        <Text className="text-black text-lg font-poppinsSemiBold mb-4">{resolvedTitle}</Text>

                        {loading ? (
                            <View className="py-8 items-center justify-center">
                                <ActivityIndicator color="#0d9488" />
                                <Text className="text-black font-poppinsMedium mt-3">Loading...</Text>
                            </View>
                        ) : error ? (
                            <View className="py-6">
                                <Text className="text-red-600 font-poppinsMedium">{error}</Text>
                            </View>
                        ) : (
                            <ScrollView className="max-h-[320px]">
                                {options.map((opt) => {
                                    const selected = selectedValue === opt.label || selectedValue === opt.value
                                    return (
                                        <TouchableOpacity
                                            key={opt.value}
                                            className={`flex-row items-center justify-between border-b border-gray-100 px-3 py-3 ${
                                                selected ? "bg-teal-50" : "bg-white"
                                            }`}
                                            onPress={() => {
                                                onSelect(opt)
                                                onClose()
                                            }}
                                        >
                                            <Text className="text-black font-poppinsMedium">{opt.label}</Text>
                                            <View
                                                className={`w-5 h-5 rounded-full border ${
                                                    selected ? "bg-teal-600 border-teal-600" : "border-gray-300"
                                                }`}
                                            />
                                        </TouchableOpacity>
                                    )
                                })}
                            </ScrollView>
                        )}

                        <View className="mt-4 flex-row justify-end">
                            <TouchableOpacity onPress={onClose} className="px-4 py-2 rounded-lg bg-gray-100">
                                <Text className="text-black font-poppinsSemiBold">Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
