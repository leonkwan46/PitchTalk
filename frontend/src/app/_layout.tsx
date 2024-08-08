import { Stack } from 'expo-router'
import { Provider } from 'react-redux'
import store from '../redux/store'

const RootLayout = () => {
  return (
    <Provider store={store}>
        <Stack>
          <Stack.Screen name='index' options={{ headerShown: false }} />
          <Stack.Screen name='login' options={{ headerShown: false }} />
          <Stack.Screen name='extraDetailsScreen' options={{ headerShown: false }} />
          <Stack.Screen name='chat' options={{ headerShown: false }} />
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
          <Stack.Screen name='(reviewer)' options={{ headerShown: false }} />
        </Stack>
    </Provider>
  );
}

export default RootLayout
