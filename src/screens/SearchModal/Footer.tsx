// React
import React, { memo } from 'react'

// Components
import Animated, { useAnimatedStyle, interpolate, Extrapolate } from 'react-native-reanimated'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableScale } from '@components'

// Helpers
import { useWindowDimensions } from 'react-native'

// Constants
import { ui, color } from '@constants'


export default memo((props: Props) => {

    const { animatedIndex, detailsAnimatedPosition } = props;

    const buttonStyle = useAnimatedStyle(
        () => ({
            transform: [
                {
                    translateY: interpolate(
                        animatedIndex.value,
                        [0, 1],
                        [100, 0],
                        Extrapolate.CLAMP
                    ),
                },
            ],
        }),
        []
    );

    const { height } = useWindowDimensions();

    const detailsStyle = useAnimatedStyle(
        () => ({
            // opacity: interpolate(
            //     detailsAnimatedPosition.value,
            //     [0.9 * height, height],
            //     [0, 1],
            // ),
            transform: [
                {
                    translateY: interpolate(
                        detailsAnimatedPosition.value,
                        [0.9 * height, height],
                        [100, 0],
                        Extrapolate.CLAMP,
                    ),
                },
            ],
        }),
        []
    );

    return (
        <Animated.View
            style={[
                styles.container,
                detailsStyle,
            ]}
        >
            <Animated.View
                style={[
                    styles.container,
                    buttonStyle,
                ]}
            >
                <View style={styles.wrapper}>
                    <TouchableScale
                        onPress={props.onPress}
                        style={styles.button}
                    >
                        <Text style={styles.title}>
                            Rechercher
                        </Text>
                    </TouchableScale>
                </View>
            </Animated.View>
        </Animated.View>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        paddingBottom: ui.safePaddingBottom,
        position: 'absolute',
        width: '100%',
        bottom: 0,
        // top: 500,
        // zIndex: 100000,
    },
    wrapper: {
        marginHorizontal: 20,
        borderRadius: 14,
        paddingTop: 10,
    },
    button: {
        backgroundColor: color.primary,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 14,
    },
    title: {
        fontFamily: 'Avenir Next',
        fontWeight: '500',
        color: 'white',
        fontSize: 16,
    },
})

// Types
type Props = {
    detailsAnimatedPosition: Animated.SharedValue<number>,
    animatedIndex: Animated.SharedValue<number>,
    onPress: () => void,
    disabled: boolean,
}