import { useEffect } from 'react'
import { SplashScreen, Stack } from 'expo-router'
import { useFonts } from 'expo-font'
import '../global.css'

SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
    const [fontsLoaded, error] = useFonts({
        'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
        'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
        'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
        'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
        'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
        'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf')
    })

    useEffect(() => {
        if (error) throw error
        if (fontsLoaded) {
            SplashScreen.hideAsync()
        }
    }, [fontsLoaded, error])

    if (!fontsLoaded) return null
    return (
        <Stack>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
    )
}

export default RootLayout
