import { useCallback } from 'react'
import { Stack, useFocusEffect, useRouter } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import Toast from 'react-native-toast-message'
import toastConfig from '@/configs/toastConfig'

const ThankYouLayout = () => {
    const user = useSelector((state: RootState) => state.auth.user)
    const router = useRouter()

    useFocusEffect(
        useCallback(() => {
            if (!user || user.role !== 'Guest') {
                Toast.show(
                    toastConfig({
                        type: 'error',
                        title: 'Bạn không có quyền truy cập.',
                        body: 'Các trang quản lý chỉ dành cho khách hàng.'
                    })
                )
                router.push('/')
            }
        }, [router, user])
    )

    if (!user || user.role !== 'Guest') return null

    return (
        <SafeAreaProvider>
            <Stack>
                <Stack.Screen name="[id]" options={{ headerShown: false }} />
            </Stack>
        </SafeAreaProvider>
    )
}

export default ThankYouLayout
