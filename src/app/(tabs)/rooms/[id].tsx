import { View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { useQuery } from 'react-query'
import Icon from 'react-native-vector-icons/FontAwesome'
import AppBar from '@/components/layout/AppBar'
import Footer from '@/components/layout/Footer'
import useAxiosIns from '@/hooks/useAxiosIns'

const RoomDetailScreen = () => {
    const router = useRouter()
    const axios = useAxiosIns()
    const { id } = useLocalSearchParams()
    const [activeImageIndex, setActiveImageIndex] = useState(0)

    const fetchRoomDetailQuery = useQuery(['room-detail'], {
        queryFn: () => axios.get<IResponseData<IRoom>>(`/rooms/${id}`),
        refetchOnWindowFocus: false,
        refetchInterval: 30000,
        enabled: true,
        select: res => res.data
    })

    const room = fetchRoomDetailQuery.data?.data

    return (
        <SafeAreaView className="flex-1 bg-ivory">
            <AppBar />
            <ScrollView>
                <View className="flex-1">
                    <View className="gap-9 px-5 py-20">
                        <View className="flex-row items-center gap-3">
                            <Icon name="home" color="#588157" size={20} onPress={() => router.push('/')} />
                            <Icon name="caret-right" color="#588157" size={20} />
                            <Text onPress={() => router.push('/rooms')} className="font-semibold uppercase text-primary">
                                Danh sách phòng
                            </Text>
                            <Icon name="caret-right" color="#588157" size={20} />
                            <Text onPress={() => router.push('/rooms')} className="font-semibold uppercase text-primary">
                                {room?.roomClass?.className}
                            </Text>
                            <Icon name="caret-right" color="#588157" size={20} />
                            <Text className="font-semibold uppercase text-secondary">{room?.roomNumber}</Text>
                        </View>

                        <View>
                            {fetchRoomDetailQuery.isLoading ?? <ActivityIndicator size="large" color="#6E6E6E" />}

                            {!fetchRoomDetailQuery.isLoading && room == null && (
                                <View className="px-10">
                                    <Text className="text-center text-lg font-semibold text-[#6E6E6E]">Xin lỗi!</Text>
                                    <Text className="text-center font-semibold text-[#6E6E6E]">
                                        Hiện tại chúng tôi phòng này không tìm thấy hoặc đang sửa chữa
                                    </Text>
                                </View>
                            )}

                            {!fetchRoomDetailQuery.isLoading && room && (
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
                                                            room.images?.[activeImageIndex] ||
                                                            'https://img.freepik.com/free-photo/luxury-classic-modern-bedroom-suite-hotel_105762-1787.jpg'
                                                    }}
                                                    resizeMode="cover"
                                                    className="h-full w-full"
                                                />
                                            </View>
                                        </View>
                                        {(room.images?.length ?? 0) > 0 && (
                                            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-5">
                                                {room.images?.map((image, index) => (
                                                    <TouchableOpacity
                                                        key={index}
                                                        className={`aspect-square h-[120px] flex-1 overflow-hidden rounded-2xl ${index !== 0 && 'ml-5'}`}
                                                        onPress={() => setActiveImageIndex(index)}
                                                    >
                                                        <View className="aspect-square">
                                                            <View className="h-full items-center justify-center overflow-hidden rounded-2xl">
                                                                <Image source={{ uri: image }} resizeMode="cover" className="h-full w-full" />
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                ))}
                                            </ScrollView>
                                        )}
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
                                            <Text>
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                                    room.roomClass?.basePrice as number
                                                )}
                                            </Text>
                                        </Text>

                                        <View className="h-1 bg-black/10"></View>
                                        <Text className="text-lg">
                                            <Text className="font-semibold">Số lượt thuê trong tháng này: </Text>
                                            <Text>{(room.statisticThisMonth ?? 0).toString().padStart(2, '0')}</Text>
                                        </Text>
                                        <Text className="text-lg">
                                            <Text className="font-semibold">Số lượt thuê trong năm nay: </Text>
                                            <Text>{(room.statisticThisYear ?? 0).toString().padStart(2, '0')}</Text>
                                        </Text>

                                        <View className="h-1 bg-black/10"></View>
                                        <View className="mt-[6px] gap-4">
                                            <TouchableOpacity
                                                className="flex h-[50px] items-center justify-center rounded-full border-2 border-primary bg-primary hover:bg-primary/90"
                                                onPress={() => router.push(`/rooms`)}
                                            >
                                                <Text className="font-semibold uppercase tracking-widest text-ivory">Xem các phòng khác</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                className="flex h-[50px] items-center justify-center rounded-full border-2 border-primary bg-ivory hover:bg-[#DBD6CA]"
                                                onPress={() => router.push('/booking')}
                                            >
                                                <Text className="font-semibold uppercase tracking-widest text-primary">Đặt phòng ngay</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            )}
                        </View>
                    </View>
                    <Footer />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default RoomDetailScreen
