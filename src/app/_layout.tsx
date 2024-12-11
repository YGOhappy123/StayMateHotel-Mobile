import { Stack } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import '../global.css'

const RootLayout = () => {
    return (
        <SafeAreaProvider>
            <Stack>
                <Stack.Screen name="auth/sign-in" options={{ headerShown: false }} />
                <Stack.Screen name="auth/sign-up" options={{ headerShown: false }} />
                <Stack.Screen name="index" options={{ headerShown: false }} />
            </Stack>
        </SafeAreaProvider>
    )
}

export default RootLayout
