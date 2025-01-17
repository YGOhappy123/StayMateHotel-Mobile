import { View, Text, TouchableOpacity } from 'react-native'
import { twMerge } from 'tailwind-merge'
import Icon from 'react-native-vector-icons/MaterialIcons'

type PaginationProps = {
    currentPage: number
    handlePrev: () => void
    handleNext: () => void
    wrapperClassName?: string
}

const Pagination = ({ currentPage, handlePrev, handleNext, wrapperClassName }: PaginationProps) => {
    return (
        <View className={twMerge(`mx-auto h-[50px] flex-row items-center justify-between rounded-full bg-primary ${wrapperClassName}`)}>
            <TouchableOpacity className="h-full w-[130px] flex-row items-center justify-center gap-2" onPress={handlePrev}>
                <Icon name="keyboard-double-arrow-left" size={18} color="#FFFFFF" />
                <Text className="text-lg font-semibold uppercase tracking-widest text-white">Trước</Text>
            </TouchableOpacity>
            <View className="relative h-full w-[50px] items-center justify-center">
                <View className="absolute -bottom-[5px] -left-[5px] h-[60px] w-[60px] rounded-full bg-white"></View>
                <Text className="text-2xl font-bold text-secondary">{currentPage.toString().padStart(2, '0')}</Text>
            </View>
            <TouchableOpacity className="h-full w-[130px] flex-row items-center justify-center gap-2" onPress={handleNext}>
                <Text className="text-lg font-semibold uppercase tracking-widest text-white">Sau</Text>
                <Icon name="keyboard-double-arrow-right" size={18} color="#FFFFFF" />
            </TouchableOpacity>
        </View>
    )
}

export default Pagination
