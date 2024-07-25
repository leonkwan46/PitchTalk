import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { Typography } from '../atom'
import { useTypedSelector } from '@/src/hooks/useTypedSelector'

interface MessageProps {
    messageData: {
        item: {
            message: string
            senderId: string
        }
    }
}

const Message: FC<MessageProps> = ({
    messageData
}) => {
    const { message, senderId } = messageData.item
    const user = useTypedSelector(state => state.session.user)
    const isSender = user.userId === senderId
    return (
        <View style={ isSender ? styles.senderContainer : styles.receiverContainer }>
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
})

export default Message
