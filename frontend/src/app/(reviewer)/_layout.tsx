import { getColor } from '@/src/helpers/styleHelper'
import { router, Tabs } from 'expo-router'
import { FC, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'

interface NavIconProps {
    name: string
    screen: string
    selectedIcon: string
    onPress: (screen: string) => void
}

const NavIcon: FC<NavIconProps> = ({ name, screen, selectedIcon, onPress }) => {
    const isSelected = screen === selectedIcon
    return (
        <Icon
            name={name}
            size={30}
            type='font-awesome'
            onPress={() => !isSelected && onPress(screen)}
            color={selectedIcon === screen ? 'white' : 'black'}
        />
    )
}

const ReviewerLayout = () => {
    const [selectedIcon, setSelectedIcon] = useState(`(reviewer)`)

    const handleOnPress = (screen: string) => {
        setSelectedIcon(screen)
        router.replace(screen)
    }

    return (
        <Tabs
            screenOptions={{
                tabBarStyle: styles.container,
                tabBarActiveTintColor: 'black'
            }}
        >
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Applications',
                    headerShown: false,
                    tabBarIcon: () => <NavIcon name='file' screen={'(reviewer)'} selectedIcon={selectedIcon} onPress={handleOnPress} />,
                }}
            />

            <Tabs.Screen
                name='settings'
                options={{
                    title: 'Settings',
                    headerShown: false,
                    tabBarIcon: () => <NavIcon name='gear' screen={'(reviewer)/settings'} selectedIcon={selectedIcon} onPress={handleOnPress} />,
                }}
            />
        </Tabs>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        height: '10%',
        backgroundColor: getColor('primary'),
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
})

export default ReviewerLayout
