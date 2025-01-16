import { Dispatch, SetStateAction, useState } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { Button, Dialog, Portal } from 'react-native-paper'
import { WishedRoom } from '@/services/bookingService'
import Icon from 'react-native-vector-icons/FontAwesome5'

type SelectRoomAndGuestDialogProps = {
    isOpen: boolean
    closeDialog: () => void
    wishedRooms: WishedRoom[]
    setWishedRooms: (wishedRooms: WishedRoom[]) => void
}

const SelectRoomAndGuestDialog = ({ isOpen, closeDialog, wishedRooms, setWishedRooms }: SelectRoomAndGuestDialogProps) => {
    const [internalWishedRooms, setInternalWishedRooms] = useState<WishedRoom[]>(wishedRooms)

    return (
        <Portal>
            <Dialog visible={isOpen} onDismiss={closeDialog}>
                <Dialog.Title>
                    <Text className="text-2xl font-semibold">Số phòng và số khách thuê</Text>
                </Dialog.Title>
                <Dialog.Content>
                    <View className="gap-4">
                        <View className="border-b-2 border-gray-400"></View>
                        <View className="gap-5">
                            <View className="flex-row gap-5">
                                <Text className="flex-1 font-medium">Phòng</Text>
                                <Text className="flex-1 text-center font-medium">Xóa phòng</Text>
                                <Text className="flex-1 text-center font-medium">Số khách</Text>
                            </View>
                            {internalWishedRooms.map((wr, idx) => (
                                <RoomRow
                                    key={idx}
                                    roomIndex={idx}
                                    guestNumber={wr.numberOfGuests}
                                    setRooms={setInternalWishedRooms}
                                    removeRoomDisabled={internalWishedRooms.length === 1}
                                />
                            ))}
                        </View>
                        <View className="border-b-2 border-gray-400"></View>
                        <TouchableOpacity
                            className="disabled:opacity-50"
                            disabled={internalWishedRooms.length === 3}
                            onPress={() => setInternalWishedRooms(prev => [...prev, { numberOfGuests: 1 }])}
                        >
                            <View className="flex-row items-center gap-3">
                                <View className="h-8 w-8 items-center justify-center rounded-full border-2 border-green-600 bg-green-100 text-green-600">
                                    <Icon name="plus" color="#16A34A" />
                                </View>
                                <Text className="flex-1 text-black">
                                    Thêm phòng <Text>{internalWishedRooms.length === 3 && '(Tối đa 3 phòng cho mỗi đơn đặt)'}</Text>
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <View className="border-b-2 border-gray-400"></View>
                    </View>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={closeDialog}>Hủy bỏ</Button>
                    <Button
                        onPress={() => {
                            setWishedRooms(internalWishedRooms)
                            closeDialog()
                        }}
                    >
                        Xác nhận
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}

type RoomRowProps = {
    roomIndex: number
    guestNumber: number
    setRooms: Dispatch<SetStateAction<WishedRoom[]>>
    removeRoomDisabled: boolean
}

const RoomRow = ({ roomIndex, guestNumber, setRooms, removeRoomDisabled }: RoomRowProps) => {
    return (
        <View className="flex-row items-center gap-5">
            <Text className="flex-1">Phòng số {roomIndex + 1}</Text>
            <View className="flex-1 flex-row justify-center">
                <TouchableOpacity
                    className="disabled:opacity-50"
                    disabled={removeRoomDisabled}
                    onPress={() => setRooms(prev => prev.filter((_, idx) => idx !== roomIndex))}
                >
                    <View className="h-8 w-8 items-center justify-center rounded-full border-2 border-red-600 bg-red-100 text-green-600">
                        <Icon name="times" color="#DC2626" />
                    </View>
                </TouchableOpacity>
            </View>
            <View className="flex-1 flex-row items-center justify-center gap-2">
                <TouchableOpacity
                    className="disabled:opacity-50"
                    disabled={guestNumber === 1}
                    onPress={() => setRooms(prev => prev.map((rm, idx) => (idx === roomIndex ? { numberOfGuests: rm.numberOfGuests - 1 } : rm)))}
                >
                    <View className="h-8 w-8 items-center justify-center rounded-full border-2 border-green-600 bg-green-100 text-green-600">
                        <Icon name="minus" color="#16A34A" />
                    </View>
                </TouchableOpacity>
                <Text>{guestNumber.toString().padStart(2, '0')}</Text>
                <TouchableOpacity
                    className="disabled:opacity-50"
                    disabled={guestNumber >= 8}
                    onPress={() => setRooms(prev => prev.map((rm, idx) => (idx === roomIndex ? { numberOfGuests: rm.numberOfGuests + 1 } : rm)))}
                >
                    <View className="h-8 w-8 items-center justify-center rounded-full border-2 border-green-600 bg-green-100 text-green-600">
                        <Icon name="plus" color="#16A34A" />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SelectRoomAndGuestDialog
