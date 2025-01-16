import { View, Text } from 'react-native'
import { useRouter } from 'expo-router'
import BackgroundPoster from '@/components/ui/BackgroundPoster'
import Icon from 'react-native-vector-icons/FontAwesome'

const BookingHeroSection = () => {
    const router = useRouter()

    return (
        <BackgroundPoster
            source={{
                uri: 'https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?q=80&w=2820&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }}
            size="small"
        >
            <View className="w-full gap-4">
                <View className="flex-row items-center gap-3">
                    <Text className="font-semibold uppercase tracking-widest text-secondary" onPress={() => router.push('/')}>
                        Trang chủ
                    </Text>
                    <Icon name="caret-right" color="#A3B18A" size={20} />
                    <Text className="font-semibold uppercase tracking-widest text-ivory">Đặt phòng</Text>
                </View>
                <Text className="font-serif text-[32px] font-bold capitalize leading-[1.4] text-ivory">
                    Tra cứu <Text className="text-secondary">phòng khách sạn nhanh chóng</Text> và <Text className="text-secondary">tiện lợi...</Text>
                </Text>
                <Text className="font-semibold capitalize text-ivory">
                    Hãy chọn thời gian check in - check out, số lượng phòng, số lượng khách và một số tiện nghi bạn cần, việc còn lại cứ để Stay Mate
                    Hotel lo!
                </Text>
            </View>
        </BackgroundPoster>
    )
}
export default BookingHeroSection
