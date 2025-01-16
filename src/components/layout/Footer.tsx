import { SOCIAL_LINKS } from '@/configs/constants'
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

const Footer = () => {
    const currentYear = new Date().getFullYear().toString()

    return (
        <View className="items-center gap-10 bg-accent px-5 pt-20">
            <View className="items-center gap-5">
                <View className="flex-row items-center gap-2.5">
                    <Image source={require('../../assets/images/no-text-logo.png')} className="h-[45px] w-[45px]" />
                    <Text className="whitespace-pre text-xl font-semibold text-white" style={{ letterSpacing: 4 }}>
                        StayMateHotel
                    </Text>
                </View>
                <Text className="text-center text-lg text-white/75">Ứng dụng tốt nhất cho dịch vụ lưu trú và khách sạn ở thành phố Vũng Tàu</Text>
                <View className="flex-row items-center gap-5">
                    {SOCIAL_LINKS.map(link => (
                        <TouchableOpacity key={link.url} onPress={() => Linking.openURL(link.url)}>
                            <Icon name={link.icon} size={24} color="#F3ECDC" />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <View className="h-[1px] w-full border-t border-white/30"></View>
            <View className="items-center gap-5">
                <Text className="font-serif text-2xl font-bold text-ivory">Thông tin liên hệ</Text>
                <View className="w-full flex-row items-center gap-4">
                    <Icon name="map-pin" size={24} color="#F3ECDC" />
                    <Text className="text-lg text-white/75">376 Trần Phú, Phường 5</Text>
                </View>
                <View className="w-full flex-row items-center gap-4">
                    <Icon name="envelope" size={24} color="#F3ECDC" />
                    <Text className="text-lg text-white/75">Staymatehotel@gmail.com</Text>
                </View>
                <View className="w-full flex-row items-center gap-4">
                    <Icon name="phone-square" size={24} color="#F3ECDC" />
                    <Text className="text-lg text-white/75">(+84)913.283.742</Text>
                </View>
            </View>
            <View className="max-w-container w-full border-t border-white/30 py-5">
                <Text className="text-center font-semibold uppercase tracking-widest text-ivory">&#169; {currentYear} - StayMateHotel</Text>
            </View>
        </View>
    )
}

export default Footer
