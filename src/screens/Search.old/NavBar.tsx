// React
import React, { memo } from 'react'

// Components
import { View, Text, StatusBar, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import ArrowLeft from '@assets/images/arrow-left.svg'
import { TouchableScale } from '@components'

// Constants
import { ui, font, color } from '@constants'


export default memo((props: Props) => {

    return (
        <>
            <StatusBar barStyle='dark-content' />

            <View style={styles.container}>

                <TouchableScale
                    onPress={props.onBackPress}
                >
                    <ArrowLeft
                        fill={color.dark}
                        height={20}
                        width={20}
                    />
                </TouchableScale>

                <Text style={styles.title}>
                    Search
                </Text>

                <TouchableScale
                    // onPress={props.onSettingsPress}
                >
                    <Ionicons
                        // color={color.primary}
                        color='transparent'
                        name='options'
                        size={30}
                    />
                </TouchableScale>

            </View>

            <View style={styles.separator} />
        </>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        paddingTop: ui.safePaddingTop + 10,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        // paddingBottom: 10,
    },
    title: {
        // fontFamily: font.semiBold,
        fontFamily: font.regular,
        textAlign: 'center',
        color: color.dark,
        fontSize: 24,
        flex: 1,
    },
    right: {
        width: 30,
    },
    separator: {
        backgroundColor: color.darkGray,
        marginHorizontal: 20,
        marginBottom: 10,
        height: 1,
    },
})

// Types
type Props = {
    onBackPress: () => void,
}