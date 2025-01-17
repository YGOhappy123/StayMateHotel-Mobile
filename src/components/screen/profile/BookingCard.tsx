import { useMemo, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Button as RNPButton, Dialog, Portal, List } from 'react-native-paper'
import { twMerge } from 'tailwind-merge'
import { differenceInDays, format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { UseQueryResult } from 'react-query'
import { getMappedBookingServiceStatus, getMappedBookingStatus, getMappedPaymentMethod } from '@/utils/bookingStatusMapping'
import dayjs from '@/libs/dayjs'
import bookingService from '@/services/bookingService'
import Button from '@/components/common/Button'
import BookServiceDialog from '@/components/screen/profile/BookServiceDialog'

type BookingCardProps = {
    booking: IBooking
    services: IService[]
    fetchMyBookingsQuery: UseQueryResult<IResponseData<IBooking[]>, unknown>
}

const statusTheme = {
    Pending: ['bg-pink-100 border-pink-600', 'text-pink-600'],
    Confirmed: ['bg-green-100 border-green-600', 'text-green-600'],
    Cancelled: ['bg-red-100 border-red-600', 'text-red-600'],
    CheckedIn: ['bg-blue-100 border-blue-600', 'text-blue-600'],
    CheckedOut: ['bg-blue-100 border-blue-600', 'text-blue-600'],
    PaymentDone: ['bg-yellow-100 border-yellow-600', 'text-yellow-600']
}

const BookingCard = ({ booking, services, fetchMyBookingsQuery }: BookingCardProps) => {
    const { cancelBookingMutation, bookServiceMutation } = bookingService()
    const [activeBookingId, setActiveBookingId] = useState<IBooking['id']>()
    const [bookServiceDialogOpen, setBookServiceDialogOpen] = useState(false)
    const [cancelBookingDialogOpen, setCancelBookingDialogOpen] = useState(false)
    const [bkRoomsExpanded, setBkRoomsExpanded] = useState(false)
    const [bkServicesExpanded, setBkServicesExpanded] = useState(false)
    const [bkPaymentsExpanded, setBkPaymentsExpanded] = useState(false)

    const bookingDays = Math.abs(differenceInDays(new Date(booking.checkInTime), new Date(booking.checkOutTime)))
    const totalPaymentAmount = useMemo(() => {
        return booking.payments.reduce((total, payment) => total + (payment.amount ?? 0), 0)
    }, [booking])

    return (
        <View className="w-full gap-3 rounded-3xl bg-white px-6 py-[30px]">
            <Portal>
                <Dialog visible={cancelBookingDialogOpen} onDismiss={() => setCancelBookingDialogOpen(false)}>
                    <Dialog.Title>
                        <Text className="text-2xl font-semibold">Xác nhận hủy đơn</Text>
                    </Dialog.Title>
                    <Dialog.Content>
                        <View className="gap-4">
                            <View className="border-b-2 border-gray-400"></View>
                            <Text>
                                Bạn có chắc muốn hủy đơn này không? Bạn sẽ không nhận lại được tiền cọc (nếu có). Thao tác này sẽ không thể hoàn tác.
                            </Text>
                            <View className="border-b-2 border-gray-400"></View>
                        </View>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <RNPButton onPress={() => setCancelBookingDialogOpen(false)}>Hủy bỏ</RNPButton>
                        <RNPButton
                            onPress={async () => {
                                await cancelBookingMutation.mutateAsync(booking.id).then(() => fetchMyBookingsQuery.refetch())
                                setCancelBookingDialogOpen(false)
                            }}
                        >
                            Xác nhận
                        </RNPButton>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

            <BookServiceDialog
                isOpen={bookServiceDialogOpen}
                closeDialog={() => setBookServiceDialogOpen(false)}
                bookingId={activeBookingId!}
                services={services}
                bookServiceMutation={bookServiceMutation}
                fetchMyBookingsQuery={fetchMyBookingsQuery}
            />

            <View className="gap-2">
                <Text className="text-3xl font-semibold text-accent">Mã booking {booking.id}</Text>
                <Text className="text-lg">
                    <Text className="font-semibold">Ngày đặt:</Text> {dayjs(booking.createdAt).format('DD/MM/YYYY HH:mm:ss')}
                </Text>
                <Text className="text-lg">
                    <Text className="font-semibold">Email: </Text>
                    {booking.email}
                </Text>
                <Text className="text-lg">
                    <Text className="font-semibold">Số điện thoại: </Text>
                    {booking.phoneNumber}
                </Text>
            </View>

            <View className="h-1 bg-black/10"></View>
            <View
                className={twMerge(
                    `w-full items-center justify-center rounded-3xl border-2 border-[#073937] bg-[#EAECE2] px-5 py-2 ${statusTheme[booking.status][0]}`
                )}
            >
                <Text className={twMerge(`text-center font-semibold text-[#073937] ${statusTheme[booking.status][1]}`)}>
                    {getMappedBookingStatus(booking.status)}
                </Text>
            </View>

            <View className="h-1 bg-black/10"></View>
            <View className="gap-2">
                <Text className="text-2xl font-semibold text-primary">Thời gian thuê phòng</Text>
                <View className="flex-row items-center justify-between">
                    <Text className="text-lg font-semibold">Ngày check-in: </Text>
                    <Text className="text-lg">{format(booking.checkInTime, 'dd LLL, y  HH:mm:ss', { locale: vi })}</Text>
                </View>
                <View className="flex-row items-center justify-between">
                    <Text className="text-lg font-semibold">Ngày check-out: </Text>
                    <Text className="text-lg">{format(booking.checkOutTime, 'dd LLL, y HH:mm:ss', { locale: vi })}</Text>
                </View>
                <View className="flex-row items-center justify-between">
                    <Text className="text-lg font-semibold">Số ngày thuê: </Text>
                    <Text className="text-lg">{(bookingDays > 0 ? bookingDays : 1).toString().padStart(2, '0')} ngày</Text>
                </View>
            </View>

            <View className="h-1 bg-black/10"></View>
            <View className="gap-2">
                <Text className="items-center justify-between text-2xl font-semibold text-primary">Tổng tiền cần thanh toán</Text>
                <View className="flex-row items-center justify-between text-lg">
                    <Text className="text-lg font-semibold">Tổng tiền phòng và dịch vụ: </Text>
                    <Text className="text-lg">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(booking.totalAmount)}
                    </Text>
                </View>
                <View className="flex-row items-center justify-between text-lg">
                    <Text className="text-lg font-semibold">Tổng tiền đã nhận: </Text>
                    <Text className="text-lg">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPaymentAmount)}
                    </Text>
                </View>
                <View className="flex-row items-center justify-between text-lg">
                    <Text className="text-lg font-semibold">Số tiền cần thu thêm: </Text>
                    <Text className="text-lg">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(booking.totalAmount - totalPaymentAmount)}
                    </Text>
                </View>
            </View>

            <View className="h-1 bg-black/10"></View>
            <List.Accordion
                title={<Text className="text-2xl font-semibold text-primary">Các phòng được chọn</Text>}
                expanded={bkRoomsExpanded}
                onPress={() => {
                    setBkServicesExpanded(false)
                    setBkPaymentsExpanded(false)
                    setBkRoomsExpanded(prev => !prev)
                }}
                style={{
                    marginHorizontal: -16,
                    marginVertical: -10
                }}
            >
                {booking.bookingRooms.map((room, index) => (
                    <View key={index} className="mt-3 flex flex-col gap-2">
                        <Text className="text-xl font-semibold text-secondary">Phòng {(index + 1).toString().padStart(2, '0')}:</Text>
                        <View className="flex-row items-center justify-between">
                            <Text className="text-lg font-semibold">Phòng: </Text>
                            <Text className="text-lg">
                                Mã {room!.roomNumber} - Tầng {room!.floor} - {room!.roomClass}
                            </Text>
                        </View>
                        <View className="flex-row items-center justify-between">
                            <Text className="text-lg font-semibold">Số khách thuê: </Text>
                            <Text className="text-lg">{room.numberOfGuests?.toString().padStart(2, '0')} người</Text>
                        </View>
                        <View className="flex-row items-center justify-between">
                            <Text className="text-lg font-semibold">Đơn giá theo ngày: </Text>
                            <Text className="text-lg">
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(room.unitPrice!)}
                            </Text>
                        </View>
                        {index !== booking.bookingRooms.length - 1 && <View className="mt-1 h-0.5 bg-black/10"></View>}
                    </View>
                ))}
            </List.Accordion>

            <View className="h-1 bg-black/10"></View>
            <List.Accordion
                title={<Text className="text-2xl font-semibold text-primary">Các dịch vụ được đặt kèm</Text>}
                expanded={bkServicesExpanded}
                onPress={() => {
                    setBkRoomsExpanded(false)
                    setBkPaymentsExpanded(false)
                    setBkServicesExpanded(prev => !prev)
                }}
                style={{
                    marginHorizontal: -16,
                    marginVertical: -10
                }}
            >
                {booking.bookingServices.map((service, index) => (
                    <View key={index} className="mt-3 flex flex-col gap-2">
                        <Text className="text-xl font-semibold text-secondary">Mã đơn {service.id!.toString().padStart(2, '0')}:</Text>
                        <View className="flex-row items-center justify-between">
                            <Text className="text-lg font-semibold">Tên dịch vụ: </Text>
                            <Text className="text-lg">{service.name}</Text>
                        </View>
                        <View className="flex-row items-center justify-between">
                            <Text className="text-lg font-semibold">Đơn giá và số lượng: </Text>
                            <Text className="text-lg">
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(service.unitPrice!)} -{' '}
                                {service.quantity?.toString().padStart(2, '0')}
                            </Text>
                        </View>
                        <View className="flex-row items-center justify-between">
                            <Text className="text-lg font-semibold">Trạng thái: </Text>
                            <Text className="text-lg">{getMappedBookingServiceStatus(service.status!)}</Text>
                        </View>
                        {index !== booking.bookingServices.length - 1 && <View className="mt-1 h-0.5 bg-black/10"></View>}
                    </View>
                ))}
            </List.Accordion>

            <View className="h-1 bg-black/10"></View>
            <List.Accordion
                title={<Text className="text-2xl font-semibold text-primary">Lịch sử thanh toán</Text>}
                expanded={bkPaymentsExpanded}
                onPress={() => {
                    setBkRoomsExpanded(false)
                    setBkServicesExpanded(false)
                    setBkPaymentsExpanded(prev => !prev)
                }}
                style={{
                    marginHorizontal: -16,
                    marginVertical: -10
                }}
            >
                {booking.payments.map((payment, index) => (
                    <View key={index} className="mt-3 flex flex-col gap-2">
                        <Text className="text-xl font-semibold text-secondary">Mã giao dịch {payment.id!.toString().padStart(2, '0')}:</Text>
                        <View className="flex-row items-center justify-between">
                            <Text className="text-lg font-semibold">Số tiền giao dịch: </Text>
                            <Text className="text-lg">
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(payment.amount!)}
                            </Text>
                        </View>
                        <View className="flex-row items-center justify-between">
                            <Text className="text-lg font-semibold">Hình thức giao dịch: </Text>
                            <Text className="text-lg">{getMappedPaymentMethod(payment.method!)}</Text>
                        </View>
                        <View className="flex-row items-center justify-between">
                            <Text className="text-lg font-semibold">Thời gian giao dịch: </Text>
                            <Text className="text-lg">{dayjs(payment.paymentTime).format('DD/MM/YYYY HH:mm:ss')}</Text>
                        </View>
                        {index !== booking.payments.length - 1 && <View className="mt-1 h-0.5 bg-black/10"></View>}
                    </View>
                ))}
            </List.Accordion>

            <View className="h-1 bg-black/10"></View>
            <View className="w-full gap-4">
                <Button
                    text="Đặt dịch vụ"
                    variant="warning"
                    disabled={booking.status !== 'CheckedIn'}
                    onClick={() => {
                        setActiveBookingId(booking.id)
                        setBookServiceDialogOpen(true)
                    }}
                    buttonClassName="w-full h-[50px] rounded-md"
                    textClassName="text-lg"
                />
                <Button
                    text="Hủy đơn"
                    variant="danger"
                    disabled={booking.status === 'Cancelled' || (booking.status !== 'Pending' && booking.status !== 'Confirmed')}
                    onClick={() => {
                        setActiveBookingId(booking.id)
                        setCancelBookingDialogOpen(true)
                    }}
                    buttonClassName="w-full h-[50px] rounded-md"
                    textClassName="text-lg"
                />
            </View>
        </View>
    )
}

export default BookingCard
