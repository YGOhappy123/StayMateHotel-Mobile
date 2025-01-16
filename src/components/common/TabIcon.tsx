import { Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

type TabIconProps = {
    label: string
    iconName: string
    color: string
    focused: boolean
}

const TabIcon = ({ label, iconName, color, focused }: TabIconProps) => {
    return (
        <View className="items-center">
            <Icon name={iconName} size={32} color={color} />
            <Text
                className={`w-max text-sm ${focused ? 'font-semibold' : 'font-regular'}`}
                style={{
                    color: color
                }}
            >
                {label}
            </Text>
        </View>
    )
}

export default TabIcon
