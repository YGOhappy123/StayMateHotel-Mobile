import { useEffect, useState } from 'react'
import { View, Dimensions } from 'react-native'
import { PopoverContent } from '@/components/ui/Popover'
import { FloorSortAndFilterParams } from '@/services/floorService'

import Button from '@/components/common/Button'
import TextInput from '@/components/common/TextInput'
import SelectInput from '@/components/common/SelectInput'

type FloorFilterProps = {
    setHavingFilters: (value: boolean) => void
    onChange: (params: FloorSortAndFilterParams) => void
    onSearch: () => void
    onReset: () => void
}

const FloorFilter = ({ setHavingFilters, onChange, onSearch, onReset }: FloorFilterProps) => {
    const [searchFloorNumber, setSearchFloorNumber] = useState<string>('')
    const [range, setRange] = useState<string[] | any[]>()
    const [sort, setSort] = useState<string>('-createdAt')
    // const [date, setDate] = useState<DateRange | undefined>(undefined)

    // useEffect(() => {
    //     if (date) {
    //         const dateRange = [date.from]
    //         if (date.to) dateRange.push(date.to)

    //         setRange(dateRange)
    //     } else {
    //         setRange([])
    //     }
    // }, [date])

    useEffect(() => {
        onChange({ searchFloorNumber, sort, range })
    }, [searchFloorNumber, sort, range])

    const handleSearch = () => {
        onSearch()

        if (!searchFloorNumber && sort === '-createdAt' && !range?.length) {
            setHavingFilters(false)
        } else {
            setHavingFilters(true)
        }
    }

    const handleReset = () => {
        setSearchFloorNumber('')
        setSort('-createdAt')
        // setDate(undefined)
        setHavingFilters(false)
        onReset()
    }

    return (
        <PopoverContent
            className="border-transparent bg-white"
            style={{
                width: Dimensions.get('screen').width - 16
            }}
        >
            <View className="mb-4 w-full flex-row items-center justify-between">
                <Button text="Tìm kiếm" variant="success" buttonClassName="rounded-2xl border-primary px-3 py-1.5 text-xs" onClick={handleSearch} />
                <Button text="Đặt lại" variant="danger" buttonClassName="rounded-2xl px-3 py-1.5 text-xs" onClick={handleReset} />
            </View>
            <View>
                <TextInput
                    label="Lọc theo số tầng:"
                    placeholder="Số tầng..."
                    error=""
                    value={searchFloorNumber}
                    onChange={(value: string) => setSearchFloorNumber(value)}
                    onFocus={() => {}}
                    wrapperClassName="mb-4"
                    inputClassName="leading-none"
                />
                <SelectInput
                    label="Sắp xếp theo:"
                    options={[
                        { value: '-createdAt', label: 'Ngày tạo giảm dần' },
                        { value: '+createdAt', label: 'Ngày tạo tăng dần' }
                    ]}
                    error=""
                    value={sort}
                    onChange={(value: string | number) => setSort(value as string)}
                    onFocus={() => {}}
                    wrapperClassName="bg-white"
                    selectClassName="leading-none"
                />
            </View>
        </PopoverContent>
    )
}

export default FloorFilter
