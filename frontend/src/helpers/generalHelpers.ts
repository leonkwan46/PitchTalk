import { Platform } from "react-native"

const TITLES = {
    HOME: 'Home',
    LOGIN: 'Login',
    REGISTER: 'Register',
    EXTRADETAILS: 'Extra Details',
    CONTACTS: 'Contacts',
    MESSAGES: 'Messages',
} as const

const SCREEN_ROUTES = {
    CONTACT: '(tabs)/contacts',
    MESSAGE: '(tabs)/messages',
    CHAT: '(tabs)/chat',
    SETTING: '(tabs)/settings',
} as const

export const API_URL = Platform.OS === 'android' ? 'http://10.0.2.2:3000/' : 'http://localhost:3000/'

const filterEmptyContacts = <T extends Record<string, unknown>>(contacts: T): Partial<T> => {
    return Object.fromEntries(
        Object.entries(contacts).filter(([key, value]) => value !== undefined && value !== null)
    ) as Partial<T>
}

const combineContacts = (contacts: object) => {
    return Object.values(contacts) // Extract values
        .flatMap(contact => contact) // Flatten array of arrays
        .filter(contact => contact && contact.name) // Filter out contacts without a name
        .sort((a, b) => a.name.localeCompare(b.name)) // Sort by name
}

export { SCREEN_ROUTES, TITLES, combineContacts, filterEmptyContacts }
