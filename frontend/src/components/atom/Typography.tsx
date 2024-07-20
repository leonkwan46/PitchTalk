import React, { type FC } from 'react'
import { Text, View } from 'react-native'
import { getColor, getFontSize } from '@/src/helpers/styleHelper'
import useFont from '@/src/hooks/useFont'


interface TypographyProps {
    children: string | React.ReactNode
    color?: string
    size?: string
    selected?: boolean
}

const Typography: FC<TypographyProps> = ({ children, color, size, selected }) => {
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
                <Text style={textStyle}>{children}</Text>
            ) : (
                <Text>{children}</Text>
            )}
        </View>
    )
}

export default Typography

