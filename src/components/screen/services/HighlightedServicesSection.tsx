import { ReactNode } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { twMerge } from 'tailwind-merge'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import FontAwesomeIcon5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesomeIcon6 from 'react-native-vector-icons/FontAwesome6'

type HighlightedServicesSectionProps = {
    isSummarized?: boolean
    containerClassNames?: string
    navigateToServicesTab?: () => void
}

type ServiceSummary = {
    Icon: ReactNode
    name: string
    description: string
    isActive: boolean
}

const HIGHLIGHTED_SERVICES: ServiceSummary[] = [
    {
        Icon: <FontAwesomeIcon6 name="compass-drafting" size={40} color="#A3B18A" />,
        name: 'Đa dạng phòng',
        description: 'Cung cấp nhiều hạng phòng khác nhau với giá cả và các tiện ích phù hợp với mọi nhu cầu của bạn',
        isActive: true
    },
    {
        Icon: <FontAwesomeIcon5 name="home" size={40} color="#A3B18A" />,
        name: 'Tiện nghi hiện đại',
        description: 'Các phòng đều được lắp đặt các thiết bị hiện đại và cao cấp, kể cả các loại phòng tiêu chuẩn hay VIP',
        isActive: false
    },
    {
        Icon: <FontAwesomeIcon6 name="paint-roller" size={40} color="#A3B18A" />,
        name: 'Decor độc đáo',
        description: 'Mỗi căn phòng tại Stay Mate đều được trang trí theo một chủ đề khác nhau, giúp bạn tìm được căn phòng phù hợp nhất',
        isActive: false
    },
    {
        Icon: <FontAwesomeIcon5 name="shield-alt" size={40} color="#A3B18A" />,
        name: 'An ninh cao',
        description: 'An ninh luôn được đảm bảo 24/24 trong tình trạng tốt nhất để du khách cảm thấy an toàn hơn',
        isActive: false
    },
    {
        Icon: <FontAwesomeIcon6 name="hotel" size={40} color="#A3B18A" />,
        name: 'Vị trí thuận lợi',
        description: 'Vị trí thuận lợi, tiện cho việc di chuyển khi gần bến tàu, biển và các địa điểm vui chơi',
        isActive: false
    },
    {
        Icon: <FontAwesomeIcon6 name="utensils" size={40} color="#A3B18A" />,
        name: 'Ẩm thực đa dạng',
        description: 'Khách sạn có phục vụ các món Á, Âu, buffet, hải sản,... với khẩu vị có thể tùy chỉnh theo yêu cầu của quý khách',
        isActive: false
    }
]

const HighlightedServicesSection = ({ isSummarized = false, containerClassNames, navigateToServicesTab }: HighlightedServicesSectionProps) => {
    const router = useRouter()

    return (
        <View className={twMerge(`w-full gap-9 ${containerClassNames}`)}>
            <View className="items-center gap-5">
                <Text className="font-semibold uppercase tracking-widest text-secondary">Các dịch vụ chúng tôi cung cấp</Text>
                <Text className="text-center font-serif text-3xl font-bold leading-[1.4]">Các dịch vụ nổi bật tại Stay Mate Hotel</Text>
            </View>
            <View className="gap-[30px]">
                {HIGHLIGHTED_SERVICES.filter((_, index) => (isSummarized && index >= 3 ? false : true)).map(service => (
                    <View key={service.name} className={`items-center gap-6 rounded-3xl p-[30px] ${service.isActive ? 'bg-accent' : 'bg-white'}`}>
                        {service.Icon}
                        <View>
                            <Text
                                className={`text-center font-serif text-3xl font-bold capitalize ${service.isActive ? 'text-ivory' : 'text-[#2D2D2D]'}`}
                            >
                                {service.name}
                            </Text>
                            <Text className={`mt-[10px] text-center text-lg ${service.isActive ? 'text-ivory' : 'text-[#6E6E6E]'}`}>
                                {service.description}
                            </Text>
                        </View>
                        <TouchableOpacity
                            className="mt-auto h-[50px] w-full flex-row items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary/90"
                            onPress={() => {
                                isSummarized ? navigateToServicesTab!() : router.push('/booking')
                            }}
                        >
                            <Text className="font-semibold uppercase tracking-widest text-ivory">
                                {isSummarized ? 'Tìm hiểu thêm' : 'Đặt phòng ngay'}
                            </Text>
                            <MaterialIcon name="arrow-forward" size={20} color="#F3ECDC" />
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
            <View className="block">
                {isSummarized ? (
                    <TouchableOpacity onPress={navigateToServicesTab} className="block">
                        <Text className="text-center font-semibold uppercase tracking-widest">
                            Bạn quan tâm các dịch vụ khác tại Stay Mate Hotel?{' '}
                            <Text className="font-semibold uppercase tracking-widest text-primary">Tìm hiểu thêm</Text>
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={() => router.push('/booking')} className="block">
                        <Text className="text-center font-semibold uppercase tracking-widest">
                            Bạn cảm thấy hứng thú với các dịch vụ tại Stay Mate Hotel?{' '}
                            <Text className="font-semibold uppercase tracking-widest text-primary">Đặt phòng ngay</Text>
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default HighlightedServicesSection
