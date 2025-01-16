import { twMerge } from 'tailwind-merge'
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

type GradientButtonProps = {
    title: string
    handlePress: () => void
    disabled?: boolean
    containerStyles?: string
    textStyles?: string
    isLoading?: boolean
}

const GradientButton = ({ title, handlePress, disabled = false, containerStyles, textStyles, isLoading }: GradientButtonProps) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            className={twMerge(`min-w-[120px] flex-row overflow-hidden rounded-md ${containerStyles}`)}
            disabled={isLoading || disabled}
        >
            <LinearGradient
                colors={['#344E41', '#588157']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className={`h-full w-full flex-row items-center justify-center px-6 py-3 font-medium ${isLoading || disabled ? 'opacity-50' : ''}`}
            >
                <Text className={twMerge(`text-lg font-medium text-white ${textStyles}`)}>{title}</Text>

                {isLoading && <ActivityIndicator animating={isLoading} color="#fff" size="small" className="ml-2" />}
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default GradientButton
