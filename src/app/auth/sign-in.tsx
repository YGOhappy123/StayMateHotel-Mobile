import { useState } from 'react'
import { View, Text } from 'react-native'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import GradientButton from '@/components/common/GradientButton'
import TextInput from '@/components/common/TextInput'
import PasswordInput from '@/components/common/PasswordInput'
import authService from '@/services/authService'

const SignInScreen = () => {
    const router = useRouter()
    const { signInMutation } = authService()

    const [formValues, setFormValues] = useState({
        username: '',
        password: ''
    })

    const [errors, setErrors] = useState({
        username: '',
        password: ''
    })

    const handleSubmit = async () => {
        const formErrors = validateFormValues()

        if (!formErrors.username && !formErrors.password) {
            await signInMutation.mutateAsync({
                username: formValues.username,
                password: formValues.password
            })
        } else {
            setErrors(formErrors)
        }
    }

    const validateFormValues = () => {
        const { username, password } = formValues
        const formErrors = { ...errors }

        if (!username.trim()) formErrors.username = formErrors.username || 'Tên đăng nhập không được để trống.'
        if (username.length < 8 || username.length > 20) formErrors.username = formErrors.username || 'Tên đăng nhập phải dài từ 8 đến 20 ký tự.'
        if (!password.trim()) formErrors.password = formErrors.password || 'Mật khẩu không được để trống.'
        if (password.length < 8 || password.length > 20) formErrors.password = formErrors.password || 'Mật khẩu phải dài từ 8 đến 20 ký tự.'

        return formErrors
    }

    return (
        <SafeAreaView className="h-full bg-accent p-5">
            <View className="h-full rounded-xl bg-ivory p-5">
                <Text className="mb-6 py-5 text-center text-4xl font-medium">Đăng Nhập Tài Khoản</Text>
                <TextInput
                    label="Tên đăng nhập:"
                    placeholder="Tên đăng nhập..."
                    value={formValues.username}
                    error={errors.username}
                    onChange={value => setFormValues(prev => ({ ...prev, username: value }))}
                    onFocus={() => setErrors(prev => ({ ...prev, username: '' }))}
                    wrapperClassName="mb-10"
                />
                <PasswordInput
                    label="Mật khẩu:"
                    placeholder="Mật khẩu..."
                    value={formValues.password}
                    error={errors.password}
                    onChange={value => setFormValues(prev => ({ ...prev, password: value }))}
                    onFocus={() => setErrors(prev => ({ ...prev, password: '' }))}
                    wrapperClassName="mb-10"
                />
                <View className="mt-4 items-center">
                    <GradientButton title="Đăng Nhập" handlePress={handleSubmit} containerStyles="w-full" />
                    <View className="mt-6 flex-row">
                        <Text className="font-medium">Chưa có tài khoản? </Text>
                        <Text className="font-bold text-primary hover:underline" onPress={() => router.push('/auth/sign-up')}>
                            Đăng ký
                        </Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SignInScreen
