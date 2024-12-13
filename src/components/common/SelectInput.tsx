import { useMemo } from 'react'
import { View, Text } from 'react-native'
import { twMerge } from 'tailwind-merge'
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialIcons'

type SelectInputProps = {
    label: string
    value: string
    error: string
    options: { value: string | number; label: string }[]
    onChange: (value: string) => void
    onFocus: () => void
    havingDefaultOptions?: boolean
    wrapperClassName?: string
    selectClassName?: string
}

const SelectInput = ({
    label,
    value,
    error,
    options,
    onChange,
    onFocus,
    havingDefaultOptions,
    wrapperClassName,
    selectClassName
}: SelectInputProps) => {
    const allOptions = useMemo(() => {
        return havingDefaultOptions ? [{ label: '--', value: '' }, ...options] : [...options]
    }, [options])

    return (
        <View className={twMerge(`${wrapperClassName}`)}>
            <Text className="mb-2 text-lg font-semibold">{label}</Text>
            <SelectDropdown
                data={allOptions}
                defaultValueByIndex={allOptions.findIndex(opt => opt.value === value)}
                onSelect={selectedItem => onChange(selectedItem.value)}
                onFocus={onFocus}
                renderButton={(selectedItem, isOpened) => {
                    return (
                        <View
                            className={twMerge(
                                `flex-row items-center justify-between rounded border-2 border-solid border-neutral-500 px-3 py-3 text-lg font-semibold text-primary caret-primary focus:border-primary ${selectClassName}`
                            )}
                        >
                            <Text className="text-xl font-medium">{(selectedItem && selectedItem.label) || ''}</Text>
                            <Icon name={isOpened ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={20} />
                        </View>
                    )
                }}
                renderItem={(item, _, isSelected) => {
                    return (
                        <View className={twMerge(`w-full px-3 py-2 ${isSelected ? 'bg-secondary' : ''}`)}>
                            <Text className="text-xl font-medium">{item.label}</Text>
                        </View>
                    )
                }}
                showsVerticalScrollIndicator={false}
                dropdownStyle={{
                    backgroundColor: '#E9ECEF',
                    borderRadius: 4
                }}
            />
            <Text className="absolute bottom-[-20px] px-3 text-sm font-medium text-red-600">{error}</Text>
        </View>
    )
}

export default SelectInput
