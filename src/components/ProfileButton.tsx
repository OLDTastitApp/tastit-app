// React
import React, { memo } from 'react'

// Components
import Feather from 'react-native-vector-icons/Feather'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableScale } from '@components'

// Constants
import { color } from '@constants'


export default memo((props: Props) => {

    return (
        <View style={styles.container}>

            <TouchableScale
                onPress={props.onSettingsPress}
                style={styles.left}
            >
                <Feather
                    style={styles.settings}
                    color={color.primary}
                    name='settings'
                    size={18}
                />
            </TouchableScale>

            <TouchableScale
                onPress={props.onEditPress}
                style={styles.right}
            >
                <Feather
                    style={styles.check}
                    color='white'
                    name='edit-3'
                    size={14}
                />

                <Text
                    style={[
                        styles.title,
                        styles.light,
                    ]}
                >
                    Editer
                </Text>
            </TouchableScale>
        </View>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    left: {
        borderColor: 'transparent',
        // borderColor: color.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 36,
        marginRight: 10,
        borderWidth: 1,
        height: 36,
        width: 36,
    },
    settings: {
        left: 0.5,
        top: 1,
    },
    right: {
        backgroundColor: color.primary,
        borderColor: color.primary,
        justifyContent: 'center',
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 100,
        borderWidth: 1,
        height: 36,
    },
    outlined: {
        backgroundColor: 'transparent',
    },
    check: {
        marginRight: 5,
    },
    title: {
        fontFamily: 'Avenir Next',
        color: color.primary,
        fontWeight: 'bold',
        fontSize: 14,
    },
    light: {
        color: 'white',
    },
})

// Types
export type Props = {
    onSettingsPress: () => void,
    onEditPress: () => void,
}