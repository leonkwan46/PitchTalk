import React, { FC, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { getColor } from '../../helpers/styleHelper'
import { Icon } from 'react-native-elements'
import AddParentPopover from './AddParentPopover'
import { getUserRole } from '@/src/redux/selectors'
import { router } from 'expo-router'
import { AppDispatch } from '@/src/redux/store'
import { useDispatch } from 'react-redux'
import { setRegisteringNewUser } from '@/src/redux/reducer/sessionSlice'

const AddBadge: FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const role = getUserRole()
    const [isPopoverVisible, setIsPopoverVisible] = useState(false)
    const handleOnPress = () => {
        setIsPopoverVisible(true)
        if (role === 'parent') {
            dispatch(setRegisteringNewUser({ isStudent: true }))
            router.push('extraDetailsScreen')
        }
    }
    const handleClosePopover = () => {
        setIsPopoverVisible(false)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.badgeContainer} onPress={handleOnPress}>
                <Icon name="add" type="material" color="black" />
            </TouchableOpacity>

            { role === 'teacher' && (
                <AddParentPopover
                    isPopoverVisible={isPopoverVisible}
                    handleClosePopover={handleClosePopover}
                />
            )}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: '15%',
        right: '10%',
    },
    badgeContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: getColor('primary'),
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default AddBadge
