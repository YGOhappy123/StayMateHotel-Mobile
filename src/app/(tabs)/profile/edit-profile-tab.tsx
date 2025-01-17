import { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { setUser } from '@/slices/authSlice'
import adminService from '@/services/adminService'
import customerService from '@/services/customerService'
import Footer from '@/components/layout/Footer'
import TextInput from '@/components/common/TextInput'
import GradientButton from '@/components/common/GradientButton'

const EditProfileTab = () => {
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.auth.user)
    const { updateProfileMutation } = customerService()
    const { updateAdminMutation } = adminService()

    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: ''
    })

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: ''
    })

    useEffect(() => {
        setDefaultFormValues()
    }, [user])

    const handleSubmit = async () => {
        const formErrors = validateFormValues()

        if (!formErrors.firstName && !formErrors.lastName && !formErrors.email && !formErrors.phoneNumber && !formErrors.address) {
            if (user?.role === 'Guest') {
                updateProfileMutation
                    .mutateAsync({
                        data: {
                            ...formValues,
                            email: formValues.email || undefined,
                            phoneNumber: formValues.phoneNumber || undefined,
                            address: formValues.address || undefined
                        }
                    })
                    .then(() => updateAuthUser())
                    .catch(() => setDefaultFormValues())
            } else {
                const { email, ...information } = formValues
                updateAdminMutation
                    .mutateAsync({ data: information })
                    .then(() => updateAuthUser())
                    .catch(() => setDefaultFormValues())
            }
        } else {
            setErrors(formErrors)
        }
    }

    const updateAuthUser = () => {
        const newUserData = { ...user }
        newUserData.firstName = formValues.firstName
        newUserData.lastName = formValues.lastName
        if (formValues.email) newUserData.email = formValues.email
        if (formValues.phoneNumber) newUserData.phoneNumber = formValues.phoneNumber
        if (formValues.address) newUserData.address = formValues.address

        dispatch(setUser(newUserData as IUser))
    }

    const validateFormValues = () => {
        const { firstName, lastName, email, phoneNumber } = formValues
        const formErrors = { ...errors }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/

        if (!lastName.trim()) formErrors.lastName = formErrors.lastName || 'Họ không được để trống.'
        if (!firstName.trim()) formErrors.firstName = formErrors.firstName || 'Tên không được để trống.'
        if (email.trim() && !emailRegex.test(email)) formErrors.email = formErrors.email || 'Địa chỉ email của bạn không hợp lệ.'
        if (phoneNumber.trim() && !phoneRegex.test(phoneNumber))
            formErrors.phoneNumber = formErrors.phoneNumber || 'Số điện thoại của bạn không hợp lệ.'

        return formErrors
    }

    const setDefaultFormValues = () => {
        setFormValues({
            firstName: user?.firstName ?? '',
            lastName: user?.lastName ?? '',
            email: user?.email ?? '',
            phoneNumber: user?.phoneNumber ?? '',
            address: user?.address ?? ''
        })
    }

    return (
        <ScrollView>
            <View className="flex-1">
                <View className="items-start px-5 py-20">
                    <Text className="mb-6 text-4xl font-bold uppercase leading-[50px] text-primary">Chi tiết tài khoản</Text>
                    <TextInput
                        label="Họ:"
                        placeholder="Họ..."
                        value={formValues.lastName}
                        error={errors.lastName}
                        onChange={value => setFormValues(prev => ({ ...prev, lastName: value }))}
                        onFocus={() => setErrors(prev => ({ ...prev, lastName: '' }))}
                        wrapperClassName="mb-10 w-full"
                    />
                    <TextInput
                        label="Tên:"
                        placeholder="Tên..."
                        value={formValues.firstName}
                        error={errors.firstName}
                        onChange={value => setFormValues(prev => ({ ...prev, firstName: value }))}
                        onFocus={() => setErrors(prev => ({ ...prev, firstName: '' }))}
                        wrapperClassName="mb-10 w-full"
                    />
                    <TextInput
                        label="Địa chỉ email:"
                        placeholder="Email..."
                        disabled={user?.role !== 'Guest'}
                        value={formValues.email}
                        error={errors.email}
                        onChange={value => setFormValues(prev => ({ ...prev, email: value }))}
                        onFocus={() => setErrors(prev => ({ ...prev, email: '' }))}
                        wrapperClassName="mb-10 w-full"
                    />
                    <TextInput
                        label="Số điện thoại:"
                        placeholder="Số điện thoại..."
                        value={formValues.phoneNumber}
                        error={errors.phoneNumber}
                        onChange={value => setFormValues(prev => ({ ...prev, phoneNumber: value }))}
                        onFocus={() => setErrors(prev => ({ ...prev, phoneNumber: '' }))}
                        wrapperClassName={`w-full ${user?.role === 'Guest' ? 'mb-10' : 'mb-12'}`}
                    />
                    {user?.role === 'Guest' && (
                        <TextInput
                            label="Địa chỉ:"
                            placeholder="Địa chỉ..."
                            value={formValues.address}
                            error={errors.address}
                            onChange={value => setFormValues(prev => ({ ...prev, address: value }))}
                            onFocus={() => setErrors(prev => ({ ...prev, address: '' }))}
                            wrapperClassName="mb-12 w-full"
                        />
                    )}
                    <GradientButton title="Cập nhật thông tin" handlePress={handleSubmit} containerStyles="w-full h-[50px] rounded-full" />
                </View>
                <Footer />
            </View>
        </ScrollView>
    )
}

export default EditProfileTab
