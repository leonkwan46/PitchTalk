import { getColor, getFontSize } from '@/src/helpers/styleHelper'
import useFont from '@/src/hooks/useFont'
import React, { type FC } from 'react'
import { Text, View } from 'react-native'


interface TypographyProps {
    id?: string
    children: string | React.ReactNode
    color?: string
    size?: string
    extrasStyle?: object
    selected?: boolean
}

const Typography: FC<TypographyProps> = ({ id='', children, extrasStyle, color='', size='', selected }) => {
    const { fontLoaded } = useFont('Lemon-Regular')

    let selectedSize = getFontSize(size)
    let selectedColour = getColor(color)
    if (selected) selectedColour = getColor('primary')

    const textStyle = {
        fontFamily: 'Lemon-Regular',
        color: selectedColour,
        fontSize: selectedSize
    }
    
    return (
        <View>
            {fontLoaded ? (
                <Text id={id} style={extrasStyle ? extrasStyle : textStyle}>{children}</Text>
            ) : (
                <Text id={id} style={extrasStyle ? extrasStyle : null}>{children}</Text>
            )}
        </View>
    )
}

export default Typography

