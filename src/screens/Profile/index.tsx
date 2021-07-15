// React
import React, { memo, useCallback, useState, useRef, useMemo } from 'react'

// Components
import { View, Animated, Text, FlatList, StatusBar } from 'react-native'
import PictureItem from './PictureItem'
import Biography from './Biography'
import Header from './Header'

// Helpers
import { useUser, useUserId, usePosts, useFollow, useUnfollow, useScrollY } from '@helpers'
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

    const [user, userResult] = useUser({ id: userId });

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
        () => {},
        []
    );

    const onFollowPress = useCallback(
        () => {
            // ...
        },
        []
    );

    // const pictures = useMemo(
    //     () => posts?.edges?.map(({ node }) => node),
    //     [posts]
    // );

    // if (!me?.user) return null;

    // if (meResult.loading) return null;

    if (userResult.error) {
        console.log(userResult.error);
        return null;
    }

    // console.log(postsResult.data?.me)
    // console.log(JSON.stringify(posts, null, 4))
    // console.log(postsResult.error)

    return (
        <View style={style.container}>

            <Animated.FlatList
                onScroll={onScroll}
                keyExtractor={(item, i) => `${item}_${i}`}
                ListHeaderComponent={user && (
                    <Biography
                        onSettingsPress={onSettingsPress}
                        onFollowPress={onFollowPress}
                        onEditPress={onEditPress}
                        myself={myself}
                        user={user}
                    />
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
                onBackPress={navigation.goBack}
                onSharePress={onSharePress}
                scrollY={scrollY}
                myself={myself}
                listCount={12}
                user={user}
            />

        </View>
    )
})