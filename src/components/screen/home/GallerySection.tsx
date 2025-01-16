import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import { useRouter } from 'expo-router'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ServicesGallerySection from '@/components/screen/services/ServicesGallerySection'

const DESCRIPTION_IMAGES = {
    gallery: {
        feature:
            'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        top: [
            'https://images.unsplash.com/photo-1618220048045-10a6dbdf83e0?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1615529179035-e760f6a2dcee?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        ],
        bottom: [
            'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1617806265182-7b3f847f0b75?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        ]
    },
    banner: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2906&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
}

const HIGHLIGHTED_ROOM_CLASSES = [
    {
        image: 'https://images.unsplash.com/photo-1595871201981-b5e6b1bced23?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Standard',
        description:
            'Đây là loại phòng nhỏ dành cho 2 người, phù hợp với các cặp đôi muốn có không gian riêng tư cùng nhau, với giá thuê chỉ từ 250.000đ mỗi đêm'
    },
    {
        image: 'https://images.unsplash.com/photo-1578503439976-f0c1f7daf1cd?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Family',
        description: 'Đây là loại phòng với sức chứa khoảng 4 người, thường được ưa bởi các gia đình nhỏ, với giá thuê chỉ từ 400.000đ mỗi đêm'
    },
    {
        image: 'https://images.unsplash.com/photo-1597425842320-de0c26b33327?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'VIP',
        description:
            'Đây là loại phòng với sức chứa khoảng 6 người, thích hợp cho các gia đình đông người hoặc hội bạn thân, với giá thuê chỉ từ 600.000đ mỗi đêm'
    }
]

const GallerySection = () => {
    const router = useRouter()

    return (
        <View className="items-center bg-ivory px-5 py-20">
            <ServicesGallerySection images={DESCRIPTION_IMAGES} />

            <View className="w-full gap-9 pt-20">
                <View className="gap-5">
                    <Text className="text-center font-semibold uppercase tracking-widest text-secondary">Vài hạng phòng nổi bật của chúng tôi</Text>
                    <Text className="text-balance font-serif text-3xl font-bold leading-[1.4]">
                        Stay Mate Hotel mang cho bạn các hạng phòng với giá cả và tiện ích đa dạng.
                    </Text>
                    <TouchableOpacity onPress={() => router.push('/booking')} className="flex-row items-center gap-2">
                        <Text className="font-semibold uppercase tracking-widest text-primary">Đặt phòng ngay</Text>
                        <Icon name="arrow-forward" size={20} color="#588157" />
                    </TouchableOpacity>
                </View>
                <View className="gap-[30px]">
                    {HIGHLIGHTED_ROOM_CLASSES.map(roomClass => (
                        <View key={roomClass.name} className="overflow-hidden rounded-3xl">
                            <View className="aspect-[8/5]">
                                <ImageBackground source={{ uri: roomClass.image }}>
                                    <View className="h-full"></View>
                                </ImageBackground>
                            </View>
                            <View className="flex-1 gap-[26px] bg-white p-[35px]">
                                <View>
                                    <Text className="text-balance font-serif text-[25px] font-bold">Hạng phòng {roomClass.name}</Text>
                                    <View className="mt-[15px] text-xl text-[#6E6E6E]">
                                        <Text>{roomClass.description}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={() => router.push('/booking')} className="flex-row items-center gap-2">
                                    <Text className="font-semibold uppercase tracking-widest text-primary">Đặt phòng ngay</Text>
                                    <Icon name="arrow-forward" size={20} color="#588157" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    )
}

export default GallerySection
