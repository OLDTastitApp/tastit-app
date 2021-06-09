// React
import React, { memo, useEffect, useRef, useState } from 'react'

// Components
import { Text, Animated, StyleSheet } from 'react-native'
import { TouchableScale } from '@components'

// Constants
import { ui, font, color, style } from '@constants'


export default memo((props: Props) => {

    // ...
    const { location } = props;

    const { current: progress } = useRef(new Animated.Value(0));
    const [visible, setVisible] = useState(false);

    const animate = (toValue: number) => {
        if (location) {
            setVisible(true);
        }
        Animated.spring(progress, {
            delay: toValue ? 3000 : 0,
            useNativeDriver: true,
            toValue,
        }).start(() => {
            if (!location) {
                setVisible(false);
            }
        })
    };

    useEffect(
        () => animate(+!!location),
        [location]
    );

    const onPress = () => {
        animate(0);
        props.onPress(location);
    };

    return visible && (
        <AnimatedTouchableScale
            style={[
                { opacity: progress },
                styles.container,
                style.shadow,
            ]}
            activeScale={0.98}
            onPress={onPress}
        >
            <Text style={styles.title}>
                Rechercher dans cette zone
            </Text>
        </AnimatedTouchableScale>
    )
})

// Components
const AnimatedTouchableScale = Animated
    .createAnimatedComponent(TouchableScale)

// Styles
const styles = StyleSheet.create({
    container: {
        top: ui.safePaddingTop + 60,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        position: 'absolute',
        alignSelf: 'center',
        paddingVertical: 5,
        borderRadius: 60,
    },
    title: {
        fontFamily: font.semiBold,
        color: color.dark,
        fontSize: 14,
    },
})

// Types
type Props = {
    onPress: (location: number[]) => void,
    location?: number[],
}