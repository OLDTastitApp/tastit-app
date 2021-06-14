// React
import React, { memo } from 'react'

// Components
import Animated, { useAnimatedStyle, interpolate, Extrapolate } from 'react-native-reanimated'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableScale } from '@components'

// Constants
import { ui, color } from '@constants'


export default memo((props: Props) => {

    const { animatedIndex } = props;

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

    return (
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
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        paddingBottom: ui.safePaddingBottom,
        backgroundColor: 'white',
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
    animatedIndex: Animated.SharedValue<number>,
    onPress: () => void,
    disabled: boolean,
}