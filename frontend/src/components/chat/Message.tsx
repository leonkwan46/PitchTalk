import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import { Typography } from '../atom'
import { useTypedSelector } from '@/src/hooks/useTypedSelector'
import { Image } from 'react-native-elements'

const teacherPic = require('../../assets/images/teacher.jpg')
const parentPic = require('../../assets/images/parent.jpg')
const defaultPic = require('../../assets/images/defaultFacePic.png')

interface MessageProps {
    messageData: {
        item: {
            message: string
            senderId: string
            senderRole: string
        }
    }
}

const Message: FC<MessageProps> = ({
    messageData
}) => {
    const { message, senderId, senderRole } = messageData.item
    const { userId } = useTypedSelector(state => state.session.user)

    const isSender = userId === senderId

    const getProfilePic = (role: string) => {
        switch (role) {
            case 'teacher':
                return teacherPic
            case 'parent':
                return parentPic
            case 'student':
                return defaultPic
            default:
                return defaultPic
        }
    }

    const profilePic = getProfilePic(senderRole)

    return (
        <View style={ isSender ? styles.senderContainer : styles.receiverContainer }>
            {!isSender && profilePic && (
                <Image source={profilePic} style={styles.profilePic} />
            )}
            <Typography extrasStyle={isSender ? styles.senderText : styles.receiverText} color='primary' size='lg'>{ message }</Typography>
        </View>
    )
}

const styles = StyleSheet.create({
    senderContainer: {
        backgroundColor: '#D4AF37',
        alignSelf: 'flex-end',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    senderText: {
        color: 'black',
        fontSize: 16,
    },
    receiverContainer: {
        backgroundColor: 'grey',
        alignSelf: 'flex-start',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    receiverText: {
        color: 'white',
        fontSize: 16,
    },
    profilePic: {
        width: 30, 
        height: 30,
        borderRadius: 15, 
        marginRight: 10, 
    },
})

export default Message
