import { ToastShowParams } from 'react-native-toast-message'

type ToastParams = {
    type?: 'error' | 'info' | 'success'
    title?: string
    body?: string
}

const toastConfig = ({ type, title, body }: ToastParams): ToastShowParams => ({
    type: type,
    text1: title,
    text2: body,
    visibilityTime: 2000
})

export default toastConfig
