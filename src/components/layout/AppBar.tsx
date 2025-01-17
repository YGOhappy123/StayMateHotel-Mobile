import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { signOut } from '@/slices/authSlice'
import Toast from 'react-native-toast-message'
import toastConfig from '@/configs/toastConfig'

const AppBar = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const isLogged = useSelector((state: RootState) => state.auth.isLogged)
    const user = useSelector((state: RootState) => state.auth.user)

    return (
        <View className="flex-row items-center justify-between border-b border-[#6E6E6E]/20 px-5 py-3">
            <View className="flex-row items-center gap-2.5">
                <Image source={require('../../assets/images/no-text-logo.png')} className="h-[45px] w-[45px]" />
                <Text className="whitespace-pre text-xl font-semibold text-primary" style={{ letterSpacing: 4 }}>
                    SMH
                </Text>
            </View>
            {!isLogged ? (
                <TouchableOpacity
                    onPress={() => router.push('/auth/sign-in')}
                    className="min-w-[140px] items-center justify-center rounded-full bg-primary px-5 py-2.5"
                >
                    <Text className="text-xl font-medium capitalize text-ivory">Đăng nhập</Text>
                </TouchableOpacity>
            ) : (
                <View className="flex-row items-center gap-2.5">
                    <TouchableOpacity
                        onPress={() => {
                            router.push('/')
                            dispatch(signOut() as any)
                            Toast.show(
                                toastConfig({
                                    type: 'success',
                                    title: 'Đăng xuất thành công.',
                                    body: 'Bạn đã đăng xuất khỏi phiên đăng nhập.'
                                })
                            )
                        }}
                        className="min-w-[140px] items-center justify-center rounded-full bg-primary px-5 py-2.5"
                    >
                        <Text className="text-xl font-medium capitalize text-ivory">Đăng xuất</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push('/profile')}>
                        <Image source={{ uri: user?.avatar }} className="h-[45px] w-[45px] rounded-full border-2 border-primary" />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}

export default AppBar
