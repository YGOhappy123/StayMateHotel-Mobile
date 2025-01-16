import { useCallback } from 'react'
import { Stack, useFocusEffect, useRouter } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import Toast from 'react-native-toast-message'
import toastConfig from '@/configs/toastConfig'

const ProfileLayout = () => {
    const isLogged = useSelector((state: RootState) => state.auth.isLogged)
    const router = useRouter()

    useFocusEffect(
        useCallback(() => {
            if (!isLogged) {
                Toast.show(
                    toastConfig({
                        type: 'info',
                        title: 'Bạn chưa đăng nhập.',
                        body: 'Vui lòng đăng nhập để sử dụng tính năng này.'
                    })
                )
                router.push('/')
            }
        }, [router, isLogged])
    )

    if (!isLogged) return null

    return (
        <SafeAreaProvider>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
            </Stack>
        </SafeAreaProvider>
    )
}

export default ProfileLayout
