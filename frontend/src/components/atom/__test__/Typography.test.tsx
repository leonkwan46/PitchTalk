import React from 'react'
import renderer from 'react-test-renderer'
import Typography from '../Typography'
import useFont from '@/src/hooks/useFont'
import * as styleHelper from '@/src/helpers/styleHelper' 

// Mock the useFont hook
jest.mock('@/src/hooks/useFont', () => ({
    __esModule: true,
    default: jest.fn()
}))

describe('Typography Component', () => {
    let getColorSpy: jest.SpyInstance
    let getFontSizeSpy: jest.SpyInstance

    beforeEach(() => {
        // Spy on the getColor and getFontSize functions
        getColorSpy = jest.spyOn(styleHelper, 'getColor')
        getFontSizeSpy = jest.spyOn(styleHelper, 'getFontSize');
        
        // Reset mock implementations before each test
        (useFont as jest.Mock).mockReturnValue({ fontLoaded: true })
        getFontSizeSpy.mockReturnValue(15) // Default font size
        getColorSpy.mockReturnValue('black') // Default color
    })

    afterEach(() => {
        jest.resetAllMocks() // Reset all mocks after each test
    })

    it('renders correctly with default props', () => {
        const tree = renderer
            .create(<Typography>Default Text</Typography>)
            .toJSON()

        expect(tree).toMatchSnapshot()
    })

    it('applies custom styles when provided', () => {
        const customStyle = { color: 'green', fontSize: 25 }
        getFontSizeSpy.mockReturnValue(20) // Custom font size
        getColorSpy.mockReturnValue('blue') // Custom color

        const tree = renderer
            .create(
                <Typography extrasStyle={customStyle}>Styled Text</Typography>
            )
            .toJSON()

        expect(tree).toMatchSnapshot()
    })

    it('uses primary color when selected prop is true', () => {
        getColorSpy.mockImplementation((color: string) => {
            if (color === 'primary') return '#D4AF37' // Example primary color
            return 'black' // Default color
        })

        const tree = renderer
            .create(<Typography selected={true}>Primary Color Text</Typography>)
            .toJSON()

        expect(tree).toMatchSnapshot()
    })

    it('renders correctly when font is not loaded', () => {
        (useFont as jest.Mock).mockReturnValue({ fontLoaded: false })

        const tree = renderer
            .create(<Typography>Fallback Text</Typography>)
            .toJSON()

        expect(tree).toMatchSnapshot()
    })

    it('uses default color if no color is provided', () => {
        const tree = renderer
            .create(<Typography>Default Color Text</Typography>)
            .toJSON()

        expect(tree).toMatchSnapshot()
    })

    it('renders correctly with size and color props', () => {
        getFontSizeSpy.mockReturnValue(25) // Custom font size
        getColorSpy.mockReturnValue('red') // Custom color

        const tree = renderer
            .create(
                <Typography size="xl" color="error">Error Color Text</Typography>
            )
            .toJSON()

        expect(tree).toMatchSnapshot()
    })
})
