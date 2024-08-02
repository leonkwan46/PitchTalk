import ContainerContact from '@/src/components/contact/ContainerContact'
import LoggedInContainer from '@/src/components/shared/loggedIn/LoggedInContainer'

const ContactsTab = () => {
  return (
    <LoggedInContainer>
      <ContainerContact />
    </LoggedInContainer>
  )
}

export default ContactsTab
