import { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { Button, Dialog, Portal } from 'react-native-paper'
import { BookServicePayload } from '@/services/bookingService'
import { UseMutationResult, UseQueryResult } from 'react-query'
import TextInput from '@/components/common/TextInput'
import SelectInput from '@/components/common/SelectInput'

type BookServiceDialogProps = {
    isOpen: boolean
    closeDialog: () => void
    bookingId: number
    services: IService[]
    bookServiceMutation: UseMutationResult<any, Error, BookServicePayload, unknown>
    fetchMyBookingsQuery: UseQueryResult<IResponseData<IBooking[]>, unknown>
}

const BookServiceDialog = ({ isOpen, closeDialog, bookingId, services, bookServiceMutation, fetchMyBookingsQuery }: BookServiceDialogProps) => {
    const [formValues, setFormValues] = useState({
        serviceId: 0,
        quantity: 0
    })

    const [errors, setErrors] = useState({
        serviceId: '',
        quantity: ''
    })

    const handleSubmit = async () => {
        const formErrors = validateFormValues()

        if (!formErrors.serviceId && !formErrors.quantity) {
            await bookServiceMutation
                .mutateAsync({
                    bookingId: bookingId,
                    serviceId: formValues.serviceId,
                    quantity: formValues.quantity
                })
                .then(() => fetchMyBookingsQuery.refetch())
                .then(() => closeDialog())
        } else {
            setErrors(formErrors)
        }
    }

    const validateFormValues = () => {
        const { serviceId, quantity } = formValues
        const formErrors = { ...errors }

        console.log(serviceId)

        if (!serviceId) formErrors.serviceId = formErrors.serviceId || 'Loại dịch vụ không được để trống.'
        if (quantity <= 0) formErrors.quantity = formErrors.quantity || 'Số lượng không được bằng 0.'
        if (quantity > 100) formErrors.quantity = formErrors.quantity || 'Số lượng không lớn hơn 100.'

        return formErrors
    }

    useEffect(() => {
        if (isOpen) {
            setFormValues({
                serviceId: 0,
                quantity: 0
            })
            setErrors({
                serviceId: '',
                quantity: ''
            })
        }
    }, [isOpen])

    return (
        <Portal>
            <Dialog visible={isOpen} onDismiss={closeDialog}>
                <Dialog.Title>
                    <Text className="text-2xl font-semibold">Đặt dịch vụ</Text>
                </Dialog.Title>
                <Dialog.Content>
                    <View className="gap-4">
                        <View className="border-b-2 border-gray-400"></View>
                        <SelectInput
                            label="Dịch vụ: "
                            options={services.map(service => ({ value: service.id, label: service.name }))}
                            error={errors.serviceId}
                            value={formValues.serviceId}
                            onChange={(value: string | number) => setFormValues(prev => ({ ...prev, serviceId: value as number }))}
                            onFocus={() => setErrors(prev => ({ ...prev, serviceId: '' }))}
                            wrapperClassName="mb-6"
                        />
                        <TextInput
                            label="Đơn giá: "
                            placeholder="Đơn giá của mỗi dịch vụ"
                            error={''}
                            value={services.find(sv => sv.id === formValues.serviceId)?.price?.toString() || '0'}
                            onChange={() => {}}
                            onFocus={() => {}}
                            type="numeric"
                            disabled={true}
                            wrapperClassName="mb-6"
                        />
                        <TextInput
                            label="Số lượng: "
                            placeholder="Số lượng"
                            error={errors.quantity}
                            value={formValues.quantity?.toString()}
                            onChange={(value: string) =>
                                setFormValues(prev => ({ ...prev, quantity: Number.parseInt(value) >= 0 ? Number.parseInt(value) : 0 }))
                            }
                            onFocus={() => setErrors(prev => ({ ...prev, quantity: '' }))}
                            type="numeric"
                            disabled={!formValues.serviceId}
                            wrapperClassName="mb-6"
                        />
                        <View className="border-b-2 border-gray-400"></View>
                    </View>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={closeDialog}>Hủy bỏ</Button>
                    <Button onPress={handleSubmit}>Xác nhận</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}

export default BookServiceDialog
