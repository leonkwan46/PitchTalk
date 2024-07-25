import React, { type FC } from 'react'
import { NativeSyntheticEvent, TextInput, TextInputFocusEventData, View } from 'react-native'
import { getTextInputStyle } from '@/src/helpers/styleHelper'
import useFont from '@/src/hooks/useFont'

interface TextInputProps {
    value: string
    placeholder?: string
    keyboardType?: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad'
    size: string
    hasError?: boolean
    outline?: boolean
    secureTextEntry?: boolean
    placeholderTextColor?: string
    extrasStyle?: object
    onChangeText: (text: string) => void
    onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void
    onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void
    disabled?: boolean
}

const CustomTextInput: FC<TextInputProps> = ({
    value,
    size,
    keyboardType,
    placeholder,
    hasError,
    outline,
    secureTextEntry,
    placeholderTextColor = '#aaa',
    extrasStyle,
    onChangeText,
    onBlur,
    onFocus,
    disabled
}) => {
    const { fontLoaded } = useFont('Lemon-Regular')
    const textInputStyle = getTextInputStyle({size, hasError, outline})
    return (
        <View>
            {fontLoaded ? (
                <TextInput
                    value={value}
                    style={extrasStyle ? extrasStyle : textInputStyle}
                    keyboardType={keyboardType}
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry}
                    placeholderTextColor={placeholderTextColor}
                    onChangeText={onChangeText}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    editable={disabled}
                />
            ) : (
                <TextInput
                    value={value}
                    style={extrasStyle ? extrasStyle : null}
                    keyboardType={keyboardType}
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry}
                    placeholderTextColor={placeholderTextColor}
                    onChangeText={onChangeText}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
            )}
        </View>
    )
}

export default CustomTextInput