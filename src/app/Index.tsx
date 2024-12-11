import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { StatusBar, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'

const WelcomeScreen = () => {
    const [text, setText] = useState('')
    const router = useRouter()

    useEffect(() => {
        const demoGetApi = async () => {
            const { data } = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/rooms`)
            console.log(data)
        }

        // demoGetApi()
    }, [])

    return (
        <SafeAreaView className="h-full items-center justify-center bg-primary">
            <Button title="Sign In" onPress={() => router.push('/auth/sign-in')} />
            <StatusBar barStyle="light-content" />
        </SafeAreaView>
    )
}

export default WelcomeScreen
