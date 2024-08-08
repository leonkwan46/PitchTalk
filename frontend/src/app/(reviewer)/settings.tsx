import { TopHeading } from '@/src/components/shared'
import LoggedInContainer from '@/src/components/shared/loggedIn/LoggedInContainer'
import { Text, View, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
const SettingsTab = () => {
  return (
    <LoggedInContainer>
      <TopHeading title={'Settings'} />
      <View style={styles.container}>
        <Icon
          name="build" 
          type="material" 
          size={50}
          color="grey"
        />
        <Text style={styles.message}>Working on it</Text>
      </View>
    </LoggedInContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  message: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'grey',
    marginTop: 10 
  }
})

export default SettingsTab
