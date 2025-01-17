import { Fragment, useEffect, useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { useQuery } from 'react-query'
import { getMappedBookingStatus } from '@/utils/bookingStatusMapping'
import Footer from '@/components/layout/Footer'
import GradientButton from '@/components/common/GradientButton'
import Button from '@/components/common/Button'
import BookingCard from '@/components/screen/profile/BookingCard'
import Pagination from '@/components/ui/Pagination'
import useAxiosIns from '@/hooks/useAxiosIns'

const ManageBookingTab = () => {
    const router = useRouter()
    const axios = useAxiosIns()
    const limit = 4
    const [page, setPage] = useState(1)
    const [activeStatus, setActiveStatus] = useState<BookingStatus>()

    useEffect(() => setPage(1), [activeStatus])

    const fetchMyBookingsQuery = useQuery(['my-bookings'], {
        queryFn: () => {
            return axios.get<IResponseData<IBooking[]>>('/bookings/my-bookings')
        },
        refetchOnWindowFocus: false,
        refetchInterval: 30000,
        enabled: true,
        select: res => res.data
    })

    const fetchAvailableServicesQuery = useQuery(['available-services'], {
        queryFn: () => {
            return axios.get<IResponseData<IService[]>>(`/services?filter=${JSON.stringify({ isAvailable: true })}`)
        },
        refetchOnWindowFocus: false,
        refetchInterval: 30000,
        enabled: true,
        select: res => res.data
    })

    const myBookings = fetchMyBookingsQuery.data?.data ?? []
    const availableServices = fetchAvailableServicesQuery.data?.data ?? []
    const lastPage = Math.ceil([...myBookings.filter(bk => !activeStatus || bk.status === activeStatus)].length / limit)

    return (
        <ScrollView>
            <View className="flex-1">
                <View className="items-start px-5 py-20">
                    <Text className="mb-6 text-4xl font-bold uppercase leading-[50px] text-primary">Xem đơn đặt phòng</Text>

                    <View className="mb-9 flex-row flex-wrap justify-center gap-4">
                        <TouchableOpacity
                            className={`h-[50px] min-w-[120px] items-center justify-center rounded-full border-2 border-primary px-4 font-semibold uppercase tracking-widest ${activeStatus === undefined ? 'bg-primary text-ivory hover:bg-primary/90' : 'bg-ivory text-primary hover:bg-[#DBD6CA]'}`}
                            onPress={() => setActiveStatus(undefined)}
                        >
                            <Text className={`font-semibold uppercase tracking-widest ${activeStatus === undefined ? 'text-ivory' : 'text-primary'}`}>
                                Tất cả
                            </Text>
                        </TouchableOpacity>
                        {['Pending', 'Confirmed', 'Cancelled', 'CheckedIn', 'CheckedOut', 'PaymentDone'].map(status => (
                            <TouchableOpacity
                                key={status}
                                className={`h-[50px] min-w-[120px] items-center justify-center rounded-full border-2 border-primary px-4 font-semibold uppercase tracking-widest ${activeStatus === status ? 'bg-primary text-ivory hover:bg-primary/90' : 'bg-ivory text-primary hover:bg-[#DBD6CA]'}`}
                                onPress={() => setActiveStatus(prev => (prev === status ? undefined : (status as BookingStatus)))}
                            >
                                <Text
                                    className={`font-semibold uppercase tracking-widest ${activeStatus === status ? 'text-ivory' : 'text-primary'}`}
                                >
                                    {getMappedBookingStatus(status)}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View className="w-full items-center gap-[30px]">
                        {myBookings.length > 0 ? (
                            <Fragment>
                                {myBookings.map(booking => (
                                    <BookingCard
                                        key={booking.id}
                                        booking={booking}
                                        services={availableServices}
                                        fetchMyBookingsQuery={fetchMyBookingsQuery}
                                    />
                                ))}
                            </Fragment>
                        ) : (
                            <Fragment>
                                <View className="w-full items-start">
                                    <Text className="text-lg font-semibold text-[#6E6E6E]">Bạn chưa có đơn đặt phòng nào!</Text>
                                    <Text className="font-semibold text-[#6E6E6E]">
                                        Chúng tôi mong sẽ sớm được gặp bạn tại Stay Mate Hotel &hearts;
                                    </Text>
                                </View>
                                <View className="w-full gap-4">
                                    <GradientButton
                                        title="Tìm hiểu thêm"
                                        handlePress={() => router.push('/')}
                                        containerStyles="w-full h-[50px] rounded-full"
                                    />
                                    <Button
                                        text="Đặt phòng ngay"
                                        onClick={() => router.push('/booking')}
                                        buttonClassName="w-full h-[50px] rounded-full"
                                        textClassName="text-lg"
                                    />
                                </View>
                            </Fragment>
                        )}
                    </View>

                    <Pagination
                        currentPage={page}
                        handlePrev={() => setPage(page === 1 ? 1 : page - 1)}
                        handleNext={() => setPage(page === lastPage ? lastPage : page + 1)}
                        wrapperClassName="mt-9"
                    />
                </View>
                <Footer />
            </View>
        </ScrollView>
    )
}

export default ManageBookingTab
