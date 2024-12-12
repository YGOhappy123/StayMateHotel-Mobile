import { Stack, useRouter } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import Toast from 'react-native-toast-message'
import toastConfig from '@/configs/toastConfig'
import { useEffect } from 'react'
import { StatusBar } from 'react-native'

const AuthLayout = () => {
    const isLogged = useSelector((state: RootState) => state.auth.isLogged)
    const router = useRouter()

    useEffect(() => {
        if (isLogged) {
            Toast.show(
                toastConfig({
                    type: 'info',
                    title: 'Bạn đã đăng nhập rồi.',
                    body: 'Vui lòng đăng xuất nếu bạn muốn sử dụng tài khoản khác.'
                })
            )
            router.push('/')
        }
    }, [router, isLogged])

    if (isLogged) return null

    return (
        <SafeAreaProvider>
            <Stack>
                <Stack.Screen name="sign-in" options={{ headerShown: false }} />
                <Stack.Screen name="sign-up" options={{ headerShown: false }} />
            </Stack>
        </SafeAreaProvider>
    )
}

export default AuthLayout
