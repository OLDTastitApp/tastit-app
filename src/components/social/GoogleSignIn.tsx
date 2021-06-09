// React
import React from 'react'

// Components
import { View, Text, StyleSheet } from 'react-native'
import TouchableScale from '../TouchableScale'
import GoogleIcon from './google.svg'

// Constants
import { font } from '../../constants'


export default ({ onPress, title }: Props) => (
    <TouchableScale
        style={styles.container}
        activeScale={0.98}
        onPress={onPress}
    >
        <View style={styles.wrapper}>
            <GoogleIcon style={styles.icon} />
        </View>

        <Text
            adjustsFontSizeToFit
            style={styles.title}
            numberOfLines={1}
        >
            {title ?? 'Sign in with Google'}
        </Text>
    </TouchableScale>
)

// Styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#4285F4',
        borderColor: '#4285F4',
        flexDirection: 'row',
        // alignSelf: 'center',
        overflow: 'hidden',
        marginVertical: 5,
        // borderRadius: 10,
        borderRadius: 100,
        borderWidth: 1,
        minWidth: 300,
    },
    wrapper: {
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingHorizontal: 14,
    },
    icon: {
        height: 18,
        width: 18,
    },
    title: {
        fontFamily: font.semiBold,
        paddingVertical: 10,
        textAlign: 'right',
        paddingRight: 20,
        color: 'white',
        marginLeft: 10,
        fontSize: 18,
    },
})

// Types
export type Props = {
    onPress: () => void,
    title?: string,
}