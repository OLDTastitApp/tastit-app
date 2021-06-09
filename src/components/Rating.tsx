// React
import React from 'react'

// Components
import RatingIcon from '@assets/images/rating.svg'
import { View, StyleSheet } from 'react-native'

// Constants
import { color } from '@constants'


export default (props: Props) => {

    const percent = Math.round(props.value * 2) * 10;

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.placeholder} />
                <View
                    style={[
                        styles.progress,
                        { width: `${percent}%` },
                    ]}
                />
                <RatingIcon
                    width={14 * ratio}
                    height={14}
                />
            </View>
        </View>
    )
}

const ratio = (5 * 65) / 62

// Styles
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        overflow: 'hidden',
    },
    placeholder: {
        backgroundColor: '#ddd',
        position: 'absolute',
        height: '100%',
        width: '100%',
    },
    progress: {
        backgroundColor: color.primary,
        position: 'absolute',
        height: '100%',
    },
})

// Types
export type Props = {
    value: number,
}