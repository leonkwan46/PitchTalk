import React, { FC } from 'react'
import { View, StyleSheet, Pressable, Text } from 'react-native'
import { getColor } from '../../helpers/styleHelper'
import { TextInput, Typography } from '../atom'

interface MessageInputProps {
    message: string
    setMessage: (message: string) => void
    handleSendMessage: () => void
}

const MessageInput: FC<MessageInputProps> = ({
    message,
    setMessage,
    handleSendMessage
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.textInputContainer} >
                <TextInput
                    extrasStyle={styles.textInput}
                    placeholder='Type your message'
                    value={message}
                    onChangeText={setMessage}
                    size='md'
                    outline
                />
            </View>
            <View>
                <Pressable onPress={handleSendMessage} style={styles.sendButton}>
                    <Typography size='md' color='black'>Send</Typography>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#444',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    textInputContainer: {
        width: '80%',
        display: 'flex',
        justifyContent: 'center',
        padding: 10,
    },
    textInput: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
    },
    sendButton: {
        backgroundColor: getColor('primary'),
        padding: 15,
        borderRadius: 10,
    }
})

export default MessageInput