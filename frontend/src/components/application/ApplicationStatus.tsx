import React, { FC } from 'react'
import { Typography } from '../atom'
import { StyleSheet, View } from 'react-native'

interface ApplicationStatusProps {
    isDocRejected: boolean
}

const Waiting: FC = () => {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Typography size='xl' color='secondary' extrasStyle={styles.message}>
                    Thanks for uploading your documents.
                </Typography>
            </View>
            <View style={styles.textContainer}>
                <Typography size='xl' color='secondary' extrasStyle={styles.message}>
                    Your application is waiting for verification.
                </Typography>
            </View>
        </View>
    )
}

const Rejected: FC = () => {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Typography size='xl' color='secondary' extrasStyle={styles.message}>
                    Your application has been rejected.
                </Typography>
            </View>
            <View style={styles.textContainer}>
                <Typography size='md' color='secondary' extrasStyle={styles.message}>
                    Please email lk370.chatapp@gmail.com to find more information.
                </Typography>
            </View>
        </View>
    )
}

const ApplicationStatus: FC<ApplicationStatusProps> = ({ isDocRejected }) => {
    return (
        <>
            {isDocRejected ? <Rejected /> : <Waiting />}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '60%',
    },
    textContainer: {
        marginBottom: 20,
    },
    message: {
        textAlign: 'center',
        fontWeight: '500',
    },
})


export default ApplicationStatus
