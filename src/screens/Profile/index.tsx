// React
import React, { memo, useCallback, useState, useRef, useMemo } from 'react'

// Components
import { View, Animated, Text, FlatList, StatusBar } from 'react-native'
import PictureItem from './PictureItem'
import Biography from './Biography'
import Header from './Header'
import TabBar from './TabBar'

// Helpers
import { useMe, useUser, useUserId, usePosts, useFollow, useUnfollow, useScrollY } from '@helpers'
import { useNavigation, useRoute } from '@navigation/utils'

// Constants
import { ui, font, color, style } from '@constants'

// Types
import { Props as PictureItemProps } from './PictureItem'
import { Post } from '@types'


export default memo(() => {

    const navigation = useNavigation();
    const { params } = useRoute<'Profile'>();

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

    // const pictures = useMemo(
    //     () => posts?.edges?.map(({ node }) => node),
    //     [posts]
    // );

    // if (!me?.user) return null;

    // if (meResult.loading) return null;

    if (userResult.error || meResult.error) {
        console.log(userResult.error || meResult.error);
        return null;
    }

    // console.log(postsResult.data?.me)
    // console.log(postsResult.error)
    
    const data = myself ? me : user;
    
    console.log(JSON.stringify(userResult.error, null, 4));

    return (
        <View style={style.container}>

            <Animated.FlatList
                onScroll={onScroll}
                keyExtractor={(item, i) => `${item}_${i}`}
                ListHeaderComponent={data && (
                    <>
                        <Biography
                            onSettingsPress={onSettingsPress}
                            onFollowPress={onFollowPress}
                            onEditPress={onEditPress}
                            myself={myself}
                            user={data}
                        />
                        <TabBar />
                    </>
                )}
                renderItem={({ item, index }) => (
                    <PictureItem
                        onPress={onPostPress}
                        item={item.node}
                        index={index}
                    />
                )}
                // data={pictures}
                // data={[]}
                data={posts?.edges}
                numColumns={3}
            />

            <Header
                listCount={data?.placeListCount}
                onBackPress={navigation.goBack}
                onSharePress={onSharePress}
                scrollY={scrollY}
                myself={myself}
                user={data}
            />

        </View>
    )
})