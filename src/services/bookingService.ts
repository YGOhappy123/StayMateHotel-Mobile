import { useState } from 'react'
import { useQuery, useMutation } from 'react-query'
import { onError } from '@/utils/errorsHandler'
import { getMappedMessage } from '@/utils/resMessageMapping'
import useAxiosIns from '@/hooks/useAxiosIns'
import dayjs from '@/libs/dayjs'
import Toast from 'react-native-toast-message'
import toastConfig from '@/configs/toastConfig'

export type WishedRoom = {
    numberOfGuests: number
}

export type BookServicePayload = {
    bookingId: number
    serviceId: number
    quantity: number
}

const bookingService = () => {
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

    const placeBookingMutation = useMutation({
        mutationFn: (data: Partial<IBooking>) => {
            return axios.post<IResponseData<number>>('/bookings/make-booking', data)
        },
        onError: onError
    })

    const cancelBookingMutation = useMutation({
        mutationFn: (bookingId: number) => {
            return axios.post<IResponseData<any>>(`/bookings/cancel-booking/${bookingId}`)
        },
        onError: onError,
        onSuccess: res => {
            Toast.show(
                toastConfig({
                    title: 'Cập nhật đơn thành công',
                    body: getMappedMessage(res.data.message),
                    type: 'success'
                })
            )
        }
    })

    const bookServiceMutation = useMutation({
        mutationFn: (data: BookServicePayload) => {
            return axios.post<IResponseData<any>>(`/bookings/${data.bookingId}/book-service`, {
                serviceId: data.serviceId,
                quantity: data.quantity
            })
        },
        onError: onError,
        onSuccess: res => {
            Toast.show(
                toastConfig({
                    title: 'Đặt dịch vụ thành công',
                    body: getMappedMessage(res.data.message),
                    type: 'success'
                })
            )
        }
    })

    return {
        buildRoomsQuery,
        getAvailableRoomsQuery,
        placeBookingMutation,
        cancelBookingMutation,
        bookServiceMutation
    }
}

export default bookingService
