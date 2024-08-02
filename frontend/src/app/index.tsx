import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated'
import { Button, Typography } from '../components/atom'
import { Icon } from 'react-native-elements'
import { router } from 'expo-router'

const HomePage = () => {
  const [animationFinished, setAnimationFinished] = useState(false)
  const iconScale = useSharedValue(0)
  const textOpacity = useSharedValue(0)
  const buttonOpacity = useSharedValue(0)

  // Function to start text animation
  const startTextAnimation = () => {
    textOpacity.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.exp),
    }, () => {
      // Set animation finished to true to trigger navigation
      // runOnJS(() => setAnimationFinished(true))()


      // Temporary solution
      buttonOpacity.value = withTiming(1, {
        duration: 500,
        easing: Easing.out(Easing.exp),
      })
    })
  }

  // Start animations
  useEffect(() => {
    iconScale.value = withTiming(1, {
      duration: 900,
      easing: Easing.out(Easing.exp),
    }, () => {
      runOnJS(startTextAnimation)()
    })
  }, [])

  // Handle navigation when animation is finished
  useEffect(() => {
    if (animationFinished) {
      router.replace('login')
    }
  }, [animationFinished])

  // Animated styles
  const iconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: iconScale.value }],
    }
  })

  const textStyle = useAnimatedStyle(() => {
    return {
      opacity: textOpacity.value,
    }
  })

  const buttonStyle = useAnimatedStyle(() => {
    return {
      opacity: buttonOpacity.value,
    }
  })

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, iconStyle]}>
        <Icon name='lyrics' type='material' color='#D4AF37' size={100} />
      </Animated.View>

      <Animated.View style={[styles.box, textStyle]}>
        <Typography color='primary' size='title'>PitchTalk</Typography>
        <Typography color='secondary' size='md'>Your Music Education Companion</Typography>
      </Animated.View>

      <Animated.View style={[styles.button, buttonStyle]}>
        <Button onPress={() => router.replace('login')} color='primary'>
          <Typography color='white' size='md'>Get Started</Typography>
        </Button>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  box: {
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    elevation: 10,
  },
  title: {
    fontSize: 36,
    color: '#D4AF37',
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#D4AF37',
    fontSize: 18,
  },
  button: {
    marginTop: 20,
  },
})

export default HomePage
