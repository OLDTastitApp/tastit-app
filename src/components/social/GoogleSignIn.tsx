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
        {/* <View style={styles.wrapper}> */}
            <GoogleIcon style={styles.icon} />
        {/* </View> */}

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
        // backgroundColor: '#4285F4',
        backgroundColor: 'white',
        borderColor: '#4285F4',
        flexDirection: 'row',
        // alignSelf: 'center',
        // overflow: 'hidden',
        marginVertical: 5,
        // borderRadius: 10,
        borderRadius: 100,
        // borderWidth: 1,
        minWidth: 300,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
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
        // fontFamily: font.semiBold,
        fontFamily: font.semiBold,
        paddingVertical: 10,
        textAlign: 'right',
        // paddingRight: 20,
        // color: '#4285F4',
        color: 'rgb(140,140,140)',
        // color: 'white',
        marginLeft: 10,
        fontSize: 18,
    },
})

// Types
export type Props = {
    onPress: () => void,
    title?: string,
}