// React
import React from 'react'

// Components
import RatingIcon from '@assets/images/rating.svg'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

// Constants
import { color } from '@constants'


export default (props: Props) => {

    const { alreadyRated, onRatePress, value = 3, size = 14 } = props;
    const percent = Math.round(value * 2) * 10;

    return (
        <View style={styles.container}>
            <Text style={styles.value}>
                {value.toFixed(1)}
            </Text>

            <View style={[styles.wrapper, { height: size }]}>
                <View style={styles.placeholder} />
                <View
                    style={[
                        styles.progress,
                        { width: `${percent}%` },
                    ]}
                />
                <RatingIcon
                    width={size * ratio}
                    height={size}
                />
            </View>

            <TouchableOpacity
                disabled={alreadyRated}
                onPress={onRatePress}
                style={styles.right}
                activeOpacity={0.9}
            >
                <Text style={styles.rate}>
                    {alreadyRated ? 'Déjà noté !' : 'Laisser une note'}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const ratio = (5 * 65) / 62

// Styles
const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'yellow',
        justifyContent: 'center',
        // alignSelf: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        overflow: 'hidden',
        flex: 1,
    },
    wrapper: {
        overflow: 'hidden',
        // paddingBottom: 10,
    },
    value: {
        fontFamily: 'Avenir Next',
        fontWeight: '600',
        color: '#C0C2C7',
        marginRight: 5,
        fontSize: 16,
        top: 2,
    },
    placeholder: {
        backgroundColor: '#ddd',
        position: 'absolute',
        height: '100%',
        width: '100%',
        marginTop: 1,
    },
    progress: {
        backgroundColor: color.primary,
        position: 'absolute',
        height: '100%',
        marginTop: 1,
    },
    right: {
        flex: 1,
    },
    rate: {
        fontFamily: 'Avenir Next',
        color: color.primary,
        textAlign: 'right',
        fontWeight: '600',
        marginRight: 5,
        fontSize: 14,
        top: 2,
    },
})

// Types
export type Props = {
    onRatePress?: () => void,
    alreadyRated: boolean,
    value?: number,
    size?: number,
}