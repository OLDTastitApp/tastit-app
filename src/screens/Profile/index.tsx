// React
import React, { memo, useCallback, useState } from 'react'

// Components
import { View, Animated, LayoutAnimation } from 'react-native'
import { TabView } from 'react-native-tab-view'
import EmptyTabBar from './EmptyTabBar'
import Biography from './Biography'
import PostList from './PostList'
import Header from './Header'
import TabBar from './TabBar'

// Helpers
import { useMe, useUser, useUserId, useFollow, useUnfollow } from '@helpers'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@navigation/utils'
import { useWindowDimensions } from 'react-native'
import useParallax from './useParallax'

// Constants
import { style } from '@constants'


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

    const top = edges.top + 40;

    const scrollableHeaderHeight = headerHeight - top;

    const { onScrollEnd, onScrollRef, scrollY } = useParallax({
        scrollableHeaderHeight,
        routes,
    });

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

    // if (!user) return null;

    if (userResult.error || meResult.error) {
        console.log(userResult.error || meResult.error);
        return null;
    }
    
    const data = myself ? me : user;

    if (!data) return null;

    return (
        <View style={style.container}>

            {!!headerHeight && (
                <TabView
                    navigationState={{ index, routes }}
                    initialLayout={{ width, height }}
                    style={{ width, height }}
                    renderTabBar={({ position }) => (
                        <EmptyTabBar
                            onMount={setPosition}
                            position={position}
                        />
                    )}
                    onIndexChange={setIndex}
                    renderScene={({ route }) => (
                        <PostList
                            headerHeight={headerHeight}
                            onScrollRef={onScrollRef}
                            onScrollEnd={onScrollEnd}
                            type={route.key as any}
                            index={route.index}
                            scrollY={scrollY}
                            userId={userId}
                        />
                    )}
                    lazy={true}
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

            <Header
                listCount={data?.placeListCount}
                onBackPress={navigation.goBack}
                canGoBack={params?.canGoBack}
                onSharePress={onSharePress}
                scrollY={scrollY}
                myself={myself}
                user={data}
            />

            <TabBar
                headerHeight={headerHeight}
                onChange={setIndex}
                position={position}
                scrollY={scrollY}
            />

        </View>
    )
})

// Constants
const routes = [
    'MINE', 'TAGGED', 'LIKED',
].map((key, index) => ({ key, index }));