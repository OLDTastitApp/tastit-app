// React
import React from 'react'

// Components
import Icon from 'react-native-vector-icons/FontAwesome'
import { View, Text, StyleSheet } from 'react-native'
import TouchableScale from '../TouchableScale'

// Constants
import { font } from '../../constants'


export default ({ onPress, title }: Props) => (
    <TouchableScale
        style={styles.container}
        activeScale={0.98}
        onPress={onPress}
    >
        <View style={styles.wrapper}>
            <Icon
                style={styles.icon}
                color='#1778F2'
                name='facebook'
                size={20}
            />
        </View>

        <Text
            adjustsFontSizeToFit
            style={styles.title}
            numberOfLines={1}
        >
            {title ?? 'Sign in with Facebook'}
        </Text>
    </TouchableScale>
)

// Styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1778F2',
        justifyContent: 'center',
        borderColor: '#1778F2',
        paddingHorizontal: 20,
        alignItems: 'center',
        flexDirection: 'row',
        // alignSelf: 'center',
        marginVertical: 5,
        // borderRadius: 10,
        borderRadius: 100,
        borderWidth: 1,
        minWidth: 300,
    },
    wrapper: {
        justifyContent: 'flex-end',
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 30,
        height: 22,
        width: 22,
    },
    icon: {
        top: 3,
    },
    title: {
        fontFamily: font.semiBold,
        paddingVertical: 10,
        textAlign: 'center',
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