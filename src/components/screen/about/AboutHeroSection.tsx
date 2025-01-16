import { View, Text } from 'react-native'
import BackgroundPoster from '@/components/ui/BackgroundPoster'
import Icon from 'react-native-vector-icons/FontAwesome'

type AboutHeroSectionProps = {
    navigateToHomeTab: () => void
}

const AboutHeroSection = ({ navigateToHomeTab }: AboutHeroSectionProps) => {
    return (
        <BackgroundPoster
            source={{
                uri: 'https://images.unsplash.com/photo-1460408037948-b89a5e837b41?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }}
            size="small"
        >
            <View className="w-full gap-4">
                <View className="flex-row items-center gap-3">
                    <Text className="font-semibold uppercase tracking-widest text-secondary" onPress={navigateToHomeTab}>
                        Trang chủ
                    </Text>
                    <Icon name="caret-right" color="#A3B18A" size={20} />
                    <Text className="font-semibold uppercase tracking-widest text-ivory">Giới thiệu</Text>
                </View>
                <Text className="font-serif text-[32px] font-bold capitalize leading-[1.4] text-ivory">
                    Xin chào, <Text className="text-secondary">chúng tôi</Text> là <Text className="text-secondary">Stay Mate Hotel...</Text>
                </Text>
                <Text className="font-semibold capitalize text-ivory">
                    Thuê căn phòng mơ ước của bạn: Không gian thoải mái, tiện nghi hiện đại, giờ giấc thoải mái, an ninh cao,... đều có thể được tìm
                    thấy tại Stay Mate Hotel!
                </Text>
            </View>
        </BackgroundPoster>
    )
}

export default AboutHeroSection
