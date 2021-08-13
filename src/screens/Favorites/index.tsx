// React
import React, { memo, useState, useMemo, useRef, useCallback } from 'react'

// Components
import { FlatList, StyleSheet } from 'react-native'
import AwesomeTabs from '@components/AwesomeTabs'
import Animated from 'react-native-reanimated'
import FavoriteList from './FavoriteList'
import PlaceList from './PlaceList'
import Header from './Header'

// Components
import { View } from 'react-native'

// Helpers
import { usePlaceLists, useLikePlace, useDislikePlace, usePlaceListItems } from '@helpers'
import { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { useWindowDimensions } from 'react-native'

// Types
import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native'
import { Place } from '@types'


export default memo(() => {

    const [index, setIndex] = useState(0);

    const { width } = useWindowDimensions();

    const listRef = useRef<FlatList>(null);
    const tabsRef = useRef<FlatList>(null);

    const [placeLists, placeListsResult] = usePlaceLists({ first: 100 });

    const [dislikePlace, dislikePlaceResult] = useDislikePlace();
    const [likePlace, likePlaceResult] = useLikePlace();

    const onLikePress = useCallback(
        async (item: Place) => {
            if (item.liked) {
                await dislikePlace({ placeId: item.id });
            } else {
                await likePlace({ placeId: item.id });
            }
        },
        []
    );

    const onPlacePress = useCallback(
        (item: Place) => {
            // ...
        },
        []
    );

    const scrollX = useSharedValue(0);

    const onScroll = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
        },
    }, []);

    const tabs = useMemo(
        () => {
            const lists = placeLists?.edges?.map(
                ({ node }) => node
            ) ?? [];
            return [MY_FAVORITES, ...lists];
        },
        [placeLists]
    );

    console.log(`placeLists: ${placeLists?.edges?.length}`)

    const onChange = useCallback(
        (index: number) => {
            listRef.current?.scrollToIndex({ viewPosition: 0.5, animated: true, index });
        },
        []
    );

    const onMomentumScrollEnd = useCallback(
        (event: NativeSyntheticEvent<NativeScrollEvent>) => {
            const { contentOffset, layoutMeasurement } = event.nativeEvent;
            const index = Math.max(0, Math.floor(contentOffset.x / layoutMeasurement.width));
            console.log(`onMomentumScrollEnd: ${index}, ${contentOffset.x}`)
            tabsRef.current?.scrollToIndex({ viewPosition: 0.5, animated: true, index });
        },
        []
    );

    return (
        <View style={styles.container}>

            <Header title='Lieux aimés' />

            <AwesomeTabs
                scrollRef={tabsRef}
                onChange={onChange}
                pageWidth={width}
                scrollX={scrollX}
                data={tabs}
            />
            
            <AnimatedFlatList
                renderItem={({ item, index }) => (
                    index !== 0 ? (
                        <PlaceList
                            onLikePress={onLikePress}
                            onPress={onPlacePress}
                            id={(item as any).id}
                        />
                    ) : (
                        <FavoriteList
                            onLikePress={onLikePress}
                            onPress={onPlacePress}
                        />
                    )
                )}
                onMomentumScrollEnd={onMomentumScrollEnd}
                showsHorizontalScrollIndicator={false}
                keyExtractor={({ id }) => id}
                scrollEventThrottle={16}
                decelerationRate='fast'
                onScroll={onScroll}
                pagingEnabled
                ref={listRef}
                data={tabs}
                horizontal
            />

        </View>
    )
})

// Constants
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const MY_FAVORITES = { id: '0', name: 'Mes likes' }

// Styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
})