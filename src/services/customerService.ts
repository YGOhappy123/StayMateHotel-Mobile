import { useMutation } from 'react-query'
import { onError } from '@/utils/errorsHandler'
import { getMappedMessage } from '@/utils/resMessageMapping'
import Toast from 'react-native-toast-message'
import useAxiosIns from '@/hooks/useAxiosIns'
import toastConfig from '@/configs/toastConfig'

export type CustomerSortAndFilterParams = {
    searchName: string
    searchEmail: string
    searchPhoneNumber: string
    startTime: string
    endTime: string
    sort: string
}

const customerService = () => {
    const axios = useAxiosIns()

    const updateProfileMutation = useMutation({
        mutationFn: ({ data }: { data: Partial<IGuest> }) => axios.patch<IResponseData<any>>(`/guests/profile`, data),
        onError: onError,
        onSuccess: res => {
            Toast.show(
                toastConfig({
                    title: 'Cập nhật thành công',
                    body: getMappedMessage(res.data.message),
                    type: 'success'
                })
            )
        }
    })

    return {
        updateProfileMutation
    }
}

export default customerService
