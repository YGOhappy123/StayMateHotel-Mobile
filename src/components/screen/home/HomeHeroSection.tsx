import { View, Text, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import BackgroundPoster from '@/components/ui/BackgroundPoster'
import IntroVideoPlayButton from '@/components/common/IntroVideoPlayButton'

type HomeHeroSectionProps = {
    navigateToAboutTab: () => void
}

const HomeHeroSection = ({ navigateToAboutTab }: HomeHeroSectionProps) => {
    const router = useRouter()

    return (
        <BackgroundPoster
            source={{
                uri: 'https://images.unsplash.com/photo-1600054648630-e10e710825f6?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }}
            size="big"
        >
            <IntroVideoPlayButton />
            <View className="w-full gap-4">
                <Text className="font-semibold uppercase tracking-widest text-secondary">Nơi thuê phòng tốt nhất tại Vũng Tàu</Text>
                <Text className="font-serif text-[32px] font-bold capitalize leading-[1.4] text-ivory">
                    Nào, <Text className="text-secondary">hãy tìm</Text> căn phòng lý tưởng của bạn <Text className="text-secondary">ở đây ...</Text>
                </Text>
                <Text className="font-semibold capitalize text-ivory">
                    Căn phòng mơ ước của bạn, chỉ cách một lần lướt: Tìm sự thoải mái cho chuyến đi của bạn tại thành phố Vùng Tàu
                </Text>
                <View className="flex-row gap-4">
                    <TouchableOpacity
                        className="h-[50px] flex-1 items-center justify-center rounded-full bg-primary hover:bg-primary/90"
                        onPress={navigateToAboutTab}
                    >
                        <Text className="text-sm font-semibold uppercase text-ivory" style={{ letterSpacing: 2 }}>
                            Tìm hiểu thêm
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="h-[50px] flex-1 items-center justify-center rounded-full bg-ivory hover:bg-ivory/90"
                        onPress={() => router.push('/booking')}
                    >
                        <Text className="text-sm font-semibold uppercase text-primary" style={{ letterSpacing: 2 }}>
                            Đặt phòng
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </BackgroundPoster>
    )
}

export default HomeHeroSection
