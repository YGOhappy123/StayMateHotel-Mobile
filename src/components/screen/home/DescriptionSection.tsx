import { useState } from 'react'
import { View, Text, TouchableOpacity, ImageBackground, LayoutChangeEvent } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import AwardsSection from '@/components/screen/about/AwardsSection'
import HighlightedServicesSection from '@/components/screen/services/HighlightedServicesSection'

type DescriptionSectionProps = {
    navigateToServicesTab?: () => void
    navigateToAboutTab?: () => void
}

const DescriptionSection = ({ navigateToServicesTab, navigateToAboutTab }: DescriptionSectionProps) => {
    const [parentSize, setParentSize] = useState({ width: 0, height: 0 })

    const handleParentLayout = (event: LayoutChangeEvent) => {
        const { width, height } = event.nativeEvent.layout
        setParentSize({ width, height })
    }

    return (
        <View className="w-full bg-ivory px-5 py-20">
            <View className="w-full gap-9">
                <View className="gap-5">
                    <Text className="text-center font-semibold uppercase tracking-widest text-secondary">Vài nét về chúng tôi</Text>
                    <Text className="text-balance font-serif text-3xl font-bold leading-[1.4]">
                        Phòng khách sạn với giá cả phải chăng cùng không gian hiện đại
                    </Text>
                    <TouchableOpacity onPress={navigateToAboutTab} className="flex-row items-center gap-2">
                        <Text className="font-semibold uppercase tracking-widest text-primary">Tìm hiểu thêm</Text>
                        <MaterialIcon name="arrow-forward" size={20} color="#588157" />
                    </TouchableOpacity>
                </View>
                <View className="flex-row gap-5 pt-10">
                    <View className="relative flex-1 items-start gap-5 pl-[30px] pr-5" onLayout={handleParentLayout}>
                        <View
                            className="absolute bottom-0 left-0 rounded-t-3xl bg-accent"
                            style={{
                                width: parentSize.width + 80,
                                height: parentSize.height + 40
                            }}
                        ></View>
                        <FontAwesomeIcon name="quote-left" color="rgba(255, 255, 255, 0.75)" size={32} />
                        <Text className="z-[1] text-lg font-semibold italic text-white/75">"Stay Comfortably, Stay Happily, Stay Mate!"</Text>
                    </View>
                    <View className="z-[1] h-[145px] flex-1 rounded-t-3xl bg-ivory px-[10px] pt-[10px]">
                        <View className="h-full overflow-hidden rounded-t-2xl">
                            <ImageBackground
                                source={{
                                    uri: 'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=3027&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                                }}
                                resizeMode="cover"
                            >
                                <View className="h-full"></View>
                            </ImageBackground>
                        </View>
                    </View>
                </View>
            </View>

            <AwardsSection isSummarized containerClassNames="pt-20" navigateToAboutTab={navigateToAboutTab} />
            <HighlightedServicesSection isSummarized containerClassNames="pt-20" navigateToServicesTab={navigateToServicesTab} />
        </View>
    )
}

export default DescriptionSection
