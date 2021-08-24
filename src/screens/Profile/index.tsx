// React
import React, { memo, useCallback, useState, useRef, useMemo } from 'react'

// Components
import { View, Animated, Text, FlatList, StatusBar, Dimensions } from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view'
import Reanimated from 'react-native-reanimated'
import PictureItem from './PictureItem'
import EmptyTabBar from './EmptyTabBar'
import Biography from './Biography'
import PostList from './PostList'
import Header from './Header'
import TabBar from './TabBar'

// Helpers
import { useMe, useUser, useUserId, usePosts, useFollow, useUnfollow, useScrollY } from '@helpers'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@navigation/utils'
import { useWindowDimensions } from 'react-native'

// Constants
import { ui, font, color, style } from '@constants'

// Types
import { Props as PictureItemProps } from './PictureItem'
import { Props as EmptyTabBarProps } from './EmptyTabBar'
import { Post } from '@types'


const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
);

const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

export default memo(() => {

    const navigation = useNavigation();
    const { params } = useRoute<'Profile'>();

    const { height } = useWindowDimensions();
    const edges = useSafeAreaInsets();
    const contentHeight = height - edges.top + 40;

    const [position, setPosition] = useState<Animated.AnimatedInterpolation>();
    // const headerHeightRef = useRef(new Animated.Value(-100));
    const [headerHeight, setHeaderHeight] = useState<number>();
    // const [tabBarState, setTabBarState] = useState<{
    //     position: Animated.AnimatedInterpolation,
    //     y: number,
    // }>();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'mine' },
        { key: 'tagged' },
        { key: 'liked' },
    ]);

    // const [posts, fetchMorePosts, postsResult] = useMyPosts({ first: 10 });
    // const [me, meResult] = useMe();

    const meId = useUserId();
    const userId = params?.userId ?? meId;
    const myself = userId === meId;

    const [user, userResult] = useUser({ id: userId, skip: myself });
    const [me, meResult] = useMe({ skip: !myself });

    const [unfollow, unfollowResult] = useUnfollow();
    const [follow, followResult] = useFollow();

    const onPostPress = useCallback(
        (post: Post) => {},
        []
    );

    const [posts, postsResult] = usePosts({
        creatorId: userId,
        first: 10,
    });

    const onBiographyPress = () => {
        // navigation.navigate('EditProfile', { me });
    };

    const { onScroll, scrollY } = useScrollY();

    const onSharePress = useCallback(
        () => {
            // ...
        },
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

    const onChange = useCallback(
        (index: number) => {},
        []
    );

    const renderScene = SceneMap({
        mine: SecondRoute,
        tagged: FirstRoute,
        liked: FirstRoute,
    });

    // const pictures = useMemo(
    //     () => posts?.edges?.map(({ node }) => node),
    //     [posts]
    // );

    // if (!me?.user) return null;

    // if (meResult.loading) return null;

    // const renderTabBar = useCallback(info => {
    //     setPosition(info.position);
    // }, []);

    // const onEmptyTabBarLayout = useCallback<
    //     EmptyTabBarProps['onLayout']
    // >(
    //     ({ position, y }) => setTabBarState,
    //     []
    // );

    if (userResult.error || meResult.error) {
        console.log(userResult.error || meResult.error);
        return null;
    }

    // console.log(postsResult.data?.me)
    // console.log(postsResult.error)
    
    const data = myself ? me : user;
    
    // console.log(JSON.stringify(userResult.error, null, 4));

    return (
        <View style={style.container}>

            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={onScroll}
            >
                <Biography
                    onHeightChanged={setHeaderHeight}
                    onSettingsPress={onSettingsPress}
                    onFollowPress={onFollowPress}
                    onEditPress={onEditPress}
                    myself={myself}
                    user={data}
                />

                <TabView
                    initialLayout={{ width, height: contentHeight }}
                    navigationState={{ index, routes }}
                    style={{ height: contentHeight }}
                    renderTabBar={({ position }) => (
                        <EmptyTabBar
                            // onLayout={onEmptyTabBarLayout}
                            onMount={setPosition}
                            position={position}
                        />
                    )}
                    // position={null}
                    // renderScene={renderScene}
                    onIndexChange={setIndex}
                    renderScene={({ route, position, jumpTo }) => (
                        <PostList
                            type={route.key as any}
                            // jumpTo={jumpTo}
                            userId={userId}
                        />
                    )}
                    // lazyPreloadDistance={10}
                    lazy={true}
                    
                />
            </Animated.ScrollView>

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
const { width } = Dimensions.get('window')