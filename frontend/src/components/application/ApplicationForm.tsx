import { AppDispatch } from '@/src/redux/store'
import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Typography } from '../atom'
import { ApplicantState } from './ApplicationList'
import { useDispatch } from 'react-redux'
import { updateApplication } from '@/src/redux/reducer/sessionSlice'
import { getUserToken } from '@/src/redux/selectors'

interface ApplicationFormProps {
    applicantData: ApplicantState
}

const ApplicationForm: FC<ApplicationFormProps> = (props) => {
    const dispatch: AppDispatch = useDispatch()
    const { _id: teacherId, name, gender, email, documents } = props.applicantData
    const { DBSCert, ProofOfId, ProfessionalCert } = documents
    const token = getUserToken()

    const handleOnPress = async (approved: boolean): Promise<void> => {
        const result = await dispatch(updateApplication({ teacherId, approved, token }))
        if (updateApplication.fulfilled.match(result)) {
            
        }
    }

    return (
        <View style={styles.container}>
            <Typography size='xl' color='primary'>Personal Info</Typography>
            <View style={styles.infoContainer}>
                <Typography size='md' color='primary'>Name: <Typography color='secondary' size='md'>{name}</Typography></Typography>
                <Typography size='md' color='primary'>Gender: <Typography color='secondary'size='md'>{gender}</Typography></Typography>
                <Typography size='md' color='primary'>Email: <Typography color='secondary'size='md'>{email}</Typography></Typography>
            </View>

            <Typography size='xl' color='primary'>Documents</Typography>
            <View style={styles.infoContainer}>
                <Typography size='md' color='primary'>DBS Certificate: <Typography color='secondary'size='md'>{DBSCert?.name || 'Not Provided'}</Typography></Typography>
                <Typography size='md' color='primary'>Proof of ID: <Typography color='secondary'size='md'>{ProofOfId?.name || 'Not Provided'}</Typography></Typography>
                <Typography size='md' color='primary'>Professional Certificate: <Typography color='secondary'size='md'>{ProfessionalCert?.name || 'Not Provided'}</Typography></Typography>
            </View>

            <View style={styles.buttonContainer}>
                <Button size='lg' color='red' extraStyles={{ marginRight: 10 }} onPress={() => handleOnPress(false)}>
                    <Typography size='md' color='black'>Reject</Typography>
                </Button>

                <Button size='lg' color='green' extraStyles={{ marginRight: 10 }} onPress={() => handleOnPress(true)}>
                    <Typography size='md' color='black'>Accept</Typography>
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'rgba(212, 212, 212, 0.3)',
        borderRadius: 20,
    },
    sectionTitle: {
        marginBottom: 10,
    },
    infoContainer: {
        marginBottom: 20,
    },
    text: {
        fontWeight: 'bold',
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})

export default ApplicationForm
