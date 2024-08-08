import React, { FC, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { getAuthUser } from '../../redux/selectors'
import { Formik } from 'formik'
import UploadDocument from './UploadDocument'
import { Box, VStack } from '@react-native-material/core'
import { updateTeacherDocuments, UpdateTeacherDocumentsPayload } from '../../redux/reducer/authSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/src/redux/store'
import { Button, Typography } from '../atom'
import { router } from 'expo-router'
import { DocumentPickerAsset } from 'expo-document-picker'

const initialValues = {}
const mockDocuments = {
    name : 'test.pdf',
    uri : 'https://www.google.com'
}

const FormTeacher: FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const { userId } = getAuthUser()
    const [selectedDBS, setSelectedDBS] = useState<DocumentPickerAsset>(mockDocuments)
    const [selectedID, setSelectedID] = useState<DocumentPickerAsset>(mockDocuments)
    const [selectedProfessionalCert, setSelectedProfessionalCert] = useState<DocumentPickerAsset>(mockDocuments)

    const handleOnSubmit = async () => {
        await dispatch(updateTeacherDocuments({ userId, selectedDBS, selectedID, selectedProfessionalCert } as UpdateTeacherDocumentsPayload))
    }
        
    return (
        <View style={styles.container}>
            <Formik
                initialValues={initialValues}
                onSubmit={handleOnSubmit}
            >
            {({ handleSubmit }) => (
                <VStack spacing={20}>
                    <Box>
                        <Typography color='primary' size='lg'>Enhanced DBS Cert</Typography>
                        <UploadDocument title="Choose file" setSelectedDocument={setSelectedDBS} selectedDocument={selectedDBS} />
                    </Box>
                    <Box>
                        <Typography color='primary' size='lg'>Proof of ID</Typography>
                        <UploadDocument title="Choose file" setSelectedDocument={setSelectedID} selectedDocument={selectedID} />
                    </Box>
                    <Box>
                        <Typography color='primary' size='lg'>Professional Qualification Cert</Typography>
                        <UploadDocument title="Choose file" setSelectedDocument={setSelectedProfessionalCert} selectedDocument={selectedProfessionalCert} />
                    </Box>
                    <Box style={styles.buttonContainer}>
                        <Button onPress={handleSubmit} color='primary' size='lg' >
                            <Typography size='lg' color='white'>Complete</Typography>
                        </Button>
                    </Box>
                </VStack>
            )}
            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderRadius: 10,
        marginTop: 30,
    },
    buttonContainer: {
        alignItems: 'flex-end',
    },
})

export default FormTeacher