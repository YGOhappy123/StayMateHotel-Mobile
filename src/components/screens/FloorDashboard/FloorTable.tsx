import { View, Text, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import { twMerge } from 'tailwind-merge'
import dayjs from '@/libs/dayjs'
import Button from '@/components/common/Button'
import ConfirmationDialog from '@/components/common/ConfirmationDialog'
import Icon from 'react-native-vector-icons/MaterialIcons'

type FloorTableProps = {
    floors: IFloor[]
    total: number
    page: number
    limit: number
    setPage: (page: number) => void
    onSelectFloor: (floor: IFloor) => void
    deleteFloorMutation: any
}

const FloorTable = ({ floors, total, page, limit, setPage, onSelectFloor, deleteFloorMutation }: FloorTableProps) => {
    const lastPage = Math.ceil(total / limit)

    return (
        <View className="gap-4">
            <View className="rounded-md border-2 border-gray-500">
                <View className="flex-row border-b-2 border-gray-500">
                    <Text className="w-[100px] border-r border-[#ccc] p-[10px] text-center font-medium">Mã Tầng</Text>
                    <Text className="flex-1 p-[10px] text-center font-medium">Thông Tin Tầng</Text>
                </View>
                <FlatList
                    style={{
                        height: Dimensions.get('window').height - 300
                    }}
                    data={floors}
                    keyExtractor={floor => floor.id.toString()}
                    renderItem={({ item, index }) => (
                        <View className={twMerge(`flex-row ${index !== 0 ? 'border-y border-[#ccc]' : ''}`)}>
                            <Text className="flex w-[100px] items-center justify-center border-r border-[#ccc] p-[10px]">{item.id}</Text>
                            <View className="flex-1 gap-3 p-[10px]">
                                <View className="gap-[10px]">
                                    <Text>
                                        <Text className="font-semibold">Số tầng: </Text>
                                        {item.floorNumber}
                                    </Text>
                                    <Text>
                                        <Text className="font-semibold">Ngày tạo: </Text>
                                        {dayjs(item.createdAt).format('DD/MM/YYYY HH:mm:ss')}
                                    </Text>
                                    <Text>
                                        <Text className="font-semibold">Người tạo: </Text>
                                        {`${item.createdBy?.lastName} ${item.createdBy?.firstName}`}
                                    </Text>
                                </View>
                                <View className="gap-2">
                                    <Button text="Cập nhật" variant="success" onClick={() => onSelectFloor(item)} buttonClassName="min-w-fit" />
                                    <ConfirmationDialog
                                        Trigger={
                                            <TouchableOpacity className="justify-center rounded-md border-2 border-solid border-red-600 bg-red-100 px-3 py-2 disabled:border-gray-600 disabled:bg-gray-100 disabled:text-gray-600 disabled:opacity-50">
                                                <Text className="text-center font-medium text-red-600">Xóa tầng</Text>
                                            </TouchableOpacity>
                                        }
                                        title="Xác nhận xóa tầng"
                                        body="Bạn có chắc muốn xóa tầng này không? Thao tác này sẽ không thể hoàn tác."
                                        onConfirm={async () => {
                                            await deleteFloorMutation.mutateAsync(item.id)
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    )}
                />
            </View>
            <View className="flex-row justify-center gap-4">
                <TouchableOpacity className="flex-row items-center gap-1 p-2" onPress={() => setPage(page === 1 ? 1 : page - 1)}>
                    <Icon name="keyboard-double-arrow-left" />
                    <Text className="text-base font-semibold">Trước</Text>
                </TouchableOpacity>
                {Array.from({ length: lastPage }, (_, i) => i + 1).map(num => (
                    <TouchableOpacity
                        key={num}
                        className={twMerge(`w-10 flex-row items-center justify-center gap-1 rounded-full p-2 ${num === page ? 'bg-secondary' : ''}`)}
                        onPress={() => setPage(num)}
                    >
                        <Text className="text-base font-semibold">{num}</Text>
                    </TouchableOpacity>
                ))}
                <TouchableOpacity className="flex-row items-center gap-1 p-2" onPress={() => setPage(page === lastPage ? lastPage : page + 1)}>
                    <Text className="text-base font-semibold">Sau</Text>
                    <Icon name="keyboard-double-arrow-right" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default FloorTable
