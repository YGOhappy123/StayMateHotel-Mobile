type SocialLink = {
    platform: string
    url: string
    icon: string
}

type NavigationTab = {
    label: string
    href: string
    roles?: IRole[]
}

export const NAVIGATION_TABS: NavigationTab[] = [
    { label: 'trang chủ', href: '/' },
    { label: 'giới thiệu', href: '/about-us' },
    { label: 'dịch vụ', href: '/our-services' },
    { label: 'xem phòng', href: '/rooms' },
    { label: 'đặt phòng', href: '/booking' },
    { label: 'quản lý', href: '/dashboard', roles: ['Admin'] }
]

export const SOCIAL_LINKS: SocialLink[] = [
    { platform: 'facebook', url: 'https://www.facebook.com', icon: 'facebook' },
    { platform: 'youtube', url: 'https://youtube.com', icon: 'youtube' },
    { platform: 'tiktok', url: 'https://www.tiktok.com', icon: 'tiktok' },
    { platform: 'instagram', url: 'https://www.instagram.com', icon: 'instagram' },
    { platform: 'x', url: 'https://x.com', icon: 'twitter' }
]

export const INTRODUCTION_VIDEO_URL = 'https://www.youtube.com'
