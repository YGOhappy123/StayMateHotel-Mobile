import { useDispatch } from 'react-redux'
import { useMutation } from 'react-query'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'

import { onError } from '@/utils/errorsHandler'
import { setLogged, setUser } from '@/slices/authSlice'
import { getMappedMessage } from '@/utils/resMessageMapping'
import useAxiosIns from '@/hooks/useAxiosIns'
import toastConfig from '@/configs/toastConfig'

interface SignInResponse {
    user: IUser
    accessToken: string
    refreshToken: string
}

const authService = () => {
    const axios = useAxiosIns()
    const dispatch = useDispatch()
    const router = useRouter()

    const signInMutation = useMutation({
        mutationFn: (account: { username: string; password: string }) => axios.post<IResponseData<SignInResponse>>(`/auth/sign-in`, account),
        onError: onError,
        onSuccess: async res => {
            const { user, accessToken, refreshToken } = res.data.data
            await AsyncStorage.setItem('access_token', accessToken)
            await AsyncStorage.setItem('refresh_token', refreshToken)

            router.push('/')
            dispatch(setLogged(true))
            dispatch(setUser(user))
            Toast.show(
                toastConfig({
                    title: 'Đăng nhập thành công.',
                    body: getMappedMessage(res.data.message),
                    type: 'success'
                })
            )
        }
    })

    const updatePasswordMutation = useMutation({
        mutationFn: ({ oldPassword, newPassword, confirmPassword }: { oldPassword: string; newPassword: string; confirmPassword: string }) =>
            axios.post<IResponseData<any>>(`/auth/change-password`, { oldPassword, newPassword, confirmPassword }),
        onError: onError,
        onSuccess: res => {
            Toast.show(
                toastConfig({
                    title: 'Cập nhật thành công.',
                    body: getMappedMessage(res.data.message),
                    type: 'success'
                })
            )
        }
    })

    return {
        signInMutation,
        updatePasswordMutation
    }
}

export default authService
