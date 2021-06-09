// React
import React, { memo } from 'react'

// Components
import { View, Text, StyleSheet } from 'react-native'

// Constants
import { font, color } from '@constants'


export default memo((props: Props) => {
    return (
        <View style={styles.container}>
            <Text
                style={styles.title}
                adjustsFontSizeToFit
                numberOfLines={1}
            >
                {props.title}
            </Text>
        </View>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    title: {
        fontFamily: font.semiBold,
        color: color.darkGray,
        textAlign: 'center',
        fontSize: 16,
    },
})

// Types
type Props = {
    title: string,
}