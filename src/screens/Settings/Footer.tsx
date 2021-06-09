// React
import React, { memo } from 'react'

// Components
import { View, Text, StyleSheet } from 'react-native'
import { TouchableScale } from '@components'

// Constants
import { ui, font, color } from '@constants'


export default memo((props: Props) => {

    return (
        <View style={styles.container}>
            <TouchableScale
                onPress={props.onLogOutPress}
                style={styles.button}
            >
                <Text style={styles.title}>
                    Disconnect
                </Text>
            </TouchableScale>
        </View>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        marginBottom: ui.safePaddingBottom,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
    },
    button: {
        marginHorizontal: 20,
        paddingVertical: 10,
        marginTop: 20,
    },
    title: {
        fontFamily: font.regular,
        // color: color.primary,
        color: 'red',
        fontSize: 14,
    },
})

// Types
type Props = {
    onLogOutPress: () => void,
}