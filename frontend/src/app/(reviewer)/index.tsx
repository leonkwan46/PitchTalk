import { ApplicationList } from '@/src/components/application'
import { TopHeading } from '@/src/components/shared'
import LoggedInContainer from '@/src/components/shared/loggedIn/LoggedInContainer'

const SettingsTab = () => {
    
  return (
    <LoggedInContainer>
        <TopHeading title={'Applications'} />
        <ApplicationList />
    </LoggedInContainer>
  )
}


export default SettingsTab
