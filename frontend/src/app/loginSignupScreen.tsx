import React, { FC } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { BottomSignInNavigation, ContainerLoginSignup, FormLoginSignUp, SignUpAs } from '../components/loginSignup'
import TopHeading from '../components/shared/TopHeading'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { GoBackIcon } from '../components/shared'

const LoginSignUp: FC = () => {
    const isLogin = useTypedSelector(state => state.registerInfo.isLogin)

    return (
        <ContainerLoginSignup>
            <ScrollView contentContainerStyle={ isLogin ? styles.loginContainer : styles.registerContainer }>
                { !isLogin ? <GoBackIcon buttonStyle={{ alignSelf: 'flex-start' }} iconColor='white' /> : null }
                <TopHeading title={isLogin ? 'Login' : 'Register'} />
                { !isLogin ? <SignUpAs /> : null }
                <FormLoginSignUp />
                { isLogin ? <BottomSignInNavigation /> : null }
            </ScrollView>
        </ContainerLoginSignup>
    )
}

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        margin: 30,
        display: 'flex',
        justifyContent: 'center',
    },
    registerContainer: {
        flex: 1,
        margin: 30,
        display: 'flex',
        marginTop: 70,
    }
  })

export default LoginSignUp
