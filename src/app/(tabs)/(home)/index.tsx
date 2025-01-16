import { useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import AppBar from '@/components/layout/AppBar'
import HomeTab from '@/app/(tabs)/(home)/home-tab'
import OurServicesTab from '@/app/(tabs)/(home)/our-services-tab'
import AboutUsTab from '@/app/(tabs)/(home)/about-us-tab'

export const renderTabBar = (props: any) => (
    <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: '#588157' }}
        style={{ backgroundColor: '#F3ECDC', textAlign: 'center' }}
        activeColor="#588157"
        inactiveColor="#A3B18A"
    />
)

const TabScreen = () => {
    const layout = useWindowDimensions()
    const [index, setIndex] = useState(0)
    const [routes] = useState([
        { key: 'first', title: 'Trang Chủ' },
        { key: 'second', title: 'Giới Thiệu' },
        { key: 'third', title: 'Dịch Vụ' }
    ])

    const renderScene = SceneMap({
        first: () => <HomeTab navigateToAboutTab={() => setIndex(1)} navigateToServicesTab={() => setIndex(2)} />,
        second: () => <AboutUsTab navigateToHomeTab={() => setIndex(0)} />,
        third: () => <OurServicesTab navigateToHomeTab={() => setIndex(0)} />
    })

    return (
        <SafeAreaView className="flex-1 bg-ivory">
            <AppBar />
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={renderTabBar}
                initialLayout={{ width: layout.width }}
            />
        </SafeAreaView>
    )
}

export default TabScreen
