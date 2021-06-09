// React
import React, { FC, useCallback, useRef, memo, useEffect, useLayoutEffect } from 'react'

// Components
import { Animated, Dimensions, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'


const Transition: FC = memo(props => {

    const { current: progress } = useRef(new Animated.Value(0));
    const navigation = useNavigation();

    const onFocus = useCallback(
        () => {
            Animated.spring(progress, {
                restSpeedThreshold: 100,
                useNativeDriver: true,
                stiffness: 300,
                damping: 100,
                toValue: 1,
                mass: 1,
            }).start();
        },
        []
    );

    const onBlur = useCallback(
        () => {
            Animated.spring(progress, {
                restSpeedThreshold: 100,
                useNativeDriver: true,
                stiffness: 300,
                damping: 100,
                toValue: 0,
                mass: 5,
            }).start();
        },
        []
    );

    useEffect(
        () => {
            navigation.addListener('focus', onFocus);
            navigation.addListener('blur', onBlur);
            return () => {
                navigation.removeListener('focus', onFocus);
                navigation.removeListener('blur', onBlur);
            };
        },
        []
    );

    const scaleContainer = progress.interpolate({
        outputRange: [0, 1],
        inputRange: [0, 1],
    });

    const scaleContent = progress.interpolate({
        outputRange: [3, 1],
        inputRange: [0, 1],
    });

    const translateContainerX = progress.interpolate({
        outputRange: [-h, 0],
        inputRange: [0, 1],
    });

    const translateContainerY = progress.interpolate({
        outputRange: [-h, 0],
        inputRange: [0, 1],
    });

    const s = 0;

    const translateContentX = progress.interpolate({
        outputRange: [-w, 0],
        inputRange: [0, 1],
    });

    const translateContentY = progress.interpolate({
        outputRange: [-h, 0],
        inputRange: [0, 1],
    });

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    transform: [
                        { translateX: translateContainerX },
                        { translateY: translateContainerY },
                        { scale: scaleContainer },
                    ],
                },
            ]}
        >
            <Animated.View
                style={[
                    styles.content,
                    {
                        transform: [
                            { translateX: translateContentX },
                            { translateY: translateContentY },
                            { scale: scaleContent },
                        ],
                    },
                ]}
            >
                {props.children}
            </Animated.View>
        </Animated.View>
    )
})

export default Transition

// Constants
const { width: w, height: h } = Dimensions.get('window')

// Styles
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: 'white',
        left: -(2 * h - w) / 2,
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: h,
        height: 2 * h,
        width: 2 * h,
        top: -h / 2,
    },
    content: {
        height: h,
        width: w,
    },
})