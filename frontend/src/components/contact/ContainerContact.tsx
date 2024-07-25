import React, { FC } from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import ContactList from './ContactList'
import { getLoggedInUser, getSessionStatus, getUserRole } from '../../redux/selectors'
import AddBadge from './AddBadge'
import { Loading, TopHeading } from '../shared'

const ContainerContact: FC = () => {
    const { role } = getLoggedInUser()

    return (
        <>
            <SafeAreaView>
                <ScrollView>
                    <TopHeading title='Contact' />
                    <ContactList />
                </ScrollView>
            </SafeAreaView>
            { !(role === 'student') && <AddBadge />}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    divider: {
        padding: 10,
        backgroundColor: 'white',
        color: 'white',
    },
})

export default ContainerContact
