import React, { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { closeTeacherOverlay } from '../../redux/reducer/registerInfoSlice'
import { useDispatch } from 'react-redux'
import { Button, Typography } from '../atom'
import { AppDispatch } from '@/src/redux/store'

const OverlayInfo: FC = () => {
    const dispatch: AppDispatch = useDispatch()
    return (
            <View style={styles.infoContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        {String.fromCodePoint(0x2757)} ATTENTION {String.fromCodePoint(0x2757)}
                    </Text>
                </View>
                <View style={styles.subtitleContainer}>
                    <Text style={styles.subtitle}>Sign up as a Teacher</Text>
                </View>
                <View style={styles.subsubtitleContainer}>
                    <Text style={styles.subsubtitle}>** You will need to upload the following documents to complete your registration.</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>1. Enhanced DBS Certificate</Text>
                    <Text style={styles.text}>2. Proof of ID</Text>
                    <Text style={styles.text}>3. Professional Qualification Certificates</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={() => dispatch(closeTeacherOverlay())}
                        color='info'
                        fill={false}
                        >
                        <Typography>Ready!</Typography>
                    </Button>
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    infoContainer: {
        margin: 30,
        height: '100%',
    },
    titleContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '20%',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'red',
    },
    subtitleContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '10%',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    subsubtitleContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '20%',
    },
    subsubtitle: {
        fontSize: 16,
        fontStyle: 'italic',
    },
    textContainer: {
        height: '20%',
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '20%',
    },
})

export default OverlayInfo