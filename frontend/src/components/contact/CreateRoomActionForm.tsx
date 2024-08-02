import { Box, VStack } from '@react-native-material/core'
import { Formik, FormikHelpers } from 'formik'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { getCurrentCreateRoom, getUserContacts, getUserToken } from '../../redux/selectors'
import { Picker } from '@react-native-picker/picker'
import { StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import { createChatRoom, fetchChildren } from '../../redux/reducer/sessionSlice'
import * as Yup from 'yup'
import { Button, TextInput, Typography } from '../atom'
import { AppDispatch } from '@/src/redux/store'
import { router, useFocusEffect } from 'expo-router'


interface Contact {
    _id: string
    name: string
}

interface CreateRoomSchemaParams {
    teachers?: Contact[]
    students?: Contact[]
    children?: Contact[]
    parents?: Contact[]
    parent?: Contact
}

const CreateRoomSchemaBuilder = (params: CreateRoomSchemaParams) => {
    const { teachers, students, children, parents, parent } = params
    let yupObject: { [key: string]: Yup.StringSchema } = {}
    if (parents || parent) yupObject.parent = Yup.string().required('Required')
    if (teachers) yupObject.teacher = Yup.string().required('Required')
    if (students) yupObject.student = Yup.string().required('Required')
    if (children) yupObject.child = Yup.string().required('Required')
    return Yup.object().shape(yupObject)
}

interface CreateRoomActionFormProps {
    handleClosePopover: () => void
}

interface CreateRoomFormValues {
    parent: string
    teacher: string
    student: string
    child: string
}

interface CreateRoomPayload {
    parent?: string
    teacher?: string
    student?: string
    child?: string
    token: string
}

const CreateRoomActionForm: FC<CreateRoomActionFormProps> = ({ handleClosePopover }) => {
    const dispatch: AppDispatch = useDispatch()
    const token = getUserToken()
    const { teachers, students, children, parents, parent } = getUserContacts()
    const { children: selectedParentsChildren } = getCurrentCreateRoom()
    const CreateRoomSchema = CreateRoomSchemaBuilder({ teachers, students, children, parents, parent })
    
    const [selectedParent, setSelectedParent] = useState<string | undefined>(undefined)
    const [showParentPicker, setShowParentPicker] = useState(false)

    const [selectedTeacher, setSelectedTeacher] = useState<string | undefined>(undefined)
    const [showTeacherPicker, setShowTeacherPicker] = useState(false)

    const [selectedStudent, setSelectedStudent] = useState<string | undefined>(undefined)
    const [showStudentPicker, setShowStudentPicker] = useState(false)

    const [selectedChild, setSelectedChild] = useState<string | undefined>(undefined)
    const [showChildPicker, setShowChildPicker] = useState(false)

    const handleOnFocusParentPicker = () => setShowParentPicker(true)
    const handleOnBlurParentPicker = () => setShowParentPicker(false)

    const handleOnFocusTeacherPicker = () => setShowTeacherPicker(true)
    const handleOnBlurTeacherPicker = () => setShowTeacherPicker(false)

    const handleOnFocusStudentPicker = () => setShowStudentPicker(true)
    const handleOnBlurStudentPicker = () => setShowStudentPicker(false)

    const handleOnFocusChildPicker = () => setShowChildPicker(true)
    const handleOnBlurChildPicker = () => setShowChildPicker(false)


    const fetchChildrenData = async () => {
        try {
            await dispatch(fetchChildren({ token, selectedParentId: selectedParent?.split(',')[1] || '' }))
        } catch (error) {
            console.error('Failed to fetch children:', error);
        }
    }

    console.log(getCurrentCreateRoom().children)

    useFocusEffect(
        useCallback(() => {
            fetchChildrenData()
        }, [selectedParent])
    )

    const handleOnSubmit = async (values: CreateRoomFormValues, { resetForm }: FormikHelpers<CreateRoomFormValues>) => {
        const cleanedValues = { ...values } as CreateRoomPayload
        // No need to filter out undefined values if all are required
        cleanedValues.token = token 
        await dispatch(createChatRoom(cleanedValues as CreateRoomPayload))
        handleClosePopover()
        resetForm()
        router.push('messages')
    }

    return (
        <Formik
            initialValues={{
                parent: '',
                teacher: '',
                student: '',
                child: '',
            }}
            validationSchema={CreateRoomSchema}
            onSubmit={handleOnSubmit}
        >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <VStack spacing={20} >
                {parents && (parents.length > 0 || parent) && (
                    <Box>
                        <TextInput
                            onChangeText={handleChange('parent')}
                            value={values.parent ? values.parent.split(',')[0] : ''}
                            size='lg'
                            hasError={errors.parent && touched.parent ? true : false}
                            placeholder='Parent'
                            onFocus={handleOnFocusParentPicker}
                            onBlur={handleOnBlurParentPicker}
                        />
                        {showParentPicker && (
                            <Picker
                                style={styles.picker}
                                itemStyle={styles.pickerItem}
                                selectedValue={selectedParent}
                                onValueChange={(itemValue, itemIndex) => {
                                    setSelectedParent(itemValue)
                                    values.parent = itemValue
                                }}
                            >
                                <Picker.Item label="Select Parent" value={''} />
                                {parents ? (
                                    parents.map(parent => (
                                        <Picker.Item key={parent._id} label={parent.name} value={`${parent.name},${parent._id}`} />
                                    ))
                                ): (
                                    <Picker.Item key={parent._id} label={parent.name} value={`${parent.name},${parent._id}`} />
                                )}
                            </Picker>
                        )}  
                    </Box>
                )}
                {teachers && (
                    <Box>
                        <TextInput
                            onChangeText={handleChange('teacher')}
                            value={values.teacher ? values.teacher.split(',')[0] : ''}
                            size='lg'
                            hasError={errors.teacher && touched.teacher ? true : false}
                            placeholder='Teacher'
                            onFocus={handleOnFocusTeacherPicker}
                            onBlur={handleOnBlurTeacherPicker}
                        />
                        {showTeacherPicker && (
                            <Picker
                                style={styles.picker}
                                itemStyle={styles.pickerItem}
                                selectedValue={selectedTeacher}
                                onValueChange={(itemValue, itemIndex) => {
                                    setSelectedTeacher(itemValue)
                                    values.teacher = itemValue
                                } }
                            >
                                <Picker.Item label="Select Teacher" value={''} />
                                {teachers.map(teacher => (
                                        <Picker.Item key={teacher._id} label={teacher.name} value={`${teacher.name},${teacher._id}`} />
                                ))}
                            </Picker>
                        )}  
                    </Box>
                )}
                {selectedParentsChildren && (
                    <Box>
                        <TextInput
                            onChangeText={handleChange('student')}
                            value={values.student ? values.student.split(',')[0] : ''}
                            size='lg'
                            hasError={errors.student && touched.student ? true : false}
                            placeholder='Student'
                            onFocus={handleOnFocusStudentPicker}
                            onBlur={handleOnBlurStudentPicker}
                        />
                        {showStudentPicker && (
                            <Picker
                                style={styles.picker}
                                itemStyle={styles.pickerItem}
                                selectedValue={selectedStudent}
                                onValueChange={(itemValue, itemIndex) => {
                                    setSelectedStudent(itemValue)
                                    values.student = itemValue
                                } }
                            >
                                <Picker.Item label="Select Student" value={''} />
                                {selectedParentsChildren.map(student => (
                                    <Picker.Item key={student._id} label={student.name} value={`${student.name},${student._id}`} />
                                ))}
                            </Picker>
                        )}  
                    </Box>
                )}
                {children && (
                    <Box>
                        <TextInput
                            onChangeText={handleChange('child')}
                            value={values.child ? values.child.split(',')[0] : ''}
                            size='lg'
                            hasError={errors.child && touched.child ? true : false}
                            placeholder='Child'
                            onFocus={handleOnFocusChildPicker}
                            onBlur={handleOnBlurChildPicker}
                        />
                        {showChildPicker && (
                            <Picker
                                style={styles.picker}
                                itemStyle={styles.pickerItem}
                                selectedValue={selectedChild}
                                onValueChange={(itemValue, itemIndex) => {
                                    setSelectedChild(itemValue)
                                    values.child = itemValue
                                }}
                                onBlur={handleOnBlurChildPicker}
                            >
                                <Picker.Item label="Select Child" value={''} />
                                {children.map(child => (
                                    <Picker.Item key={child._id} label={child.name} value={`${child.name},${child._id}`} />
                                ))}
                            </Picker>
                        )}  
                    </Box>
                )}
                <Box style={styles.buttonContainer}>
                    <Button onPress={handleSubmit} size='lg' color='primary'>
                        <Typography>Create</Typography>
                    </Button>
                </Box>
            </VStack>
        )}
        </Formik>
    )
}

const styles = StyleSheet.create({
    picker: {
        marginTop: -70,
        marginBottom: -40,
    },
    pickerItem: {
        color: 'white',
    },
    buttonContainer: {
        alignItems: 'flex-end',
    },
})

export default CreateRoomActionForm