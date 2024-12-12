import { Stack } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider as ReduxProvider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { store } from '@/store'
import Toast from 'react-native-toast-message'
import '../global.css'
import { StatusBar } from 'react-native'

const persistor = persistStore(store)
const queryClient = new QueryClient()

const RootLayout = () => {
    return (
        <SafeAreaProvider>
            <ReduxProvider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <QueryClientProvider client={queryClient}>
                        <Stack>
                            <Stack.Screen name="auth" options={{ headerShown: false }} />
                            <Stack.Screen name="dashboard" options={{ headerShown: false }} />
                            <Stack.Screen name="index" options={{ headerShown: false }} />
                        </Stack>
                    </QueryClientProvider>
                </PersistGate>
                <StatusBar barStyle="light-content" />
                <Toast />
            </ReduxProvider>
        </SafeAreaProvider>
    )
}

export default RootLayout
