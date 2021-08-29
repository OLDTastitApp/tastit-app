// React
import React, { memo } from 'react'

// Components
import { View, TouchableOpacity, Image, Text, StyleSheet, Dimensions } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import LinearGradient from 'react-native-linear-gradient'
import Feather from 'react-native-vector-icons/Feather'
import { TouchableScale } from '@components'
import MainIcon from '@assets/images/main.svg'

// Utils
import moment from 'moment'

// Constants
import { color, font, ui } from '@constants'

// Types
import { Post } from '@types'


const { width, height } = Dimensions.get('window')

export default memo((props: Props) => {

    return (
        <View style={styles.container}>

            {/* <View style={{

            }} /> */}

            <MainIcon
                fill={color.primary}
                style={styles.icon}
                height={80}
                width={80}
            />

            <Text style={styles.title}>
                Voir tous les posts en vous connectant
            </Text>

            <Text style={styles.description}>
                Plus de fonctionnalités vous attendent.
            </Text>

            <TouchableScale
                onPress={props.onLogInPress}
                style={styles.button}
            >
                <Text style={styles.auth}>
                    Se connecter
                </Text>
            </TouchableScale>
        </View>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        paddingBottom: ui.safePaddingBottom,
        backgroundColor: '#ffffffee',
        position: 'absolute',
        paddingTop: 10,
        width: '100%',
        bottom: 0,
        borderTopWidth: 4,
        borderColor: color.primary,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    icon: {
        alignSelf: 'center',
        top: 15,
    },
    title: {
        fontFamily: 'Avenir Next',
        color: color.dark,
        fontWeight: '600',
        marginTop: 20,
        fontSize: 16,
    },
    description: {
        fontFamily: 'Avenir Next',
        color: `${color.dark}66`,
        fontWeight: '500',
        marginTop: 5,
        fontSize: 16,
    },
    button: {
        backgroundColor: color.primary,
        marginTop: 20,
        // width: '100%',
        paddingHorizontal: 40,
        paddingVertical: 8,
        borderRadius: 10,
    },
    auth: {
        fontFamily: 'Avenir Next',
        // color: `${color.dark}66`,
        fontWeight: '600',
        color: 'white',
        // marginTop: 5,
        fontSize: 16,
    },
})

// Types
export type Props = {
    onLogInPress: () => void,
}