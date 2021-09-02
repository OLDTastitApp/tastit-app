// React
import React, { memo } from 'react'

// Components
import { View, Animated, StyleSheet } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { TouchableScale } from '@components'

// Helpers
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useWindowDimensions } from 'react-native'

// Constants
import { color } from '@constants'


export default memo((props: Props) => {

    const { headerHeight, position, scrollY } = props;

    const { width } = useWindowDimensions();
    const edges = useSafeAreaInsets();
    const top = edges.top + 40;

    if (!headerHeight || !position) return null;

    const translateY = scrollY.interpolate({
        inputRange: [0, headerHeight - top],
        outputRange: [headerHeight, top],
        extrapolateRight: 'clamp',
    });

    const translateX = position?.interpolate({
        outputRange: [0, width / 3, 2 * width / 3],
        inputRange: [0, 1, 2],
        extrapolate: 'clamp',
    });

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    transform: [
                        { translateY },
                    ],
                },
            ]}
        >
            <View style={styles.content}>
                {ITEMS.map((item, i) => {

                    const opacity = position?.interpolate({
                        inputRange: [i - 1, i, i + 1],
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: 'clamp',
                    });
                    
                    return (
                        <TouchableScale
                            onPress={() => props.onChange(i)}
                            style={styles.wrapper}
                            key={i}
                        >
                            <Animated.View
                                style={[
                                    styles.icon,
                                    { opacity },
                                ]}
                            >
                                <Feather
                                    color={color.dark}
                                    name={item.icon}
                                    size={24}
                                />
                            </Animated.View>
                        </TouchableScale>
                    )
                })}
            </View>
            
            <Animated.View
                style={[
                    styles.footer,
                    {
                        transform: [
                            { translateX },
                        ],
                    },
                ]}
            >
                <View style={styles.separator} />
            </Animated.View>

        </Animated.View>
    )
})

// Constants
const ICON_SIZE = 24
export const SIZE = ICON_SIZE + 20 + 3

const ITEMS = [
    { icon: 'list' },
    { icon: 'users' },
    { icon: 'heart' },
]

// Styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        position: 'absolute',
        width: '100%',
        top: 0,
    },
    wrapper: {
        justifyContent: 'center',
        paddingHorizontal: 30,
        alignItems: 'center',
        paddingVertical: 10,
    },
    content: {
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    icon: {
        height: 24,
        width: 24,
    },
    footer: {
        width: `${100 / 3}%`,
        alignItems: 'center',
    },
    separator: {
        backgroundColor: color.dark,
        borderRadius: 3,
        height: 3,
        width: 40,
    },
})

// Types
type Props = {
    position?: Animated.AnimatedInterpolation,
    onChange: (index: number) => void,
    scrollY: Animated.Value,
    headerHeight?: number,
}