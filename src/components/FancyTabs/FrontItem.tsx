// React
import React, { memo } from 'react'

// Components
import { View, Text, StyleSheet } from 'react-native'

// Constants
import { color, font } from '@constants'


const FrontItem = ({ item, color, size }: Props) => (
    <View
        style={[
            styles.container,
            { backgroundColor: color },
        ]}
        pointerEvents='none'
    >
        <Text style={[
            styles.name,
            { width: size.width },
        ]}>
            {item.name}
        </Text>
    </View>
);

export default memo(FrontItem);

// Props
(FrontItem as any).defaultProps = {
    color: color.dark,
}

// Styles
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 5,
    },
    name: {
        fontFamily: font.regular,
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
    },
})

// Types
type Props = {
    color?: string,
    item: {
        name: string,
    },
    size?: {
        height: number,
        width: number,
    },
}