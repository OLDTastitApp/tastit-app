// React
import React, { memo, useCallback, useState, useRef, useMemo } from 'react'

// Components
import { View, FlatList, Animated, Dimensions, LayoutAnimation } from 'react-native'
import { TabView } from 'react-native-tab-view'
import Reanimated from 'react-native-reanimated'
import PictureItem from './PictureItem'
import EmptyTabBar from './EmptyTabBar'
import Biography from './Biography'
import PostList from './PostList'
import Header from './Header'
import TabBar from './TabBar'

// Helpers
import { useMe, useUser, useUserId, useFollow, useUnfollow, useScrollY } from '@helpers'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@navigation/utils'
import { useWindowDimensions } from 'react-native'

// Constants
import { ui, font, color, style } from '@constants'

// Types
import { RefObject } from 'react'


export default memo(() => {

    const navigation = useNavigation();
    const { params } = useRoute<'Profile'>();

    const { width, height } = useWindowDimensions();
    const edges = useSafeAreaInsets();
    const contentHeight = height - edges.top + 40;

    const [position, setPosition] = useState<Animated.AnimatedInterpolation>();
    const [headerHeight, setHeaderHeight] = useState<number>();

    const [index, setIndex] = React.useState(0);

    const meId = useUserId();
    const userId = params?.userId ?? meId;
    const myself = userId === meId;

    const [user, userResult] = useUser({ id: userId, skip: myself });
    const [me, meResult] = useMe({ skip: !myself });

    const [unfollow, unfollowResult] = useUnfollow();
    const [follow, followResult] = useFollow();

    // @PARALLAX
    // const edges = useSafeAreaInsets();
    const top = edges.top + 40;

    const { onScroll, scrollY } = useScrollY();

    const { current: offsets } = useRef(routes.map(() => 0));
    const { current: lists } = useRef<FlatList[]>(
        routes.map<any>(() => null),
    );

    const onScrollRef = useCallback(
        (ref: FlatList, i: number) => {
            console.log(`Setting ref for index: ${i}`);
            (lists[i] = ref);
        },
        [],
    );

    const scrollableHeaderHeight = headerHeight - top;

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
                    // scrollTo(lists[route.index], y);
                    lists[route.index]?.scrollToOffset?.({ offset: y, animated: false });
                    offsets[route.index] = y;
                } else if (
                    offsets[route.index] < scrollableHeaderHeight &&
                    y >= scrollableHeaderHeight
                ) {
                    // scrollTo(lists[route.index], scrollableHeaderHeight);
                    lists[route.index]?.scrollToOffset?.({ offset: y, animated: false });
                    offsets[route.index] = scrollableHeaderHeight;
                }
            }
        },
        [scrollableHeaderHeight]
    );
    // @END

    const onSharePress = useCallback(
        () => {},
        []
    );

    const onSettingsPress = useCallback(
        () => navigation.navigate('Settings'),
        []
    );

    const onEditPress = useCallback(
        () => navigation.navigate('EditProfile'),
        []
    );

    const onFollowPress = useCallback(
        (following: boolean) => {
            if (following) {
                follow({ userId });
            } else {
                unfollow({ userId });
            }
        },
        []
    );

    const onHeightChanged = useCallback(
        (value: number) => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setHeaderHeight(value);
        },
        []
    );

    if (userResult.error || meResult.error) {
        console.log(userResult.error || meResult.error);
        return null;
    }
    
    const data = myself ? me : user;
    
    // console.log(JSON.stringify(userResult.error, null, 4));

    return (
        <View style={{ flex: 1, backgroundColor: 'purple' }}>

            {/* <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={onScroll}
            > */}

            {/* {!!0 && null} */}
            {/* {!!headerHeight && (

            )} */}

            {!!headerHeight && (

                <TabView
                    // initialLayout={{ width, height: contentHeight }}
                    initialLayout={{ width, height }}
                    navigationState={{ index, routes }}
                    style={{ width, height }}
                    // style={{ height: contentHeight, backgroundColor: 'blue' }}
                    renderTabBar={({ position }) => (
                        <EmptyTabBar
                            // onLayout={onEmptyTabBarLayout}
                            onMount={setPosition}
                            position={position}
                        />
                    )}
                    // renderTabBar={() => null}
                    // position={null}
                    // renderScene={renderScene}
                    onIndexChange={setIndex}
                    renderScene={({ route, position, jumpTo }) => (
                        <PostList
                            headerHeight={headerHeight}
                            onScrollRef={onScrollRef}
                            onScrollEnd={onScrollEnd}
                            type={route.key as any}
                            scrollY={scrollY}
                            // jumpTo={jumpTo}
                            index={route.index}
                            userId={userId}
                        />
                    )}
                    // lazyPreloadDistance={10}
                    lazy={true}
                    // lazy={false}
                />
            )}

            <Biography
                onHeightChanged={onHeightChanged}
                onSettingsPress={onSettingsPress}
                onFollowPress={onFollowPress}
                onEditPress={onEditPress}
                scrollY={scrollY}
                myself={myself}
                user={data}
            />
            {/* </Animated.ScrollView> */}

            <Header
                listCount={data?.placeListCount}
                onBackPress={navigation.goBack}
                onSharePress={onSharePress}
                scrollY={scrollY}
                myself={myself}
                user={data}
            />

            <TabBar
                headerHeight={headerHeight}
                onChange={setIndex}
                position={position}
                // y={tabBarState?.y}
                scrollY={scrollY}
            />

        </View>
    )
})

// Constants
// const { width } = Dimensions.get('window')

const routes = [
    'mine', 'tagged', 'liked',
].map((key, index) => ({ key, index }));