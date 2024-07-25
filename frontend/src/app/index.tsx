import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native'

const Index = () => {
  const handlePress = () => {
    router.replace('loginSignupScreen')
    // router.replace('(tabs)')
    // router.replace('chat')
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Pressable onPress={handlePress}>
        <Text>Login</Text>
      </Pressable>
    </View>
  );
}

export default Index
