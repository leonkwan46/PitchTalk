import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Typography } from '../atom'
import { changeToRegister } from '@/src/redux/reducer/registerInfoSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/src/redux/store'

const BottomSignInNavigation: FC= () => {
    const dispatch: AppDispatch = useDispatch()

    const handleOnPress = () => {
        dispatch(changeToRegister())
    }

    return (
        <View style= {styles.container }>
            <Typography>
                <Typography size='md' color='secondary'>Don't have an account? </Typography>
                    <Button onPress={handleOnPress} size='sm' color='primary' fill={false} extraStyles={{ width: '100%' }}>
                        <Typography size='sm' color='secondary'> Sign up!</Typography>
                    </Button>
            </Typography>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 100,
    },
    linkContainer : {
        borderRadius: 50,
        borderColor: '#D4AF37',
        borderWidth: 1,
        width: 80,
        height: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
})
export default BottomSignInNavigation