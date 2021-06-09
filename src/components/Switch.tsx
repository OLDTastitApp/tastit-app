// React
import React, { memo, useRef, useEffect, useCallback } from 'react'

// Components
import { Animated, TouchableOpacity, StyleSheet } from 'react-native'

// Constants
import { color } from '@constants'


export default memo((props: Props) => {

    const index = +props.value;
    
    const { current: position } = useRef(new Animated.Value(index));
    const { current: scaleX } = useRef(new Animated.Value(1));

    useEffect(
        () => {
            Animated.spring(position, {
                useNativeDriver: true,
                toValue: index,
            }).start();
        },
        [index]
    );

    const translateX = position.interpolate({
        outputRange: [2, width / 2 - 2],
        inputRange: [0, 1],
    });

    const onPress = () => {
        const nextValue = !props.value;
        if (props.onChanged) {
            props.onChanged(nextValue);
        }
    };

    const getConfig = (toValue: number) => ({
        useNativeDriver: true,
        // tension: 150,
        // friction: 3,
        toValue,
    });

    const onPressOut = useCallback(
        () => Animated.spring(scaleX, getConfig(1)).start(),
        []
    );

    const onPressIn = useCallback(
        () => Animated.spring(scaleX, getConfig(1.1)).start(),
        []
    );

    return (
        <TouchableOpacity
            disabled={props.disabled}
            onPressOut={onPressOut}
            style={styles.wrapper}
            onPressIn={onPressIn}
            activeOpacity={1}
            onPress={onPress}
        >
            <Animated.View
                style={[
                    styles.container,
                    { opacity: position },
                ]}
            />
            <Animated.View
                style={[
                    styles.indicator,
                    {
                        transform: [
                            { translateX },
                            { scaleX },
                        ],
                    }
                ]}
            />
        </TouchableOpacity>
    )
})

// Constants
const width = 60

// Styles
const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        borderRadius: width,
        overflow: 'hidden',
        height: 30 + 4,
        width,
    },
    indicator: {
        backgroundColor: 'white',
        borderRadius: 30,
        height: 30,
        width: 30,
    },
    container: {
        backgroundColor: color.primary,
        position: 'absolute',
        height: '100%',
        width: '100%',
    },
})

// Types
export type Props = {
    onChanged?: (value: boolean) => void,
    disabled?: boolean,
    value?: boolean,
}