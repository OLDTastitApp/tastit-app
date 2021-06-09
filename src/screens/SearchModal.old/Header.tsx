// React
import React, { } from 'react'

// Components
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { BlurView } from '@react-native-community/blur'
import { TouchableScale } from '@components'

// Constants
import { color, font } from '@constants'


export default (props: Props) => {

    const { canApply, canClean } = props;

    return (
        <View style={styles.container}>

            <TouchableOpacity
                onPress={props.onOpenPress}
                style={styles.left}
                activeOpacity={1}
            >
                <Text style={styles.title}>
                    Trouver un lieu
                </Text>
            </TouchableOpacity>

            <TouchableScale
                style={styles.button}
            >
                <Text style={styles.action}>
                    {canApply && 'Appliquer'}
                    {canClean && 'Effacer'}
                </Text>
            </TouchableScale>
        </View>
    )
}

// Styles
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 10,
    },
    left: {
        justifyContent: 'center',
        flex: 1,
    },
    title: {
        fontFamily: font.semiBold,
        // backgroundColor: 'blue',
        marginHorizontal: 10,
        color: color.dark,
        fontSize: 20,
    },
    button: {
        // backgroundColor: 'purple',
        justifyContent: 'center',
        // padding: 10,
        height: 46,
    },
    action: {
        fontFamily: font.regular,
        color: color.primary,
        marginHorizontal: 10,
        // backgroundColor: 'red',
        fontSize: 17,
    },
})

// Types
type Props = {
    onCleanPress: () => void,
    onApplyPress: () => void,
    onOpenPress: () => void,
    canClean: boolean,
    canApply: boolean,
}