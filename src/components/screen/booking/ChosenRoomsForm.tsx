import { useMemo, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import { useSelector } from 'react-redux'
import { differenceInDays, format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { RootState } from '@/store'
import { BookingRequirements, ChosenRoom } from '@/components/screen/booking/BookingRoomListSection'
import bookingService from '@/services/bookingService'
import toastConfig from '@/configs/toastConfig'
import dayjs from 'dayjs'
import Toast from 'react-native-toast-message'

type ChosenRoomsFormProps = {
    availableRooms: IRoom[][]
    chosenRooms: ChosenRoom[]
    bookingRequirements: BookingRequirements
}

const ChosenRoomsForm = ({ availableRooms, chosenRooms, bookingRequirements }: ChosenRoomsFormProps) => {
    const router = useRouter()
    const user = useSelector((state: RootState) => state.auth.user)
    const [bookingEmail, setBookingEmail] = useState(user?.email ?? '')
    const [bookingPhone, setBookingPhone] = useState(user?.phoneNumber ?? '')

    const bookingDays = Math.abs(differenceInDays(new Date(bookingRequirements.dateRange[1]), new Date(bookingRequirements.dateRange[0])))
    const totalPrice = useMemo(() => {
        return chosenRooms.reduce((total, { index, roomId }) => {
            const room = availableRooms[index].find(rm => rm.id === roomId)!
            return total + (room.roomClass?.basePrice ?? 0) * bookingDays
        }, 0)
    }, [chosenRooms])

    const { placeBookingMutation } = bookingService({ enableFetching: false })
    const handleBooking = async () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/

        if (placeBookingMutation.isLoading) return
        if (!bookingEmail) {
            return Toast.show(
                toastConfig({
                    title: 'Vui lòng cung cấp email',
                    body: 'Vui lòng cung cập địa chỉ email của bạn',
                    type: 'info'
                })
            )
        }
        if (!emailRegex.test(bookingEmail)) {
            return Toast.show(
                toastConfig({
                    title: 'Vui lòng cung cấp email',
                    body: 'Địa chỉ email của bạn không hợp lệ',
                    type: 'info'
                })
            )
        }
        if (!bookingPhone) {
            return Toast.show(
                toastConfig({
                    title: 'Vui lòng cung cập số điện thoại',
                    body: 'Vui lòng cung cập số điện thoại của bạn',
                    type: 'info'
                })
            )
        }
        if (!phoneRegex.test(bookingPhone)) {
            return Toast.show(
                toastConfig({
                    title: 'Vui lòng cung cập số điện thoại',
                    body: 'Số điện thoại của bạn không hợp lệ',
                    type: 'info'
                })
            )
        }
        if (chosenRooms.length < (bookingRequirements?.guests?.length ?? 0)) {
            return Toast.show(
                toastConfig({
                    title: 'Bạn chưa chọn đủ phòng',
                    body: 'Vui lòng chọn đủ số lượng phòng',
                    type: 'info'
                })
            )
        }

        placeBookingMutation
            .mutateAsync({
                checkInTime: dayjs(bookingRequirements.dateRange[0]).format('YYYY-MM-DD'),
                checkOutTime: dayjs(bookingRequirements.dateRange[1]).format('YYYY-MM-DD'),
                email: bookingEmail,
                phoneNumber: bookingPhone,
                bookingRooms: bookingRequirements.guests.map((guest, index) => ({
                    numberOfGuests: guest.numberOfGuests,
                    roomId: chosenRooms[index].roomId
                }))
            })
            .then(res => router.push(`/thank-you/${res.data.data}`))
    }

    return (
        <View className="gap-6 rounded-3xl bg-white px-6 py-[30px]">
            <Text className="text-3xl font-semibold text-accent">Tổng hợp thông tin</Text>
            <View className="h-1 bg-black/10"></View>
            <View className="gap-3">
                <Text className="text-2xl font-semibold text-primary">Thông tin khách hàng</Text>
                <Text className="text-lg">
                    <Text className="font-semibold">Họ và tên: </Text>
                    {user!.lastName} {user!.firstName}
                </Text>
                <View className="flex-row items-center justify-between gap-2">
                    <Text className="font-semibold">Email: </Text>
                    <TextInput
                        className="flex-1 border-b-2 border-neutral-500 px-2 text-lg text-primary caret-primary outline-none focus:border-primary"
                        id="email"
                        placeholder="(Chưa cập nhật)"
                        autoCorrect={false}
                        value={bookingEmail}
                        onChangeText={value => setBookingEmail(value)}
                    />
                </View>
                <View className="flex-row items-center justify-between gap-2">
                    <Text className="min-w-max font-semibold">Số điện thoại: </Text>
                    <TextInput
                        className="flex-1 border-b-2 border-neutral-500 px-2 text-lg text-primary caret-primary outline-none focus:border-primary"
                        id="phone"
                        placeholder="(Chưa cập nhật)"
                        autoCorrect={false}
                        value={bookingPhone}
                        onChangeText={value => setBookingPhone(value)}
                    />
                </View>
            </View>
            <View className="h-1 bg-black/10"></View>
            <View className="gap-3">
                <Text className="text-2xl font-semibold text-primary">
                    Các phòng đã chọn ({chosenRooms.length}/{bookingRequirements?.guests?.length ?? 0})
                </Text>
                {chosenRooms.map(room => {
                    const matchingRoom = availableRooms[room.index].find(rm => rm.id === room.roomId)
                    return (
                        <View key={room.roomId} className="gap-2">
                            <Text className="text-xl font-semibold text-secondary">Phòng {(room.index + 1).toString().padStart(2, '0')}:</Text>
                            <View className="flex-row items-center justify-between">
                                <Text className="text-lg font-semibold">Số phòng: </Text>
                                <Text className="text-lg">{matchingRoom!.roomNumber}</Text>
                            </View>
                            <View className="flex-row items-center justify-between">
                                <Text className="text-lg font-semibold">Loại phòng: </Text>
                                <Text className="text-lg">{matchingRoom!.roomClass?.className}</Text>
                            </View>
                            <View className="flex-row items-center justify-between">
                                <Text className="text-lg font-semibold">Số khách: </Text>
                                <Text className="text-lg">
                                    {bookingRequirements.guests[room.index].numberOfGuests.toString().padStart(2, '0')} người
                                </Text>
                            </View>
                            <View className="flex-row items-center justify-between">
                                <Text className="text-lg font-semibold">Giá thuê theo ngày: </Text>
                                <Text className="text-lg">
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                        matchingRoom!.roomClass?.basePrice ?? 0
                                    )}
                                </Text>
                            </View>
                        </View>
                    )
                })}
            </View>
            <View className="h-1 bg-black/10"></View>
            <View className="gap-3">
                <Text className="text-2xl font-semibold text-primary">Thời gian thuê phòng</Text>
                <View className="flex-row items-center justify-between">
                    <Text className="text-lg font-semibold">Ngày check-in: </Text>
                    <Text className="text-lg">{format(bookingRequirements?.dateRange?.[0], 'dd LLL, y', { locale: vi })}</Text>
                </View>
                <View className="flex-row items-center justify-between">
                    <Text className="text-lg font-semibold">Ngày check-out: </Text>
                    <Text className="text-lg">{format(bookingRequirements?.dateRange?.[1], 'dd LLL, y', { locale: vi })}</Text>
                </View>
                <View className="flex-row items-center justify-between">
                    <Text className="text-lg font-semibold">Số ngày thuê: </Text>
                    <Text className="text-lg">{bookingDays.toString().padStart(2, '0')} ngày</Text>
                </View>
            </View>
            <View className="h-1 bg-black/10"></View>
            <View className="gap-3">
                <Text className="text-2xl font-semibold text-primary">Tổng tiền cần thanh toán</Text>
                <View className="flex-row items-center justify-between">
                    <Text className="text-lg font-semibold">Tổng tiền thuê phòng: </Text>
                    <Text className="text-lg">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}</Text>
                </View>
                <View className="flex-row items-center justify-between">
                    <Text className="text-lg font-semibold">Tiền đặt cọc 10%: </Text>
                    <Text className="text-lg">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Math.ceil(totalPrice / 10000) * 1000)}
                    </Text>
                </View>
            </View>
            <TouchableOpacity
                className="flex h-[50px] w-full items-center justify-center rounded-full bg-primary font-semibold uppercase tracking-widest text-ivory hover:bg-primary/90"
                onPress={() => handleBooking()}
            >
                {placeBookingMutation.isLoading ? (
                    <View className="flex-row items-center gap-3">
                        <ActivityIndicator color="#4D4D4D" />
                        <Text className="font-semibold uppercase tracking-widest text-ivory">Đang tải</Text>
                    </View>
                ) : (
                    <Text className="font-semibold uppercase tracking-widest text-ivory">Đặt phòng</Text>
                )}
            </TouchableOpacity>
        </View>
    )
}

export default ChosenRoomsForm
