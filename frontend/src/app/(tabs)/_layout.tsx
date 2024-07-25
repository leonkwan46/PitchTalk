import { SCREEN_ROUTES } from '@/src/helpers/generalHelpers'
import { getColor } from '@/src/helpers/styleHelper'
import { router, Tabs } from 'expo-router'
import { FC, useEffect, useState } from 'react'
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

const TabLayout = () => {
    const [selectedIcon, setSelectedIcon] = useState(`${SCREEN_ROUTES.MESSAGE}`)

    const handleOnPress = (screen: string) => {
        setSelectedIcon(screen)
        router.replace(screen)
    }

    useEffect(() => {
        router.replace('/messages')
      }, [])

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
                    href: null,
                }}
            />
            <Tabs.Screen
                name='contacts'
                options={{
                    title: 'Contacts',
                    headerShown: false,
                    tabBarIcon: () => <NavIcon name='address-book' screen={SCREEN_ROUTES.CONTACT} selectedIcon={selectedIcon} onPress={handleOnPress} />
                }}
            />
            <Tabs.Screen
                name='messages'
                options={{
                    title: 'Messages',
                    headerShown: false,
                    tabBarIcon: () => <NavIcon name='comments' screen={SCREEN_ROUTES.MESSAGE} selectedIcon={selectedIcon} onPress={handleOnPress} />,
                }}
            />
            <Tabs.Screen
                name='settings'
                options={{
                    title: 'Settings',
                    headerShown: false,
                    tabBarIcon: () => <NavIcon name='gear' screen={SCREEN_ROUTES.SETTING} selectedIcon={selectedIcon} onPress={handleOnPress} />,
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

export default TabLayout
