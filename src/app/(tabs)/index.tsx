import { useRouter } from 'expo-router'
import { TouchableOpacity, Text, Dimensions, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { signOut } from '@/slices/authSlice'

const HomeScreen = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const isLogged = useSelector((state: RootState) => state.auth.isLogged)

    return (
        <SafeAreaView className="h-full items-center justify-center bg-ivory">
            {isLogged ? (
                <View className="gap-4">
                    <TouchableOpacity
                        onPress={() => router.push('/dashboard')}
                        className="items-center rounded-full border-2 border-solid border-yellow-600 bg-yellow-100 px-5 py-4"
                        style={{
                            width: Dimensions.get('screen').width * 0.8
                        }}
                    >
                        <Text className="text-xl font-semibold text-yellow-600">Đến trang quản lý</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => dispatch(signOut() as any)}
                        className="items-center rounded-full border-2 border-solid border-pink-600 bg-pink-100 px-5 py-4"
                        style={{
                            width: Dimensions.get('screen').width * 0.8
                        }}
                    >
                        <Text className="text-xl font-semibold text-pink-600">Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity
                    onPress={() => router.push('/auth/sign-in')}
                    className="items-center rounded-full border-2 border-solid border-blue-600 bg-blue-100 px-5 py-4"
                    style={{
                        width: Dimensions.get('screen').width * 0.8
                    }}
                >
                    <Text className="text-xl font-semibold text-blue-600">Đăng nhập</Text>
                </TouchableOpacity>
            )}
        </SafeAreaView>
    )
}

export default HomeScreen
