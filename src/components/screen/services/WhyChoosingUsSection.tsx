import { View, Text, ImageBackground } from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'
import IntroVideoPlayButton from '@/components/common/IntroVideoPlayButton'

type WhyChoosingUsSectionProps = {
    featureImageUrl: string
}

const WhyChoosingUsSection = ({ featureImageUrl }: WhyChoosingUsSectionProps) => {
    return (
        <View className="flex-row justify-center bg-accent px-5 py-20">
            <View className="w-full gap-[30px]">
                <View className="gap-[30px]">
                    <View className="gap-5">
                        <Text className="text-center font-semibold uppercase tracking-widest text-secondary">
                            Tại sao bạn nên sử dụng dịch vụ của chúng tôi?
                        </Text>
                        <Text className="text-justify font-serif text-3xl font-bold leading-[1.4] text-ivory">
                            Chúng tôi tự tin sẽ mang lại dịch vụ tận tâm và giúp bạn hài lòng!
                        </Text>
                    </View>

                    <View className="relative h-[250px] rounded-3xl bg-ivory p-[10px]">
                        <View className="overflow-hidden rounded-2xl">
                            <ImageBackground source={{ uri: featureImageUrl }}>
                                <View className="h-full"></View>
                            </ImageBackground>
                        </View>
                        <View className="absolute bottom-0 left-0 right-0 top-0 items-center justify-center">
                            <IntroVideoPlayButton />
                        </View>
                    </View>

                    <View className="gap-5">
                        <View className="flex-row gap-5">
                            <FontAwesomeIcon name="shield-alt" size={30} color="#A3B18A" />
                            <View className="flex-1">
                                <Text className="font-serif text-2xl font-bold text-ivory">An ninh nghiêm ngặt</Text>
                                <Text className="mt-2 text-justify text-lg text-white/75">
                                    Có bảo vệ canh cổng 24/24, đảm bảo vấn đề an ninh của khách sạn
                                </Text>
                            </View>
                        </View>
                        <View className="flex-row gap-5">
                            <FontAwesomeIcon name="list" size={30} color="#A3B18A" />
                            <View className="flex-1">
                                <Text className="font-serif text-2xl font-bold text-ivory">Loại phòng đa dạng</Text>
                                <Text className="mt-2 text-justify text-lg text-white/75">
                                    Có nhiều hạng phòng với đa dạng sức chứa, tiện ích và giá thuê, phù hợp với nhu cầu của bạn
                                </Text>
                            </View>
                        </View>
                        <View className="flex-row gap-5">
                            <FontAwesomeIcon name="comments" size={30} color="#A3B18A" />
                            <View className="flex-1">
                                <Text className="font-serif text-2xl font-bold text-ivory">Hotline hỗ trợ miễn phí</Text>
                                <Text className="mt-2 text-justify text-lg text-white/75">
                                    Có nhân viên hỗ trợ 24/24, đảm bảo phục vụ tốt mọi nhu cầu bạn đề ra
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View className="items-start gap-5 rounded-3xl bg-tertiary px-[30px] py-[50px]">
                        <FontAwesomeIcon name="quote-left" color="rgba(255, 255, 255, 0.75)" size={32} />
                        <Text className="text-[22px] font-semibold italic leading-relaxed text-white/75">
                            "Stay Comfortably, Stay Happily, Stay Mate!"
                        </Text>
                        <Text className="text-justify text-lg text-white/75">
                            Trải nghiệm sự kết hợp hoàn hảo giữa sự thoải mái và nét hiện đại tại khách sạn Stay Mate Hotel. Với lòng hiếu khách tận
                            tâm cùng không gian ấm cúng được trang trí độc nhất, chúng tôi đảm bảo mọi khoảnh khắc lưu trú của bạn đều như ở nhà. Niềm
                            hạnh phúc của bạn là ưu tiên hàng đầu của chúng tôi!
                        </Text>
                        <View className="gap-[15px]">
                            <View className="flex-row items-center gap-[15px]">
                                <FontAwesomeIcon name="check-circle" size={20} color="#F3ECDC" />
                                <Text className="text-lg text-white/75">Tư vấn 24 giờ</Text>
                            </View>
                            <View className="flex-row items-center gap-[15px]">
                                <FontAwesomeIcon name="check-circle" size={20} color="#F3ECDC" />
                                <Text className="text-lg text-white/75">Giữ xe miễn phí</Text>
                            </View>
                            <View className="flex-row items-center gap-[15px]">
                                <FontAwesomeIcon name="check-circle" size={20} color="#F3ECDC" />
                                <Text className="text-lg text-white/75">Giờ giấc ra vào tự do</Text>
                            </View>
                            <View className="flex-row items-center gap-[15px]">
                                <FontAwesomeIcon name="check-circle" size={20} color="#F3ECDC" />
                                <Text className="text-lg text-white/75">Không tăng giá dịp lễ, Tết</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default WhyChoosingUsSection
