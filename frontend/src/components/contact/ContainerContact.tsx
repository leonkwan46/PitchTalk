import React, { FC } from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import ContactList from './ContactList'
import { getLoggedInUser } from '../../redux/selectors'
import AddBadge from './AddBadge'
import { TopHeading } from '../shared'

const ContainerContact: FC = () => {
    const { role } = getLoggedInUser()

    return (
        <>
            <SafeAreaView>
                <ScrollView>
                    <TopHeading title='Contacts' />
                    <ContactList />
                </ScrollView>
            </SafeAreaView>
            { !(role === 'student') && <AddBadge />}
        </>
    )
}

export default ContainerContact
