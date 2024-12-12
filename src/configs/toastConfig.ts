import { ToastShowParams } from 'react-native-toast-message'

type ToastParams = {
    title?: string
    body?: string
    type?: 'error' | 'info' | 'success'
}

const toastConfig = ({ title, body, type }: ToastParams): ToastShowParams => ({
    type: type,
    text1: title,
    text2: body,
    visibilityTime: 2000
})

export default toastConfig
