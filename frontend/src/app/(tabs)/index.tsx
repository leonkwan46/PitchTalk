import { router } from "expo-router"
import { useEffect } from "react"

const Index = () => {
  useEffect(() => {
    router.replace('/messages')
  }, [])
  return null
}
export default Index