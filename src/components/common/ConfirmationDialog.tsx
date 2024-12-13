import { ReactElement, useState } from 'react'
import { View, Text } from 'react-native'
import { twMerge } from 'tailwind-merge'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/Dialog'
import Button from '@/components/common/Button'

type ConfirmationDialogProps = {
    Trigger: ReactElement
    title: string
    body: string
    dialogClassName?: string
    onConfirm: () => Promise<void>
}

const ConfirmationDialog = ({ Trigger, title, body, dialogClassName, onConfirm }: ConfirmationDialogProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleClose = () => {
        setIsOpen(false)
    }

    const handleConfirm = async () => {
        await onConfirm().then(() => setIsOpen(false))
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{Trigger}</DialogTrigger>
            <DialogContent className={twMerge(`bg-white ${dialogClassName}`)}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <View className="border-b-2 border-[#ccc]"></View>
                <Text>{body}</Text>
                <View className="border-b-2 border-[#ccc]"></View>
                <DialogFooter className="flex-row">
                    <Button text="Hủy bỏ" variant="danger" onClick={handleClose} buttonClassName="flex-1" />
                    <Button text="Xác nhận" variant="success" onClick={handleConfirm} buttonClassName="flex-1" />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ConfirmationDialog
