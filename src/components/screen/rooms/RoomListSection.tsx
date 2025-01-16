import { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useQuery } from 'react-query'
import useAxiosIns from '@/hooks/useAxiosIns'
import RoomCard from '@/components/ui/RoomCard'

const RoomListSection = () => {
    const axios = useAxiosIns()
    const [roomClassQuery, setRoomClassQuery] = useState('')
    const [searchRoomQuery, setSearchRoomQuery] = useState<string>('')

    const DEFAULT_FILTER = { isAvailable: 1 }
    const fetchRoomClassesQuery = useQuery(['room-list-room-classes'], {
        queryFn: () => axios.get<IResponseData<IRoomClass[]>>(`/roomClasses`),
        refetchIntervalInBackground: true,
        refetchInterval: 30000,
        enabled: true,
        select: res => res.data
    })

    const fetchRoomsQuery = useQuery(['room-list-rooms', searchRoomQuery], {
        queryFn: () => axios.get<IResponseData<IRoom[]>>(`/rooms?filter=${searchRoomQuery}`),
        refetchIntervalInBackground: true,
        refetchInterval: 30000,
        enabled: true,
        select: res => res.data
    })

    const roomClasses = fetchRoomClassesQuery.data?.data ?? []
    const rooms = fetchRoomsQuery.data?.data ?? []

    useEffect(() => {
        const activeRoomClass = roomClasses?.find(rc => rc.className.toLowerCase() === roomClassQuery?.toLowerCase())
        if (activeRoomClass) {
            setSearchRoomQuery(JSON.stringify({ roomClassId: activeRoomClass.id, ...DEFAULT_FILTER }))
        } else {
            setSearchRoomQuery(JSON.stringify({ ...DEFAULT_FILTER }))
        }
    }, [roomClassQuery, roomClasses])

    return (
        <View className="gap-9 bg-ivory px-5 py-20">
            <View className="items-center gap-5">
                <Text className="font-semibold uppercase tracking-widest text-secondary">Danh sách phòng của khách sạn</Text>
                <Text className="text-balance font-serif text-3xl font-bold leading-[1.4]">Các phòng đang kinh doanh tại Stay Mate Hotel</Text>
            </View>

            {!fetchRoomClassesQuery.isLoading && roomClasses.length > 0 && (
                <View className="flex-row flex-wrap justify-center gap-4">
                    <TouchableOpacity
                        className={`h-[50px] min-w-[160px] items-center justify-center rounded-full border-2 border-primary font-semibold uppercase tracking-widest ${roomClassQuery === '' ? 'bg-primary text-ivory hover:bg-primary/90' : 'bg-ivory text-primary hover:bg-[#DBD6CA]'}`}
                        onPress={() => setRoomClassQuery('')}
                    >
                        <Text className={`font-semibold uppercase tracking-widest ${roomClassQuery === '' ? 'text-ivory' : 'text-primary'}`}>
                            Tất cả
                        </Text>
                    </TouchableOpacity>
                    {roomClasses.map(rc => (
                        <TouchableOpacity
                            key={rc.id}
                            className={`flex h-[50px] min-w-[160px] items-center justify-center rounded-full border-2 border-primary font-semibold uppercase tracking-widest ${roomClassQuery.toLowerCase() === rc.className.toLowerCase() ? 'bg-primary text-ivory hover:bg-primary/90' : 'bg-ivory text-primary hover:bg-[#DBD6CA]'}`}
                            onPress={() => setRoomClassQuery(rc.className)}
                        >
                            <Text
                                className={`font-semibold uppercase tracking-widest ${roomClassQuery.toLowerCase() === rc.className.toLowerCase() ? 'text-ivory' : 'text-primary'}`}
                            >
                                {rc.className}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            {!fetchRoomsQuery.isLoading && (
                <View className="mt-3">
                    {rooms.length > 0 ? (
                        <View className="gap-[30px]">
                            {rooms.map(room => (
                                <RoomCard
                                    key={room.id}
                                    room={room}
                                    selectRoom={() => {}}
                                    removeRoom={() => {}}
                                    isSelected={false}
                                    isRoomList={true}
                                />
                            ))}
                        </View>
                    ) : (
                        <View className="text-center font-semibold text-[#6E6E6E]">
                            <Text className="text-lg">Xin lỗi!</Text>
                            <Text>Hiện tại chúng tôi không có phòng khả dụng thuộc hạng phòng {roomClassQuery}</Text>
                        </View>
                    )}
                </View>
            )}
        </View>
    )
}

export default RoomListSection
