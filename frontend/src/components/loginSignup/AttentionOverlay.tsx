// AttentionOverlay.tsx

import React, { FC } from 'react'
import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native'
import { Overlay } from 'react-native-elements'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { closeTeacherOverlay } from '../../redux/reducer/registerInfoSlice'
import { OverlayInfo } from './'

const image = require('../../assets/images/overlay.jpg')

const AttentionOverlay: FC = () => {
    const dispatch = useDispatch()
    const visible = useTypedSelector(state => state.registerInfo.isTeacherOverlayOpen)

    return (
        <Overlay
            isVisible={visible}
            onBackdropPress={() => dispatch(closeTeacherOverlay())}
            overlayStyle={styles.overlay}
        >
            <ImageBackground
                source={image}
                style={styles.imageContainer}
            >
                <View style={styles.backgroundColor}>
                    <OverlayInfo />
                </View>
            </ImageBackground>
        </Overlay>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        resizeMode: 'cover',
        overflow: 'hidden',
        borderRadius: 30,
    },
    backgroundColor: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    overlay: {
        padding: 0,
        width: '70%',
        height: '60%',
        borderRadius: 30,
    },
})

export default AttentionOverlay
