import React, { FC } from 'react'
import { ImageBackground, Modal, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import CreateRoomActionForm from './CreateRoomActionForm'
import { Typography } from '../atom'
import { getPopoverStatus } from '@/src/redux/selectors'
import { Loading } from '../shared'

const backgroundImage = require('../../assets/images/piano-dark.jpg')

interface CreateRoomPopoverProps {
    isPopoverVisible: boolean
    role: string
    handleClosePopover: () => void
}
const CreateRoomPopover: FC<CreateRoomPopoverProps> = (props) => {
    const { isPopoverVisible, handleClosePopover } = props
    const { isLoading } = getPopoverStatus()
    return (
        <Modal
            animationType="fade"
            transparent={true}
            onRequestClose={handleClosePopover}
            visible={isPopoverVisible}
        >
            { isLoading && <Loading /> }
            <TouchableOpacity
                activeOpacity={1}
                onPressOut={handleClosePopover}
                style={styles.wrapper}
            >
                <ScrollView style={styles.modalContainer}>
                    <TouchableWithoutFeedback>
                        <View>
                            <ImageBackground
                                source={backgroundImage}
                                style={styles.backgroundImage}
                            >
                                <View style={styles.popoverContainer}>
                                    <View style={styles.popoverContentContainer}>
                                        <View style={styles.title}>
                                            <Typography size='xl' color='primary'>Create Chat Room</Typography>
                                        </View>
                                        <CreateRoomActionForm handleClosePopover={handleClosePopover} />
                                    </View>
                                </View>
                            </ImageBackground>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </TouchableOpacity>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    modalContainer: {
        position: 'absolute',
        borderRadius: 30,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        overflow: 'hidden',
        borderRadius: 30,
    },
    popoverContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    popoverContentContainer: {
        padding: 20,
    },
    title: {
        paddingHorizontal: 0,
        paddingVertical: 20,
    },
})

export default CreateRoomPopover