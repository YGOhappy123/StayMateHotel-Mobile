import { View, Text, Image } from 'react-native'

const NoPermissionTab = () => {
    return (
        <View className="flex-1 items-center justify-center">
            <Text className="text-center text-lg font-semibold text-[#6E6E6E]">Xin lỗi!</Text>
            <Text className="px-10 text-center font-semibold text-[#6E6E6E]">Trang này chỉ hỗ trợ cho đối tượng khách hàng</Text>
            <View className="mt-5">
                <Image
                    source={require('@/assets/images/sorry-lettering.png')}
                    resizeMode="cover"
                    style={{ width: '80%', height: undefined, aspectRatio: 713 / 380 }}
                />
            </View>
        </View>
    )
}

export default NoPermissionTab
