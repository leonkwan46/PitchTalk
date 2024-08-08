import { combineContacts } from '@/src/helpers/generalHelpers'
import { getContacts } from '@/src/redux/reducer/sessionSlice'
import { getSessionStatus, getUserToken } from '@/src/redux/selectors'
import { AppDispatch } from '@/src/redux/store'
import { Box, VStack } from '@react-native-material/core'
import { useFocusEffect } from '@react-navigation/native'
import React, { FC, useCallback, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { Loading, Divider } from '../shared'
import Contact from './Contact'

interface ContactData {
    _id: string
    name: string
    role: string
  }

const ContactList: FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const token = getUserToken()
    const isLoading = getSessionStatus().isLoading
    const [allContacts, setAllContacts] = useState<ContactData[]>([])

    const fetchContacts = async () => {
        const response = await dispatch(getContacts({ token }))
        const combineAllContacts = combineContacts(response.payload)
        setAllContacts(combineAllContacts)
    }

    useFocusEffect(
        useCallback(() => {
            fetchContacts()
        }, [])
    )

    return (
        <>
        { isLoading ? <Loading isLoggedIn /> : (
            <>
            {allContacts.length > 0 && (
                <View style={styles.container}>
                    <VStack spacing={10}>
                        {allContacts.map((contact) => (
                            <Box key={contact._id}>
                                <Contact contactData={contact} />
                                <Divider />
                            </Box>
                        ))}
                    </VStack>
                </View>
            )}
            </>
        )}
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

export default ContactList
