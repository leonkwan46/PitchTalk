import React, { FC } from 'react'
import { Image, StyleSheet, View } from 'react-native'

const teacherPic = require('../../assets/images/teacher.jpg')
const parentPic = require('../../assets/images/parent.jpg')
const defaultPic = require('../../assets/images/defaultFacePic.png')

interface ChatRoomGroupImageProps {
    containerStyle?: any
    topPicStyle?: any
    bottomLeftPicStyle?: any
    bottomRightPicStyle?: any
}

const ChatRoomGroupImage: FC<ChatRoomGroupImageProps> = ({ containerStyle, topPicStyle, bottomLeftPicStyle, bottomRightPicStyle }) => {
    return (
        <View style={containerStyle ? containerStyle : styles.groupPicContainer}>
            {/* Teacher Pic */}
            <View style={ topPicStyle ? topPicStyle : styles.profilePicTop}>
                <Image source={teacherPic} style={ topPicStyle ? topPicStyle : styles.profilePicTop} />
            </View>
            {/* Student Pic */}
            <View style={ bottomLeftPicStyle ? bottomLeftPicStyle : styles.profilePicBottomRight}>
                <Image source={defaultPic} style={ bottomLeftPicStyle ? bottomLeftPicStyle : styles.profilePicBottomRight} />
            </View>
            {/* Parent Pic */}
            <View style={ bottomRightPicStyle ? bottomRightPicStyle : styles.profilePicBottomLeft}>
                <Image source={parentPic} style={ bottomRightPicStyle ? bottomRightPicStyle : styles.profilePicBottomLeft} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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
        width: 50,
        height: 50,
        marginLeft: -23,
        marginTop: 10,
    },
    profilePicBottomRight: {
        borderRadius: 50,
        width: 50,
        height: 50,
        marginLeft: -30,
        marginTop: 15,
    },
})

export default ChatRoomGroupImage