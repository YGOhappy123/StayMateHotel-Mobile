// import { Link, useNavigate } from 'react-router-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPlay } from '@fortawesome/free-solid-svg-icons'
// import { INTRODUCTION_VIDEO_URL } from '@/configs/constants'

import { Fragment } from 'react'
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import IntroVideoPlayButton from '@/components/common/IntroVideoPlayButton'

type ServicesGallerySectionProps = {
    images: {
        gallery: {
            feature: string
            top: string[]
            bottom: string[]
        }
        banner: string
    }
}

const ServicesGallerySection = ({ images }: ServicesGallerySectionProps) => {
    const router = useRouter()

    return (
        <Fragment>
            <View className="w-full gap-9">
                <View className="items-center gap-5">
                    <Text className="text-center font-semibold uppercase tracking-widest text-secondary">Bộ sưu tập các phòng tốt nhất</Text>
                    <Text className="text-balance font-serif text-3xl font-bold leading-[1.4]">Các phòng nổi bật tại Stay Mate Hotel</Text>
                </View>
                <View className="gap-[30px]">
                    <View className="aspect-[4/3]">
                        <View className="h-full overflow-hidden rounded-3xl">
                            <ImageBackground source={{ uri: images.gallery.feature }} resizeMode="cover">
                                <LinearGradient
                                    colors={['rgba(0, 0, 0, 0.04)', 'rgba(52, 78, 65, 0.83)']}
                                    locations={[0, 0.66]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 0, y: 1 }}
                                >
                                    <View className="relative h-full">
                                        <View className="absolute bottom-0 left-0 right-0 top-0 justify-end p-[25px]">
                                            <View className="flex-row items-center gap-[25px]">
                                                <View className="flex-1">
                                                    <Text className="text-justify text-base text-white/75">
                                                        Các phòng đều được lắp đặt các thiết bị hiện đại và cao cấp, kể cả các loại phòng tiêu chuẩn
                                                        hay VIP
                                                    </Text>
                                                </View>
                                                <IntroVideoPlayButton />
                                            </View>
                                        </View>
                                    </View>
                                </LinearGradient>
                            </ImageBackground>
                        </View>
                    </View>
                    {[...images.gallery.top, ...images.gallery.bottom].map(imageUrl => (
                        <View key={imageUrl} className="aspect-[4/3]">
                            <View className="h-full overflow-hidden rounded-3xl">
                                <ImageBackground source={{ uri: imageUrl }}>
                                    <View className="h-full"></View>
                                </ImageBackground>
                            </View>
                        </View>
                    ))}
                </View>
            </View>

            <View className="w-full pt-20">
                <View className="aspect-[3/5]">
                    <View className="h-full overflow-hidden rounded-3xl">
                        <ImageBackground source={{ uri: images.gallery.feature }} resizeMode="cover">
                            <LinearGradient
                                colors={['rgba(52, 78, 65, 1)', 'rgba(0, 0, 0, 0.11)']}
                                locations={[0.0, 1]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                <View className="relative h-full">
                                    <View className="absolute bottom-0 left-0 right-0 top-0 items-center justify-center p-[25px]">
                                        <View className="w-full items-center gap-5">
                                            <Text className="text-balance text-center font-serif text-3xl font-bold leading-[1.4] text-ivory">
                                                Cùng tận hưởng căn phòng phù hợp với ước mơ của bạn!
                                            </Text>
                                            <Text className="text-center text-lg text-white/75">
                                                Còn rất nhiều căn phòng tuyệt vời đang chờ bạn khám phá tại Stay Mate Hotel
                                            </Text>
                                            <TouchableOpacity
                                                className="h-[50px] w-full items-center justify-center rounded-full bg-primary hover:bg-primary/90"
                                                onPress={() => router.push('/booking')}
                                            >
                                                <Text className="font-semibold uppercase tracking-widest text-ivory">Đặt phòng ngay</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </LinearGradient>
                        </ImageBackground>
                    </View>
                </View>
            </View>
        </Fragment>
    )
}

export default ServicesGallerySection
