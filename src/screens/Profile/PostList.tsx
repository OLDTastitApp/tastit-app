// React
import React, { memo, useCallback } from 'react'

// Components
import { View, Text, FlatList, Animated, StyleSheet } from 'react-native'
// import Reanimated from 'react-native-reanimated'
import PictureItem from './PictureItem'

// Helpers
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useMe, useUser, useUserId, usePosts } from '@helpers'
import { useWindowDimensions } from 'react-native'

// Constants
import { SIZE } from './TabBar'

// Types
// import { RefObject } from 'react'
import { Post } from '@types'


// const AnimatedFlatList = Reanimated.createAnimatedComponent(FlatList)

export default memo((props: Props) => {

    const { type, userId, index, scrollY, headerHeight } = props;

    // const [posts, postsResult] = usePosts({
    //     creatorId: userId,
    //     first: 10,
    // });

    const onScroll = Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: {
                y: scrollY,
              },
            },
          },
        ],
        { useNativeDriver: true },
    );

    const onScrollEnd: FlatList['props']['onScrollEndDrag'] = event => {
        const { y } = event.nativeEvent.contentOffset;
        props.onScrollEnd(y, index);
    };

    const onPostPress = useCallback(
        (post: Post) => {},
        []
    );

    const [posts, postsResult] = usePosts({
        creatorId: userId,
        first: 10,
    });

    const { height } = useWindowDimensions();
    const edges = useSafeAreaInsets();
    const top = edges.top + 40;

    const backgroundColor = ({
        'mine': 'red',
        'tagged': 'purple',
        'liked': 'yellow',
    })[props.type];

    const minHeight = height + headerHeight - top - SIZE;

    return (
        <View
            style={[
                styles.container,
                // { height },
                // { minHeight: height - top },
                { backgroundColor },
            ]}
        >
            <Animated.FlatList
                renderItem={({ item, index }) => (
                    // <PictureItem
                    //     onPress={onPostPress}
                    //     item={item.node}
                    //     index={index}
                    // />
                    <View style={styles.item}>
                        <Text style={{ fontSize: 20, color: 'white' }}>
                            ITEM: {index}
                        </Text>
                    </View>
                )}
                keyExtractor={(item, i) => `${item}_${i}`}
                // data={posts?.edges}
                contentContainerStyle={{ paddingTop: headerHeight, minHeight }}
                ref={ref => props.onScrollRef(ref, index)}
                onMomentumScrollEnd={onScrollEnd}
                onScrollEndDrag={onScrollEnd}
                onScrollToTop={onScrollEnd}
                scrollEventThrottle={16}
                onScroll={onScroll}
                numColumns={3}
                data={data}
            />
        </View>
    )
})

const data = [...Array(14).keys()];

// Styles
const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'red',
        // height: 400,
        // width: 100,
        // flex: 1,
        // marginTop: 
    },
    item: {
        backgroundColor: 'purple',
        margin: 20,
        height: 60,
    },
})

// Types
type Props = {
    type: 'mine' | 'tagged' | 'liked',
    userId: string,

    // Parallax
    // onScrollRef: (ref: RefObject<FlatList>, index: number) => void,
    onScrollRef: (ref: Animated.FlatList, index: number) => void,
    onScrollEnd: (y: number, index: number) => void,
    scrollY: Animated.Value,
    headerHeight?: number,
    index: number,
}