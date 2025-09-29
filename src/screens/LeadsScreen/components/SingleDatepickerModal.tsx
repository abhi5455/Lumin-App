"use client"

import { useEffect, useMemo, useState } from "react"
import { Modal, View, Text, TouchableOpacity, ScrollView } from "react-native"
import { ChevronLeft, ChevronRight } from "lucide-react-native"

type SingleDatepickerModalProps = {
    visible: boolean
    initialDate?: string | Date | null
    onClose: () => void
    onSave: (date: string) => void
    title?: string
}

function startOfDay(d: Date) {
    const x = new Date(d)
    x.setHours(0, 0, 0, 0)
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

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
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

// Helper function to create dates at noon to avoid timezone issues
function createDateAtNoon(year: number, month: number, day: number) {
    return new Date(year, month, day, 12, 0, 0, 0)
}

export default function SingleDatepickerModal({
                                                  visible,
                                                  initialDate = null,
                                                  onClose,
                                                  onSave,
                                                  title = "Select Date",
                                              }: SingleDatepickerModalProps) {
    const today = useMemo(() => startOfDay(new Date()), [])
    const initialSelectedDate = useMemo(() => (initialDate ? startOfDay(new Date(initialDate)) : null), [initialDate])

    const [viewYear, setViewYear] = useState<number>((initialSelectedDate || today).getFullYear())
    const [viewMonth, setViewMonth] = useState<number>((initialSelectedDate || today).getMonth()) // 0..11
    const [selectedDate, setSelectedDate] = useState<Date | null>(initialSelectedDate)

    useEffect(() => {
        if (visible) {
            setSelectedDate(initialSelectedDate)
            setViewYear((initialSelectedDate || today).getFullYear())
            setViewMonth((initialSelectedDate || today).getMonth())
        }
    }, [visible, initialSelectedDate, today])

    const leadingBlanks = firstWeekday(viewYear, viewMonth)
    const totalDays = daysInMonth(viewYear, viewMonth)
    const days: Array<Date | null> = []

    // Add leading blanks
    for (let i = 0; i < leadingBlanks; i++) {
        days.push(null)
    }

    // Add actual days - use createDateAtNoon to avoid timezone issues
    for (let d = 1; d <= totalDays; d++) {
        days.push(createDateAtNoon(viewYear, viewMonth, d))
    }

    // Pad to full weeks
    while (days.length % 7 !== 0) {
        days.push(null)
    }

    function onDayPress(d: Date) {
        const d0 = startOfDay(d)
        setSelectedDate(d0)
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

    const canSave = !!selectedDate

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
                                <ChevronLeft size={15} />
                            </TouchableOpacity>
                            <Text className="text-black font-poppinsSemiBold">
                                {MONTHS[viewMonth]} {viewYear}
                            </Text>
                            <TouchableOpacity onPress={() => changeMonth(1)} className="px-3 py-1 rounded bg-gray-100">
                                <ChevronRight size={15} />
                            </TouchableOpacity>
                        </View>

                        <View className="mb-3">
                            <Text className="text-gray-600 font-poppinsMedium mb-1">Selected Date</Text>
                            <View className="px-3 py-2 rounded border border-teal-600 bg-teal-50">
                                <Text className="text-black font-poppinsMedium">{fmtDDMMYY(selectedDate) || "Select a date"}</Text>
                            </View>
                        </View>

                        {/* Weekday header */}
                        <View className="flex-row justify-between mb-1">
                            {WEEKDAYS.map((w, idx) => (
                                <View key={idx} className="flex-1 items-center">
                                    <Text className="text-gray-500 font-poppinsMedium">{w}</Text>
                                </View>
                            ))}
                        </View>

                        {/* Calendar grid */}
                        <ScrollView className="max-h-[320px]">
                            <View>
                                {Array.from({ length: Math.ceil(days.length / 7) }, (_, weekIndex) => (
                                    <View key={weekIndex} className="flex-row">
                                        {days.slice(weekIndex * 7, (weekIndex + 1) * 7).map((d, dayIndex) => {
                                            const idx = weekIndex * 7 + dayIndex
                                            if (!d) {
                                                return <View key={idx} className="flex-1 aspect-square" />
                                            }
                                            const isSelected = selectedDate && sameDay(d, selectedDate)
                                            const isToday = sameDay(d, today)

                                            const bg = isSelected ? "bg-teal-600" : "bg-white"
                                            const border = isToday ? "border border-teal-600" : ""

                                            return (
                                                <TouchableOpacity
                                                    key={idx}
                                                    className={`flex-1 aspect-square items-center justify-center ${bg} ${border}`}
                                                    onPress={() => onDayPress(d)}
                                                >
                                                    <Text className={`${isSelected ? "text-white" : "text-black"} font-poppinsMedium`}>
                                                        {d.getDate()}
                                                    </Text>
                                                </TouchableOpacity>
                                            )
                                        })}
                                    </View>
                                ))}
                            </View>
                        </ScrollView>

                        {/* Actions */}
                        <View className="mt-5 flex-row justify-end gap-3">
                            <TouchableOpacity
                                onPress={() => {
                                    setSelectedDate(null)
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
                                    console.log("Select date ", selectedDate)
                                    if (selectedDate) onSave(startOfDay(selectedDate).toISOString())
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
