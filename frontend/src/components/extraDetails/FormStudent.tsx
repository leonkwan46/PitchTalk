import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, TextInput, Typography } from '../../compLib'
import { Box, VStack } from '@react-native-material/core'
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { getUserContacts, getLoggedInUser } from '../../redux/selectors'
import dayjs from 'dayjs'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-picker/picker'
import { createStudentAccount } from '../../redux/reducer/sessionSlice'
import { StudentFormSchema } from '../../helpers/validationHelpers'
import { useNavigation } from '@react-navigation/native'
import { AppDispatch } from '@/src/redux/store'

// For testing
const initialValues = { email: 'student@gmail.com', password: '123456', confirmPassword: '123456', name: 'Noel', DoB: '04-04-2024', gender: 'Female', teacher: '', instrument: 'Piano'}
// const initialValues = { email: 'asd.asd@gmail.com', password: '123456', confirmPassword: '123456' }
// const initialValues = { name: '', DoB: '', gender: '' }

const validationSchema = StudentFormSchema

const FormStudent = () => {
    const dispatch: AppDispatch = useDispatch()
    const navigation = useNavigation()

    const { token: parentToken } = getLoggedInUser()
    const { teachers } = getUserContacts()

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

    const onSubmit = async (values, { resetForm }) => {
        dispatch(createStudentAccount({ ...values, parentToken }))
        resetForm()
        navigation.goBack()
    }

    // allow swipe back
    useEffect(() => {
        navigation.setOptions({ gestureEnabled: true, })
    }, [])

    return (
        <View style={styles.container}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <VStack divider={true} spacing={15}>
                        <VStack spacing={15}>
                            <Box>
                                <TextInput 
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    size='md'
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
                                    size='md'
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
                                    hasError={errors.confirmPassword || touched.confirmPassword ? true : false}
                                    size='md'
                                    placeholder='Confirm Password'
                                />
                            </Box>
                        </VStack>

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
                                    onChange={handleChange('gender')}
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
                                            values.gender = itemValue
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
                                    onChange={handleChange('teacher')}
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
                                            values.teacher = itemValue
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
                                    onChange={handleChange('instrument')}
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
                                            values.instrument = itemValue
                                        }}
                                    >   
                                        <Picker.Item label="Select Instrument" value="" />
                                        <Picker.Item label="Piano" value="Piano" />
                                        <Picker.Item label="Violin" value="Violin" />
                                    </Picker>
                                )}
                            </Box>
                            <Box style={styles.buttonContainer}>
                                <Button onPress={handleSubmit} size='xl' color='primary'>
                                    <Typography style={styles.buttonText}>Next</Typography>
                                </Button>
                            </Box>
                        </VStack>
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