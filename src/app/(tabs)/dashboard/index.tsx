import { View, Text, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppBar from '@/components/layout/AppBar'

const DashboardPage = () => {
    return (
        <SafeAreaView className="flex-1">
            <AppBar />
            <View className="flex-1 items-center justify-center">
                <Text className="text-center text-lg font-semibold text-[#6E6E6E]">Xin lỗi!</Text>
                <Text className="px-10 text-center font-semibold text-[#6E6E6E]">
                    Vì hạn chế kỹ thuật, các tính năng quản lý hiện tại chỉ dùng được trên giao diện website. Chúng tôi sẽ tích hợp vào ứng dụng sớm
                    nhất, mong bạn thông cảm. Chúc bạn có một ngày tốt lành!
                </Text>
                <View className="mt-5">
                    <Image
                        source={require('@/assets/images/sorry-lettering.png')}
                        resizeMode="cover"
                        style={{ width: '80%', height: undefined, aspectRatio: 713 / 380 }}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default DashboardPage
