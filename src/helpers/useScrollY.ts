// React
import { useRef, useMemo } from 'react'

// Components
import { Animated } from 'react-native'


export default () => {

    const { current: scrollY } = useRef(new Animated.Value(0));

    const onScroll = useMemo(
        () => (
            Animated.event(
                [{
                    nativeEvent: {
                        contentOffset: {
                            y: scrollY,
                        },
                    },
                }],
                { useNativeDriver: true }
            )
        ),
        [scrollY]
    );

    return { onScroll, scrollY };
}