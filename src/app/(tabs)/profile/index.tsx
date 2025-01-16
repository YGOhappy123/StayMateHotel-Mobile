import { useState } from 'react'
import { useWindowDimensions, Text } from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view'
import { SafeAreaView } from 'react-native-safe-area-context'
import { renderTabBar } from '@/app/(tabs)/(home)'
import AppBar from '@/components/layout/AppBar'
import EditProfileTab from '@/app/(tabs)/profile/edit-profile-tab'
import ChangeAvatarTab from '@/app/(tabs)/profile/change-avatar-tab'
import ChangePasswordTab from '@/app/(tabs)/profile/change-password-tab'

const ProfileTabScreen = () => {
    const layout = useWindowDimensions()
    const [index, setIndex] = useState(0)
    const [routes] = useState([
        { key: 'first', title: 'Thông Tin' },
        { key: 'second', title: 'Avatar' },
        { key: 'third', title: 'Mật Khẩu' },
        { key: 'fourth', title: 'Xem Đơn' }
    ])

    const renderScene = SceneMap({
        first: () => <EditProfileTab />,
        second: () => <ChangeAvatarTab />,
        third: () => <ChangePasswordTab />,
        fourth: () => <Text>4</Text>
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

export default ProfileTabScreen
