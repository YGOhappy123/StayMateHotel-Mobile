import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { onError } from '@/utils/errorsHandler'
import useAxiosIns from '@/hooks/useAxiosIns'
import dayjs from '@/libs/dayjs'
import { getMappedMessage } from '@/utils/resMessageMapping'
import Toast from 'react-native-toast-message'
import toastConfig from '@/configs/toastConfig'

export type WishedRoom = {
    numberOfGuests: number
}

export type PaymentPayload = {
    bookingId: number
    amount?: number
    method: PaymentMethod
}

const bookingService = ({ enableFetching }: { enableFetching: boolean }) => {
    const axios = useAxiosIns()
    const [roomQuery, setRoomQuery] = useState<string>('')

    const buildRoomsQuery = ({ range, roomsAndGuests }: { range: string[] | any[] | undefined; roomsAndGuests: WishedRoom[] }) => {
        const query: any = {}
        if (range && range[0]) query.checkInDate = dayjs(range[0]).format('YYYY-MM-DD')
        if (range && range[1]) query.checkOutDate = dayjs(range[1]).format('YYYY-MM-DD')
        query.guests = roomsAndGuests.map(rm => rm.numberOfGuests)

        setRoomQuery(JSON.stringify(query))
    }

    const getAvailableRoomsQuery = useQuery(['available-rooms', roomQuery], {
        queryFn: () => axios.get<IResponseData<IRoom[][]>>(`/bookings/available-rooms?filter=${roomQuery}`),
        keepPreviousData: false,
        enabled: false,
        onError: onError
    })

    const queryClient = useQueryClient()
    const [bookings, setBookings] = useState<IBooking[]>([])
    const [bookingsCount, setBookingsCount] = useState<Record<BookingStatus, number>>()
    const [total, setTotal] = useState<number>(0)
    const [isSearching, setIsSearching] = useState(false)

    const [page, setPage] = useState<number>(1)
    const [limit] = useState<number>(6)
    const [bookingQuery, setBookingQuery] = useState<string>('')
    const [sort, setSort] = useState<string>('')

    const searchBookingsQuery = useQuery(['search-bookings', bookingQuery, sort], {
        queryFn: () => {
            return axios.get<IResponseData<IBooking[]>>(`/bookings?skip=${limit * (page - 1)}&limit=${limit}&filter=${bookingQuery}&sort=${sort}`)
        },
        keepPreviousData: true,
        enabled: false,
        onError: onError,
        onSuccess: res => {
            if (!res) return
            setBookings(res.data.data)
            setTotal(res.data.total as number)
        }
    })

    const getAllBookingsQuery = useQuery(['bookings', page, limit], {
        queryFn: () => {
            if (!isSearching) {
                return axios.get<IResponseData<IBooking[]>>(`/bookings?skip=${limit * (page - 1)}&limit=${limit}`)
            }
        },
        keepPreviousData: true,
        enabled: enableFetching,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: true,
        refetchInterval: 10000,
        onError: onError,
        onSuccess: res => {
            if (!res) return
            setBookings(res.data.data)
            setTotal(res.data.total as number)
        }
    })

    const getCsvBookingsQuery = useQuery(['search-csv-bookings', bookingQuery, sort], {
        queryFn: () => {
            return axios.get<IResponseData<IBooking[]>>(`/bookings?filter=${bookingQuery}&sort=${sort}`)
        },
        keepPreviousData: true,
        enabled: false,
        onError: onError
    })

    useQuery(['count-bookings-by-status'], {
        queryFn: () => {
            return axios.get<IResponseData<Record<BookingStatus, number>>>('/bookings/count-by-status')
        },
        keepPreviousData: true,
        enabled: enableFetching,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: true,
        refetchInterval: 10000,
        onError: onError,
        onSuccess: res => {
            if (!res) return
            setBookingsCount(res.data.data)
        }
    })

    const onFilterSearch = () => {
        setPage(1)
        setIsSearching(true)
        setTimeout(() => searchBookingsQuery.refetch(), 300)
    }

    const onResetFilterSearch = () => {
        setPage(1)
        setIsSearching(false)
        setBookingQuery('')
        setSort('')
        setTimeout(() => getAllBookingsQuery.refetch(), 300)
    }

    useEffect(() => {
        if (isSearching) {
            searchBookingsQuery.refetch()
        }
    }, [page])

    const placeBookingMutation = useMutation({
        mutationFn: (data: Partial<IBooking>) => {
            return axios.post<IResponseData<number>>('/bookings/make-booking', data)
        },
        onError: onError
    })

    const acceptBookingMutation = useMutation({
        mutationFn: (bookingId: number) => {
            return axios.post<IResponseData<any>>(`/bookings/accept-booking/${bookingId}`)
        },
        onError: onError,
        onSuccess: res => {
            if (isSearching) {
                queryClient.invalidateQueries('search-bookings')
                searchBookingsQuery.refetch()
            } else {
                queryClient.invalidateQueries('bookings')
            }
            Toast.show(
                toastConfig({
                    title: 'Cập nhật đơn thành công',
                    body: getMappedMessage(res.data.message),
                    type: 'success'
                })
            )
        }
    })

    const checkInBookingMutation = useMutation({
        mutationFn: (bookingId: number) => {
            return axios.post<IResponseData<any>>(`/bookings/check-in/${bookingId}`)
        },
        onError: onError,
        onSuccess: res => {
            if (isSearching) {
                queryClient.invalidateQueries('search-bookings')
                searchBookingsQuery.refetch()
            } else {
                queryClient.invalidateQueries('bookings')
            }
            Toast.show(
                toastConfig({
                    title: 'Cập nhật đơn thành công',
                    body: getMappedMessage(res.data.message),
                    type: 'success'
                })
            )
        }
    })

    const checkOutBookingMutation = useMutation({
        mutationFn: (bookingId: number) => {
            return axios.post<IResponseData<any>>(`/bookings/check-out/${bookingId}`)
        },
        onError: onError,
        onSuccess: res => {
            if (isSearching) {
                queryClient.invalidateQueries('search-bookings')
                searchBookingsQuery.refetch()
            } else {
                queryClient.invalidateQueries('bookings')
            }
            Toast.show(
                toastConfig({
                    title: 'Cập nhật đơn thành công',
                    body: getMappedMessage(res.data.message),
                    type: 'success'
                })
            )
        }
    })

    const depositMutation = useMutation({
        mutationFn: (data: PaymentPayload) => {
            return axios.post<IResponseData<any>>(`/bookings/deposit/${data.bookingId}`, {
                method: data.method
            })
        },
        onError: onError,
        onSuccess: res => {
            if (isSearching) {
                queryClient.invalidateQueries('search-bookings')
                searchBookingsQuery.refetch()
            } else {
                queryClient.invalidateQueries('bookings')
            }
            Toast.show(
                toastConfig({
                    title: 'Cập nhật thanh toán thành công',
                    body: getMappedMessage(res.data.message),
                    type: 'success'
                })
            )
        }
    })

    const makePaymentMutation = useMutation({
        mutationFn: (data: PaymentPayload) => {
            return axios.post<IResponseData<any>>(`/bookings/make-payment/${data.bookingId}`, {
                amount: data.amount,
                method: data.method
            })
        },
        onError: onError,
        onSuccess: res => {
            if (isSearching) {
                queryClient.invalidateQueries('search-bookings')
                searchBookingsQuery.refetch()
            } else {
                queryClient.invalidateQueries('bookings')
            }
            Toast.show(
                toastConfig({
                    title: 'Cập nhật thanh toán thành công',
                    body: getMappedMessage(res.data.message),
                    type: 'success'
                })
            )
        }
    })

    const cancelBookingMutation = useMutation({
        mutationFn: (bookingId: number) => {
            return axios.post<IResponseData<any>>(`/bookings/cancel-booking/${bookingId}`)
        },
        onError: onError,
        onSuccess: res => {
            if (isSearching) {
                queryClient.invalidateQueries('search-bookings')
                searchBookingsQuery.refetch()
            } else {
                queryClient.invalidateQueries('bookings')
            }
            Toast.show(
                toastConfig({
                    title: 'Cập nhật đơn thành công',
                    body: getMappedMessage(res.data.message),
                    type: 'success'
                })
            )
        }
    })

    return {
        buildRoomsQuery,
        getAvailableRoomsQuery,

        bookings,
        bookingsCount,
        total,
        page,
        limit,
        setPage,
        onFilterSearch,
        onResetFilterSearch,
        getCsvBookingsQuery,
        placeBookingMutation,
        acceptBookingMutation,
        cancelBookingMutation,
        checkInBookingMutation,
        checkOutBookingMutation,
        depositMutation,
        makePaymentMutation
    }
}

export default bookingService
