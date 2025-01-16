import { useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import authService from '@/services/authService'
import Footer from '@/components/layout/Footer'
import PasswordInput from '@/components/common/PasswordInput'
import GradientButton from '@/components/common/GradientButton'

const ChangePasswordTab = () => {
    const { updatePasswordMutation } = authService()

    const [formValues, setFormValues] = useState({
        oldPassword: '',
        newPassword: '',
        cfPassword: ''
    })

    const [errors, setErrors] = useState({
        oldPassword: '',
        newPassword: '',
        cfPassword: ''
    })

    const handleSubmit = async () => {
        const formErrors = validateFormValues()

        if (!formErrors.oldPassword && !formErrors.newPassword && !formErrors.cfPassword) {
            updatePasswordMutation
                .mutateAsync({
                    oldPassword: formValues.oldPassword,
                    newPassword: formValues.newPassword,
                    confirmPassword: formValues.cfPassword
                })
                .finally(() => setDefaultFormValues())
        } else {
            setErrors(formErrors)
        }
    }

    const setDefaultFormValues = () => {
        setFormValues({
            oldPassword: '',
            newPassword: '',
            cfPassword: ''
        })
    }

    const validateFormValues = () => {
        const { oldPassword, newPassword, cfPassword } = formValues
        const formErrors = { ...errors }

        if (!oldPassword.trim()) formErrors.oldPassword = formErrors.oldPassword || 'Mật khẩu không được để trống.'
        if (!newPassword.trim()) formErrors.newPassword = formErrors.newPassword || 'Mật khẩu không được để trống.'
        if (newPassword.length < 8 || newPassword.length > 20)
            formErrors.newPassword = formErrors.newPassword || 'Mật khẩu phải dài từ 8 đến 20 ký tự.'
        if (cfPassword !== newPassword) formErrors.cfPassword = formErrors.cfPassword || 'Mật khẩu không trùng khớp.'

        return formErrors
    }

    return (
        <ScrollView>
            <View className="flex-1">
                <View className="items-start px-5 py-20">
                    <Text className="mb-6 text-4xl font-bold uppercase leading-[50px] text-primary">Thay đổi mật khẩu</Text>
                    <PasswordInput
                        label="Mật khẩu cũ:"
                        placeholder="Mật khẩu cũ..."
                        value={formValues.oldPassword}
                        error={errors.oldPassword}
                        onChange={value => setFormValues(prev => ({ ...prev, oldPassword: value }))}
                        onFocus={() => setErrors(prev => ({ ...prev, oldPassword: '' }))}
                        wrapperClassName="mb-10 w-full"
                    />
                    <PasswordInput
                        label="Mật khẩu mới:"
                        placeholder="Mật khẩu mới..."
                        value={formValues.newPassword}
                        error={errors.newPassword}
                        onChange={value => setFormValues(prev => ({ ...prev, newPassword: value }))}
                        onFocus={() => setErrors(prev => ({ ...prev, newPassword: '' }))}
                        wrapperClassName="mb-10 w-full"
                    />
                    <PasswordInput
                        label="Xác nhận mật khẩu:"
                        placeholder="Xác nhận mật khẩu..."
                        value={formValues.cfPassword}
                        error={errors.cfPassword}
                        onChange={value => setFormValues(prev => ({ ...prev, cfPassword: value }))}
                        onFocus={() => setErrors(prev => ({ ...prev, cfPassword: '' }))}
                        wrapperClassName="mb-12 w-full"
                    />

                    <GradientButton title="Cập nhật mật khẩu" handlePress={handleSubmit} containerStyles="w-full h-[50px] rounded-full" />
                </View>
                <Footer />
            </View>
        </ScrollView>
    )
}

export default ChangePasswordTab
