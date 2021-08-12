// React
import React, { memo } from 'react'

// Components
import { View, FlatList, Text, StyleSheet } from 'react-native'

// Helpers
import { useWindowDimensions } from 'react-native'

export default memo((props: Props) => {

    const { width } = useWindowDimensions();

    const backgroundColor = `#${Math.random().toString(16).substr(-6)}`;

    return (
        <View style={[styles.container, { backgroundColor, width }]} />
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
})

// Types
type Props = {
    id: string,
}