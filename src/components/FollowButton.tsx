// React
import React, { memo } from 'react'

// Components
import { Text, StyleSheet } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { TouchableScale } from '@components'

// Constants
import { color } from '@constants'


export default memo((props: Props) => {

    const { following } = props;

    const onPress = () => {
        props.onPress(!following);
    };

    return (
        <TouchableScale
            style={[
                styles.container,
                !following && styles.full,
            ]}
            onPress={onPress}
        >
            {following && (
                <Feather
                    color={color.primary}
                    style={styles.check}
                    name='check'
                    size={14}
                />
            )}

            <Text
                style={[
                    styles.title,
                    !following && styles.light,
                ]}
            >
                {following ? `Abonné` : `Suivre`}
            </Text>
        </TouchableScale>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        borderColor: color.primary,
        justifyContent: 'center',
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        borderRadius: 100,
        borderWidth: 1,
    },
    full: {
        backgroundColor: color.primary,
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
    onPress: (following: boolean) => void,
    following: boolean,
}