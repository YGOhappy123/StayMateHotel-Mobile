import { View, ScrollView } from 'react-native'
import HomeHeroSection from '@/components/screen/home/HomeHeroSection'
import StatisticSection from '@/components/screen/home/StatisticSection'
import DescriptionSection from '@/components/screen/home/DescriptionSection'
import WhyChoosingUsSection from '@/components/screen/services/WhyChoosingUsSection'
import GallerySection from '@/components/screen/home/GallerySection'
import Footer from '@/components/layout/Footer'

type HomeTabProps = {
    navigateToServicesTab: () => void
    navigateToAboutTab: () => void
}

const HomeTab = ({ navigateToServicesTab, navigateToAboutTab }: HomeTabProps) => {
    return (
        <ScrollView>
            <View className="flex-1">
                <HomeHeroSection navigateToAboutTab={navigateToAboutTab} />
                <StatisticSection />
                <DescriptionSection navigateToServicesTab={navigateToServicesTab} navigateToAboutTab={navigateToAboutTab} />
                <WhyChoosingUsSection featureImageUrl="https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                <GallerySection />
                <Footer />
            </View>
        </ScrollView>
    )
}

export default HomeTab
