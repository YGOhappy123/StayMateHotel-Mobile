import { Stack } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const RoomLayout = () => {
    return (
        <SafeAreaProvider>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="[id]" options={{ headerShown: false }} />
            </Stack>
        </SafeAreaProvider>
    )
}

export default RoomLayout
