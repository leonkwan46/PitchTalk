import * as React from 'react'
import renderer from 'react-test-renderer'
import Button from '../Button'

it('renders correctly with default props', () => {
  const tree = renderer
    .create(<Button onPress={() => {}}>Snapshot test!</Button>)
    .toJSON()
  
  expect(tree).toMatchSnapshot()
})

it('renders correctly with color, size, and fill props', () => {
  const tree = renderer
    .create(
      <Button color="blue" size="large" fill onPress={() => {}}>
        Snapshot test with props!
      </Button>
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})

it('renders correctly with extraStyles', () => {
  const extraStyles = { backgroundColor: 'green', padding: 10 }
  const tree = renderer
    .create(
      <Button onPress={() => {}} extraStyles={extraStyles}>
        Styled Button
      </Button>
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})
