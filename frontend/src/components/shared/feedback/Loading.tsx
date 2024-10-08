import { FC } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'

interface LoadingProps {
  isLoggedIn?: boolean
}

const Loading: FC<LoadingProps> = ({ isLoggedIn }) => {
    return (
        <View style={isLoggedIn ? styles.LoggedInContainer : styles.container}>
            <ActivityIndicator size='large' color='#fff' />
        </View>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      width: '100%',
      height: '100%',
      zIndex: 1,
    },
    LoggedInContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      width: '100%',
      height: '100%',
      zIndex: 1,
    }
  })

export default Loading