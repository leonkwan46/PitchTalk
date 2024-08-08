import React, { FC, useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Typography } from '../atom'
import { Image } from 'react-native-elements'
import { getLoggedInUser } from '@/src/redux/selectors'

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
    const { userId } = getLoggedInUser()
    const isSender = userId === senderId

    return (
        <View style={ isSender ? styles.senderContainer : styles.receiverContainer }>
            {!isSender && (
                <Image source={senderRole === 'teacher' ? teacherPic : senderRole === 'parent' ? parentPic : defaultPic} style={styles.profilePic} />
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
