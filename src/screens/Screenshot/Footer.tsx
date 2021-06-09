// React
import React, { memo } from 'react'

// Components
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Feather from 'react-native-vector-icons/Feather'
import { View, Text, StyleSheet } from 'react-native'

// Constants
import { ui, font, color } from '@constants'


export default memo((props: Props) => {
    return (
        <View style={styles.container}>

            <View style={styles.button}>
                <Text style={styles.title}>
                    Editer
                </Text>
            </View>

            <View style={styles.button}>
                <Text style={[styles.title, styles.bold]}>
                    Filtres
                </Text>
            </View>
        </View>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        paddingBottom: ui.safePaddingBottom,
        flexDirection: 'row',
        // backgroundColor: 'red',
    },
    button: {
        // backgroundColor: 'red',
        // width: 50,
        paddingVertical: 10,
        flex: 1,
    },
    title: {
        fontFamily: font.regular,
        // color: color.darkGray,
        textAlign: 'center',
        color: color.light,
        fontSize: 18,
    },
    bold: {
        fontFamily: font.bold,
    },
})

// Types
type Props = {
    onBackPress?: () => void,
}