import { useMutation } from 'react-query'
import { onError } from '@/utils/errorsHandler'
import { getMappedMessage } from '@/utils/resMessageMapping'
import Toast from 'react-native-toast-message'
import useAxiosIns from '@/hooks/useAxiosIns'
import toastConfig from '@/configs/toastConfig'

export type AdminSortAndFilterParams = {
    searchName: string
    searchEmail: string
    searchPhoneNumber: string
    sort: string
    range: string[] | any[] | undefined
}

const adminService = () => {
    const axios = useAxiosIns()

    const updateAdminMutation = useMutation({
        mutationFn: ({ data }: { data: Partial<IAdmin> }) => axios.patch<IResponseData<any>>(`/admins/profile`, data),
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
        updateAdminMutation
    }
}

export default adminService
