import React, { FC, ReactNode } from 'react'
import { ImageBackground, SafeAreaView, StyleSheet } from 'react-native'
import StatusContainer from '../shared/feedback/StatusContainer'

const image = require('../../assets/images/login-signup-bg-img.jpg')

interface ContainerLoginSignupProps {
  children: ReactNode
}

const ContainerLoginSignup: FC<ContainerLoginSignupProps> = ({ children }) => {

  return (
      <ImageBackground
        source={image}
        style={styles.container}
      >
        <StatusContainer />
        <SafeAreaView style={ styles.backgroundColor }>
          {children}
        </SafeAreaView>
      </ImageBackground>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      resizeMode: 'cover',
    },
    backgroundColor: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
    },
})

export default ContainerLoginSignup