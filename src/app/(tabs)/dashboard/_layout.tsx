import { useCallback } from 'react'
import { Stack, useFocusEffect, useRouter } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import Toast from 'react-native-toast-message'
import toastConfig from '@/configs/toastConfig'

const DashboardLayout = () => {
    const user = useSelector((state: RootState) => state.auth.user)
    const router = useRouter()

    useFocusEffect(
        useCallback(() => {
            if (!user || user.role !== 'Admin') {
                Toast.show(
                    toastConfig({
                        type: 'error',
                        title: 'Bạn không có quyền truy cập.',
                        body: 'Các trang quản lý chỉ dành cho admin của khách sạn.'
                    })
                )
                router.push('/')
            }
        }, [router, user])
    )

    if (!user || user.role !== 'Admin') return null

    return (
        <SafeAreaProvider>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="floors" options={{ headerShown: false }} />
            </Stack>
        </SafeAreaProvider>
    )
}

export default DashboardLayout
