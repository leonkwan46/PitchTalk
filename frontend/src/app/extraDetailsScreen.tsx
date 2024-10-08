import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/reducer/sessionSlice'
import { clearAuthStates } from '../redux/reducer/authSlice'
import { ContainerExtraDetails, FormGeneral, FormParent, FormStudent } from '../components/extraDetails'
import { router } from 'expo-router'
import { TopHeading } from '../components/shared'
import { AppDispatch } from '../redux/store'
import FormTeacher from '../components/extraDetails/FormTeacher'
import { getAuthUser, getLoggedInUser, getRegisteringNewUserState } from '../redux/selectors'
import ApplicationStatus from '../components/application/ApplicationStatus'

const ExtraDetailsScreen = () => {
    const dispatch: AppDispatch = useDispatch()

    const loggedInUser = getLoggedInUser()
    const user = getAuthUser()
    const isStudent = getRegisteringNewUserState().isStudent
    const { role, isGeneralFormComplete, isInvited, isInvitationVerified, isDocUploaded, isDocVerified, isDocRejected } = user
    
    const [isTeacher, setIsTeacher] = useState(false)
    const [isParent, setIsParent] = useState(false)
    
    const isStudentCreation = isStudent && loggedInUser.role === 'parent'
    const shouldSkipGeneralForm = isParent && isGeneralFormComplete && isInvited
    const isFullFormComplete = isGeneralFormComplete && (isTeacher && isDocVerified || isParent && isInvitationVerified)

    useEffect(() => {
        if (role === 'teacher' && isGeneralFormComplete) setIsTeacher(true)
        if (role === 'parent' && isGeneralFormComplete) setIsParent(true)
    }, [isGeneralFormComplete])

    useEffect(() => {
        if (isFullFormComplete) {
            dispatch(setUser({ user }))
            dispatch(clearAuthStates())
            router.replace('(tabs)')
        }
    }, [isFullFormComplete])

    return (
        <ContainerExtraDetails>
            <View style={ styles.container }>
                <TopHeading title={isStudentCreation ? 'Create Account' : 'Extra Details'} subtitle={isStudentCreation ? 'for student' : `for ${role}s`} />
                { (isStudentCreation) && <FormStudent /> }
                { (!isGeneralFormComplete && !isStudentCreation) && <FormGeneral /> }
                { (isTeacher && !isDocUploaded) && <FormTeacher /> }
                { ((isParent || shouldSkipGeneralForm) && !isStudentCreation) && <FormParent /> }
                { (isTeacher && !isDocVerified) && <ApplicationStatus isDocRejected={isDocRejected} /> }
            </View>
        </ContainerExtraDetails>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 30,
    },
})

export default ExtraDetailsScreen