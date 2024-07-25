import React, { FC, ReactNode } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import StatusContainer from '../feedback/StatusContainer'

interface LoggedInContainerProps {
    children: ReactNode
}

const LoggedInContainer: FC<LoggedInContainerProps> = ({ children }) => {
    return (
        <SafeAreaView style={ styles.container }>
            <View style={ styles.innerContainer }>
                {children}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    innerContainer: {
        flex: 1,
        padding: 20,
    },
})

export default LoggedInContainer
