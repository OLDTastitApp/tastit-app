// React
import React, { memo } from 'react'

// Components
import { View, Text, StyleSheet } from 'react-native'

// Constants
import { font, color } from '@constants'


export default memo((props: Props) => {

    const { types } = props;

    if (!(types?.length > 0)) return null;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Ambiance
            </Text>
            <View style={styles.footer}>
                {types?.map((value, index) => (
                    <Text
                        style={styles.description}
                        key={index}
                    >
                        {value}
                    </Text>
                ))}
            </View>
            <View style={styles.separator} />
        </View>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginTop: 10,
    },
    title: {
        fontFamily: font.bold,
        marginHorizontal: 10,
        color: color.dark,
        fontSize: 14,
    },
    footer: {
        marginHorizontal: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 5,
    },
    description: {
        fontFamily: font.regular,
        marginHorizontal: 10,
        marginVertical: 5,
        color: color.dark,
        fontSize: 14,
    },
    separator: {
        backgroundColor: '#dadada',
        marginTop: 10,
        height: 1,
    },
})

// Types
type Props = {
    types: string[],
}