import React, { FC } from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { Typography } from '../atom'

const teacherPic = require('../../assets/images/teacher.jpg')
const parentPic = require('../../assets/images/parent.jpg')
const studentPic = require('../../assets/images/defaultFacePic.png')

interface ContactProps {
  contactData: {
    name: string
    role: string
  }
}

const Contact: FC<ContactProps> = (props) => {
  const { name, role } = props.contactData
  const profilePic = role === 'teacher' ? teacherPic : role === 'parent' ? parentPic : studentPic

  return (
      <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? '#333' : '#000',
        },
          styles.pressableContainer,
      ]}>
          <View style={styles.contactContainer}>
            <View style={styles.profilePicContainer}>
              <Image source={profilePic} style={styles.profilePic} />
            </View>
            <View style={styles.profileInfo}>
              <Typography size='lg' color='secondary'>{name}</Typography>
            </View>
          </View>
      </Pressable>
  )
}

const styles = StyleSheet.create({
    pressableContainer: {
        borderRadius: 2,
        padding: 10,
    },
    contactContainer: {
        flexDirection: 'row',
    },
    profilePicContainer: {
        borderRadius: 50,
        overflow: 'hidden',
        width: 70,
        height: 70,
        marginRight: 10,
    },
    profilePic: {
        width: '100%',
        height: '100%',
    },
    profileInfo: {
        display: 'flex',
        flexDirection: 'column',
        padding: 5,
    },
})


export default Contact
