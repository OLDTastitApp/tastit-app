// React
import { useRef, useCallback } from 'react'

// Components
import { Animated, FlatList } from 'react-native'


type Route = {
    index: number,
}

type Args = {
    scrollableHeaderHeight?: number,
    routes: Route[],
}

export default (args: Args) => {

    const { scrollableHeaderHeight, routes} = args;

    const { current: scrollY } = useRef(new Animated.Value(0));

    const { current: offsets } = useRef(routes.map(() => 0));
    const { current: lists } = useRef<FlatList[]>(routes.map(() => null));

    const onScrollRef = useCallback(
        (ref: FlatList, i: number) => lists[i] = ref,
        [],
    );

    const onScrollEnd = useCallback(
        (y: number, i: number) => {
            // Save offset of the current scroll
            offsets[i] = y;
        
            // Update y position of others ScrollView
            for (const route of routes) {
                if (route.index === i) {
                    continue;
                }
            
                if (y < scrollableHeaderHeight && y >= 0) {
                    lists[route.index]?.scrollToOffset?.({ offset: y, animated: false });
                    offsets[route.index] = y;
                } else if (
                    offsets[route.index] < scrollableHeaderHeight &&
                    y >= scrollableHeaderHeight
                ) {
                    lists[route.index]?.scrollToOffset?.({ offset: y, animated: false });
                    offsets[route.index] = scrollableHeaderHeight;
                }
            }
        },
        [scrollableHeaderHeight]
    );

    return {
        onScrollEnd,
        onScrollRef,
        scrollY,
    };
}