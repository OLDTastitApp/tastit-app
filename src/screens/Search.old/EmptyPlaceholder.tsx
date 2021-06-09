// React
import React from 'react'

// Components
import { View, Text, StyleSheet } from 'react-native'

// Constants
import { color, font } from '@constants'


export default () => (
    <View style={styles.container}>
        <Text style={styles.title}>
            Tappez quelque chose ...
        </Text>
    </View>
)

// Styles
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 30,
    },
    title: {
        fontFamily: font.semiBold,
        color: color.mediumGray,
        textAlign: 'center',
        fontSize: 16,
    },
})