"use client"

import { useEffect, useMemo, useState } from "react"
import { Modal, View, Text, TouchableOpacity, ScrollView } from "react-native"

type DatepickerModalProps = {
    visible: boolean
    initialFrom?: string | Date | null
    initialTo?: string | Date | null
    onClose: () => void
    onSave: (value: { from: Date; to: Date }) => void
    title?: string
}

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
function sameDay(a: Date, b: Date) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}
function fmtDDMMYY(d?: Date | null) {
    if (!d) return ""
    const dd = String(d.getDate()).padStart(2, "0")
    const mm = String(d.getMonth() + 1).padStart(2, "0")
    const yy = String(d.getFullYear()).slice(-2)
    return `${dd}-${mm}-${yy}`
}

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"]
const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]

function daysInMonth(year: number, monthIndex: number) {
    // monthIndex 0..11
    return new Date(year, monthIndex + 1, 0).getDate()
}
function firstWeekday(year: number, monthIndex: number) {
    // 0..6 (Sun..Sat)
    return new Date(year, monthIndex, 1).getDay()
}

export default function DatepickerModal({
                                            visible,
                                            initialFrom = null,
                                            initialTo = null,
                                            onClose,
                                            onSave,
                                            title = "Select Date Range",
                                        }: DatepickerModalProps) {
    const today = useMemo(() => startOfDay(new Date()), [])
    const initialFromDate = useMemo(() => (initialFrom ? startOfDay(new Date(initialFrom)) : null), [initialFrom])
    const initialToDate = useMemo(() => (initialTo ? startOfDay(new Date(initialTo)) : null), [initialTo])

    const [viewYear, setViewYear] = useState<number>((initialFromDate || today).getFullYear())
    const [viewMonth, setViewMonth] = useState<number>((initialFromDate || today).getMonth()) // 0..11
    const [fromDate, setFromDate] = useState<Date | null>(initialFromDate)
    const [toDate, setToDate] = useState<Date | null>(initialToDate)
    const [selecting, setSelecting] = useState<"from" | "to">(initialFromDate && !initialToDate ? "to" : "from")

    useEffect(() => {
        if (visible) {
            setFromDate(initialFromDate)
            setToDate(initialToDate)
            setSelecting(initialFromDate && !initialToDate ? "to" : "from")
            setViewYear((initialFromDate || today).getFullYear())
            setViewMonth((initialFromDate || today).getMonth())
        }
    }, [visible, initialFromDate, initialToDate, today])

    const leadingBlanks = firstWeekday(viewYear, viewMonth)
    const totalDays = daysInMonth(viewYear, viewMonth)
    const days: Array<Date | null> = []
    for (let i = 0; i < leadingBlanks; i++) days.push(null)
    for (let d = 1; d <= totalDays; d++) {
        days.push(new Date(viewYear, viewMonth, d))
    }
    // Pad to full weeks
    while (days.length % 7 !== 0) days.push(null)

    function isInRange(d: Date) {
        if (fromDate && toDate) {
            const sd = startOfDay(d).getTime()
            return sd >= fromDate.getTime() && sd <= toDate.getTime()
        }
        return false
    }

    function onDayPress(d: Date) {
        const d0 = startOfDay(d)
        if (selecting === "from") {
            // start new range
            setFromDate(d0)
            setToDate(null)
            setSelecting("to")
        } else {
            // selecting "to"
            if (fromDate && d0.getTime() < fromDate.getTime()) {
                // swap to keep order
                setToDate(fromDate)
                setFromDate(d0)
            } else {
                setToDate(d0)
            }
            setSelecting("from")
        }
    }

    function changeMonth(offset: number) {
        let m = viewMonth + offset
        let y = viewYear
        if (m < 0) {
            m = 11
            y -= 1
        }
        if (m > 11) {
            m = 0
            y += 1
        }
        setViewMonth(m)
        setViewYear(y)
    }

    const canSave = !!fromDate && !!toDate

    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <View className="flex-1">
                {/* Overlay */}
                <TouchableOpacity activeOpacity={1} onPress={onClose} className="absolute inset-0 bg-black/50" />
                {/* Card */}
                <View className="flex-1 items-center justify-center px-6">
                    <View className="w-full max-w-[560px] rounded-2xl bg-white p-5">
                        <Text className="text-black text-lg font-poppinsSemiBold mb-4">{title}</Text>

                        {/* Header month nav */}
                        <View className="flex-row items-center justify-between mb-3">
                            <TouchableOpacity onPress={() => changeMonth(-1)} className="px-3 py-1 rounded bg-gray-100">
                                <Text className="text-black font-poppinsSemiBold">{"‹"}</Text>
                            </TouchableOpacity>
                            <Text className="text-black font-poppinsSemiBold">
                                {MONTHS[viewMonth]} {viewYear}
                            </Text>
                            <TouchableOpacity onPress={() => changeMonth(1)} className="px-3 py-1 rounded bg-gray-100">
                                <Text className="text-black font-poppinsSemiBold">{"›"}</Text>
                            </TouchableOpacity>
                        </View>

                        {/* From/To summary */}
                        <View className="flex-row justify-between mb-3">
                            <View className="flex-1 mr-2">
                                <Text className="text-gray-600 font-poppinsMedium mb-1">From</Text>
                                <View
                                    className={`px-3 py-2 rounded border ${selecting === "from" ? "border-teal-600 bg-teal-50" : "border-gray-200"}`}
                                >
                                    <Text className="text-black font-poppinsMedium">{fmtDDMMYY(fromDate) || "Select date"}</Text>
                                </View>
                            </View>
                            <View className="flex-1 ml-2">
                                <Text className="text-gray-600 font-poppinsMedium mb-1">To</Text>
                                <View
                                    className={`px-3 py-2 rounded border ${selecting === "to" ? "border-teal-600 bg-teal-50" : "border-gray-200"}`}
                                >
                                    <Text className="text-black font-poppinsMedium">{fmtDDMMYY(toDate) || "Select date"}</Text>
                                </View>
                            </View>
                        </View>

                        {/* Weekday header */}
                        <View className="flex-row justify-between mb-1">
                            {WEEKDAYS.map((w, idx) => (
                                <View key={idx} className="w-[12.5%] items-center">
                                    <Text className="text-gray-500 font-poppinsMedium">{w}</Text>
                                </View>
                            ))}
                        </View>

                        {/* Calendar grid */}
                        <ScrollView className="max-h-[320px]">
                            <View className="flex-row flex-wrap">
                                {days.map((d, idx) => {
                                    if (!d) {
                                        return <View key={idx} className="w-[14.2857%] aspect-square" />
                                    }
                                    const selectedStart = fromDate && sameDay(d, fromDate)
                                    const selectedEnd = toDate && sameDay(d, toDate)
                                    const inRange = isInRange(d)
                                    const isToday = sameDay(d, today)

                                    const bg = selectedStart || selectedEnd ? "bg-teal-600" : inRange ? "bg-teal-100" : "bg-white"

                                    const border = isToday ? "border border-teal-600" : ""

                                    return (
                                        <TouchableOpacity
                                            key={idx}
                                            className={`w-[14.2857%] aspect-square items-center justify-center ${bg} ${border}`}
                                            onPress={() => onDayPress(d)}
                                        >
                                            <Text
                                                className={`${selectedStart || selectedEnd ? "text-white" : "text-black"} font-poppinsMedium`}
                                            >
                                                {d.getDate()}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                        </ScrollView>

                        {/* Actions */}
                        <View className="mt-5 flex-row justify-end gap-3">
                            <TouchableOpacity
                                onPress={() => {
                                    setFromDate(null)
                                    setToDate(null)
                                    setSelecting("from")
                                }}
                                className="px-4 py-2 rounded-lg bg-gray-100"
                            >
                                <Text className="text-black font-poppinsSemiBold">Clear</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onClose} className="px-4 py-2 rounded-lg bg-gray-100">
                                <Text className="text-black font-poppinsSemiBold">Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                disabled={!canSave}
                                onPress={() => {
                                    if (fromDate && toDate) onSave({ from: startOfDay(fromDate), to: endOfDay(toDate) })
                                    onClose()
                                }}
                                className={`px-4 py-2 rounded-lg ${canSave ? "bg-teal-600" : "bg-gray-300"}`}
                            >
                                <Text className="text-white font-poppinsSemiBold">Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
