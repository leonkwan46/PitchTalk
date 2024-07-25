import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import ChatRoomGroupImage from './ChatRoomGroupImage'
import { GoBackIcon } from '../loginSignup'
import { Typography } from '../atom'

interface ChatRoomTopHeadingProps {
    name: string
}

const ChatRoomTopHeading: FC<ChatRoomTopHeadingProps> = ({ name }) => {
    const longName = name?.length > 17
    return (
        <View style={styles.container}>
            <GoBackIcon buttonStyle={styles.icon} iconColor='white' />
            <View style={styles.chatRoomInfo}>
                <ChatRoomGroupImage
                    containerStyle={styles.groupPicContainer}
                    topPicStyle={styles.profilePicTop}
                    bottomLeftPicStyle={styles.profilePicBottomLeft}
                    bottomRightPicStyle={styles.profilePicBottomRight}
                />
                <View style={styles.titleContainer}>
                    <Typography size={longName ? 'md' : 'lg' } color='primary'>{name}</Typography>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#444',
    },
    icon: {
        padding: 20
    },
    chatRoomInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    groupPicContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        paddingBottom: 20,
    },
    profilePicTop: {
        borderRadius: 50,
        width: 50,
        height: 50,
    },
    profilePicBottomLeft: {
        borderRadius: 50,
        width: 40,
        height: 40,
        marginLeft: -27,
        marginTop: 10,
    },
    profilePicBottomRight: {
        borderRadius: 50,
        width: 30,
        height: 30,
        marginLeft: -20,
        marginTop: 10,
    },

    titleContainer: {
        marginLeft: -10,
    },

})

export default ChatRoomTopHeading
