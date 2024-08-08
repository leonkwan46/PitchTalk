import React, { FC } from 'react'
import { Image, ImageBackground, Modal, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import ApplicationForm from './ApplicationForm'
import { Typography } from '../atom'
import { getPopoverStatus } from '@/src/redux/selectors'
import { Loading } from '../shared'
import { ApplicantState } from './ApplicationList'

const backgroundImage = require('../../assets/images/piano-dark.jpg')
const teacherPic = require('../../assets/images/teacher.jpg')

interface ApplicationPopoverProps {
    applicationData: ApplicantState
    isPopoverVisible: boolean
    handleClosePopover: () => void
}
const ApplicationPopover: FC<ApplicationPopoverProps> = (props) => {
    const { applicationData, isPopoverVisible, handleClosePopover } = props
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
                                <View style={styles.overlay}  />
                                <View style={styles.popoverContainer}>
                                    <View style={styles.popoverContentContainer}>
                                        <View style={styles.title}>
                                            <View>
                                                <Image source={teacherPic} style={styles.profilePic} />
                                            </View>
                                            <View>
                                                <Typography size='xl' color='primary'>{applicationData.name}'s</Typography>
                                                <Typography size='xl' color='primary'>Application</Typography>
                                            </View>
                                        </View>
                                        <ApplicationForm applicantData={applicationData} />
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
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    profilePic: {
        borderRadius: 50,
        overflow: 'hidden',
        width: 70,
        height: 70,
        marginRight: 10,
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
        flexDirection: 'row',
    },
})

export default ApplicationPopover