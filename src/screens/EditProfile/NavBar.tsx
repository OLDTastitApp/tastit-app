// React
import React, { memo } from 'react'

// Components
import { View, Text, StatusBar, StyleSheet } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { TouchableScale } from '@components'

// Constants
import { ui, font, color } from '@constants'


export default memo((props: Props) => (
    <>
        <StatusBar barStyle='dark-content' />

        <View style={styles.container}>

            <TouchableScale
                onPress={props.onBackPress}
                disabled={props.disabled}
            >
                <Feather
                    color={color.dark}
                    name='arrow-left'
                    size={30}
                />
            </TouchableScale>

            <Text style={styles.title}>
                {props.title}
            </Text>

            <View style={styles.right} />

        </View>
    </>
))

// Styles
const styles = StyleSheet.create({
    container: {
        paddingTop: ui.safePaddingTop + 10,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 10,
        marginBottom: 20,
    },
    title: {
        fontFamily: font.regular,
        textAlign: 'center',
        color: color.dark,
        fontSize: 24,
        flex: 1,
    },
    right: {
        width: 30,
    },
})

// Types
type Props = {
    onBackPress: () => void,
    disabled?: boolean,
    title: string,
}