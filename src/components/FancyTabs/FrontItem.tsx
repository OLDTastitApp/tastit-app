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
            { width: size?.width ?? 0 },
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
        // paddingHorizontal: 20,
        marginHorizontal: 5,
        paddingVertical: 5,
    },
    name: {
        fontFamily: 'Avenir Next',
        textAlign: 'center',
        fontWeight: '500',
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