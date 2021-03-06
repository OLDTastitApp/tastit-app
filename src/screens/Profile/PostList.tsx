// React
import React, { memo, useRef, useMemo, useCallback } from 'react'

// Components
import { View, Text, FlatList, Animated, StyleSheet } from 'react-native'
// import Reanimated from 'react-native-reanimated'
import PictureViewer from './PictureViewer'
import PictureItem from './PictureItem'

// Helpers
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useMe, useUser, useUserId, usePosts } from '@helpers'
import { useWindowDimensions } from 'react-native'

// Constants
import { SIZE } from './TabBar'

// Types
// import { RefObject } from 'react'
import { Ref as PictureViewerRef } from './PictureViewer'
import { Post } from '@types'


// const AnimatedFlatList = Reanimated.createAnimatedComponent(FlatList)

export default memo((props: Props) => {

    const { type, userId, index, scrollY, headerHeight } = props;

    const pictureViewerRef = useRef<PictureViewerRef>(null);

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
        (post: Post) => {
            pictureViewerRef.current.show(post)
        },
        []
    );

    const [posts, postsResult] = usePosts({
        // creatorId: userId,
        first: 10,
        userId,
        type,
    });

    const pictures = useMemo(
        () => posts?.edges?.map(({ node }) => node),
        [posts]
    );

    const { height, width } = useWindowDimensions();
    const edges = useSafeAreaInsets();
    const top = edges.top + 40;

    // const backgroundColor = ({
    //     'mine': 'red',
    //     'tagged': 'purple',
    //     'liked': 'yellow',
    // })[props.type];

    const minHeight = height + headerHeight - top - SIZE;

    return (
        <View
            style={[
                styles.container,
                // { height },
                // { minHeight: height - top },
                // { backgroundColor },
                { width },
            ]}
        >
            <Animated.FlatList
                renderItem={({ item, index }) => (
                    <PictureItem
                        onPress={onPostPress}
                        item={item.node}
                        index={index}
                    />
                    // <View style={styles.item}>
                    //     <Text style={{ fontSize: 20, color: 'white' }}>
                    //         ITEM: {index}
                    //     </Text>
                    // </View>
                )}
                contentContainerStyle={{ paddingTop: headerHeight + 20, minHeight }}
                keyExtractor={(item, i) => `${item}_${i}`}
                ref={ref => props.onScrollRef(ref, index)}
                showsVerticalScrollIndicator={false}
                onMomentumScrollEnd={onScrollEnd}
                onScrollEndDrag={onScrollEnd}
                onScrollToTop={onScrollEnd}
                scrollEventThrottle={16}
                onScroll={onScroll}
                data={posts?.edges}
                numColumns={3}
                // data={data}
            />

            <PictureViewer
                ref={pictureViewerRef}
                data={pictures ?? []}
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
    type: 'MINE' | 'TAGGED' | 'LIKED',
    userId: string,

    // Parallax
    // onScrollRef: (ref: RefObject<FlatList>, index: number) => void,
    onScrollRef: (ref: Animated.FlatList, index: number) => void,
    onScrollEnd: (y: number, index: number) => void,
    scrollY: Animated.Value,
    headerHeight?: number,
    index: number,
}