// React
import React from 'react'

// Components
import { View, Text, StyleSheet } from 'react-native'

// Constants
import { font, color } from '@constants'


export default (props: Props) => (
    <View style={styles.container}>
        <Text style={styles.title}>
            {props.title}
        </Text>
        <View style={styles.separator} />
    </View>
)

// Styles
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    title: {
        fontFamily: font.semiBold,
        color: color.dark,
        fontSize: 22,
    },
    separator: {
        backgroundColor: `${color.lightGray}55`,
        marginBottom: 10,
        marginTop: 5,
        height: 1,
    },
})

// Types
type Props = {
    title: string,
}