import { Fragment, useCallback, useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useFocusEffect } from 'expo-router'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { WishedRoom } from '@/services/bookingService'
import RoomCard from '@/components/ui/RoomCard'
import RoomSearching from '@/components/screen/booking/RoomSearching'
import ChosenRoomsForm from '@/components/screen/booking/ChosenRoomsForm'

export type ChosenRoom = {
    index: number
    roomId: IRoom['id']
}

export type BookingRequirements = {
    dateRange: [string, string]
    guests: WishedRoom[]
}

type BookingRoomListSectionProps = {
    setIsBtnShown: (value: boolean) => void
}

const BookingRoomListSection = ({ setIsBtnShown }: BookingRoomListSectionProps) => {
    const user = useSelector((state: RootState) => state.auth.user)
    const [availableRooms, setAvailableRooms] = useState<IRoom[][]>([])
    const [activeRoomList, setActiveRoomList] = useState(0)
    const [selectedRooms, setSelectedRooms] = useState<ChosenRoom[]>([])
    const [bookingRequirements, setBookingRequirements] = useState<BookingRequirements | undefined>()

    useEffect(() => {
        setActiveRoomList(0)
        setSelectedRooms([])
        setIsBtnShown(availableRooms.length > 0 ? true : false)
    }, [availableRooms])

    useFocusEffect(
        useCallback(() => {
            setAvailableRooms([])
        }, [])
    )

    return (
        <View className="w-full gap-9 bg-ivory px-5 py-20">
            <RoomSearching setAvailableRooms={setAvailableRooms} setBookingRequirements={setBookingRequirements} />

            {availableRooms.length > 0 && (
                <Fragment>
                    {user && user.role === 'Guest' && (
                        <ChosenRoomsForm
                            availableRooms={availableRooms}
                            chosenRooms={[...selectedRooms].sort((a, b) => a.index - b.index)}
                            bookingRequirements={bookingRequirements!}
                        />
                    )}

                    <View className="flex-row items-center gap-4">
                        {availableRooms.map((_, idx) => (
                            <TouchableOpacity
                                key={idx}
                                className={`h-[50px] flex-1 items-center justify-center rounded-full border-2 border-primary ${idx === activeRoomList ? 'bg-primary hover:bg-primary/90' : 'bg-ivory hover:bg-[#DBD6CA]'}`}
                                onPress={() => setActiveRoomList(idx)}
                            >
                                <Text className={`font-semibold uppercase tracking-widest ${idx === activeRoomList ? 'text-ivory' : 'text-primary'}`}>
                                    Phòng {(idx + 1).toString().padStart(2, '0')}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {availableRooms[activeRoomList].length > 0 ? (
                        <View className="gap-[30px]">
                            {availableRooms[activeRoomList].map(room => (
                                <RoomCard
                                    key={room.id}
                                    room={room}
                                    selectRoom={() =>
                                        setSelectedRooms(prev => {
                                            if (prev.find(rm => rm.index === activeRoomList)) {
                                                return prev.map(rm => (rm.index === activeRoomList ? { index: activeRoomList, roomId: room.id } : rm))
                                            } else {
                                                return [...prev, { index: activeRoomList, roomId: room.id }]
                                            }
                                        })
                                    }
                                    removeRoom={() => setSelectedRooms(prev => prev.filter(rm => rm.roomId !== room.id))}
                                    isSelected={selectedRooms.find(x => x.roomId === room.id) != null}
                                />
                            ))}
                        </View>
                    ) : (
                        <View className="text-center font-semibold text-[#6E6E6E]">
                            <Text className="text-lg">Xin lỗi!</Text>
                            <Text>Không tìm thấy phòng phù hợp với nhu cầu của bạn</Text>
                        </View>
                    )}
                </Fragment>
            )}
        </View>
    )
}

export default BookingRoomListSection
