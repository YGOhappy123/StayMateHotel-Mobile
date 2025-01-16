import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { setUser } from '@/slices/authSlice'
import adminService from '@/services/adminService'
import customerService from '@/services/customerService'
import fileService from '@/services/fileService'
import Footer from '@/components/layout/Footer'
import GradientButton from '@/components/common/GradientButton'
import Button from '@/components/common/Button'
import Icon from 'react-native-vector-icons/FontAwesome6'

const ChangeAvatarTab = () => {
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.auth.user)
    const { uploadMutation, deleteMutation } = fileService()
    const { updateProfileMutation } = customerService()
    const { updateAdminMutation } = adminService()

    const [avatar, setAvatar] = useState(user!.avatar)

    const handleUpload = async () => {
        if (uploadMutation.isLoading) return

        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
            if (!permissionResult.granted) {
                console.log('no permission')
                return
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
                base64: true
            })

            if (!result.canceled) {
                const file = result.assets[0]

                if (file) {
                    await uploadMutation.mutateAsync({ file: `data:image/jpeg;base64,${file.base64!}`, folder: 'avatar' }).then(res => {
                        setAvatar(res.data.data?.imageUrl)
                    })
                }
            }
        } catch (error) {}
    }

    const updateAvatar = () => {
        console.log({ ...user, avatar })

        if (user!.role === 'Guest') {
            updateProfileMutation.mutateAsync({ data: { ...user, avatar } }).then(() => dispatch(setUser({ ...user, avatar } as IUser)))
        } else {
            updateAdminMutation.mutateAsync({ data: { ...user, avatar } }).then(() => dispatch(setUser({ ...user, avatar } as IUser)))
        }
    }

    const cancelAvatarChange = () => {
        deleteMutation.mutate(avatar!)
        setAvatar(user?.avatar)
    }

    return (
        <ScrollView>
            <View className="flex-1">
                <View className="items-start px-5 py-20">
                    <Text className="mb-6 text-4xl font-bold uppercase leading-[50px] text-primary">Thay đổi ảnh đại diện</Text>

                    <View className="mb-10 w-full items-center">
                        <View className="relative flex aspect-square h-[200px] items-center justify-center rounded-full border-4 border-primary bg-ivory p-1">
                            <Image source={{ uri: avatar }} className="h-full w-full rounded-full" />

                            <TouchableOpacity
                                onPress={handleUpload}
                                className="absolute bottom-2.5 right-2.5 flex aspect-square w-10 cursor-pointer items-center justify-center rounded-full bg-primary hover:bg-primary/90"
                            >
                                <Icon name="edit" color="#FFFFFF" size={16} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className="w-full gap-4">
                        <GradientButton
                            title="Cập nhật"
                            disabled={!avatar || avatar === user?.avatar}
                            handlePress={updateAvatar}
                            containerStyles="w-full h-[50px] rounded-full"
                        />
                        <Button
                            text="Hủy bỏ"
                            disabled={!avatar || avatar === user?.avatar}
                            onClick={cancelAvatarChange}
                            buttonClassName="w-full h-[50px] rounded-full"
                            textClassName="text-lg"
                        />
                    </View>
                </View>
                <Footer />
            </View>
        </ScrollView>
    )
}

export default ChangeAvatarTab
