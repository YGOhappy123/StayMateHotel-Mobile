import { View, Text } from 'react-native'
import BackgroundPoster from '@/components/ui/BackgroundPoster'
import Icon from 'react-native-vector-icons/FontAwesome'

type ServicesHeroSectionProps = {
    navigateToHomeTab: () => void
}

const ServicesHeroSection = ({ navigateToHomeTab }: ServicesHeroSectionProps) => {
    return (
        <BackgroundPoster
            source={{
                uri: 'https://images.unsplash.com/photo-1531835551805-16d864c8d311?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }}
            size="small"
        >
            <View className="w-full gap-4">
                <View className="flex-row items-center gap-3">
                    <Text className="font-semibold uppercase tracking-widest text-secondary" onPress={navigateToHomeTab}>
                        Trang chủ
                    </Text>
                    <Icon name="caret-right" color="#A3B18A" size={20} />
                    <Text className="font-semibold uppercase tracking-widest text-ivory">Dịch vụ</Text>
                </View>
                <Text className="font-serif text-[32px] font-bold capitalize leading-[1.4] text-ivory">
                    Stay Comfortably, <Text className="text-secondary">Stay Happily,</Text> Stay Mate!
                </Text>
                <Text className="font-semibold capitalize text-ivory">
                    Cung cấp dịch vụ tốt nhất cho mọi du khách và cung cấp đầy đủ tiện nghi cho mọi nhu cầu lưu trú của bạn!
                </Text>
            </View>
        </BackgroundPoster>
    )
}

export default ServicesHeroSection
