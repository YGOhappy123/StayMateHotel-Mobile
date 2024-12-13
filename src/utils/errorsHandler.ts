import type { AxiosError } from 'axios'
import { getMappedMessage } from '@/utils/resMessageMapping'
import Toast from 'react-native-toast-message'
import toastConfig from '@/configs/toastConfig'

export const onError = (error: Error) => {
    const errorMessage = ((error as AxiosError<IResponseData<unknown>>).response?.data?.message as string) || error.message

    Toast.show(
        toastConfig({
            type: 'error',
            title: 'Có lỗi xảy ra.',
            body: getMappedMessage(errorMessage)
        })
    )
}
