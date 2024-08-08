const getColor = (color: string) => {
    switch (color) {
        case 'primary':
            return '#D4AF37'
        case 'secondary':
            return 'white'
        case 'error':
            return 'red'
        case 'warning':
            return 'orange'
        case 'success':
            return 'green'
        case 'info':
            return 'black'
        case 'invisible':
            return 'transparent'
        case 'red':
            return '#D44343'
        case 'green':
            return '#39A139'
        default:
            return 'black'
    }
}

const getFontSize = (size: string) => {
    switch (size) {
        case 'xs':
            return 5
        case 'sm':
            return 10
        case 'md':
            return 15
        case 'lg':
            return 20
        case 'xl':
            return 25
        case 'xxl':
            return 35
        case 'title':
            return 45
        case 'subtitle':
            return 25
        default:
            return 15
    }
}

interface getTextInputStyleProps {
    size: string
    hasError?: boolean
    outline?: boolean
}

const getTextInputStyle = ({ size, hasError=false, outline=false}: getTextInputStyleProps) => {
    const sizes = {
        xs: { height: 25, padding: 5, fontSize: 9 },
        sm: { height: 30, padding: 7, fontSize: 10 },
        md: { height: 40, padding: 8, fontSize: 11 },
        lg: { height: 60, padding: 12, fontSize: 12 },
        xl: { height: 70, padding: 15, fontSize: 13 },
        default: { height: 50, padding: 10, fontSize: 12 }
    }

    const defaultSize = {
        backgroundColor: '#fff',
        borderRadius: 10,
        fontFamily: 'Lemon-Regular',
        width: '100%' as '100%',
        ...sizes.default
    }

    const errorStlye = {
        borderColor: '#f00',
        borderWidth: 2,
    }

    const outlineStyle = {
        borderColor: '#000',
        borderWidth: 2,
    }

    const selectedSize = sizes[size as keyof typeof sizes] || sizes.default

    return {
        ...defaultSize,
        ...selectedSize,
        ...(hasError ? errorStlye : {}),
        ...(outline ? outlineStyle : {})
    }
}

interface getButtonStyleProps {
    size: string
    color: string
    fill?: boolean
}

const getButtonStyle = ({ size, color, fill=true }: getButtonStyleProps) => {
    const sizes = {
        xs: { width: '25%', height: 25, paddingVertical: 5, paddingHorizontal: 10 },
        sm: { width: '25%', height: 30, paddingVertical: 7, paddingHorizontal: 12 },
        md: { height: 40, paddingVertical: 8, paddingHorizontal: 15 },
        lg: { height: 50, paddingVertical: 12, paddingHorizontal: 20 },
        xl: { height: 60, paddingVertical: 15, paddingHorizontal: 25 },
        default: { height: 45, paddingVertical: 10, paddingHorizontal: 18 }
    }

    const colors = getColor(color)

    const defaultContainerStyle = {
        backgroundColor: colors,
        borderColor: '',
        borderRadius: 5,
        borderWidth: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%' as '50%'
    }

    if (!fill) {
        defaultContainerStyle.backgroundColor = getColor('invisible')
        defaultContainerStyle.borderColor = colors
        defaultContainerStyle.borderWidth = 2
        defaultContainerStyle.borderRadius = 10
    }

    const selectedSize = sizes[size as keyof typeof sizes] || sizes.default

    return {
        containerStyle: {
            ...defaultContainerStyle,
            ...selectedSize,
        }
    }
}





export { getColor, getFontSize, getTextInputStyle, getButtonStyle }