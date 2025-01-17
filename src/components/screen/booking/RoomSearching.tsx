import { useEffect, useState } from 'react'
import { TouchableOpacity, View, Text, ActivityIndicator } from 'react-native'
import { DatePickerModal } from 'react-native-paper-dates'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import bookingService, { WishedRoom } from '@/services/bookingService'
import FontAwesomeIcon5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesomeIcon6 from 'react-native-vector-icons/FontAwesome6'
import SelectRoomAndGuestDialog from '@/components/screen/booking/SelectRoomAndGuestDialog'
import toastConfig from '@/configs/toastConfig'
import Toast from 'react-native-toast-message'

type RoomSearchingProps = {
    setAvailableRooms: (rooms: IRoom[][]) => void
    setBookingRequirements: (requirements: any) => void
}

type DataRange = {
    startDate: Date | undefined
    endDate: Date | undefined
}

const RoomSearching = ({ setAvailableRooms, setBookingRequirements }: RoomSearchingProps) => {
    const { buildRoomsQuery, getAvailableRoomsQuery } = bookingService()

    const [wishedRooms, setWishedRooms] = useState<WishedRoom[]>([{ numberOfGuests: 1 }])
    const [range, setRange] = useState<DataRange>({ startDate: undefined, endDate: undefined })
    const [isRoomGuestsModalOpen, setIsRoomGuestsModalOpen] = useState(false)
    const [isDatePickerModalOpen, setIsDatePickerModalOpen] = useState(false)

    const handleSearch = async () => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        if (getAvailableRoomsQuery.isLoading) return
        if (!range.startDate) {
            return Toast.show(
                toastConfig({
                    title: 'Ngày thuê không hợp lệ',
                    body: 'Vui lòng chọn ngày check in và check out',
                    type: 'info'
                })
            )
        }
        if (!range.endDate) {
            return Toast.show(
                toastConfig({
                    title: 'Ngày thuê không hợp lệ',
                    body: 'Vui lòng chọn ngày check out',
                    type: 'info'
                })
            )
        }
        if (range.startDate < today) {
            return Toast.show(
                toastConfig({
                    title: 'Ngày thuê không hợp lệ',
                    body: `Ngày check-in phải lớn hơn hoặc bằng hôm nay (${format(today, 'dd LLL, y', { locale: vi })})`,
                    type: 'info'
                })
            )
        }
        if (range.endDate <= range.startDate) {
            return Toast.show(
                toastConfig({
                    title: 'Ngày thuê không hợp lệ',
                    body: `Ngày check-out phải lớn hơn ngày check-in (${format(range.startDate, 'dd LLL, y', { locale: vi })})`,
                    type: 'info'
                })
            )
        }

        getAvailableRoomsQuery.refetch().then(result => setAvailableRooms([...(result.data?.data.data ?? [])]))
        setBookingRequirements({
            dateRange: [range.startDate, range.endDate],
            guests: wishedRooms
        })
    }

    useEffect(() => {
        buildRoomsQuery({ range: [range.startDate, range.endDate], roomsAndGuests: wishedRooms })
    }, [range, wishedRooms])

    return (
        <View className="gap-6 rounded-3xl border-2 border-solid border-[#9C9C9C] bg-[#FFFBF2] px-4 py-[30px]">
            <DatePickerModal
                locale="vi"
                mode="range"
                visible={isDatePickerModalOpen}
                onDismiss={() => setIsDatePickerModalOpen(false)}
                startDate={range.startDate}
                endDate={range.endDate}
                onConfirm={({ startDate, endDate }) => {
                    setIsDatePickerModalOpen(false)
                    setRange({ startDate, endDate })
                }}
            />

            <SelectRoomAndGuestDialog
                isOpen={isRoomGuestsModalOpen}
                closeDialog={() => setIsRoomGuestsModalOpen(false)}
                wishedRooms={wishedRooms}
                setWishedRooms={setWishedRooms}
            />

            <View className="flex-row items-center gap-5">
                <View className="w-9 items-center">
                    <FontAwesomeIcon6 name="hotel" size={24} color="#A3B18A" />
                </View>
                <Text className="text-xl font-semibold text-[#4D4D4D]">
                    Số lượng phòng: <Text className="font-normal">{wishedRooms.length.toString().padStart(2, '0')}</Text>
                </Text>
                <TouchableOpacity onPress={() => setIsRoomGuestsModalOpen(true)} className="ml-auto">
                    <FontAwesomeIcon6 name="edit" size={24} color="#4D4D4D" />
                </TouchableOpacity>
            </View>

            <View className="flex-row items-center gap-5">
                <View className="w-9 items-center">
                    <FontAwesomeIcon5 name="user-friends" size={24} color="#A3B18A" />
                </View>
                <Text className="text-xl font-semibold text-[#4D4D4D]">
                    Số lượng khách:{' '}
                    <Text className="font-normal">
                        {wishedRooms
                            .reduce((total, curr) => total + curr.numberOfGuests, 0)
                            .toString()
                            .padStart(2, '0')}
                    </Text>
                </Text>
                <TouchableOpacity onPress={() => setIsRoomGuestsModalOpen(true)} className="ml-auto">
                    <FontAwesomeIcon6 name="edit" size={24} color="#4D4D4D" />
                </TouchableOpacity>
            </View>

            <View className="flex-row items-center gap-5">
                <View className="w-9 items-center">
                    <FontAwesomeIcon5 name="calendar-plus" size={24} color="#A3B18A" />
                </View>
                <Text className="text-xl font-semibold">
                    Check-in:{' '}
                    <Text className="font-normal">{range.startDate ? format(range.startDate, 'dd LLL, y', { locale: vi }) : 'Chưa chọn'}</Text>
                </Text>
                <TouchableOpacity onPress={() => setIsDatePickerModalOpen(true)} className="ml-auto">
                    <FontAwesomeIcon6 name="edit" size={24} color="#4D4D4D" />
                </TouchableOpacity>
            </View>

            <View className="flex-row items-center gap-5">
                <View className="w-9 items-center">
                    <FontAwesomeIcon5 name="calendar-minus" size={24} color="#A3B18A" />
                </View>
                <Text className="text-xl font-semibold">
                    Check-out: <Text className="font-normal">{range.endDate ? format(range.endDate, 'dd LLL, y', { locale: vi }) : 'Chưa chọn'}</Text>
                </Text>
                <TouchableOpacity onPress={() => setIsDatePickerModalOpen(true)} className="ml-auto">
                    <FontAwesomeIcon6 name="edit" size={24} color="#4D4D4D" />
                </TouchableOpacity>
            </View>

            <View className="h-1 bg-black/10"></View>
            <TouchableOpacity
                className="h-[50px] items-center justify-center rounded-full bg-primary hover:bg-primary/90"
                onPress={() => handleSearch()}
            >
                {getAvailableRoomsQuery.isLoading ? (
                    <View className="flex-row items-center gap-3">
                        <ActivityIndicator color="#4D4D4D" />
                        <Text className="font-semibold uppercase tracking-widest text-ivory">Đang tải</Text>
                    </View>
                ) : (
                    <Text className="font-semibold uppercase tracking-widest text-ivory">Tìm phòng</Text>
                )}
            </TouchableOpacity>
        </View>
    )
}

export default RoomSearching
