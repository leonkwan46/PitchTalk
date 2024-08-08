import { getApplications, updateApplication } from '@/src/redux/reducer/sessionSlice'
import { getSessionStatus, getUserToken } from '@/src/redux/selectors'
import { AppDispatch } from '@/src/redux/store'
import { Box, VStack } from '@react-native-material/core'
import { useFocusEffect } from '@react-navigation/native'
import React, { FC, useCallback, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { Loading, Divider } from '../shared'
import Application from './Application'

interface DocumentState {
    name: string
    uri: string
}

export interface ApplicantState {
    _id: string
    name: string
    role: string
    email: string
    gender: string
    createAt: string
    DoB: string
    documents: {
        DBSCert: DocumentState
        ProofOfId: DocumentState
        ProfessionalCert: DocumentState
    }
}

export interface ApplicationData {
    _id: string
    teacher: ApplicantState
    isAccepted: boolean
    isPending: boolean
    isRejected: boolean
  }

const ApplicationList: FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const token = getUserToken()
    const isLoading = getSessionStatus().isLoading
    const [applications, setApplications] = useState<ApplicationData[]>([])

    const fetchApplications= async () => {
        const response = await dispatch(getApplications({ token }))
        if (getApplications.fulfilled.match(response)) {
            setApplications(response.payload as ApplicationData[])
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchApplications()
        }, [])
    )

    return (
        <>
        { isLoading ? <Loading isLoggedIn /> : (
            <>
            {applications.length > 0 && (
                <View style={styles.container}>
                    <VStack spacing={10}>
                        {applications.map((app) => (
                            <Box key={app._id}>
                                <Application applicationData={app} />
                                <Divider />
                            </Box>
                        ))}
                    </VStack>
                </View>
            )}
            </>
        )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    divider: {
        padding: 10,
        backgroundColor: 'white',
        color: 'white',
    },
})

export default ApplicationList
