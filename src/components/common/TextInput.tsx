import { View, Text, TextInput as RnTextInput } from 'react-native'
import { twMerge } from 'tailwind-merge'

type TextInputProps = {
    label: string
    placeholder: string
    value: string
    error: string
    onChange: (value: string) => void
    onFocus: () => void
    wrapperClassName?: string
    inputClassName?: string
}

const TextInput = ({ label, placeholder, value, error, onChange, onFocus, wrapperClassName, inputClassName }: TextInputProps) => {
    return (
        <View className={twMerge(`${wrapperClassName}`)}>
            <Text className="mb-2 text-lg font-semibold">{label}</Text>
            <RnTextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChange}
                onFocus={onFocus}
                className={twMerge(
                    `rounded border-2 border-solid border-neutral-500 px-3 py-3 text-lg font-semibold text-primary caret-primary focus:border-primary ${inputClassName}`
                )}
            />
            <Text className="absolute bottom-[-20px] px-3 text-sm font-medium text-red-600">{error}</Text>
        </View>
    )
}

export default TextInput
