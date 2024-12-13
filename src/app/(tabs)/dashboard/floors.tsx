import { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Dialog, DialogTrigger } from '@/components/ui/Dialog'
import { Popover, PopoverTrigger } from '@/components/ui/Popover'

import CreateFloorDialog from '@/components/screens/FloorDashboard/CreateFloorDialog'
import UpdateFloorDialog from '@/components/screens/FloorDashboard/UpdateFloorDialog'
import FloorTable from '@/components/screens/FloorDashboard/FloorTable'
import FloorFilter from '@/components/screens/FloorDashboard/FloorFilter'
import floorService from '@/services/floorService'

const FloorDashboardScreen = () => {
    const {
        floors,
        total,
        page,
        limit,
        setPage,
        buildQuery,
        onFilterSearch,
        onResetFilterSearch,
        createNewFloorMutation,
        updateFloorMutation,
        deleteFloorMutation
    } = floorService({ enableFetching: true })

    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
    const [selectedFloor, setSelectedFloor] = useState<IFloor | null>(null)
    const [havingFilters, setHavingFilters] = useState(false)

    return (
        <SafeAreaView className="p-5">
            <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
                <UpdateFloorDialog
                    selectedFloor={selectedFloor}
                    isOpen={isUpdateModalOpen}
                    closeDialog={() => setIsUpdateModalOpen(false)}
                    updateFloorMutation={updateFloorMutation}
                />
            </Dialog>

            <View className="gap-4 p-4">
                <Text className="text-2xl font-bold">Quản lý tầng khách sạn</Text>
                <View className="flex-row justify-between gap-2">
                    <View style={{ width: 160 }}>
                        <Popover>
                            <PopoverTrigger asChild>
                                <TouchableOpacity className="relative justify-center rounded-md border-2 border-solid border-black bg-black/10 px-4 py-3 disabled:border-gray-600 disabled:bg-gray-100 disabled:text-gray-600 disabled:opacity-50">
                                    <Text className="text-center font-medium">Tìm kiếm</Text>
                                    {havingFilters && <View className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-600" />}
                                </TouchableOpacity>
                            </PopoverTrigger>
                            <FloorFilter
                                setHavingFilters={setHavingFilters}
                                onChange={buildQuery}
                                onSearch={onFilterSearch}
                                onReset={onResetFilterSearch}
                            />
                        </Popover>
                    </View>

                    <View style={{ width: 160 }}>
                        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                            <DialogTrigger asChild>
                                <TouchableOpacity className="justify-center rounded-md border-2 border-solid border-blue-600 bg-blue-100 px-4 py-3 disabled:border-gray-600 disabled:bg-gray-100 disabled:text-gray-600 disabled:opacity-50">
                                    <Text className="text-center font-medium text-blue-600">Thêm mới</Text>
                                </TouchableOpacity>
                            </DialogTrigger>
                            <CreateFloorDialog
                                isOpen={isAddModalOpen}
                                closeDialog={() => setIsAddModalOpen(false)}
                                createNewFloorMutation={createNewFloorMutation}
                            />
                        </Dialog>
                    </View>
                </View>
            </View>
            <FloorTable
                floors={floors}
                total={total}
                page={page}
                limit={limit}
                setPage={setPage}
                onSelectFloor={(floor: IFloor) => {
                    setSelectedFloor(floor)
                    setIsUpdateModalOpen(true)
                }}
                deleteFloorMutation={deleteFloorMutation}
            />
        </SafeAreaView>
    )
}

export default FloorDashboardScreen
