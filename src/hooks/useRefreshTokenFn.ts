import { useDispatch } from 'react-redux'
import { useRouter } from 'expo-router'
import { signOut } from '@/slices/authSlice'
import { AxiosInstance } from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'
import toastConfig from '@/configs/toastConfig'

const useRefreshTokenFn = (axiosIns: AxiosInstance) => {
    const router = useRouter()
    const dispatch = useDispatch()

    const handleError = () => {
        Toast.show(
            toastConfig({
                type: 'info',
                title: 'Phiên đăng nhập hết hạn.',
                body: 'Phiên đăng nhập hết hạn. Xin vui lòng đăng nhập lại.'
            })
        )
        dispatch(signOut() as any)
        router.push('/sign-in')
    }

    const refreshTokenFn = async (refreshToken: string) =>
        new Promise<string | null>((resolve, reject) => {
            axiosIns({
                url: '/auth/refresh-token',
                method: 'POST',
                validateStatus: null,
                data: {
                    refreshToken: refreshToken
                }
            })
                .then(async res => {
                    const { accessToken } = res?.data?.data
                    if (accessToken) {
                        await AsyncStorage.setItem('access_token', accessToken)
                        resolve(accessToken)
                    } else {
                        handleError()
                        resolve(null)
                    }
                })
                .catch(error => {
                    handleError()
                    reject(error)
                })
        })

    return refreshTokenFn
}

export default useRefreshTokenFn
