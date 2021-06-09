// React
import React from 'react'

// Components
import { View, Text, StyleSheet } from 'react-native'
// Constants
import { font, color } from '@constants'


export default (props: Props) => {
    const { title } = props;
    return (
        <View style={styles.container}>
            {!!title && (
                <Text style={styles.title}>
                    {title}
                </Text>
            )}
            <View style={styles.separator} />
        </View>
    )
}

// Styles
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        marginBottom: 10,
        marginTop: 20,
    },
    title: {
        fontFamily: font.semiBold,
        color: color.darkGray,
        marginBottom: 10,
        fontSize: 20,
    },
    separator: {
        backgroundColor: `${color.lightGray}55`,
        height: 1,
    },
})

// Types
export type Props = {
    title?: string,
}