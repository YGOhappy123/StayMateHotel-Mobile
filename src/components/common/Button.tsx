import { Text, TouchableOpacity } from 'react-native'
import { twMerge } from 'tailwind-merge'

type ButtonProps = {
    text: string
    variant?: 'primary' | 'gradient' | 'info' | 'success' | 'warning' | 'danger'
    buttonClassName?: string
    textClassName?: string
    disabled?: boolean
    onClick?: () => void
}

const Button = ({ text, variant, buttonClassName, textClassName, disabled = false, onClick }: ButtonProps) => {
    let variantStyles = { button: '', text: '' }
    switch (variant) {
        case 'primary':
            variantStyles = {
                button: 'border-primary bg-primary',
                text: 'text-white'
            }
            break
        case 'info':
            variantStyles = {
                button: 'border-blue-600 bg-blue-100',
                text: 'text-blue-600'
            }
            break
        case 'success':
            variantStyles = {
                button: 'border-green-600 bg-green-100',
                text: 'text-green-600'
            }
            break
        case 'warning':
            variantStyles = {
                button: 'border-yellow-600 bg-yellow-100',
                text: 'text-yellow-600'
            }
            break
        case 'danger':
            variantStyles = {
                button: 'border-red-600 bg-red-100',
                text: 'text-red-600'
            }
            break
        default:
            variantStyles = {
                button: 'border-black bg-black/10',
                text: ''
            }
    }

    const handleClick = () => {
        if (disabled) return
        if (typeof onClick === 'function') onClick()
    }

    return (
        <TouchableOpacity
            onPress={handleClick}
            disabled={disabled}
            className={twMerge(
                `min-w-[120px] justify-center rounded-md border-2 border-solid px-3 py-2 disabled:border-gray-600 disabled:bg-gray-100 disabled:opacity-50 ${variantStyles.button} ${buttonClassName}`
            )}
        >
            <Text className={twMerge(`text-center font-medium ${variantStyles.text} ${disabled && 'text-gray-600'} ${textClassName}`)}>{text}</Text>
        </TouchableOpacity>
    )
}

export default Button
