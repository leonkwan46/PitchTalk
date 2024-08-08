import { getColor } from '@/src/helpers/styleHelper'
import React, { FC } from 'react'
import { View } from 'react-native'

const Divider: FC = () => <View style={{ height: 1, backgroundColor: getColor('primary'), opacity: 0.5 }} />

export default Divider
