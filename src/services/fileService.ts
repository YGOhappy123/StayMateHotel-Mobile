import { ImagePickerAsset } from 'expo-image-picker'
import { useMutation } from 'react-query'
import { onError } from '@/utils/errorsHandler'
import useAxiosIns from '@/hooks/useAxiosIns'

const fileService = () => {
    const axios = useAxiosIns()
    const uploadMutation = useMutation({
        mutationFn: ({ file, folder }: { file: string; folder: string }) => {
            const form = new FormData()
            form.append('base64Image', file)
            return axios.postForm(`/file/upload-base64-image?folder=${folder}`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        },
        // mutationFn: ({ file, folder }: { file: ImagePickerAsset; folder: string }) => {
        //     const formData = new FormData()
        //     formData.append('file', {
        //         uri: file.uri,
        //         type: file.type,
        //         name: file.fileName
        //     } as any)
        //     formData.append('folder', folder)
        //     formData.append('cloud_name', process.env.EXPO_PUBLIC_CLOUD_NAME ?? '')
        //     formData.append('upload_preset', process.env.EXPO_PUBLIC_UPLOAD_PRESET ?? '')

        //     return axios.post(`https://api.cloudinary.com/v1_1/${process.env.EXPO_PUBLIC_CLOUD_NAME}/image/upload`, formData)
        // },
        onError: onError
    })

    const deleteMutation = useMutation({
        mutationFn: (imageUrl: string) => axios.post('/file/delete-image', { imageUrl }),
        onError: onError
    })

    return { uploadMutation, deleteMutation }
}

export default fileService
