import { Stack } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

const HomeLayout = () => {
    const user = useSelector(
        (state: RootState) => state.auth.user,
        () => true
    )

    return (
        <SafeAreaProvider>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
            </Stack>
        </SafeAreaProvider>
    )
}

export default HomeLayout
