// React
import React from 'react'

// Components
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Text, StyleSheet } from 'react-native'
import TouchableScale from '../TouchableScale'

// Constants
import { font } from '../../constants'


export default ({ onPress, title }: Props) => (
    <TouchableScale
        style={styles.container}
        activeScale={0.98}
        onPress={onPress}
        key='apple'
    >
        <Icon name='apple' color='white' size={20} />
        <Text
            adjustsFontSizeToFit
            style={styles.title}
            numberOfLines={1}
        >
            {title ?? 'Sign in with Apple'}
        </Text>
    </TouchableScale>
)

// Styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#171717',
        justifyContent: 'center',
        borderColor: '#171717',
        paddingHorizontal: 20,
        alignItems: 'center',
        flexDirection: 'row',
        // alignSelf: 'center',
        marginVertical: 5,
        // borderRadius: 10,
        borderRadius: 100,
        borderWidth: 1,
        minWidth: 300,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
    },
    title: {
        fontFamily: font.semiBold,
        textAlign: 'center',
        marginLeft: 10,
        color: 'white',
        fontSize: 18,
    },
})

// Types
export type Props = {
    onPress: () => void,
    title?: string,
}