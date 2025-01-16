import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesomeIcon6 from 'react-native-vector-icons/FontAwesome6'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

const ThankYouScreen = () => {
    const { id } = useLocalSearchParams()
    const router = useRouter()

    return (
        <SafeAreaView className="flex-1 bg-[#FAFAFB]">
            <View className="h-full items-center justify-between border border-[#6E6E6E]/20">
                <Image
                    source={require('@/assets/images/tkp-top-pattern.png')}
                    resizeMode="cover"
                    style={{ width: '100%', height: undefined, aspectRatio: 626 / 266 }}
                />

                <View>
                    <View className="mb-6 items-center gap-5">
                        <Image
                            source={require('@/assets/images/tkp-title.png')}
                            resizeMode="cover"
                            style={{ width: '80%', height: undefined, aspectRatio: 713 / 380 }}
                        />
                        <Text className="text-xl font-medium uppercase text-[#699282]">Cảm ơn bạn đã ủng hộ Stay Mate Hotel</Text>
                    </View>

                    <View className="items-center">
                        <Text className="font-medium text-[#699282]">Đơn đặt phòng của bạn đã được ghi nhận!</Text>
                        <Text className="px-10 text-center font-medium text-[#699282]">
                            Chúng tôi sẽ sớm liên hệ với bạn thông qua email và số điện thoại
                        </Text>
                        <Text className="mb-[30px] text-black/45">Mã đơn đặt phòng: {id}</Text>
                        <View className="flex items-center gap-4">
                            <TouchableOpacity
                                className="h-[50px] w-[250px] flex-row items-center justify-center gap-3 rounded-full bg-[#699282] hover:bg-[#699282]/90"
                                onPress={() => router.push('/profile')}
                            >
                                <Text>
                                    <FontAwesomeIcon6 name="hotel" size={20} color="#D9D9D9" />
                                </Text>
                                <Text className="font-semibold uppercase tracking-widest text-[#D9D9D9]">Quản lý đơn</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="h-[50px] w-[250px] flex-row items-center justify-center gap-3 rounded-full bg-[#D9D9D9] hover:bg-[#D9D9D9]/90"
                                onPress={() => router.push('/')}
                            >
                                <Text>
                                    <FontAwesomeIcon name="home" size={24} color="#699282" />
                                </Text>
                                <Text className="font-semibold uppercase tracking-widest text-[#699282]">Về trang chủ</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <Image
                    source={require('@/assets/images/tkp-bottom-pattern.png')}
                    resizeMode="cover"
                    style={{ width: '100%', height: undefined, aspectRatio: 626 / 280 }}
                />
            </View>
        </SafeAreaView>
    )
}

export default ThankYouScreen
