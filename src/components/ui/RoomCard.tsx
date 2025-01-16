import { Fragment } from 'react'
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import { useRouter } from 'expo-router'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import Carousel from 'react-native-reanimated-carousel'
import Toast from 'react-native-toast-message'
import toastConfig from '@/configs/toastConfig'

type RoomCardProps = {
    room: IRoom
    selectRoom: () => void
    removeRoom: () => void
    isSelected: boolean
    isRoomList?: boolean
}

const RoomCard = ({ room, selectRoom, removeRoom, isSelected, isRoomList = false }: RoomCardProps) => {
    const router = useRouter()
    const user = useSelector((state: RootState) => state.auth.user)

    return (
        <View className="gap-6 rounded-3xl bg-white px-6 py-[30px]">
            <View className="flex-row items-start justify-between">
                <View>
                    <Text className="text-3xl font-semibold text-primary">Phòng số {room.roomNumber}</Text>
                    <Text className="mt-2 text-lg">
                        <Text className="font-semibold">Sức chứa tối đa:</Text> {room.roomClass?.capacity} người
                    </Text>
                    <Text className="text-lg">
                        <Text className="font-semibold">Tầng:</Text> {room.floor?.floorNumber}
                    </Text>
                </View>
                <View className="min-w-[100px] items-center justify-center rounded-full border-2 border-[#073937] bg-[#EAECE2] px-5 py-2">
                    <Text className="font-semibold text-[#073937]">{room.roomClass?.className}</Text>
                </View>
            </View>

            <View className={`overflow-hidden rounded-2xl`}>
                <View className="aspect-[3/2]">
                    <View className="h-full items-center justify-center overflow-hidden rounded-2xl">
                        <Image
                            source={{
                                uri:
                                    room?.images?.[0] ??
                                    'https://img.freepik.com/free-photo/luxury-classic-modern-bedroom-suite-hotel_105762-1787.jpg'
                            }}
                            resizeMode="cover"
                            className="h-full w-full"
                        />
                    </View>
                </View>
            </View>

            <View className="gap-3">
                <Text className="text-lg">
                    <Text className="font-semibold">Danh sách tiện nghi: </Text>
                </Text>
                <View className="gap-2">
                    {room.features?.map(ft => (
                        <Text key={ft.featureId}>
                            ({ft.quantity}x) {ft.name}
                        </Text>
                    ))}
                </View>
                <View className="h-1 bg-black/10"></View>
                <Text className="text-lg">
                    <Text className="font-semibold">Giá thuê theo ngày:</Text> chỉ từ{' '}
                    <Text>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(room.roomClass?.basePrice as number)}</Text>
                </Text>
                <View className="h-1 bg-black/10"></View>
                <View className="mt-[6px] gap-4">
                    {isRoomList ? (
                        <Fragment>
                            <TouchableOpacity
                                className="flex h-[50px] items-center justify-center rounded-full border-2 border-primary bg-primary hover:bg-primary/90"
                                onPress={() => router.push(`/rooms/${room.id}`)}
                            >
                                <Text className="font-semibold uppercase tracking-widest text-ivory">Xem chi tiết</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="flex h-[50px] items-center justify-center rounded-full border-2 border-primary bg-ivory hover:bg-[#DBD6CA]"
                                onPress={() => router.push('/booking')}
                            >
                                <Text className="font-semibold uppercase tracking-widest text-primary">Đặt phòng ngay</Text>
                            </TouchableOpacity>
                        </Fragment>
                    ) : (
                        <TouchableOpacity
                            className="flex h-[50px] items-center justify-center rounded-full border-2 border-primary bg-ivory hover:bg-[#DBD6CA]"
                            onPress={() => {
                                if (!user) {
                                    return Toast.show(
                                        toastConfig({
                                            title: 'Vui lòng đăng nhập',
                                            body: 'Bạn phải đăng nhập để sử dụng tính năng này',
                                            type: 'info'
                                        })
                                    )
                                }

                                if (user.role !== 'Guest') {
                                    return Toast.show(
                                        toastConfig({
                                            title: 'Vai trò không hợp lệ',
                                            body: 'Tính năng này chỉ khả dụng cho vai trò "Khách hàng"',
                                            type: 'info'
                                        })
                                    )
                                }

                                isSelected ? removeRoom() : selectRoom()
                            }}
                        >
                            <Text className="font-semibold uppercase tracking-widest text-primary">{isSelected ? 'Xóa phòng' : 'Chọn phòng'}</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    )
}

export default RoomCard
