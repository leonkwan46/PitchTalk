import { useTypedSelector } from '@/src/hooks/useTypedSelector'
import { AppDispatch } from '@/src/redux/store'
import { AuthUserState } from '@/src/types/types'
import { Box, VStack } from '@react-native-material/core'
import { router } from 'expo-router'
import { Formik, FormikHelpers } from 'formik'
import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { LoginSchema, SignupSchema } from '../../helpers/validationHelpers'
import { clearAuthStates, loginUser, signUpUser } from '../../redux/reducer/authSlice'
import { Button, TextInput, Typography } from '../atom'
import { setUser } from '@/src/redux/reducer/sessionSlice'

// For testing
// import { setUser } from '@/src/redux/reducer/testingSlice'
const initialValues = { email: 'lk370.chatapp@gmail.com', password: '123456', confirmPassword: '123456' }
// const initialValues = { email: 'teacher@gmail.com', password: 'qwe', confirmPassword: 'qwe' }
// const initialValues = { email: 'student@gmail.com', password: '123456'}
// const initialValues = {}

interface FormValues {
    email: string
    password: string
    confirmPassword: string
}

interface ResponsePayload {
    token: string
    user: AuthUserState
}

const FormLoginSignUp: FC = () => {
    const isLogin = useTypedSelector(state => state.registerInfo.isLogin)
    const validationSchema = isLogin ? LoginSchema : SignupSchema
    const dispatch: AppDispatch = useDispatch()
    const role = useTypedSelector(state => state.registerInfo.role)
    const onSubmit = async (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
        const payload = {...values, role: role}
        // Login Page
        if (isLogin) {
            dispatch(loginUser(payload)).then((res) => {
                if (loginUser.fulfilled.match(res)) {
                    const { token, user } = res.payload as ResponsePayload

                    const { role, isInvitationVerified, isDocVerified, isGeneralFormComplete } = user
    
                    if ((role === 'parent' && (!isInvitationVerified || !isGeneralFormComplete))
                        || (role === 'teacher' && (!isDocVerified || !isGeneralFormComplete))) {
                        router.replace('extraDetailsScreen')
                    } else {
                        
                        dispatch(setUser({ user, token }))
                        dispatch(clearAuthStates())
                        router.replace('(tabs)')
                    }
                }
            }).catch((err) => {
                throw new Error(err)
            })
        // Register Page
        } else {
            dispatch(signUpUser(payload)).then(() => {
                router.replace('extraDetailsScreen')
            }).catch((err) => {
                throw new Error(err)
            })
        }
        resetForm()
    }

    return (
        <View style={ styles.container }>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (

                    <VStack spacing={20}>
                        <Box>
                            <TextInput 
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                size='lg'
                                hasError={errors.email && touched.email ? true : false}
                                placeholder='Email'
                            />
                        </Box>
                        <Box>
                            <TextInput
                                secureTextEntry
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                size='lg'
                                hasError={errors.password && touched.password ? true : false}
                                placeholder='Password'
                            />
                        </Box>
                        {!isLogin &&
                            <Box>
                                <TextInput
                                    secureTextEntry
                                    onChangeText={handleChange('confirmPassword')}
                                    onBlur={handleBlur('confirmPassword')}
                                    value={values.confirmPassword}
                                    hasError={errors.confirmPassword ? true : false}
                                    size='lg'
                                    placeholder='Confirm Password'
                                />
                            </Box>
                        }
                        <Box style={styles.buttonContainer}>
                            <Button onPress={handleSubmit} color='primary' size='xl' >
                                <Typography size='lg' color='white'>{isLogin ? 'Login' : 'Register'}</Typography>
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
        borderRadius: 10,
        margin: 10,
    },
    buttonContainer: {
        display: 'flex',
        alignItems: 'flex-end',
    },
})

export default FormLoginSignUp