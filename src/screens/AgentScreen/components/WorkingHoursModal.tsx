"use client"

import { useEffect, useState } from "react"
import { Modal, View, Text, TouchableOpacity, TextInput } from "react-native"

interface WorkingHoursModalProps {
    visible: boolean
    initialFrom: number // minutes from 0..1439
    initialTo: number // minutes from 0..1439
    onClose: () => void
    onSave: (value: { from: number; to: number }) => void
}

function pad2(n: number) {
    return n.toString().padStart(2, "0")
}

function toText(minutes: number): string {
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    return `${pad2(h)}:${pad2(m)}`
}

function parseHHMM(s: string): number | null {
    const m = s.trim().match(/^(\d{1,2}):(\d{2})$/)
    if (!m) return null
    const hh = Number(m[1])
    const mm = Number(m[2])
    if (Number.isNaN(hh) || Number.isNaN(mm)) return null
    if (hh < 0 || hh > 23 || mm < 0 || mm > 59) return null
    return hh * 60 + mm
}

export default function WorkingHoursModal({
                                              visible,
                                              initialFrom,
                                              initialTo,
                                              onClose,
                                              onSave,
                                          }: WorkingHoursModalProps) {
    const [fromText, setFromText] = useState(toText(initialFrom))
    const [toTextState, setToTextState] = useState(toText(initialTo))
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (visible) {
            setFromText(toText(initialFrom))
            setToTextState(toText(initialTo))
            setError(null)
        }
    }, [visible, initialFrom, initialTo])

    const handleSave = () => {
        const from = parseHHMM(fromText)
        const to = parseHHMM(toTextState)
        if (from === null || to === null) {
            setError("Please enter valid times in HH:MM (24h) format")
            return
        }
        if (from >= to) {
            setError("Start time must be earlier than end time")
            return
        }
        onSave({ from, to })
        onClose()
    }

    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <View className="flex-1">
                {/* Overlay */}
                <TouchableOpacity activeOpacity={1} onPress={onClose} className="absolute inset-0 bg-black/50" />
                {/* Centered Card */}
                <View className="flex-1 items-center justify-center px-6">
                    <View className="w-full max-w-[560px] rounded-2xl bg-white p-5">
                        <Text className="text-black text-lg font-poppinsSemiBold mb-4">Set Working Hours</Text>

                        <View className="gap-4">
                            <View>
                                <Text className="text-black font-poppinsMedium mb-2">From (24h HH:MM)</Text>
                                <TextInput
                                    className="rounded-lg border border-gray-200 px-4 py-3 text-black font-poppinsMedium"
                                    placeholder="09:00"
                                    placeholderTextColor="#9CA3AF"
                                    keyboardType="numbers-and-punctuation"
                                    value={fromText}
                                    onChangeText={(t) => {
                                        setFromText(t)
                                        if (error) setError(null)
                                    }}
                                />
                            </View>

                            <View>
                                <Text className="text-black font-poppinsMedium mb-2">To (24h HH:MM)</Text>
                                <TextInput
                                    className="rounded-lg border border-gray-200 px-4 py-3 text-black font-poppinsMedium"
                                    placeholder="17:00"
                                    placeholderTextColor="#9CA3AF"
                                    keyboardType="numbers-and-punctuation"
                                    value={toTextState}
                                    onChangeText={(t) => {
                                        setToTextState(t)
                                        if (error) setError(null)
                                    }}
                                />
                            </View>

                            {error ? <Text className="text-red-600 font-poppinsMedium">{error}</Text> : null}
                        </View>

                        <View className="mt-5 flex-row justify-end gap-3">
                            <TouchableOpacity onPress={onClose} className="px-4 py-2 rounded-lg bg-gray-100">
                                <Text className="text-black font-poppinsSemiBold">Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleSave} className="px-4 py-2 rounded-lg bg-teal-600">
                                <Text className="text-white font-poppinsSemiBold">Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
