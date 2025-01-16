import { View, Text } from 'react-native'

const StatisticSection = () => {
    return (
        <View className="gap-5 bg-accent p-5">
            <View className="w-full flex-row gap-5">
                <View className="flex-1 items-center justify-end">
                    <View className="flex-row gap-1">
                        <Text className="font-serif text-4xl font-bold leading-[1.5] text-ivory">125</Text>
                        <Text className="font-serif text-3xl font-bold text-ivory">+</Text>
                    </View>
                    <Text className="font-serif text-lg font-semibold capitalize text-ivory">Phòng Khách Sạn</Text>
                </View>
                <View className="flex-1 items-center justify-end">
                    <Text className="font-serif text-4xl font-bold leading-[1.5] text-ivory">10th</Text>
                    <Text className="font-serif text-lg font-semibold capitalize text-ivory">Top Khách Sạn 2024</Text>
                </View>
            </View>
            <View className="w-full flex-row gap-5">
                <View className="flex-1 items-center justify-end">
                    <View className="flex-row gap-1">
                        <Text className="font-serif text-4xl font-bold leading-[1.5] text-ivory">6k</Text>
                        <Text className="font-serif text-3xl font-bold text-ivory">+</Text>
                    </View>
                    <Text className="font-serif text-lg font-semibold capitalize text-ivory">Khách Hàng Mỗi Năm</Text>
                </View>
                <View className="flex-1 items-center justify-end">
                    <View className="flex-row gap-1">
                        <Text className="font-serif text-4xl font-bold leading-[1.5] text-ivory">2k</Text>
                        <Text className="font-serif text-3xl font-bold text-ivory">+</Text>
                    </View>
                    <Text className="font-serif text-lg font-semibold capitalize text-ivory">Lượt Thuê Mỗi Năm</Text>
                </View>
            </View>
        </View>
    )
}

export default StatisticSection
