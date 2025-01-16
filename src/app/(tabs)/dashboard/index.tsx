import { useRouter } from 'expo-router'
import { Dimensions, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const DashboardPage = () => {
    const router = useRouter()

    return (
        <SafeAreaView>
            <Text>Trang quản lý</Text>
            <Text>Vật tư khách sạn</Text>
            <TouchableOpacity
                onPress={() => router.push('/dashboard/floors')}
                className="items-center rounded-full border-2 border-solid border-yellow-600 bg-yellow-100 px-5 py-4"
                style={{
                    width: Dimensions.get('screen').width * 0.8
                }}
            >
                <Text className="text-xl font-semibold text-yellow-600">Tầng khách sạn</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default DashboardPage
