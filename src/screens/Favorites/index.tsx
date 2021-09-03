// React
import React, { memo, useState, useMemo, useRef, useCallback } from 'react'

// Components
import { View, FlatList, StyleSheet } from 'react-native'
import AwesomeTabs from '@components/AwesomeTabs'
import Animated from 'react-native-reanimated'
import FavoriteList from './FavoriteList'
import OptionsModal from './OptionsModal'
import PlaceList from './PlaceList'
import Header from './Header'

// Helpers
import { usePlaceLists, useLikePlace, useDislikePlace, useRemovePlace } from '@helpers'
import { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { useWindowDimensions } from 'react-native'
import { useNavigation } from '@navigation/utils'

// Types
import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native'
import { Ref as OptionsModalRef } from './OptionsModal'
import { Place } from '@types'


export default memo(() => {

    const [index, setIndex] = useState(0);

    const { width } = useWindowDimensions();

    const navigation = useNavigation();

    const optionsModalRef = useRef<OptionsModalRef>(null);

    const listRef = useRef<FlatList>(null);
    const tabsRef = useRef<FlatList>(null);

    const [placeLists, placeListsResult] = usePlaceLists({ first: 100 });

    const [removePlace, removePlaceResult] = useRemovePlace();

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
        ({ id }: Place) => navigation.navigate('PlaceDetails', { placeId: id }),
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

    // console.log(`placeLists: ${placeLists?.edges?.length}`)

    const onChange = useCallback(
        (index: number) => {
            tabsRef.current?.scrollToIndex({ viewPosition: 0.5, animated: true, index });
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

    const onRemovePress = useCallback(
        (place: Place, placeListId: string) => {
            console.log(`removing: ${place.id} from ${placeListId}`);
            removePlace({ placeId: place.id, placeListId });
        },
        []
    );

    const onOptionsPress = useCallback(
        (place: Place, placeListId: string) => {
            optionsModalRef.current?.show(place, placeListId);
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
                            onOptionsPress={onOptionsPress}
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

            <OptionsModal
                onRemovePress={onRemovePress}
                ref={optionsModalRef}
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