import { useEffect } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useRefreshTokenFn from '@/hooks/useRefreshTokenFn'

export const axiosIns = axios.create({
    baseURL: process.env.EXPO_PUBLIC_SERVER_URL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
})

const useAxiosIns = () => {
    const getAccessToken = async () => await AsyncStorage.getItem('access_token')
    const getRefreshToken = async () => await AsyncStorage.getItem('refresh_token')
    const refreshTokenFn = useRefreshTokenFn(axiosIns)

    useEffect(() => {
        const requestIntercept = axiosIns.interceptors.request.use(
            async config => {
                if (!config.headers['Authorization']) {
                    const token = await getAccessToken()
                    config.headers['Authorization'] = `Bearer ${token}`
                }

                return config
            },
            error => {
                return Promise.reject(error)
            }
        )

        const responseIntercept = axiosIns.interceptors.response.use(
            response => response,
            async error => {
                const prevRequest = error?.config
                const refreshToken = await getRefreshToken()

                if (error?.response?.status === 401 && !prevRequest?.sent && refreshToken) {
                    prevRequest.sent = true

                    const token = await refreshTokenFn(refreshToken)
                    if (!token) throw new Error('REFRESH_FAILED')

                    prevRequest.headers.Authorization = `Bearer ${token}`
                    return axiosIns({
                        ...prevRequest,
                        headers: prevRequest.headers.toJSON()
                    })
                }
                return Promise.reject(error)
            }
        )

        return () => {
            axios.interceptors.request.eject(requestIntercept)
            axios.interceptors.response.eject(responseIntercept)
        }
    }, [refreshTokenFn])

    return axiosIns
}

export default useAxiosIns
