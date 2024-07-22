import { AppDispatch } from '@/src/redux/store'
import { Box, VStack } from '@react-native-material/core'
import { Formik, FormikHelpers } from 'formik'
import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { ParentFormSchema } from '../../helpers/validationHelpers'
import { authInvitationCode, AuthInvitationPayload } from '../../redux/reducer/authSlice'
import { getAuthUser } from '../../redux/selectors'
import { Button, TextInput, Typography } from '../atom'
import { router } from 'expo-router'

const validationSchema = ParentFormSchema

interface FormValues {
    invitationCode: string
}

const FormParent: FC = () => {
    const { token } = getAuthUser()
    const dispatch: AppDispatch = useDispatch()
    const handleOnSubmit = async (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
        values = { ...values, token } as AuthInvitationPayload
        await dispatch(authInvitationCode(values as AuthInvitationPayload))

        if (authInvitationCode.fulfilled.match(values)) router.replace('(tabs)/messages')
        resetForm()
    }
    return (
        <View style={styles.container}>
            <Formik
                validationSchema={validationSchema}
                initialValues={{ invitationCode: '' }}
                onSubmit={handleOnSubmit}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <VStack spacing={50}>
                        <Box>
                            <Typography size='lg' color='secondary'>Your teacher has sent you an Invitation Code.</Typography>
                        </Box>
                        <Box>
                            <Typography size='lg' color='secondary'>Please check your email</Typography>
                        </Box>
                        <Box>
                            <TextInput
                                onChangeText={handleChange('invitationCode')}
                                onBlur={handleBlur('invitationCode')}
                                value={values.invitationCode}
                                size='lg'
                                hasError={errors.invitationCode && touched.invitationCode ? true : false}
                                placeholder='Invitation Code'
                                keyboardType='numeric'
                            />
                        </Box>
                        <Box style={styles.buttonContainer}>
                            <Button color='primary' size='xl' onPress={handleSubmit}>
                                <Typography size='lg' color='white'>Submit</Typography>
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
        flex: 1,
        marginTop: 50,
    },
    buttonContainer: {
        alignItems: 'flex-end',
    },
})

export default FormParent