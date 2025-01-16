import { View, Text, ScrollView } from 'react-native'
import AboutHeroSection from '@/components/screen/about/AboutHeroSection'
import DescriptionSection from '@/components/screen/about/DescriptionSection'
import Footer from '@/components/layout/Footer'

type AboutUsTabProps = {
    navigateToHomeTab: () => void
}

const AboutUsTab = ({ navigateToHomeTab }: AboutUsTabProps) => {
    return (
        <ScrollView>
            <View className="flex-1">
                <AboutHeroSection navigateToHomeTab={navigateToHomeTab} />
                <DescriptionSection />
                <Footer />
            </View>
        </ScrollView>
    )
}

export default AboutUsTab
