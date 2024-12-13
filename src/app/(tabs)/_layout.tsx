import TabIcon from '@/components/common/TabIcon'
import { RootState } from '@/store'
import { Tabs } from 'expo-router'
import { useSelector } from 'react-redux'

const TabsLayout = () => {
    const user = useSelector((state: RootState) => state.auth.user)

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#588157',
                tabBarInactiveTintColor: '#A3B59C',
                tabBarShowLabel: false,
                tabBarStyle: {
                    paddingTop: 10,
                    paddingBottom: 10,
                    backgroundColor: '#F3ECDC',
                    borderTopWidth: 1,
                    height: 70
                }
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => <TabIcon label="Trang Chủ" iconName="home" color={color} focused={focused} />
                }}
            />
            <Tabs.Screen
                name="booking"
                options={{
                    title: 'Booking',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => <TabIcon label="Đặt phòng" iconName="bookmark" color={color} focused={focused} />
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => <TabIcon label="Profile" iconName="supervised-user-circle" color={color} focused={focused} />
                }}
            />
            <Tabs.Screen
                name="dashboard"
                options={{
                    href: !user || user.role !== 'Admin' ? null : '/dashboard',
                    title: 'Dashboard',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => <TabIcon label="Dashboard" iconName="dashboard" color={color} focused={focused} />
                }}
            />
        </Tabs>
    )
}

export default TabsLayout
