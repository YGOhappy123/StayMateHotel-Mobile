import { useEffect, useState } from 'react'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/Dialog'

import Button from '@/components/common/Button'
import TextInput from '@/components/common/TextInput'
import { Dimensions, View } from 'react-native'

type UpdateFloorDialogProps = {
    selectedFloor: IFloor | null
    isOpen: boolean
    closeDialog: () => void
    updateFloorMutation: any
}

const UpdateFloorDialog = ({ selectedFloor, isOpen, closeDialog, updateFloorMutation }: UpdateFloorDialogProps) => {
    const [formValues, setFormValues] = useState({
        floorNumber: ''
    })

    const [errors, setErrors] = useState({
        floorNumber: ''
    })

    const handleSubmit = async () => {
        const formErrors = validateFormValues()

        if (!formErrors.floorNumber) {
            await updateFloorMutation
                .mutateAsync({
                    floorId: selectedFloor?.id!,
                    data: { ...formValues }
                })
                .then(() => closeDialog())
        } else {
            setErrors(formErrors)
        }
    }

    const validateFormValues = () => {
        const { floorNumber } = formValues
        const formErrors = { ...errors }

        if (!floorNumber.trim()) formErrors.floorNumber = formErrors.floorNumber || 'Mã tầng không được để trống.'

        return formErrors
    }

    useEffect(() => {
        if (isOpen && selectedFloor) {
            setFormValues({
                floorNumber: selectedFloor.floorNumber
            })
            setErrors({
                floorNumber: ''
            })
        }
    }, [isOpen])

    return (
        <DialogContent
            className="bg-white"
            style={{
                width: Dimensions.get('screen').width - 16
            }}
        >
            <DialogHeader>
                <DialogTitle>Cập nhật thông tin tầng</DialogTitle>
            </DialogHeader>
            <View className="border-b-2 border-[#ccc]"></View>
            <View>
                <TextInput
                    label="Số tầng:"
                    placeholder="Số tầng..."
                    value={formValues.floorNumber}
                    error={errors.floorNumber}
                    onChange={value => setFormValues(prev => ({ ...prev, floorNumber: value }))}
                    onFocus={() => setErrors(prev => ({ ...prev, floorNumber: '' }))}
                    wrapperClassName="mb-5"
                />
            </View>
            <View className="border-b-2 border-[#ccc]"></View>
            <DialogFooter className="flex-row">
                <Button text="Hủy bỏ" variant="danger" onClick={closeDialog} buttonClassName="flex-1" />
                <Button text="Xác nhận" variant="success" onClick={handleSubmit} buttonClassName="flex-1" />
            </DialogFooter>
        </DialogContent>
    )
}

export default UpdateFloorDialog
