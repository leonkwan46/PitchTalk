import React from 'react'
import renderer from 'react-test-renderer'
import CustomTextInput from '../TextInput'
import { TextInput } from 'react-native'
import useFont from '@/src/hooks/useFont'

jest.mock('@/src/hooks/useFont', () => ({
    __esModule: true,
    default: jest.fn().mockReturnValue({ fontLoaded: true })
}))
  

jest.mock('@/src/helpers/styleHelper', () => ({
  getTextInputStyle: jest.fn(() => ({ borderWidth: 1 }))
}))

describe('CustomTextInput Component', () => {
  it('renders correctly with required props', () => {
    const tree = renderer
      .create(
        <CustomTextInput
          value="Test Value"
          size="medium"
          onChangeText={() => {}}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders with placeholder and secureTextEntry', () => {
    const tree = renderer
      .create(
        <CustomTextInput
          value=""
          size="medium"
          placeholder="Enter text"
          secureTextEntry
          onChangeText={() => {}}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders with error state and custom styles', () => {
    const extraStyles = { borderColor: 'red', borderWidth: 2 }
    const tree = renderer
      .create(
        <CustomTextInput
          value="Error State"
          size="medium"
          hasError
          extrasStyle={extraStyles}
          onChangeText={() => {}}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders correctly when font is not loaded', () => {
    (useFont as jest.Mock).mockReturnValue({ fontLoaded: false })

    const tree = renderer
      .create(
        <CustomTextInput
          value="No Font"
          size="medium"
          onChangeText={() => {}}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('calls onChangeText when text changes', () => {
    const onChangeTextMock = jest.fn()
    const testRenderer = renderer.create(
      <CustomTextInput
        value=""
        size="medium"
        onChangeText={onChangeTextMock}
      />
    )

    const textInput = testRenderer.root.findByType(TextInput)
    textInput.props.onChangeText('New Text')

    expect(onChangeTextMock).toHaveBeenCalledWith('New Text')
  })

  it('renders with disabled state', () => {
    const tree = renderer
      .create(
        <CustomTextInput
          value="Disabled"
          size="medium"
          onChangeText={() => {}}
          disabled
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
