import * as NavigationBar from 'expo-navigation-bar'
import { useEffect } from 'react'
import { AppState, AppStateStatus, StatusBar } from 'react-native'
import { Stack } from 'expo-router'
import { PaperProvider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider as ReduxProvider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { store } from '@/store'
import { registerTranslation } from 'react-native-paper-dates'
import { vietnameseLanguage } from '@/utils/datePickerButtonText'
import Toast from 'react-native-toast-message'
import '../global.css'

const persistor = persistStore(store)
const queryClient = new QueryClient()
registerTranslation('vi', vietnameseLanguage as any)

const RootLayout = () => {
    const hideNavigationBar = async () => {
        await NavigationBar.setPositionAsync('absolute')
        await NavigationBar.setVisibilityAsync('hidden')
        await NavigationBar.setBehaviorAsync('overlay-swipe')
    }

    useEffect(() => {
        const appStateSubscription = AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
            if (nextAppState === 'active') {
                hideNavigationBar()
            }
        })

        return () => {
            appStateSubscription.remove()
        }
    }, [])

    useEffect(() => {
        hideNavigationBar()
    }, [])

    return (
        <PaperProvider>
            <GestureHandlerRootView>
                <SafeAreaProvider>
                    <ReduxProvider store={store}>
                        <PersistGate loading={null} persistor={persistor}>
                            <QueryClientProvider client={queryClient}>
                                <Stack>
                                    <Stack.Screen name="auth" options={{ headerShown: false }} />
                                    <Stack.Screen name="thank-you" options={{ headerShown: false }} />
                                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                                </Stack>
                            </QueryClientProvider>
                        </PersistGate>
                        <StatusBar barStyle="light-content" />
                        <Toast />
                    </ReduxProvider>
                </SafeAreaProvider>
            </GestureHandlerRootView>
        </PaperProvider>
    )
}

export default RootLayout
function useFonts(arg0: { 'Inter-Black': any }): [any, any] {
    throw new Error('Function not implemented.')
}
