import React, { FC, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Box, VStack } from '@react-native-material/core'
import { Formik, FormikHelpers } from 'formik'
import { useDispatch } from 'react-redux'
import { updateUser, UpdateUserPayload } from '../../redux/reducer/authSlice'
import { getAuthUser } from '../../redux/selectors'
import dayjs from 'dayjs'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-picker/picker'
import { GeneralFormSchema } from '../../helpers/validationHelpers'
import { AppDispatch } from '@/src/redux/store'
import { Button, TextInput, Typography } from '../atom'

// Validation Schema
const validationSchema = GeneralFormSchema

// For testing
const initialValues = { name: 'Leeeo', DoB: '04-04-2024', gender: 'Female' }
// const initialValues = { name: '', DoB: '', gender: '' }

interface FormValues {
    name: string;
    DoB: string;
    gender: string;
}

const FormGeneral: FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const user = getAuthUser()

    const [selectedGender, setSelectedGender] = useState()
    const [showGenderPicker, setShowGenderPicker] = useState(false)
    const [selectedDate, setSelectedDate] = useState(dayjs().toDate())
    const [showDatePicker, setShowDatePicker] = useState(false)

    const handleOnFocusDatePicker = () => {
        setShowDatePicker(true)
    }

    const handleOnBlurDatePicker = () => {
        setShowDatePicker(false)
    }

    const handleOnFocusGenderPicker = () => {
        setShowGenderPicker(true)
    }

    const handleOnBlurGenderPicker = () => {
        setShowGenderPicker(false)
    }

    const onSubmit = async (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
        values = {...values, userId: user.userId, isGeneralFormComplete: true} as UpdateUserPayload
        await dispatch(updateUser(values as UpdateUserPayload))
        resetForm()
    }

    return (
        <View style={styles.container}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <VStack spacing={50}>
                        <Box>
                            <TextInput
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                                size='lg'
                                hasError={errors.name && touched.name ? true : false}
                                placeholder='Name'
                            />
                        </Box>
                        <Box>
                            <TextInput
                                onChangeText={handleChange('DoB')}
                                keyboardType="numeric"
                                value={values.DoB}
                                size='lg'
                                hasError={errors.DoB && touched.DoB ? true : false}
                                placeholder='Date of Birth'
                                onFocus={handleOnFocusDatePicker}
                                onBlur={handleOnBlurDatePicker}
                            />
                            {showDatePicker && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={selectedDate}
                                    mode="date"
                                    display="spinner"
                                    textColor='#fff'
                                    onChange={(event, choosenDate) => {
                                        const currentDate = choosenDate || dayjs().toDate()
                                        setSelectedDate(currentDate)
                                        values.DoB = dayjs(currentDate).format('DD-MM-YYYY')
                                    }}
                                />
                            )}
                            
                        </Box>
                        <Box>
                            <TextInput
                                onChangeText={handleChange('gender')}
                                value={values.gender}
                                size='lg'
                                hasError={errors.gender && touched.gender ? true : false}
                                placeholder='Gender'
                                onFocus={handleOnFocusGenderPicker}
                                onBlur={handleOnBlurGenderPicker}
                            />
                            {showGenderPicker && (
                                <Picker
                                    style={styles.genderPicker}
                                    selectedValue={selectedGender}
                                    itemStyle={{ color: '#fff' }}
                                    onValueChange={(itemValue, itemIndex) => {
                                        setSelectedGender(itemValue)
                                        values.gender = itemValue ?? ''
                                    }}
                                >
                                    <Picker.Item label="Select Gender" value="" />
                                    <Picker.Item label="Male" value="Male" />
                                    <Picker.Item label="Female" value="Female" />
                                    <Picker.Item label="Prefer not to say" value="Prefer not to say" />
                                </Picker>
                            )}
                        </Box>
                        <Box style={styles.buttonContainer}>
                            <Button onPress={handleSubmit} size='xl' color='primary'>
                                <Typography size='lg' color='white'>Next</Typography>
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
    genderPicker: {
        marginTop: -70,
        marginBottom: -40,
    }
})

export default FormGeneral