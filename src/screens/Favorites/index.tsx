// React
import React, { memo, useState, useMemo, useRef, useCallback, useEffect } from 'react'

// Components
import { View, FlatList, StyleSheet, LayoutAnimation, Alert } from 'react-native'
import AwesomeTabs from '@components/AwesomeTabs'
import FavoriteListView from './FavoriteListView'
import Animated from 'react-native-reanimated'
import PlaceListView from './PlaceListView'
import OptionsModal from './OptionsModal'
import MoreModal from './MoreModal'
import Header from './Header'

// Helpers
import {
    usePlaceLists, useLikePlace, useDislikePlace, useRemovePlace, useDeletePlaceList,
    useLeavePlaceList, useSharePlaceList, useAddPlaceList,
} from '@helpers'
import { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { useNavigation, useRoute } from '@navigation/utils'
import { useWindowDimensions } from 'react-native'

// Utils
import Share from 'react-native-share'

// Types
import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native'
import { Ref as OptionsModalRef } from './OptionsModal'
import { Ref as MoreModalRef } from './MoreModal'
import { Place, PlaceList } from '@types'
import { ApolloError } from '@apollo/client'


export default memo(() => {

    const [index, setIndex] = useState(0);

    const { width } = useWindowDimensions();

    const navigation = useNavigation();
    const { params } = useRoute<'Favorites'>();
    // const backVisible = params?.backVisible;

    const optionsModalRef = useRef<OptionsModalRef>(null);
    const moreModalRef = useRef<MoreModalRef>(null);

    const listRef = useRef<FlatList>(null);
    const tabsRef = useRef<FlatList>(null);

    const [deletePlaceList, deletePlaceListResult] = useDeletePlaceList();
    const [leavePlaceList, leavePlaceListResult] = useLeavePlaceList();
    const [sharePlaceList, sharePlaceListResult] = useSharePlaceList();
    const [addPlaceList, addPlaceListResult] = useAddPlaceList();
    const [dislikePlace, dislikePlaceResult] = useDislikePlace();
    const [removePlace, removePlaceResult] = useRemovePlace();
    const [likePlace, likePlaceResult] = useLikePlace();

    const [placeLists, placeListsResult] = usePlaceLists({ first: 100 });

    const focusedPlaceList = useRef<PlaceList>();
    console.log(`*** placeLists: ${JSON.stringify(placeLists, null, 4)}`);
    // console.log(`*** params: ${JSON.stringify(params, null, 4)}`);

    useEffect(
        () => {
            (async () => {
                // console.log(`*** params?.id: ${params?.id}`);
                if (params?.id) {
                    try {
                        navigation.setParams({ id: undefined });
                        const result = await addPlaceList({ code: params?.id });
                        focusedPlaceList.current = result.data?.addPlaceList?.placeList;
                        // console.log(`*** addPlaceList: ${JSON.stringify(focusedPlaceList.current, null, 4)}`);
                        await placeListsResult.refetch();
                    } catch (e) {
                        if (e instanceof ApolloError) {
                            if (e.message === 'PLACE_LIST_INVITATION_EXPIRED') {
                                Alert.alert('Cette invitation a expirée');
                            } else if (e.message === 'PLACE_LIST_ALREADY_ADDED') {
                                Alert.alert('Cette invitation a déjà été utilisée');
                            }
                        }
                    }
                }
            })();
        },
        [params?.id]
    );

    useEffect(
        () => {
            if (placeLists && params?.id && focusedPlaceList.current) {
                const index = placeLists.edges.findIndex(
                    ({ node }) => node.id === focusedPlaceList.current.id
                );
                // console.log(`*** onChange: ${index}`);
                focusedPlaceList.current = undefined;
                setTimeout(() => onChange(index + 1), 1000);
            }
        },
        [placeLists]
    );

    if (placeListsResult.error) {
        console.log(JSON.stringify(placeListsResult.error))
    }

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
            return [
                params?.userId ? HIS_FAVORITES : MY_FAVORITES,
                ...lists,
            ];
        },
        [placeLists]
    );

    // console.log(`placeLists: ${placeLists?.edges?.length}`)

    const onChange = useCallback(
        (index: number) => {
            tabsRef.current?.scrollToIndex({ viewPosition: 0.5, animated: true, index });
            listRef.current?.scrollToIndex({ viewPosition: 0.5, animated: true, index });
            setIndex(index);
        },
        []
    );

    const onMomentumScrollEnd = useCallback(
        (event: NativeSyntheticEvent<NativeScrollEvent>) => {
            const { contentOffset, layoutMeasurement } = event.nativeEvent;
            const index = Math.max(0, Math.floor(contentOffset.x / layoutMeasurement.width));
            console.log(`onMomentumScrollEnd: ${index}, ${contentOffset.x}`)
            tabsRef.current?.scrollToIndex({ viewPosition: 0.5, animated: true, index });
            setIndex(index);
        },
        []
    );

    const onRemovePlacePress = useCallback(
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

    const onDeletePlaceListPress = useCallback(
        async (placeList: PlaceList) => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            console.log(`removing placeList: ${placeList.id}`);
            // removePlaceList({ id: placeListId });
            await deletePlaceList({ id: placeList.id });
        },
        []
    );

    const onLeavePlaceListPress = useCallback(
        async (placeList: PlaceList) => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            console.log(`leaving placeList: ${placeList.id}`);
            // removePlaceList({ id: placeListId });
            await leavePlaceList({ id: placeList.id });
        },
        []
    );

    const onSharePress = useCallback(
        async (placeList: PlaceList) => {
            try {
                const link = await sharePlaceList({ id: placeList.id });
                const code = link.data?.sharePlaceList?.code;
                Share.open({
                    title: `Tastit`,
                    message: `Clic sur le lien suivant pour visualiser la liste (${placeList.name}) tastit://favorite/${code}`,
                });
            } catch (e) {
                console.log(JSON.stringify(e, null, 4));
            }
        },
        []
    );

    const onMorePress = () => {
        moreModalRef.current?.show(tabs?.[index] as PlaceList);
    };

    // const onMorePress = useCallback(
    //     () => {},
    //     []
    // );

    // const removable = !params?.userId && index > 0;

    return (
        <View style={styles.container}>

            <Header
                moreVisible={!params?.userId && index > 0}
                backVisible={params?.backVisible}
                onBackPress={navigation.goBack}
                onMorePress={onMorePress}
                // moreVisible={index > 0}
                title='Lieux aimés'
            />

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
                        <PlaceListView
                            onOptionsPress={onOptionsPress}
                            removable={!params?.userId}
                            onLikePress={onLikePress}
                            onPress={onPlacePress}
                            id={(item as any).id}
                        />
                    ) : (
                        <FavoriteListView
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
                onRemovePress={onRemovePlacePress}
                ref={optionsModalRef}
            />

            <MoreModal
                onDeletePress={onDeletePlaceListPress}
                onLeavePress={onLeavePlaceListPress}
                onSharePress={onSharePress}
                ref={moreModalRef}
            />

        </View>
    )
})

// Constants
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const HIS_FAVORITES = { id: '0', name: 'Ses likes' }
const MY_FAVORITES = { id: '0', name: 'Mes likes' }

// Styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
})