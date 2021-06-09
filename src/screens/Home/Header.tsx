// React
import React, { memo } from 'react'

// Components
import { View, Text, StatusBar, StyleSheet } from 'react-native'

// Constants
import { ui, font, color } from '@constants'


export default memo((props: Props) => {

    return (
        <>
            <StatusBar barStyle='dark-content' />

            <View style={styles.container}>
                <Text style={styles.title}>
                    {props.title}
                </Text>
            </View>
        </>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        paddingTop: ui.safePaddingTop + 10,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    title: {
        fontFamily: font.bold,
        color: color.dark,
        fontSize: 24,
    },
})

// Types
type Props = {
    title: string,
}