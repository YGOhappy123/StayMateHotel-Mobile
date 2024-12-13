import { useCallback } from 'react'
import { Stack, useFocusEffect, useRouter } from 'expo-router'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import Toast from 'react-native-toast-message'
import toastConfig from '@/configs/toastConfig'

const AuthLayout = () => {
    const isLogged = useSelector(
        (state: RootState) => state.auth.isLogged,
        () => true
    )
    const router = useRouter()

    useFocusEffect(
        useCallback(() => {
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
    )

    if (isLogged) return null

    return (
        <Stack>
            <Stack.Screen name="sign-in" options={{ headerShown: false }} />
            <Stack.Screen name="sign-up" options={{ headerShown: false }} />
        </Stack>
    )
}

export default AuthLayout
