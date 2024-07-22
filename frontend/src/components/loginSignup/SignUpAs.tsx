import React, { FC, useState } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import { openTeacherOverlay, collectUserRole } from '../../redux/reducer/registerInfoSlice'
import { Button, Typography } from '../atom/'
import AttentionOverlay from './AttentionOverlay'
import { AppDispatch } from '@/src/redux/store'

const roles = [
    { id: 1, name: 'Student / Parents', selected: true },
    { id: 2, name: 'Teacher', selected: false },
]

const SignUpAs: FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const [selected, setSelected] = useState(roles)

    const handleOnPress: (id: number) => void = (id) => {
        const newSelected = selected.map((item) => {
            if (item.id === id) {
                if (id === 2) {
                    dispatch(collectUserRole({ role: 'teacher' }))
                    dispatch(openTeacherOverlay())
                } else {
                    dispatch(collectUserRole({ role: 'student' }))
                }
                return { ...item, selected: true }
            }
            return { ...item, selected: false }
        })
        setSelected(newSelected)
    }

    return (
        <View style={ styles.container }>
            <View style={styles.textAsContainer}>
                <Typography size='xl' color='secondary'>As: </Typography>
            </View>
            <View style={styles.selectionContainer}>
                <FlatList
                    scrollEnabled={false}
                    data={selected}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Button onPress={() => handleOnPress(item.id)} color='invisible' extraStyles={{width: '100%'}}>
                                <Typography color='secondary' selected={item.selected}>{item.name}</Typography>
                        </Button>
                    )}
                />
                <AttentionOverlay />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: '#D4AF37',
        borderRadius: 10,
        marginBottom: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 110,
    },
    selectionContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
    },
    textAsContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '20%',
        marginRight: 20,
    },
})
export default SignUpAs