import React, { FC, useState } from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { Typography } from '../atom'
import { ApplicationData } from './ApplicationList'
import ApplicationPopover from './ApplicationPopover'

const teacherPic = require('../../assets/images/teacher.jpg')

interface ApplicationProps {
    applicationData: ApplicationData
}

const Application: FC<ApplicationProps> = (props) => {
  const { _id, teacher, isPending } = props.applicationData
  const { name } = teacher
  const [isPopoverVisible, setIsPopoverVisible] = useState(false)

  const handleOpenPopover = () => {
    setIsPopoverVisible(true)
  }

  const handleClosePopover = () => {
    setIsPopoverVisible(false)
  }

  return (
      <Pressable
      onPress={() => handleOpenPopover()}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? '#333' : '#000',
        },
          styles.pressableContainer,
      ]}>
        { isPending &&
            <View style={styles.contactContainer}>
                <View style={styles.profilePicContainer}>
                    <Image source={teacherPic} style={styles.profilePic} />
                </View>
                <View style={styles.profileInfo}>
                    <Typography size='xl' color='secondary'>{name}</Typography>
                    <Typography size='md' color='secondary'>waiting for approval</Typography>
                </View>
            </View>
        }

          {isPopoverVisible && (
              <ApplicationPopover
                applicationData={props.applicationData.teacher}
                isPopoverVisible={isPopoverVisible}
                handleClosePopover={handleClosePopover}
              />
          )}

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


export default Application
