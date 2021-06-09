// React
import React, { memo } from 'react'

// Components
import { View, Text, StyleSheet, Dimensions } from 'react-native'


export default memo((props: Props) => {

    return (
        <View style={styles.container}>
            <Text>
                Gastronomie
            </Text>
        </View>
    )
})

// Constants
const { width } = Dimensions.get('window')

// Styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'green',
        height: 100,
        width,
    },
})

// Types
type Props = {
    // ...
}