import toastConfig from '@/configs/toastConfig'
import type { AxiosError } from 'axios'
import Toast from 'react-native-toast-message'

export const onError = (error: Error) => {
    const errorMessage = ((error as AxiosError<IResponseData<unknown>>).response?.data?.message as string) || error.message

    Toast.show(
        toastConfig({
            type: 'error',
            title: 'Có lỗi xảy ra.',
            body: errorMessage
        })
    )
}
