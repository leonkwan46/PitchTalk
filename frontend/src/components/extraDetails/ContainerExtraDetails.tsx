import { getUserStatus } from '@/src/redux/selectors'
import React, { FC, ReactNode } from 'react'
import { StyleSheet, ImageBackground, ScrollView, SafeAreaView} from 'react-native'
import StatusContainer from '../shared/feedback/StatusContainer'

interface ContainerExtraDetailsProps {
    children: ReactNode
}

const image = require('../../assets/images/piano-dark.jpg')

const ContainerExtraDetails: FC<ContainerExtraDetailsProps> = ({ children }) => {
    const { error } = getUserStatus()

    return (
        <ImageBackground
            source={image}
            style={styles.container}
        >
            <StatusContainer />

            <SafeAreaView style={ styles.backgroundColor }>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    {children}
                </ScrollView>
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

export default ContainerExtraDetails