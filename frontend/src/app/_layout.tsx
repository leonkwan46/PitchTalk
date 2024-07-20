import { Stack } from 'expo-router'
import { Provider } from 'react-redux'
import store from '../redux/store'

const RootLayout = () => {
  return (
    <Provider store={store}>
        <Stack>
          <Stack.Screen name='index' options={{ headerShown: false }} />
          <Stack.Screen name='loginSignupScreen' options={{ headerShown: false }} />
          <Stack.Screen name='chatScreen' options={{ headerShown: false }} />
        </Stack>
      </Provider>
  );
}

export default RootLayout
