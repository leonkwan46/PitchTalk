import { useFonts } from 'expo-font'

const useFont = (font: string) => {
    const [fontLoaded, fontError] = useFonts({
        [font]: require('../assets/fonts/Lemon-Regular.ttf')
    })
    return { fontLoaded, fontError }
}

export default useFont