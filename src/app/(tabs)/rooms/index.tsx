import { View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppBar from '@/components/layout/AppBar'
import Footer from '@/components/layout/Footer'
import RoomListHeroSection from '@/components/screen/rooms/RoomListHeroSection'
import RoomListSection from '@/components/screen/rooms/RoomListSection'

const RoomListScreen = () => {
    return (
        <SafeAreaView className="flex-1 bg-ivory">
            <AppBar />
            <ScrollView>
                <View className="flex-1">
                    <RoomListHeroSection />
                    <RoomListSection />
                    <Footer />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default RoomListScreen
