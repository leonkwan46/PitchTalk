import { ChatMessageList } from '@/src/components/chat'
import { TopHeading } from '@/src/components/shared'
import LoggedInContainer from '@/src/components/shared/loggedIn/LoggedInContainer'
import { ScrollView } from 'react-native'

const MessagesTab = () => {
  return (
    <LoggedInContainer>
      <ScrollView>
          <TopHeading title='Messages' />
          <ChatMessageList />
      </ScrollView>
    </LoggedInContainer>
  )
}

export default MessagesTab
