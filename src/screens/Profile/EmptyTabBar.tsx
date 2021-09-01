// React
import React, { memo, useEffect } from 'react'

// Components
import { View, Animated, StyleSheet } from 'react-native'

// Constants
import { SIZE } from './TabBar'


export default memo((props: Props) => {

    const { position, onMount } = props;

    useEffect(() => onMount(position), []);

    return (
        <View style={styles.container} />
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: SIZE,
        // height: 0,
    },
})

// Types
export type Props = {
    onMount: (position: Animated.AnimatedInterpolation) => void,
    position: Animated.AnimatedInterpolation,
}