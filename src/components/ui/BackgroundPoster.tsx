import { ReactNode } from 'react'
import { View, ImageSourcePropType, Dimensions, ImageBackground } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

type BackgroundPosterProps = {
    source: ImageSourcePropType
    size: 'big' | 'small'
    children?: ReactNode
}

const BackgroundPoster = ({ source, size, children }: BackgroundPosterProps) => {
    return (
        <ImageBackground source={source} resizeMode="cover">
            <LinearGradient
                colors={['rgba(52, 78, 65, 0.9)', 'rgba(0, 0, 0, 0.13)']}
                locations={[0.42, 1]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
            >
                <View
                    className="items-center justify-end gap-10 p-5 pb-10"
                    style={{
                        width: Dimensions.get('screen').width,
                        height: Dimensions.get('screen').height * (size === 'big' ? 0.6 : 0.5)
                    }}
                >
                    {children}
                </View>
            </LinearGradient>
        </ImageBackground>
    )
}

export default BackgroundPoster
