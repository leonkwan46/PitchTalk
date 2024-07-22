import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/reducer/sessionSlice'
import { clearAuthStates } from '../redux/reducer/authSlice'
import { ContainerExtraDetails, FormGeneral, FormParent } from '../components/extraDetails'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { router } from 'expo-router'
import { TopHeading } from '../components/shared'
import { AppDispatch } from '../redux/store'
import FormTeacher from '../components/extraDetails/FormTeacher'

const ExtraDetailsScreen = () => {
    const dispatch: AppDispatch = useDispatch()

    const loggedInUser = useTypedSelector(state => state.session.user)
    const { user } = useTypedSelector(state => state.auth)
    const { role, isGeneralFormComplete, isInvited, isInvitationVerified, isDocVerified } = user

    const [isTeacher, setIsTeacher] = useState(false)
    const [isParent, setIsParent] = useState(false)

    // Wait when I start to build Contacts Page
    // const isStudentCreation = props.route?.params?.isStudent && loggedInUser.role === 'parent'
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
                <TopHeading title={'Extra Details'} subtitle={`for ${role}s`} />
                {/* { (isStudentCreation) && <FormStudent /> } */}
                {/* { (!isGeneralFormComplete && !isStudentCreation) && <FormGeneral /> } */}
                { !isGeneralFormComplete && <FormGeneral /> }
                { isTeacher && <FormTeacher /> }
                {/* { ((isParent || shouldSkipGeneralForm) && !isStudentCreation) && <FormParent /> } */}
                { (isParent || shouldSkipGeneralForm) && <FormParent /> }

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