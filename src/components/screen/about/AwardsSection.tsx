import { twMerge } from 'tailwind-merge'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6'

type AwardsSectionProps = {
    isSummarized?: boolean
    containerClassNames?: string
    navigateToAboutTab?: () => void
}

const AwardsSection = ({ isSummarized = false, containerClassNames, navigateToAboutTab }: AwardsSectionProps) => {
    return (
        <View className={twMerge(`w-full gap-20 bg-ivory ${containerClassNames}`)}>
            <View className="flex-1 justify-center gap-5">
                <Text className="text-center font-semibold uppercase tracking-widest text-secondary">Hệ thống khách sạn hiện đại nhất</Text>
                <Text className="font-serif text-3xl font-bold leading-[1.4]">
                    Chúng tôi tự tin mang cho bạn cảm giác tiện nghi, thoải mái, hiện đại với giá cả phải chăng.
                </Text>
                <Text className="font-semibold text-[#6E6E6E]">
                    Cung cấp dịch vụ tốt nhất, hứa hẹn sẽ giúp bạn tìm được căn phòng mơ ước cho chuyến đi của mình.
                </Text>
                <Image
                    style={{
                        width: '100%',
                        height: undefined,
                        aspectRatio: 911 / 928,
                        marginVertical: 20
                    }}
                    source={{
                        uri: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1736763903/stay-mate-hotel/Screenshot_2025-01-13_172046_a6a1ce.png'
                    }}
                />
                <View className="flex-row items-center gap-4">
                    <FontAwesomeIcon name="award" className="text-secondary" size={28} color="#A3B18A" />
                    <Text className="text-xl font-semibold">Thuộc top 10 khách sạn tốt nhất tại thành phố Vũng Tàu năm 2024</Text>
                </View>
                <View className="flex-row items-center gap-4">
                    <FontAwesomeIcon name="calendar-alt" className="text-secondary" size={28} color="#A3B18A" />
                    <Text className="text-xl font-semibold">Với hơn 15 năm hoạt động trong lĩnh vực khách sạn và du lịch</Text>
                </View>
                {isSummarized && (
                    <TouchableOpacity
                        className="h-[50px] w-full flex-row items-center justify-center gap-2 rounded-full bg-primary font-semibold uppercase tracking-widest text-ivory hover:bg-primary/90"
                        onPress={navigateToAboutTab}
                    >
                        <Text className="text-sm font-semibold uppercase text-ivory" style={{ letterSpacing: 2 }}>
                            Tìm hiểu thêm
                        </Text>
                        <MaterialIcon name="arrow-forward" size={20} color="#F3ECDC" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default AwardsSection
