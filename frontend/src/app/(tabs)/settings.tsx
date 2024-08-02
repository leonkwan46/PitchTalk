import { TopHeading } from '@/src/components/shared'
import LoggedInContainer from '@/src/components/shared/loggedIn/LoggedInContainer'
import { View, Text, StyleSheet } from 'react-native'

const SettingsTab = () => {
    
  return (
    <LoggedInContainer>
        <TopHeading title={'Settings'} />
    </LoggedInContainer>
  )
}


export default SettingsTab
