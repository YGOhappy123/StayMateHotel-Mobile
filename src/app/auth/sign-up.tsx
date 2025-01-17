import { useState } from 'react'
import { View, Text } from 'react-native'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import GradientButton from '@/components/common/GradientButton'
import TextInput from '@/components/common/TextInput'
import PasswordInput from '@/components/common/PasswordInput'
import authService from '@/services/authService'

const SignUpScreen = () => {
    const router = useRouter()
    const {} = authService()

    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        cfPassword: ''
    })

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        cfPassword: ''
    })

    const { signUpMutation } = authService()

    const handleSubmit = async () => {
        const formErrors = validateFormValues()

        if (!formErrors.firstName && !formErrors.lastName && !formErrors.username && !formErrors.password && !formErrors.cfPassword) {
            await signUpMutation.mutateAsync({
                firstName: formValues.firstName,
                lastName: formValues.lastName,
                username: formValues.username,
                password: formValues.password,
                confirmPassword: formValues.cfPassword
            })
        } else {
            setErrors(formErrors)
        }
    }

    const validateFormValues = () => {
        const { firstName, lastName, username, password, cfPassword } = formValues
        const formErrors = { ...errors }

        if (!lastName.trim()) formErrors.lastName = formErrors.lastName || 'Họ không được để trống.'
        if (!firstName.trim()) formErrors.firstName = formErrors.firstName || 'Tên không được để trống.'
        if (!username.trim()) formErrors.username = formErrors.username || 'Tên đăng nhập không được để trống.'
        if (username.length < 8 || username.length > 20) formErrors.username = formErrors.username || 'Tên đăng nhập phải dài từ 8 đến 20 ký tự.'
        if (!password.trim()) formErrors.password = formErrors.password || 'Mật khẩu không được để trống.'
        if (password.length < 8 || password.length > 20) formErrors.password = formErrors.password || 'Mật khẩu phải dài từ 8 đến 20 ký tự.'
        if (cfPassword !== password) formErrors.cfPassword = formErrors.cfPassword || 'Mật khẩu không trùng khớp.'

        return formErrors
    }

    return (
        <SafeAreaView className="h-full bg-accent p-5">
            <View className="h-full rounded-xl bg-ivory p-5">
                <Text className="mb-6 py-5 text-center text-4xl font-medium">Đăng Ký Tài Khoản</Text>
                <View className="flex-row gap-3">
                    <TextInput
                        label="Họ:"
                        placeholder="Họ..."
                        value={formValues.lastName}
                        error={errors.lastName}
                        onChange={value => setFormValues(prev => ({ ...prev, lastName: value }))}
                        onFocus={() => setErrors(prev => ({ ...prev, lastName: '' }))}
                        wrapperClassName="mb-10 flex-1"
                    />
                    <TextInput
                        label="Tên:"
                        placeholder="Tên..."
                        value={formValues.firstName}
                        error={errors.firstName}
                        onChange={value => setFormValues(prev => ({ ...prev, firstName: value }))}
                        onFocus={() => setErrors(prev => ({ ...prev, firstName: '' }))}
                        wrapperClassName="mb-10 flex-1"
                    />
                </View>
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
                <PasswordInput
                    label="Xác nhận mật khẩu:"
                    placeholder="Xác nhận mật khẩu..."
                    value={formValues.cfPassword}
                    error={errors.cfPassword}
                    onChange={value => setFormValues(prev => ({ ...prev, cfPassword: value }))}
                    onFocus={() => setErrors(prev => ({ ...prev, cfPassword: '' }))}
                    wrapperClassName="mb-10"
                />
                <View className="mt-4 items-center">
                    <GradientButton title="Đăng Nhập" handlePress={handleSubmit} containerStyles="w-full" />
                    <View className="mt-6 flex-row">
                        <Text className="font-medium">Đã có tài khoản? </Text>
                        <Text className="font-bold text-primary hover:underline" onPress={() => router.push('/auth/sign-in')}>
                            Đăng nhập
                        </Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SignUpScreen
