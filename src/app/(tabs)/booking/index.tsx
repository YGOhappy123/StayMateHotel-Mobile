import { useRef, useState } from 'react'
import { View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FAB } from 'react-native-paper'
import AppBar from '@/components/layout/AppBar'
import Footer from '@/components/layout/Footer'
import BookingHeroSection from '@/components/screen/booking/BookingHeroSection'
import BookingRoomListSection from '@/components/screen/booking/BookingRoomListSection'

const BookingScreen = () => {
    const [isBtnShown, setIsBtnShown] = useState(false)
    const scrollViewRef = useRef<ScrollView>(null)
    const scrollToTop = () => {
        scrollViewRef.current?.scrollTo({
            y: 0,
            animated: true
        })
    }

    return (
        <SafeAreaView className="flex-1 bg-ivory">
            <AppBar />
            <ScrollView ref={scrollViewRef}>
                <View className="flex-1">
                    <BookingHeroSection />
                    <BookingRoomListSection setIsBtnShown={(value: boolean) => setIsBtnShown(value)} />
                    <Footer />
                </View>
            </ScrollView>

            {isBtnShown && (
                <FAB
                    className="absolute bottom-3 right-3 border-2 border-primary bg-primary"
                    color="#F3ECDC"
                    icon="arrow-up"
                    size="small"
                    onPress={scrollToTop}
                />
            )}
        </SafeAreaView>
    )
}

export default BookingScreen
