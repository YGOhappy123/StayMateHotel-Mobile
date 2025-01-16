import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { twMerge } from 'tailwind-merge'
import Icon from 'react-native-vector-icons/MaterialIcons'

type PasswordInputProps = {
    label: string
    placeholder: string
    value: string
    error: string
    onChange: (value: string) => void
    onFocus: () => void
    wrapperClassName?: string
    inputClassName?: string
}

const PasswordInput = ({ label, placeholder, value, error, onChange, onFocus, wrapperClassName, inputClassName }: PasswordInputProps) => {
    const [showPassword, setShowPassword] = useState(false)
    const toggleShowPw = () => setShowPassword(prev => !prev)

    return (
        <View className={twMerge(`relative ${wrapperClassName}`)}>
            <Text className="mb-2 text-lg font-semibold">{label}</Text>
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChange}
                onFocus={onFocus}
                secureTextEntry={!showPassword}
                className={twMerge(
                    `rounded border-2 border-solid border-neutral-500 px-3 py-3 text-lg font-semibold text-primary caret-primary focus:border-primary ${inputClassName}`
                )}
            />
            <TouchableOpacity
                onPress={toggleShowPw}
                activeOpacity={0.7}
                className="absolute right-3 top-1/2"
                style={{
                    transform: [{ translateY: 4 }]
                }}
            >
                <Icon name={showPassword ? 'visibility-off' : 'visibility'} size={24} color="#588157" />
            </TouchableOpacity>
            <Text className="absolute bottom-[-20px] px-3 text-sm font-medium text-red-600">{error}</Text>
        </View>
    )
}

export default PasswordInput
