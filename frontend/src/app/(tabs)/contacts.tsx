import ContainerContact from '@/src/components/contact/ContainerContact'
import LoggedInContainer from '@/src/components/shared/loggedIn/LoggedInContainer'
import { StyleSheet } from 'react-native'

const ContactsTab = () => {
  return (
    <LoggedInContainer>
      <ContainerContact />
    </LoggedInContainer>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default ContactsTab
