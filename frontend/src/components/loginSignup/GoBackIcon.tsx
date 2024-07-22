import { useTypedSelector } from '@/src/hooks/useTypedSelector'
import { changeToLogin } from '@/src/redux/reducer/registerInfoSlice'
import { AppDispatch } from '@/src/redux/store'
import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { useDispatch } from 'react-redux'

interface GoBackIconProps {
    buttonStyle: object
    iconColor: string
}

const GoBackIcon: FC<GoBackIconProps> = ({buttonStyle, iconColor}) => {
    const dispatch: AppDispatch = useDispatch()
    const handleOnPress = () => {
        dispatch(changeToLogin())
    }
    return (
        <TouchableOpacity onPress={handleOnPress} style={buttonStyle}>
            <Icon name='arrow-back' color={iconColor} />
        </TouchableOpacity>
    )
}

export default GoBackIcon
