// React
import React, { memo } from 'react'

// Components
import { View, StyleSheet, Dimensions } from 'react-native'


export default memo((props: Props) => {

    return (
        <View style={styles.container}>

        </View>
    )
})

// Constants
const { width } = Dimensions.get('window')

// Styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        height: 100,
        width,
    },
})

// Types
type Props = {
    // ...
}