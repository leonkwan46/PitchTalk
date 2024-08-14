import { getLoggedInUser, getUserContacts } from '@/src/redux/selectors'
import { AppDispatch } from '@/src/redux/store'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Box, VStack } from '@react-native-material/core'
import { Picker } from '@react-native-picker/picker'
import { useNavigation } from '@react-navigation/native'
import dayjs from 'dayjs'
import { Formik, FormikHelpers } from 'formik'
import React, { FC, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { StudentFormSchema } from '../../helpers/validationHelpers'
import { createStudentAccount } from '../../redux/reducer/sessionSlice'
import { Button, TextInput, Typography } from '../atom'

// For testing
// const initialValues = { email: 'student@gmail.com', password: '123123', confirmPassword: '123123', name: 'Student 1', DoB: '04-04-2024', gender: 'Male', teacher: '', instrument: 'Piano'}
const initialValues = { email: '', password: '', confirmPassword: '', name: '', DoB: '', gender: '' , teacher: '', instrument: ''}

const validationSchema = StudentFormSchema

interface SecondFormValues {
    email: string
    password: string
    confirmPassword: string
    name: string
    DoB: string
    gender: string
    teacher: string
    instrument: string
}

const FormStudent: FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const navigation = useNavigation()

    const { token: parentToken } = getLoggedInUser()
    const { teachers } = getUserContacts()

    const [isFirstFormFinished, setIsFirstFormFinished] = useState(false)

    const [selectedDate, setSelectedDate] = useState(dayjs().toDate())
    const [showDatePicker, setShowDatePicker] = useState(false)
    
    const [selectedGender, setSelectedGender] = useState()
    const [showGenderPicker, setShowGenderPicker] = useState(false)
    
    const [selectedTeacher, setSelectedTeacher] = useState()
    const [showTeacherPicker, setShowTeacherPicker] = useState(false)

    const [selectedInstrument, setSelectedInstrument] = useState()
    const [showInstrumentPicker, setShowInstrumentPicker] = useState(false)

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

    const handleOnFocusTeacherPicker = () => {
        setShowTeacherPicker(true)
    }
    const handleOnBlurTeacherPicker = () => {
        setShowTeacherPicker(false)
    }

    const handleOnFocusInstrumentPicker = () => {
        setShowInstrumentPicker(true)
    }
    const handleOnBlurInstrumentPicker = () => {
        setShowInstrumentPicker(false)
    }

    const onNext = () => {
        setIsFirstFormFinished(true)
    }
    const onSubmit = async (values: SecondFormValues, { resetForm }: FormikHelpers<SecondFormValues>) => {
        dispatch(createStudentAccount({ ...values, parentToken }))
        resetForm()
        navigation.goBack()
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
                        { !isFirstFormFinished &&
                            <VStack spacing={50}>
                                <Box>
                                    <TextInput 
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                        size='lg'
                                        hasError={errors.email && touched.email ? true : false}
                                        placeholder='Student Email'
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
                            </VStack>
                        }
                        { isFirstFormFinished &&
                            <VStack spacing={15}>
                                <Box>
                                    <TextInput
                                        onChangeText={handleChange('name')}
                                        onBlur={handleBlur('name')}
                                        value={values.name}
                                        size='md'
                                        hasError={errors.name && touched.name ? true : false}
                                        placeholder='Name'
                                    />
                                </Box>
                                <Box>
                                    <TextInput
                                        onChangeText={handleChange('DoB')}
                                        keyboardType="numeric"
                                        value={values.DoB}
                                        size='md'
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
                                        size='md'
                                        hasError={errors.gender && touched.gender ? true : false}
                                        placeholder='Gender'
                                        onFocus={handleOnFocusGenderPicker}
                                        onBlur={handleOnBlurGenderPicker}
                                    />
                                    {showGenderPicker && (
                                        <Picker
                                            style={styles.picker}
                                            selectedValue={selectedGender}
                                            itemStyle={{ color: '#fff' }}
                                            onValueChange={(itemValue, itemIndex) => {
                                                setSelectedGender(itemValue)
                                                values.gender = itemValue || ''
                                            }}
                                        >
                                            <Picker.Item label="Select Gender" value="" />
                                            <Picker.Item label="Male" value="Male" />
                                            <Picker.Item label="Female" value="Female" />
                                            <Picker.Item label="Other" value="Other" />
                                        </Picker>
                                    )}
                                </Box>
                                <Box>
                                    <TextInput
                                        onChangeText={handleChange('teacher')}
                                        value={values.teacher.split(',')[0]}
                                        size='md'
                                        hasError={errors.teacher && touched.teacher ? true : false}
                                        placeholder='Teacher'
                                        onFocus={handleOnFocusTeacherPicker}
                                        onBlur={handleOnBlurTeacherPicker}
                                    />
                                    {showTeacherPicker && (
                                        <Picker
                                            style={styles.picker}
                                            selectedValue={selectedTeacher}
                                            itemStyle={{ color: '#fff' }}
                                            onValueChange={(itemValue, itemIndex) => {
                                                setSelectedTeacher(itemValue)
                                                values.teacher = itemValue || ''
                                            }}
                                        >   
                                            <Picker.Item label="Select Teacher" value={''} />
                                            {teachers.map(teacher => (
                                                <Picker.Item key={teacher._id} label={teacher.name} value={`${teacher.name},${teacher._id}`} />
                                            ))}
                                        </Picker>
                                    )}
                                </Box>
                                <Box>
                                    <TextInput
                                        onChangeText={handleChange('instrument')}
                                        value={values.instrument}
                                        size='md'
                                        hasError={errors.instrument && touched.instrument ? true : false}
                                        placeholder='Instrument'
                                        onFocus={handleOnFocusInstrumentPicker}
                                        onBlur={handleOnBlurInstrumentPicker}
                                    />
                                    {showInstrumentPicker && (
                                        <Picker
                                            style={styles.picker}
                                            selectedValue={selectedInstrument}
                                            itemStyle={{ color: '#fff' }}
                                            onValueChange={(itemValue, itemIndex) => {
                                                setSelectedInstrument(itemValue)
                                                values.instrument = itemValue || ''
                                            }}
                                        >   
                                            <Picker.Item label="Select Instrument" value="" />
                                            <Picker.Item label="Piano" value="Piano" />
                                            <Picker.Item label="Violin" value="Violin" />
                                        </Picker>
                                    )}
                                </Box>
                            </VStack>
                            }
                            <Box style={styles.buttonContainer}>
                                <Button onPress={isFirstFormFinished ? handleSubmit : onNext} size='xl' color='primary'>
                                    <Typography>Next</Typography>
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
        marginTop: 10,
    },
    buttonContainer: {
        alignItems: 'flex-end',
    },
    picker: {
        marginTop: -70,
        marginBottom: -40,
    }
})

export default FormStudent