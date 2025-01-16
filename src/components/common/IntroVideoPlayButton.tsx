import { TouchableOpacity, Linking } from 'react-native'
import { INTRODUCTION_VIDEO_URL } from '@/configs/constants'
import Icon from 'react-native-vector-icons/MaterialIcons'

const IntroVideoPlayButton = () => {
    return (
        <TouchableOpacity
            onPress={() => Linking.openURL(INTRODUCTION_VIDEO_URL)}
            className="h-[70px] w-[70px] items-center justify-center rounded-full bg-secondary"
        >
            <Icon name="play-arrow" size={32} color="#FFF" />
        </TouchableOpacity>
    )
}

export default IntroVideoPlayButton
