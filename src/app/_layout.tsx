import * as NavigationBar from 'expo-navigation-bar'
import { useEffect } from 'react'
import { Stack } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider as ReduxProvider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { AppState, AppStateStatus, StatusBar } from 'react-native'
import { store } from '@/store'
import { PortalHost } from '@rn-primitives/portal'
import Toast from 'react-native-toast-message'
import '../global.css'

const persistor = persistStore(store)
const queryClient = new QueryClient()

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
        <SafeAreaProvider>
            <ReduxProvider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <QueryClientProvider client={queryClient}>
                        <Stack>
                            <Stack.Screen name="auth" options={{ headerShown: false }} />
                            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                        </Stack>
                    </QueryClientProvider>
                </PersistGate>
                <StatusBar barStyle="light-content" />
                <Toast />
                <PortalHost />
            </ReduxProvider>
        </SafeAreaProvider>
    )
}

export default RootLayout
